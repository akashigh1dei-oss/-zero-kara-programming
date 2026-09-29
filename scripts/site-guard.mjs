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
const editorialData = worker.match(/const EDITORIAL_PAGES = (.*);\nconst LESSON_HUB = /)?.[1];
if (!editorialData) fail('編集後記のページがありません');
const editorialPages = JSON.parse(editorialData);
const editorialIds = Object.keys(editorialPages);
if (editorialIds.join(',') !== '51,52,53') fail('編集後記の三話が揃っていません');
for (const id of editorialIds) {
  const page = editorialPages[id];
  if (!page.includes(`<link rel="canonical" href="https://mmdei.com/editorial/${id}/"`)) fail(`編集後記 ${id} のcanonicalが不正です`);
  if (!page.includes('property="og:title"') || !page.includes('name="twitter:card"')) fail(`編集後記 ${id} の共有タグが不足しています`);
}
const required = ['/', '/lessons/', ...ids.map((id) => `/lessons/${id}/`), ...editorialIds.map((id) => `/editorial/${id}/`)];
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


// 404 prevention guard: inspect internal links in every generated HTML page before deploy.
// Safe automatic repairs are intentionally limited to canonical trailing-slash normalization.
const knownRoutes = new Set(required);
const generatedPages = [
  ['/', html],
  ['/lessons/', worker.match(/const LESSON_HUB = (`[^`]*`|"(?:\\.|[^"\\])*");/)?.[1] || ''],
  ...ids.map((id) => [`/lessons/${id}/`, (worker.match(new RegExp(`"${id}":("(?:\\\\.|[^"\\\\])*")`)) || [])[1] || '']),
  ...editorialIds.map((id) => [`/editorial/${id}/`, JSON.stringify(editorialPages[id])])
];
const decodeJsString = (value) => {
  if (!value) return '';
  try { return JSON.parse(value); } catch { return value.startsWith('`') ? value.slice(1, -1) : ''; }
};
const normalizeInternalPath = (value, fromPath) => {
  if (!value || /^(?:https?:|mailto:|tel:|data:|javascript:|#|\/\/)/i.test(value)) return null;
  try { return new URL(value, base + fromPath).pathname; } catch { return null; }
};
const brokenLinks = [];
for (const [fromPath, rawPage] of generatedPages) {
  const page = decodeJsString(rawPage);
  if (!page) continue;
  for (const match of page.matchAll(/<a\b[^>]*?\bhref=["']([^"']+)["']/gi)) {
    const href = match[1];
    const pathname = normalizeInternalPath(href, fromPath);
    if (!pathname) continue;
    if (knownRoutes.has(pathname)) continue;
    const assetPath = pathname.replace(/^\//, '');
    if (assetPath && existsSync(resolve(root, 'public', assetPath))) continue;
    // Treat /route and /route/index.html as safe aliases only when their canonical route exists.
    const canonicalCandidate = pathname.endsWith('/index.html')
      ? pathname.slice(0, -'index.html'.length)
      : pathname.endsWith('/') ? pathname : pathname + '/';
    if (knownRoutes.has(canonicalCandidate)) continue;
    brokenLinks.push(`${fromPath} -> ${href}`);
  }
}
if (brokenLinks.length) {
  console.warn(`⚠️ 404候補の内部リンクがあります（警告のみ・デプロイは続行します）:\n${brokenLinks.join('\n')}`);
} else {
  console.log(`404予防チェック合格: 内部リンクに既知のリンク切れはありません`);
}

for (const path of ['worker.js', ...Array.from({ length: 8 }, (_, i) => `public/assets/js/part-0${i + 1}.js`)]) {
  execFileSync(process.execPath, ['--check', resolve(root, path)], { stdio: 'pipe' });
}
console.log(`公開前チェック合格: 学習ページ ${ids.length} 件、編集後記 ${editorialIds.length} 件、サイトマップ ${required.length} 件`);
