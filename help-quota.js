import { DurableObject } from 'cloudflare:workers';

// One SQLite Durable Object serializes reservations from all Cloudflare locations.
// Reservations are counted even if inference fails, keeping retries bounded.
export class HelpQuota extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
    this.ctx = ctx;
    ctx.storage.sql.exec('CREATE TABLE IF NOT EXISTS quota (key TEXT PRIMARY KEY, count INTEGER NOT NULL, last INTEGER NOT NULL)');
  }
  async fetch(request) {
    const {ip} = await request.json();
    if (typeof ip !== 'string' || !ip || ip.length > 100) return Response.json({error:'Invalid client'}, {status:400});
    const now = Date.now();
    const day = new Date(now + 9*3600000).toISOString().slice(0,10);
    const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(day+':'+ip));
    const hash = Array.from(new Uint8Array(digest), b=>b.toString(16).padStart(2,'0')).join('');
    const result = this.ctx.storage.transactionSync(() => {
      const sql=this.ctx.storage.sql;
      const total=sql.exec('SELECT count, last FROM quota WHERE key = ?', 'total:'+day).toArray()[0];
      const own=sql.exec('SELECT count, last FROM quota WHERE key = ?', 'ip:'+day+':'+hash).toArray()[0];
      if((total?.count||0)>=100)return {error:'本日の相談室全体の利用上限に達しました。また明日ご利用ください。'};
      if((own?.count||0)>=10)return {error:'本日の利用上限（10回）に達しました。また明日ご利用ください。'};
      if(own && now-own.last<10000)return {error:'10秒ほど間隔をあけて質問してください。'};
      // Old daily keys are removed; raw IP addresses and conversations are not stored.
      sql.exec('DELETE FROM quota WHERE key NOT LIKE ? AND key NOT LIKE ?', 'total:'+day, 'ip:'+day+':%');
      for(const key of ['total:'+day,'ip:'+day+':'+hash])
        sql.exec('INSERT INTO quota (key,count,last) VALUES (?,1,?) ON CONFLICT(key) DO UPDATE SET count=count+1,last=excluded.last',key,now);
      return {success:true};
    });
    return Response.json(result,{status:result.success?200:429});
  }
}
