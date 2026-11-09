(() => {
  const css = document.createElement('style');
  css.textContent = `.zk-rating{font-family:system-ui,sans-serif;max-width:680px;margin:24px auto;padding:16px;border:1px solid #e7dce2;border-radius:16px;background:#fffafc;color:#403541}.zk-rating-title{font-size:14px;font-weight:700;margin-bottom:10px}.zk-rating-actions{display:flex;gap:9px;flex-wrap:wrap}.zk-rating button{cursor:pointer;border:1px solid #d5bbc9;background:white;color:#56384b;border-radius:999px;padding:9px 15px;font-size:14px}.zk-rating button[aria-pressed=true]{background:#7a3c5d;color:white;border-color:#7a3c5d}.zk-rating button:disabled{opacity:.6;cursor:wait}.zk-rating-status{font-size:12px;color:#685766;margin-top:8px;min-height:1em}`;
  document.head.append(css);
  const path = location.pathname.replace(/\/$/,'') || '/';
  const targets = [...document.querySelectorAll('main .article-page')];
  if (!targets.length) {
    const main = document.querySelector('main') || document.querySelector('[role=main]');
    if (main) targets.push(main);
  }
  const visitorKey = 'zk-rating-visitor';
  let visitor;
  try {visitor=localStorage.getItem(visitorKey); if(!visitor){visitor=crypto.randomUUID();localStorage.setItem(visitorKey,visitor)}} catch {visitor=crypto.randomUUID()}
  targets.forEach((target,i) => {
    const key = path + (targets.length > 1 ? ':section-'+(i+1) : '');
    const wrap=document.createElement('section'); wrap.className='zk-rating';wrap.setAttribute('aria-label','コンテンツの評価');
    const title=document.createElement('div');title.className='zk-rating-title';title.textContent='このコンテンツはいかがでしたか？';
    const actions=document.createElement('div');actions.className='zk-rating-actions';
    const status=document.createElement('div');status.className='zk-rating-status';status.setAttribute('aria-live','polite');
    const buttons={};
    for (const [vote,label] of [['up','👍 役に立った'],['down','👎 改善してほしい']]) {
      const b=document.createElement('button');b.type='button';b.textContent=label;b.setAttribute('aria-pressed','false');buttons[vote]=b;actions.append(b);
      b.addEventListener('click',async()=>{
        Object.values(buttons).forEach(x=>x.disabled=true);status.textContent='送信中…';
        try {const r=await fetch('/api/ratings?key='+encodeURIComponent(key),{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({visitor,vote})});if(!r.ok)throw Error();const d=await r.json();render(d,vote);status.textContent='評価ありがとうございます。変更もできます。';}
        catch {status.textContent='送信できませんでした。もう一度お試しください。';}
        finally {Object.values(buttons).forEach(x=>x.disabled=false)}
      });
    }
    function render(d,vote){buttons.up.textContent='👍 役に立った ('+d.up+')';buttons.down.textContent='👎 改善してほしい ('+d.down+')';for(const v of ['up','down'])buttons[v].setAttribute('aria-pressed',String(v===vote));}
    wrap.append(title,actions,status);target.append(wrap);
    fetch('/api/ratings?key='+encodeURIComponent(key)).then(r=>{if(!r.ok)throw Error();return r.json()}).then(d=>render(d,null)).catch(()=>{status.textContent='集計を読み込めませんでした。'});
  });
})();
