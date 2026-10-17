// Separate from access logs: never store IP, request headers or submitted history.
export const HISTORY_VERSION = '2026-10-16-v1';
export const RETENTION_MS = 30 * 24 * 60 * 60 * 1000;
export function historyEnabled(env) {
  return env.HELP_HISTORY_ENABLED === 'true' && !!env.HELP_HISTORY_DB;
}
export async function beginHistory(env, session, question, consent) {
  if (!historyEnabled(env)) return null;
  try {
    const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(session));
    const sessionId = Array.from(new Uint8Array(digest), b => b.toString(16).padStart(2, '0')).join('');
    const record = {id:crypto.randomUUID(), started:Date.now(), consent, sessionId};
    await env.HELP_HISTORY_DB.prepare(`INSERT INTO help_history
      (id, session_id, created_at, expires_at, status, consent, consent_version, question, is_test)
      VALUES (?, ?, ?, ?, 'pending', ?, ?, ?,
        COALESCE((SELECT MAX(is_test) FROM help_history WHERE session_id = ? AND expires_at > ?), 0))`)
      .bind(record.id, sessionId, record.started, record.started + RETENTION_MS,
        consent ? 1 : 0, HISTORY_VERSION, consent ? question : null, sessionId, record.started).run();
    return record;
  } catch {
    console.warn(JSON.stringify({event:'help_history_write_failed',stage:'begin'}));
    return null;
  }
}
export async function finishHistory(env, record, status, answer = null) {
  if (!record) return false;
  try {
    const result = await env.HELP_HISTORY_DB.prepare(`UPDATE help_history SET status = ?, answer = ?, duration_ms = ? WHERE id = ?`)
      .bind(status, record.consent && status === 'success' ? answer : null,
        Math.max(0, Date.now() - record.started), record.id).run();
    return result.meta?.changes > 0;
  } catch {
    console.warn(JSON.stringify({event:'help_history_write_failed',stage:'finish'}));
    return false;
  }
}
export async function purgeHistory(env) {
  if (env.HELP_HISTORY_DB) {
    await env.HELP_HISTORY_DB.prepare('DELETE FROM help_history WHERE expires_at <= ?').bind(Date.now()).run();
  }
}
