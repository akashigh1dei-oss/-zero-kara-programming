(function(){
  'use strict';
  function runZeroKaraSelfCheck(){
    var checks = [];
    function check(name, ok, detail){ checks.push({name:name, ok:!!ok, detail:detail||''}); }
    try {
      check('HTML document', !!document.documentElement, 'documentElement');
      check('Body', !!document.body, 'body');
      check('Glossary search', !!document.getElementById('glossarySearch'), '#glossarySearch');
      check('Glossary filter function', typeof window.filterGlossary === 'function', 'filterGlossary()');
      check('Language UI function', typeof window.applyInterfaceLanguage === 'function', 'applyInterfaceLanguage()');
      var translateButtons = ['onlineTranslateButton','desktopTranslateButton'].map(function(id){return document.getElementById(id);}).filter(Boolean);
      check('Translate button', translateButtons.length > 0, translateButtons.length + ' found');
      var homeButtons = document.querySelectorAll('[data-ui-key="home"], a[href="#top"], a[href="./"], a[href="/"]');
      check('Home navigation', homeButtons.length > 0, homeButtons.length + ' candidate(s)');
      var duplicateIds = [];
      var seen = Object.create(null);
      document.querySelectorAll('[id]').forEach(function(el){ if(seen[el.id]) duplicateIds.push(el.id); else seen[el.id]=1; });
      check('Duplicate IDs', duplicateIds.length === 0, duplicateIds.slice(0,10).join(', '));
      var failed = checks.filter(function(c){return !c.ok;});
      window.zeroKaraSelfCheck = {version:'1.67', time:new Date().toISOString(), checks:checks, failed:failed};
      console.groupCollapsed('[Zero Kara v1.67] Self-check: ' + (failed.length ? failed.length+' issue(s)' : 'OK'));
      checks.forEach(function(c){ (c.ok?console.log:console.warn)((c.ok?'✓ ':'⚠ ')+c.name+(c.detail?' — '+c.detail:'')); });
      console.groupEnd();
      return window.zeroKaraSelfCheck;
    } catch(e) {
      window.zeroKaraSelfCheck = {version:'1.67', time:new Date().toISOString(), checks:checks, failed:[{name:'Self-check runtime',ok:false,detail:String(e)}]};
      console.warn('[Zero Kara v1.67] Self-check error', e);
      return window.zeroKaraSelfCheck;
    }
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', runZeroKaraSelfCheck, {once:true});
  else setTimeout(runZeroKaraSelfCheck,0);
  window.runZeroKaraSelfCheck = runZeroKaraSelfCheck;
})();
