const storyQuizQuestions=[
{q:'複数の答えを順番にまとめて保存したい。適しているのは？',o:['配列','CSS','else'],a:0,h:'第18回の「箱をまとめる」考え方です。',w:'配列は複数のデータを順番にまとめて扱えます。'},
{q:'配列の一番最初の番号は？',o:['0','1','10'],a:0,h:'JavaScriptの配列は人間の数え方と少し違います。',w:'JavaScriptの配列は0番から始まります。'},
{q:'answers[0] が表すものは？',o:['配列の最初の要素','配列の最後の要素','配列の個数'],a:0,h:'角括弧の数字は位置を示します。',w:'[0]は配列の最初の要素を指定します。'},
{q:'同じ処理を10回繰り返したい。適しているのは？',o:['for文','metaタグ','CSS'],a:0,h:'第19回でコンピュータに繰り返しを任せました。',w:'for文は同じ処理を条件に従って繰り返します。'},
{q:'answers.length が表すものは？',o:['配列の要素数','文字の色','最初の答え'],a:0,h:'lengthは「長さ・個数」の手掛かりです。',w:'lengthで配列に入っている要素数を取得できます。'},
{q:'配列が10件から50件に増えても最後まで処理しやすい書き方は？',o:['lengthを使ったfor文','変数を50個手書き','CSSを50個作る'],a:0,h:'データ数が変わっても追従できる方法を考えます。',w:'配列のlengthを条件に使えば、要素数の変化に合わせて繰り返せます。'},
{q:'DOM操作でJavaScriptができることは？',o:['HTMLの画面内容を取得・変更する','パソコンの電源を作る','CSSファイルを紙に印刷するだけ'],a:0,h:'第20回では「画面を動かす」段階に進みました。',w:'DOMを通してJavaScriptからHTML要素を取得したり内容を変更したりできます。'},
{q:'document.getElementById("message") は何をする？',o:['idがmessageの要素を探す','messageというサイトを検索する','配列を削除する'],a:0,h:'getElementByIdを日本語に分けて考えます。',w:'指定したidを持つHTML要素を取得します。'},
{q:'HTML・CSS・JavaScriptの役割の組み合わせとして適切なのは？',o:['HTML=骨組み、CSS=見た目、JavaScript=動き','HTML=動き、CSS=計算、JavaScript=画像だけ','3つとも同じ役割'],a:0,h:'家にたとえた基本の役割を思い出します。',w:'HTMLが構造、CSSが見た目、JavaScriptが動作や処理を主に担当します。'},
{q:'第18〜20回の流れとして最も近いものは？',o:['データをまとめる→繰り返す→画面につなぐ','色を決める→印刷する→終了する','HTMLを消す→CSSを消す→JavaScriptを消す'],a:0,h:'配列→for文→DOMの順番です。',w:'配列で整理し、for文で繰り返し、DOMでHTML画面へつなぐ流れです。'}
];
let storyQuizIndex=0,storyQuizAnswers=[];
function renderStoryQuiz(){const q=storyQuizQuestions[storyQuizIndex];document.getElementById('storyQuizCounter').textContent='第'+(storyQuizIndex+1)+'問 / 全10問';document.getElementById('storyQuizBar').style.width=(storyQuizIndex/10*100)+'%';document.getElementById('storyQuizQuestion').textContent=q.q;document.getElementById('storyQuizHint').textContent='ヒント：'+q.h;document.getElementById('storyQuizFeedback').textContent='';const box=document.getElementById('storyQuizOptions');box.innerHTML='';q.o.forEach((x,i)=>{const b=document.createElement('button');b.className='btn secondary';b.style.margin='6px';b.textContent=x;b.onclick=()=>answerStoryQuiz(i,b);box.appendChild(b)});document.getElementById('storyQuizNext').hidden=true;document.getElementById('storyQuizPrev').hidden=storyQuizIndex===0;if(storyQuizAnswers[storyQuizIndex]!==undefined){document.querySelectorAll('#storyQuizOptions button').forEach(x=>x.disabled=true);const correct=storyQuizAnswers[storyQuizIndex]===q.a;document.getElementById('storyQuizFeedback').textContent=(correct?'正解！ ':'もう一歩。 ')+q.w;document.getElementById('storyQuizNext').hidden=false;}}
function answerStoryQuiz(i,b){if(storyQuizAnswers[storyQuizIndex]!==undefined)return;const q=storyQuizQuestions[storyQuizIndex];storyQuizAnswers[storyQuizIndex]=i;document.querySelectorAll('#storyQuizOptions button').forEach(x=>x.disabled=true);document.getElementById('storyQuizFeedback').textContent=(i===q.a?'正解！ ':'もう一歩。 ')+q.w;document.getElementById('storyQuizNext').hidden=false;}
function finishStoryQuiz(){const score=storyQuizQuestions.filter((q,i)=>q.a===storyQuizAnswers[i]).length;document.getElementById('storyQuizCounter').textContent='10問回答完了';document.getElementById('storyQuizBar').style.width='100%';document.getElementById('storyQuizQuestion').textContent='結果：10問中 '+score+'問正解';document.getElementById('storyQuizHint').textContent=score===10?'全問正解です。第18〜20回の要点をしっかりつかめています。':'間違えた問題を下で確認して、もう一度挑戦できます。';document.getElementById('storyQuizOptions').innerHTML='';document.getElementById('storyQuizFeedback').textContent='';document.getElementById('storyQuizNext').hidden=true;document.getElementById('storyQuizRetry').hidden=false;document.getElementById('storyQuizPrev').hidden=false;const r=document.getElementById('storyQuizReview');r.innerHTML='';storyQuizQuestions.forEach((q,i)=>{if(q.a===storyQuizAnswers[i])return;const p=document.createElement('p');p.className='note';p.textContent='第'+(i+1)+'問：正解は「'+q.o[q.a]+'」。'+q.w;r.appendChild(p)});}
document.addEventListener('DOMContentLoaded',()=>{renderStoryQuiz();document.getElementById('storyQuizPrev').addEventListener('click',()=>{if(storyQuizIndex>0){storyQuizIndex--;renderStoryQuiz();}});document.getElementById('storyQuizNext').addEventListener('click',()=>{if(storyQuizIndex===9)finishStoryQuiz();else{storyQuizIndex++;renderStoryQuiz();}});document.getElementById('storyQuizRetry').addEventListener('click',()=>{storyQuizIndex=0;storyQuizAnswers=[];document.getElementById('storyQuizRetry').hidden=true;document.getElementById('storyQuizReview').innerHTML='';renderStoryQuiz();});});






