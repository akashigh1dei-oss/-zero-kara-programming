
/* v1.92: translation/contact reliability patch */
(function(){
  'use strict';
  function openContact(ev){
    if(ev){ ev.preventDefault(); ev.stopPropagation(); }
    if(typeof window.showPage === 'function'){
      window.showPage('lineFriends');
      try{ history.replaceState(null,'','#lineFriends'); }catch(e){}
      requestAnimationFrame(function(){ window.scrollTo({top:0,left:0,behavior:'auto'}); });
    }
  }
  var quick=document.getElementById('contactQuickV181');
  if(quick){ quick.addEventListener('click',openContact,false); }

  /* A translated DOM can replace button descendants. Delegate contact navigation too. */
  document.addEventListener('click',function(ev){
    var el=ev.target && ev.target.closest ? ev.target.closest('[data-page="lineFriends"]') : null;
    if(el && el.id!=='contactQuickV181'){
      ev.preventDefault();
      if(typeof window.showPage==='function') window.showPage('lineFriends');
    }
  },false);

  /* Prevent repeated taps while the translation engine is already changing the page. */
  ['onlineTranslateButton','desktopTranslateButton'].forEach(function(id){
    var b=document.getElementById(id); if(!b) return;
    b.addEventListener('click',function(){
      if(b.dataset.v192Busy==='1') return;
      b.dataset.v192Busy='1'; b.setAttribute('aria-busy','true');
      setTimeout(function(){ b.dataset.v192Busy='0'; b.removeAttribute('aria-busy'); },1400);
    },true);
  });

  /* Restore contact page from its hash after Google translation/reload. */
  if(location.hash==='#lineFriends' && typeof window.showPage==='function'){
    window.showPage('lineFriends');
  }
})();
