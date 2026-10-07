// Open the same AI room from the desktop home without duplicating the form.
window.openHelpAi=function(){
  showPage('help');
  requestAnimationFrame(function(){
    const title=document.getElementById('helpAiTitle');
    if(title){title.scrollIntoView({block:'start',behavior:'instant'});title.focus({preventScroll:true});}
  });
};
document.addEventListener('DOMContentLoaded',function(){
  const form=document.getElementById('helpAiForm');if(!form)return;
  const input=document.getElementById('helpAiQuestion'),messages=document.getElementById('helpAiMessages');
  const status=document.getElementById('helpAiStatus'),send=document.getElementById('helpAiSend');
  send.disabled=true;status.textContent='AI相談室は準備中です。';
  fetch('/api/help-chat').then(r=>r.json()).then(data=>{if(data.enabled){send.disabled=false;status.textContent='質問を入力して送信できます。';}}).catch(()=>{status.textContent='AI相談室は準備中です。';});
  let history=[];
  const session=crypto.randomUUID();
  function bubble(who,text){const p=document.createElement('p');p.className='help-ai-bubble help-ai-'+who;p.textContent=text;messages.appendChild(p);messages.scrollTop=messages.scrollHeight;}
  document.getElementById('helpAiClear').addEventListener('click',function(){history=[];messages.textContent='';bubble('answer','新しい相談を始めましょう。');status.textContent='会話を消しました。';input.focus();});
  form.addEventListener('submit',async function(e){
    e.preventDefault();const question=input.value.trim();if(!question||send.disabled)return;
    if([...question].length>1000){status.textContent='質問は1,000文字以内で入力してください。';return;}
    send.disabled=true;status.textContent='AIが返事を考えています…';
    try{
      const response=await fetch('/api/help-chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({question,history:history.slice(-6),session})});
      const data=await response.json();if(!response.ok)throw new Error(data.error||'返事を取得できませんでした。');
      bubble('user',question);bubble('answer',data.answer);
      history.push({role:'user',content:question},{role:'assistant',content:data.answer});history=history.slice(-6);
      input.value='';status.textContent='続けて質問できます。';
    }catch(error){status.textContent=error.message||'通信に失敗しました。時間をおいてお試しください。';}
    finally{send.disabled=false;input.focus();}
  });
});
