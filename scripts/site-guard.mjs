import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const read = (path) => readFileSync(resolve(root, path), 'utf8');
const fail = (message) => { throw new Error(message); };
const worker = read('worker.js');
const html = read('public/index.html');
const ids = [...worker.matchAll(/"(\d{2})":"<!DOCTYPE html/g)].map((match) => match[1]);
if (!ids.length || new Set(ids).size !== ids.length) fail('学習ページの番号が見つからないか、重複しています');
const largeCards = worker.split(String.raw`content=\"summary_large_image\" name=\"twitter:card\"`).length - 1;
if (largeCards !== ids.length) fail(`学習ページのTwitterカード設定が不揃いです: ${largeCards}/${ids.length}`);

const sitemapPath = resolve(root, 'public/sitemap.xml');
let sitemap = readFileSync(sitemapPath, 'utf8');
const base = 'https://mmdei.com';
const required = ['/', '/lessons/', ...ids.map((id) => `/lessons/${id}/`)];
const existing = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
if (new Set(existing).size !== existing.length) fail('サイトマップに同じURLが重複しています');
const missing = required.filter((path) => !existing.includes(base + path));
if (missing.length && process.argv.includes('--fix')) {
  if (!sitemap.includes('</urlset>')) fail('サイトマップの終端がありません');
  const date = new Date().toISOString().slice(0, 10);
  const entries = missing.map((path) => `  <url><loc>${base}${path}</loc><lastmod>${date}</lastmod></url>`).join('\n');
  sitemap = sitemap.replace('</urlset>', `${entries}\n</urlset>`);
  writeFileSync(sitemapPath, sitemap);
  console.log(`サイトマップの不足 ${missing.length} 件を補いました`);
} else if (missing.length) {
  fail(`サイトマップに ${missing.join(', ')} がありません`);
}

for (const path of required) {
  if (!sitemap.includes(`<loc>${base}${path}</loc>`)) fail(`サイトマップに ${path} がありません`);
}
for (const match of html.matchAll(/<(?:script|img|link)\b[^>]*?\b(?:src|href)=["']([^"']+)["']/gi)) {
  const value = match[1];
  if (/^(?:https?:|data:|#|\/\/)/.test(value)) continue;
  const asset = value.split(/[?#]/)[0].replace(/^\.\//, '').replace(/^\//, '');
  if (!asset || asset.startsWith('../')) continue;
  if (!existsSync(resolve(root, 'public', asset))) fail(`参照先ファイルがありません: ${value}`);
}
for (const path of ['worker.js', ...Array.from({ length: 8 }, (_, i) => `public/assets/js/part-0${i + 1}.js`)]) {
  execFileSync(process.execPath, ['--check', resolve(root, path)], { stdio: 'pipe' });
}
console.log(`公開前チェック合格: 学習ページ ${ids.length} 件、サイトマップ ${required.length} 件`);
/site-guard.mjs 
