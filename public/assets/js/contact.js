document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactMailForm');
  if (!form) return;
  const status = document.getElementById('contactStatus');
  const button = document.getElementById('contactSend');
  let busy = false;
  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    if (busy || !form.reportValidity()) return;
    const data = Object.fromEntries(new FormData(form).entries());
    if (data.botcheck) return;
    for (const field of ['name', 'email', 'message']) data[field] = (data[field] || '').trim();
    if (!data.name || !data.email || !data.message) {
      status.textContent = 'お名前・メールアドレス・お問い合わせ内容を入力してください。';
      return;
    }
    data.botcheck = false;
    busy = true;
    button.disabled = true;
    status.textContent = '送信中です。少しお待ちください。';
    const controller = new AbortController();
    const timer = setTimeout(function () { controller.abort(); }, 20000);
    try {
      // Web3Forms expects browser requests; do not proxy through /api/contact.
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data),
        signal: controller.signal
      });
      let result;
      try { result = await response.json(); } catch (_) { result = null; }
      if (response.ok && result && result.success === true) {
        status.textContent = '受付が完了しました。ご連絡ありがとうございます。';
        form.reset();
      } else {
        const detail = response.status === 429
          ? '送信回数の制限に達しました。1時間ほど待ってからお試しください。'
          : response.status === 403
            ? '送信先が受付を拒否しました。運営者による設定の確認が必要です。'
            : '送信先の受付を確認できませんでした。時間をおいてお試しください。';
        status.textContent = '送信できませんでした。入力内容は残っています。' + detail + '（HTTP ' + response.status + '）';
      }
    } catch (_) {
      status.textContent = '送信結果を確認できませんでした。入力内容は残っています。通信状態を確認してください。既に届いている可能性があるため、すぐに再送せず少しお待ちください。';
    } finally {
      clearTimeout(timer);
      busy = false;
      button.disabled = false;
    }
  });
});
