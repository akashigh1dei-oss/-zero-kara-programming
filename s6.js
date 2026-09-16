
const interfaceLabels={
 ja:['名前で探す','あいうえお順','アルファベット順 A–Z','ホームへ戻る','翻訳する','閉じる','名前・読み方・英語名を入力'],
 en:['Search by name','Japanese A–I–U–E–O','Alphabetical A–Z','Back to home','Translate','Close','Enter a name, reading or English term'],
 fr:['Rechercher par nom','Ordre japonais','Ordre alphabétique A–Z','Accueil','Traduire','Fermer','Nom, lecture ou terme anglais'],
 sv:['Sök efter namn','Japansk ordning','Alfabetisk ordning A–Z','Till startsidan','Översätt','Stäng','Namn, läsning eller engelsk term'],
 zh:['按名称搜索','日语五十音顺序','字母顺序 A–Z','返回首页','翻译','关闭','输入名称、读音或英文术语'],
 ko:['이름으로 검색','일본어 오십음순','알파벳순 A–Z','홈으로','번역','닫기','이름, 읽는 법 또는 영어 용어 입력'],
 my:['အမည်ဖြင့် ရှာရန်','ဂျပန်အက္ခရာစဉ်','အင်္ဂလိပ်အက္ခရာစဉ် A–Z','ပင်မစာမျက်နှာသို့','ဘာသာပြန်ရန်','ပိတ်ရန်','အမည် သို့မဟုတ် အင်္ဂလိပ်ဝေါဟာရ ထည့်ပါ'],
 id:['Cari berdasarkan nama','Urutan huruf Jepang','Urutan alfabet A–Z','Kembali ke beranda','Terjemahkan','Tutup','Masukkan nama, bacaan, atau istilah Inggris'],
 th:['ค้นหาตามชื่อ','ลำดับอักษรญี่ปุ่น','ลำดับตัวอักษร A–Z','กลับหน้าหลัก','แปลภาษา','ปิด','ป้อนชื่อ คำอ่าน หรือศัพท์ภาษาอังกฤษ']
};
function applyInterfaceLanguage(lang){
 glossaryUiLanguage=lang;
 const words=interfaceLabels[lang]||interfaceLabels.ja;
 [['glossaryNameMode',0],['glossaryKanaMode',1],['glossaryAlphaMode',2],['onlineTranslateButton',4],['desktopTranslateButton',4]].forEach(([id,i])=>{const b=document.getElementById(id);b.textContent=words[i];b.classList.add('notranslate');b.setAttribute('translate','no');});
 document.querySelectorAll('[data-ui-key]').forEach(b=>{const i={home:3,translate:4,close:5}[b.dataset.uiKey];if(i!==undefined){b.textContent=words[i];b.classList.add('notranslate');b.setAttribute('translate','no');}});
 document.getElementById('glossarySearch').placeholder=words[6];
 filterGlossary();
}
applyInterfaceLanguage('ja');

