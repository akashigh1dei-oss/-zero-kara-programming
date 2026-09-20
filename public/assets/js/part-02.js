const quizQuestions = [{"q": "ホームページの「骨組み」を作るのはどれ？", "options": ["HTML", "CSS", "JavaScript"], "answer": 0, "why": "HTMLは、見出し・文章・ボタンなどの部品を用意します。", "hint": "家づくりなら、柱や壁にあたる担当です。色を塗る仕事とは分けて考えましょう。"}, {"q": "ボタンを見やすい緑色にする担当は？", "options": ["HTML", "CSS", "JavaScript"], "answer": 1, "why": "CSSは色・文字の大きさ・配置など、見た目を整えます。", "hint": "同じボタンでも、色や大きさを変えると印象が変わります。「見た目」の担当を思い出しましょう。"}, {"q": "ボタンを押すと金額が計算される。この動作を担当するのは？", "options": ["CSS", "画像ファイル", "JavaScript"], "answer": 2, "why": "JavaScriptはクリック後の動作や計算、画面の更新を担当します。", "hint": "計算するには、数字を使った処理が必要です。第2ページの3人の役割を思い出しましょう。"}, {"q": "JavaScriptくんに伝わる、具体的な指示はどれ？", "options": ["在庫が2本以下なら発注のお知らせを出す", "少なくなったら、いい感じにする", "いつものように気を利かせる"], "answer": 0, "why": "条件と実行する処理を具体的に決めると、コードにできます。", "hint": "初めて担当する人でも迷わないように、「いつ」「何をする」を伝えている指示を探しましょう。"}, {"q": "棚から洗剤を1本使いました。画面の在庫も必ず自動で減る？", "options": ["必ず減る", "使用数を入力するなど、変化を伝える仕組みが必要", "CSSが在庫を数えてくれる"], "answer": 1, "why": "プログラムは棚を直接見ていません。現実の変化をデータとして伝える必要があります。", "hint": "パソコンの画面と実際の棚は別の場所です。使ったことを、どう知らせるのでしょう？"}, {"q": "const 在庫 = 1; は何をしている？", "options": ["在庫を1本注文する", "在庫を画面に表示する", "「在庫」という名前で数字の1を扱えるようにする"], "answer": 2, "why": "これは変数の宣言と初期化です。この1行だけでは注文も画面表示も行いません。", "hint": "「在庫」というラベルの付いた箱に、最初の数字を入れるイメージです。まだボタンは押していません。"}, {"q": "在庫 <= 2 の「<=」の意味は？", "options": ["2以下（2も含む）", "2より小さい（2は含まない）", "2以上"], "answer": 0, "why": "「以下」は境目の数も含みます。0・1・2なら、この条件に当てはまります。", "hint": "小さい側を示す「<」に、「=」も付いています。境目の数字をどう扱うか考えましょう。"}, {"q": "在庫は2本。if (在庫 <= 2) なら「発注が必要です」。表示される？", "options": ["表示されない", "表示される", "在庫が0本になるまで表示されない"], "answer": 1, "why": "2 <= 2 は成り立ちます。ちょうど最低在庫の2本でも知らせます。", "hint": "2と2を比べています。「<」だけでなく「=」もあることに注目しましょう。"}, {"q": "if (在庫 <= 2) の後の else は、どんなときの処理？", "options": ["ボタンを2回押したとき", "条件が成り立つとき", "条件が成り立たないとき"], "answer": 2, "why": "elseは「そうでなければ」。在庫が3本なら、こちらの処理に進みます。", "hint": "「もし雨なら傘を持つ。そうでなければ……」の後半にあたります。"}, {"q": "ひとまとまりの仕事に「返事する」という名前を付ける書き方は？", "options": ["function 返事する() { ... }", "id=\"返事する\"", "const 返事する = 1;"], "answer": 0, "why": "functionで関数を定義できます。名前を付けた処理を、必要なときに呼び出します。", "hint": "いくつかの処理をまとめ、名前で呼び出せる仕組みを思い出しましょう。"}, {"q": "document.getElementById(\"伝言\") は何を探す？", "options": ["商品名が「伝言」の在庫", "idが「伝言」の画面の部品", "パソコン内のすべての伝言ファイル"], "answer": 1, "why": "HTMLのidという目印で部品を探します。textContentを使うと、その部品の文字を書き換えられます。", "hint": "名前の最後に「Id」があります。HTMLで部品に付けた目印と関係があります。"}, {"q": "2本以下で発注するはずが、>= と書いてしまった！ 間違いを見つける確認は？", "options": ["何か表示されたら合格にする", "ボタンの色だけ見る", "2本と3本などを入れ、期待した結果と比べる"], "answer": 2, "why": ">=は「以上」なので意図が逆になります。境目の値とその前後を試すと、判断の間違いを見つけやすくなります。", "hint": "「動いた」だけでは判断の正しさは分かりません。ルールが切り替わる境目に注目しましょう。"}];
let quizIndex=0, quizAnswers=[];
function renderQuizQuestion(){
 const q=quizQuestions[quizIndex];
 document.getElementById('quizHintArea').hidden=false;
 document.getElementById('quizHint').hidden=true;
 document.getElementById('quizHint').textContent=q.hint;
 document.getElementById('quizHintButton').textContent='ヒントを見る';
 document.getElementById('quizHintButton').setAttribute('aria-expanded','false');
 document.getElementById('quizCounter').textContent='第'+(quizIndex+1)+'問 / 全'+quizQuestions.length+'問';
 document.getElementById('quizBar').style.width=(quizIndex/quizQuestions.length*100)+'%';
 document.getElementById('quizQuestion').textContent=q.q;
 document.getElementById('quizFeedback').textContent='';
 document.getElementById('quizFeedback').className='';
 document.getElementById('quizNext').hidden=true;
 document.getElementById('quizPrev').hidden=quizIndex===0;
 document.getElementById('quizRetry').hidden=true;
 const options=document.getElementById('quizOptions'); options.replaceChildren();
 q.options.forEach((text,i)=>{const b=document.createElement('button');b.className='quiz-option';b.textContent=text;b.addEventListener('click',()=>selectQuizAnswer(i));options.appendChild(b);});
 if(quizAnswers[quizIndex]!==undefined){document.querySelectorAll('#quizOptions button').forEach((b,i)=>{b.disabled=true;if(i===q.answer)b.style.border='3px solid #176b52';});const correct=quizAnswers[quizIndex]===q.answer;const f=document.getElementById('quizFeedback');f.className=correct?'note':'warning';f.textContent=(correct?'正解！ ':'今回は不正解。正解は「'+q.options[q.answer]+'」。 ')+q.why;const next=document.getElementById('quizNext');next.textContent=quizIndex===quizQuestions.length-1?'結果を見る':'次の問題へ →';next.hidden=false;}
}
function selectQuizAnswer(choice){
 if(quizAnswers[quizIndex]!==undefined)return;
 const q=quizQuestions[quizIndex], correct=choice===q.answer;
 quizAnswers[quizIndex]=choice;
 document.querySelectorAll('#quizOptions button').forEach((b,i)=>{b.disabled=true;if(i===q.answer)b.style.border='3px solid #176b52';});
 const f=document.getElementById('quizFeedback'); f.className=correct?'note':'warning';
 f.textContent=(correct?'正解！ ':'今回は不正解。正解は「'+q.options[q.answer]+'」。 ')+q.why;
 const next=document.getElementById('quizNext');next.textContent=quizIndex===quizQuestions.length-1?'結果を見る':'次の問題へ →';next.hidden=false;
}
function finishQuiz(){
 document.getElementById('quizHintArea').hidden=true;
 const score=quizQuestions.filter((q,i)=>q.answer===quizAnswers[i]).length;
 document.getElementById('quizCounter').textContent='全12問 回答完了';
 document.getElementById('quizBar').style.width='100%';
 document.getElementById('quizQuestion').textContent=score+' / 12問 正解';
 document.getElementById('quizOptions').replaceChildren();
 document.getElementById('quizFeedback').className='note';
 document.getElementById('quizFeedback').textContent=score===12?'全問正解です！ 指示と動作のつながりをつかめましたね。':'お疲れさまでした。間違えた問題を下で振り返ってみましょう。';
 document.getElementById('quizNext').hidden=true;document.getElementById('quizRetry').hidden=false;document.getElementById('quizPrev').hidden=false;
 const review=document.getElementById('quizReview');review.replaceChildren();
 quizQuestions.forEach((q,i)=>{if(q.answer===quizAnswers[i])return;const box=document.createElement('div');box.className='card';const title=document.createElement('h3');title.textContent='第'+(i+1)+'問：'+q.q;const a=document.createElement('p');a.textContent='あなたの回答：'+q.options[quizAnswers[i]];const why=document.createElement('p');why.textContent='正解：'+q.options[q.answer]+'。'+q.why;box.append(title,a,why);review.appendChild(box);});
}
document.getElementById('quizHintButton').addEventListener('click',()=>{const hint=document.getElementById('quizHint');hint.hidden=!hint.hidden;const b=document.getElementById('quizHintButton');b.textContent=hint.hidden?'ヒントを見る':'ヒントを閉じる';b.setAttribute('aria-expanded',String(!hint.hidden));});
document.getElementById('quizPrev').addEventListener('click',()=>{if(quizIndex>0){quizIndex--;renderQuizQuestion();document.getElementById('quizQuestion').scrollIntoView({block:'center'});}});
document.getElementById('quizNext').addEventListener('click',()=>{if(quizAnswers[quizIndex]===undefined)return;if(quizIndex===quizQuestions.length-1)finishQuiz();else{quizIndex++;renderQuizQuestion();}document.getElementById('quizQuestion').scrollIntoView({block:'center'});});
document.getElementById('quizRetry').addEventListener('click',()=>{quizIndex=0;quizAnswers=[];document.getElementById('quizReview').replaceChildren();renderQuizQuestion();});
renderQuizQuestion();
