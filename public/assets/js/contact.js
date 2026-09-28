document.addEventListener('DOMContentLoaded',function(){
  const form=document.getElementById('contactMailForm');if(!form)return;
  const status=document.getElementById('contactStatus'),button=document.getElementById('contactSend');
  let busy=false;
  form.addEventListener('submit',async function(event){
    event.preventDefault();if(busy||!form.reportValidity())return;
    busy=true;button.disabled=true;status.textContent='送信中です。少しお待ちください。';
    const data=Object.fromEntries(new FormData(form).entries());
    try{
      const response=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
      const result=await response.json();
      if(!response.ok||!result.success)throw new Error(result.error||'受付を確認できませんでした。');
      status.textContent='受付が完了しました。ご連絡ありがとうございます。';form.reset();
    }catch(error){status.textContent='送信できませんでした。入力内容は残っています。'+(error.message||'時間をおいてお試しください。');}
    finally{busy=false;button.disabled=false;}
  });
});
