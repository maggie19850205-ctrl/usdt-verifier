(function(){
var t=localStorage.getItem('am_theme')||'dark';
document.documentElement.setAttribute('data-theme',t);
var themes={dark:{n:'Premium Dark',i:'ð'},ghibli:{n:'Ghibli',i:'ð¿'},popmart:{n:'POPMART',i:'ð¨'},studio:{n:'Studio',i:'ð¼'},retro:{n:'Retro Pop',i:'ð'}};
var h=document.createElement('div');
h.id='theme-picker';
h.innerHTML='<button id="tp-btn" onclick="document.getElementById(\'tp-menu\').classList.toggle(\'open\')" title="Switch theme">ð¨</button><div id="tp-menu">'+Object.keys(themes).map(function(k){return '<a href="#" data-t="'+k+'" class="'+(t===k?'cur':'')+'">'+themes[k].i+' '+themes[k].n+'</a>';}).join('')+'</div>';
var s=document.createElement('style');
s.textContent='#theme-picker{position:fixed;bottom:20px;right:20px;z-index:9999}#tp-btn{width:44px;height:44px;border-radius:50%;border:1px solid var(--border);background:var(--bg2);color:var(--text);font-size:20px;cursor:pointer;box-shadow:0 4px 20px rgba(0,0,0,0.2);transition:all .2s}#tp-btn:hover{transform:scale(1.1)}#tp-menu{display:none;position:absolute;bottom:54px;right:0;background:var(--bg2);border:1px solid var(--border);border-radius:12px;padding:8px;min-width:150px;box-shadow:0 8px 32px rgba(0,0,0,0.15)}#tp-menu.open{display:block}#tp-menu a{display:block;padding:8px 14px;border-radius:8px;color:var(--text2);text-decoration:none;font-size:13px;transition:all .2s}#tp-menu a:hover{background:var(--accent3);color:var(--accent)}#tp-menu a.cur{background:var(--accent3);color:var(--accent);font-weight:600}';
document.head.appendChild(s);
document.body.appendChild(h);
document.getElementById('tp-menu').addEventListener('click',function(e){
var a=e.target.closest('[data-t]');
if(!a)return;
e.preventDefault();
var v=a.getAttribute('data-t');
localStorage.setItem('am_theme',v);
document.documentElement.setAttribute('data-theme',v);
document.querySelectorAll('#tp-menu a').forEach(function(x){x.classList.toggle('cur',x===a);});
document.getElementById('tp-menu').classList.remove('open');
});
})();

