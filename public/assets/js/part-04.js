document.querySelectorAll('.page:not(#home)').forEach(page=>{
 const b=document.createElement('button');b.type='button';b.className='btn secondary';b.textContent='ホームへ戻る';b.dataset.uiKey='home';b.onclick=()=>showPage('home');page.prepend(b);
});