/* v2.33 sorting: verified direct DOM reorder */
(function(){
 function n(el){var m=(el.textContent||'').match(/第\s*(\d+)\s*回/);return m?+m[1]:999999;}
 function init(pageId,newId,ascId){
   var page=document.getElementById(pageId), a=document.getElementById(newId), b=document.getElementById(ascId);
   if(!page||!a||!b)return;
   var list=[].slice.call(page.querySelectorAll('.lesson-item')).filter(function(x){return x.closest('.page')===page;});
   if(!list.length)return;
   var parent=list[0].parentNode;
   list=list.filter(function(x){return x.parentNode===parent;});
   list.forEach(function(x,i){x.dataset.v233Index=i;});
   var marker=document.createComment('v233-sort-marker');
   parent.insertBefore(marker,list[0]);
   function run(mode){
     var arr=list.slice().sort(function(x,y){
       var d=n(x)-n(y);
       if(!d)d=(+x.dataset.v233Index)-(+y.dataset.v233Index);
       return mode==='asc'?d:-d;
     });
     var frag=document.createDocumentFragment();
     arr.forEach(function(x){frag.appendChild(x);});
     parent.insertBefore(frag,marker.nextSibling);
     a.classList.toggle('active',mode==='newest'); b.classList.toggle('active',mode==='asc');
     a.setAttribute('aria-pressed',mode==='newest'); b.setAttribute('aria-pressed',mode==='asc');
   }
   a.addEventListener('click',function(e){e.preventDefault();run('newest');},true);
   b.addEventListener('click',function(e){e.preventDefault();run('asc');},true);
 }
 function boot(){init('lessons','sortNewestBtn','sortAscBtn');init('editorialIndex','editorialNewestBtn','editorialAscBtn'); setTimeout(function(){var b=document.getElementById('sortAscBtn');if(b)b.click();},0);}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();


/* v2.35: unified learning navigation. Site-wide lesson numbers are the source of truth. */
(function(){
 function lessonRows(){
   var page=document.getElementById('lessons'); if(!page)return [];
   return [].slice.call(page.querySelectorAll('.lesson-item')).map(function(row){
     var m=(row.textContent||'').match(/第\s*(\d+)\s*回/), b=row.querySelector('button[onclick]');
     var x=b&&b.getAttribute('onclick')||'', idm=x.match(/showPage\(['\"]([^'\"]+)/), om=x.match(/openLesson\((\d+)\)/);
     return m?{n:+m[1],id:idm?idm[1]:(om?'lesson'+om[1]:null),title:(row.querySelector('div')||row).textContent.trim()}:null;
   }).filter(function(x){return x&&x.id;}).sort(function(a,b){return a.n-b.n;});
 }
 function rootFor(id){
   if(/^jsLecture1p\d+$/.test(id))return 'jsLecture1p1';
   var m=id.match(/^((?:python|sql|api)Lecture\d+)(?:_p\d+)?$/); if(m)return m[1];
   return id;
 }
 function install(){
   var rows=lessonRows(); if(!rows.length)return;
   var byRoot={}; rows.forEach(function(x,i){byRoot[rootFor(x.id)]={row:x,index:i};});
   document.querySelectorAll('section.page[id]').forEach(function(sec){
     var hit=byRoot[rootFor(sec.id)]; if(!hit || sec.querySelector('.v235-course-nav'))return;
     var nav=document.createElement('div'); nav.className='article-nav v235-course-nav';
     var prev=rows[hit.index-1], next=rows[hit.index+1];
     nav.innerHTML='<button class="btn secondary" type="button" '+(prev?'data-go="'+prev.id+'"':'disabled')+'>← 戻る</button>'+
       '<button class="btn" type="button" data-go="lessons">メイン</button>'+
       '<button class="btn secondary" type="button" '+(next?'data-go="'+next.id+'"':'disabled')+'>進む →</button>'+
       '<select class="btn secondary v235-select" aria-label="学習回を選択"></select>'+
       '<button class="btn secondary v235-move" type="button">移動</button>';
     var sel=nav.querySelector('select'); rows.forEach(function(x){var o=document.createElement('option');o.value=x.id;o.textContent='第'+x.n+'回';if(x.n===hit.row.n)o.selected=true;sel.appendChild(o);});
     nav.querySelectorAll('[data-go]').forEach(function(b){b.addEventListener('click',function(){showPage(b.dataset.go);});});
     nav.querySelector('.v235-move').addEventListener('click',function(){showPage(sel.value);});
     var card=sec.querySelector('.card,article'); if(card)card.insertBefore(nav,card.firstChild);
   });
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();
