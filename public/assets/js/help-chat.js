(function(){
  let lastFocus=null;
  function dialog(){return document.getElementById('helpAiDialog');}
  window.openHelpAi=function(){
    const d=dialog();if(!d)return;
    lastFocus=document.activeElement;d.hidden=false;document.body.classList.add('help-ai-open');
    requestAnimationFrame(()=>{const input=document.getElementById('helpAiQuestion');if(input)input.focus();});
  };
  window.closeHelpAi=function(){
    const d=dialog();if(!d)return;d.hidden=true;document.body.classList.remove('help-ai-open');
    if(lastFocus&&typeof lastFocus.focus==='function')lastFocus.focus();
  };
  document.addEventListener('DOMContentLoaded',function(){
    const form=document.getElementById('helpAiForm');if(!form)return;
    const input=document.getElementById('helpAiQuestion'),messages=document.getElementById('helpAiMessages');
    const status=document.getElementById('helpAiStatus'),send=document.getElementById('helpAiSend');
    document.querySelectorAll('[data-help-ai-close]').forEach(el=>el.addEventListener('click',closeHelpAi));
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!dialog().hidden)closeHelpAi();});
    send.disabled=true;status.textContent='AI相談室を確認しています…';
    fetch('/api/help-chat').then(r=>r.json()).then(data=>{if(data.enabled){send.disabled=false;status.textContent='質問を入力して送信できます。';}else{status.textContent='AI相談室は準備中です。';}}).catch(()=>{status.textContent='AI相談室は準備中です。';});
    let history=[];const session=(crypto.randomUUID?crypto.randomUUID():String(Date.now())+Math.random().toString(16).slice(2));
    function bubble(who,text){const p=document.createElement('p');p.className='help-ai-bubble help-ai-'+who;p.textContent=text;messages.appendChild(p);messages.scrollTop=messages.scrollHeight;}
    document.getElementById('helpAiClear').addEventListener('click',function(){history=[];messages.textContent='';bubble('answer','新しい相談を始めましょう。');status.textContent='会話を消しました。';input.focus();});
    form.addEventListener('submit',async function(e){
      e.preventDefault();const question=input.value.trim();if(!question||send.disabled)return;
      if([...question].length>1000){status.textContent='質問は1,000文字以内で入力してください。';return;}
      bubble('user',question);input.value='';send.disabled=true;status.textContent='愛ちゃんが返事を考えています…';
      try{
        const response=await fetch('/api/help-chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({question,history:history.slice(-6),session})});
        const data=await response.json();if(!response.ok)throw new Error(data.error||'返事を取得できませんでした。');
        bubble('answer',data.answer);history.push({role:'user',content:question},{role:'assistant',content:data.answer});history=history.slice(-6);status.textContent='続けて質問できます。';
      }catch(error){bubble('answer','うまく返事を受け取れませんでした。少し時間をおいて、もう一度試してください。');status.textContent=error.message||'通信に失敗しました。時間をおいてお試しください。';}
      finally{send.disabled=false;input.focus();}
    });
  });
})();
