const fs = require('fs'), path = require('path');
const SITE = 'https://agentpro.pages.dev';
const STORE = 'https://automoney-store.pages.dev';
const TOOLS = path.join(__dirname, '..', 'sites', 'agentpro', 'tools');
fs.mkdirSync(TOOLS, { recursive: true });

const CSS = `body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0a0a12;color:#e0e0e0;margin:0;padding:0;line-height:1.6}
.wrap{max-width:800px;margin:0 auto;padding:20px}
h1{font-size:2rem;color:#fff;margin:40px 0 8px;text-align:center}
.sub{text-align:center;color:#666;font-size:.9rem;margin-bottom:40px}
.card{background:#16162a;border:1px solid #2a2a4a;border-radius:12px;padding:32px;margin:24px 0}
input,textarea,select{width:100%;padding:12px;background:#0a0a12;border:1px solid #2a2a4a;border-radius:8px;color:#fff;font-size:1rem;margin:8px 0;box-sizing:border-box;font-family:monospace}
button{background:#f472b6;color:#0a0a12;border:none;padding:14px 28px;border-radius:8px;font-size:1rem;font-weight:600;cursor:pointer;width:100%}
button:hover{opacity:.9}
.result{background:#1a1a3e;border:1px solid #2a2a4a;border-radius:8px;padding:16px;margin:16px 0;display:none;word-break:break-all}
.result.show{display:block}
pre{white-space:pre-wrap;margin:0;font-size:.85rem}
.meta{color:#666;font-size:.8rem;text-align:center;margin:40px 0}
.meta a{color:#f472b6}
.footer{text-align:center;padding:32px 0;color:#555;font-size:.8rem;border-top:1px solid #2a2a4a;margin-top:60px}
.footer a{color:#f472b6}
.tag{display:inline-block;background:#1a1a3e;color:#f472b6;font-size:.75rem;padding:2px 10px;border-radius:100px;margin:4px 2px}
`;

const tools = [
  { slug: 'url-parser', title: 'URL Parser', desc: 'Parse and analyze URL components — protocol, host, path, query, hash.', h1: 'URL Parser', p: 'Enter a URL to parse its components.', kws: ['URL', 'parser', 'query string'], js: `function r(v){try{var u=new URL(v); return '<div style=background:#0a0a12;padding:16px;border-radius:8px><p><strong>Protocol:</strong> '+u.protocol+'</p><p><strong>Host:</strong> '+u.hostname+'</p><p><strong>Port:</strong> '+(u.port||'default')+'</p><p><strong>Path:</strong> '+u.pathname+'</p><p><strong>Query:</strong> '+u.search+'</p><p><strong>Hash:</strong> '+(u.hash||'none')+'</p></div>'}catch(e){return '<p style=color:#ff6b6b>Invalid URL</p>'}}` },
  { slug: 'text-replacer', title: 'Text Replacer', desc: 'Find and replace text with regex or plain string support.', h1: 'Text Replacer', p: 'Find and replace text in any input. Supports regex.', kws: ['find', 'replace', 'text'], js: `function r(v){var p=v.split('|||').map(function(x){return x.trim()}); if(p.length<3) return '<p style=color:#ff6b6b>Format: input ||| find ||| replace</p>'; var input=p[0],find=p[1],repl=p[2]; var result=input.split(find).join(repl); return '<div style=background:#0a0a12;padding:16px;border-radius:8px><p><strong>Result:</strong></p><pre>'+result+'</pre><p style=color:#666>'+result.length+' chars</p></div>'}` },
  { slug: 'emoji-picker', title: 'Emoji Picker', desc: 'Browse and copy common emojis for social media and content.', h1: 'Emoji Picker', p: 'Click an emoji to copy it.', kws: ['emoji', 'picker', 'copy'], js: `function r(v){var emojis='😀😃😄😁😆😂🤣😊😇🙂😉😌😍🥰😘😗😋😛😜🤪😝🤑🤗🤭🤫🤔🤐🤨😐😑😶😏😒🙄😬🤥😌😔😪🤤😴😷🤒🤕🤢🤮🤧🥵🥶🥴😵🤯🤠🥳🥸😎🤓🧐😕😟🙁😮😯😲😳🥺😦😧😨😰😥😢😭😱😖😣😞😓😩😫🥱😤😡😠🤬'.split(''); var html='<div style=font-size:1.8rem;line-height:2;text-align:center;cursor:pointer>'; for(var i=0;i<emojis.length;i++){html+='<span onclick=navigator.clipboard.writeText(\"'+emojis[i]+'\")>'+emojis[i]+'</span> '} html+='</div><p style=color:#666>Click to copy</p>'; return html}` },
  { slug: 'byte-converter', title: 'Byte Converter', desc: 'Convert between bytes, KB, MB, GB, TB.', h1: 'Byte Converter', p: 'Enter a value to convert across byte units.', kws: ['bytes', 'converter', 'storage'], js: `function r(v){var n=parseFloat(v); if(isNaN(n)) return '<p style=color:#ff6b6b>Enter a number</p>'; return '<div style=background:#0a0a12;padding:16px;border-radius:8px><p><strong>Bytes:</strong> '+n+'</p><p><strong>KB:</strong> '+(n/1024).toFixed(2)+'</p><p><strong>MB:</strong> '+(n/1048576).toFixed(2)+'</p><p><strong>GB:</strong> '+(n/1073741824).toFixed(4)+'</p></div>'}` },
  { slug: 'css-minifier', title: 'CSS Minifier', desc: 'Minify CSS by removing whitespace and comments.', h1: 'CSS Minifier', p: 'Paste CSS to minify.', kws: ['CSS', 'minifier', 'compress'], js: `function r(v){var s=v.replace(/\\/\\*[\\s\\S]*?\\*\\//g,'').replace(/\\s+/g,' ').replace(/\\s*([{};,:])\\s*/g,'$1').trim(); return '<div style=background:#0a0a12;padding:16px;border-radius:8px><pre style=color:#4ade80>'+s+'</pre><p style=color:#666>'+v.length+' → '+s.length+' chars ('+((1-s.length/v.length)*100).toFixed(1)+'% reduction)</p></div>'}` },
  { slug: 'lorem-ipsum', title: 'Lorem Ipsum Generator', desc: 'Generate Lorem Ipsum placeholder text.', h1: 'Lorem Ipsum Generator', p: 'Enter number of paragraphs (1-20).', kws: ['lorem ipsum', 'placeholder', 'text generator'], js: `var l='Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum.'; function r(v){var n=Math.min(Math.max(parseInt(v)||1,1),20); var words=l.split(' '); var out=''; for(var i=0;i<n;i++){var shuffled=[...words].sort(function(){return Math.random()-0.5}); out+='<p>'+shuffled.join(' ')+'</p>'} return out}` },
  { slug: 'http-status', title: 'HTTP Status Code Lookup', desc: 'Look up HTTP status codes and their meanings.', h1: 'HTTP Status Code Lookup', p: 'Enter a status code (e.g. 404, 503).', kws: ['HTTP', 'status code', 'lookup'], js: `var m={100:'Continue',101:'Switching Protocols',200:'OK',201:'Created',204:'No Content',301:'Moved Permanently',302:'Found',304:'Not Modified',307:'Temporary Redirect',400:'Bad Request',401:'Unauthorized',403:'Forbidden',404:'Not Found',405:'Method Not Allowed',408:'Request Timeout',409:'Conflict',410:'Gone',429:'Too Many Requests',500:'Internal Server Error',502:'Bad Gateway',503:'Service Unavailable',504:'Gateway Timeout'}; function r(v){var c=parseInt(v); var t=m[c]; if(!t) return '<p style=color:#ff6b6b>Unknown code: '+v+'</p>'; return '<div style=background:#0a0a12;padding:16px;border-radius:8px><p><strong>'+c+'</strong> — '+t+'</p><p style=color:#666;font-size:.85rem>'+(c>=400?'Client/Server Error':'Success/Redirect')+'</p></div>'}` },
  { slug: 'json-to-yaml', title: 'JSON to YAML Converter', desc: 'Convert JSON objects to YAML format.', h1: 'JSON to YAML Converter', p: 'Paste JSON to convert to YAML-style format.', kws: ['JSON', 'YAML', 'converter'], js: `function r(v){try{var d=JSON.parse(v); function toYaml(obj,indent){var out=''; for(var k in obj){var v=obj[k]; if(typeof v==='object'&&v!==null&&!Array.isArray(v)){out+=' '.repeat(indent)+k+':\\n'+toYaml(v,indent+2)}else if(Array.isArray(v)){out+=' '.repeat(indent)+k+':\\n'; v.forEach(function(item){out+=' '.repeat(indent+2)+'- '+item+'\\n'})}else{out+=' '.repeat(indent)+k+': '+v+'\\n'}} return out} return '<pre style=color:#4ade80>'+toYaml(d,0)+'</pre>'}catch(e){return '<p style=color:#ff6b6b>'+e.message+'</p>'}}` },
  { slug: 'screen-resolution', title: 'Screen Resolution Tester', desc: 'Display your current screen resolution and viewport size.', h1: 'Screen Resolution Tester', p: 'Shows your screen, viewport, and device pixel ratio.', kws: ['screen', 'resolution', 'viewport'], js: `function r(v){return '<div style=background:#0a0a12;padding:16px;border-radius:8px><p><strong>Screen:</strong> '+screen.width+'x'+screen.height+'</p><p><strong>Viewport:</strong> '+window.innerWidth+'x'+window.innerHeight+'</p><p><strong>Device Pixel Ratio:</strong> '+window.devicePixelRatio+'</p><p><strong>Color Depth:</strong> '+screen.colorDepth+' bit</p></div>'}` },
  { slug: 'random-data', title: 'Random Data Generator', desc: 'Generate random names, emails, phone numbers for testing.', h1: 'Random Test Data Generator', p: 'Enter count (1-50) to generate random test data.', kws: ['test data', 'random', 'generator'], js: `var first=['James','Mary','John','Patricia','Robert','Jennifer','Michael','Linda','David','Elizabeth','William','Barbara','Richard','Susan','Joseph','Jessica','Thomas','Sarah','Christopher','Karen','Charles','Lisa','Daniel','Nancy','Matthew','Betty']; var last=['Smith','Johnson','Williams','Brown','Jones','Garcia','Miller','Davis','Rodriguez','Martinez','Hernandez','Lopez','Gonzalez','Wilson','Anderson','Thomas','Taylor','Moore','Jackson','Martin']; function r(v){var n=Math.min(Math.max(parseInt(v)||5,1),50); var out=''; for(var i=0;i<n;i++){var f=first[Math.floor(Math.random()*first.length)]; var l=last[Math.floor(Math.random()*last.length)]; var e=(f+l+Math.floor(Math.random()*999)+'@test.com').toLowerCase(); out+=f+' '+l+' | '+e+'<br>'} return '<pre style=color:#4ade80>'+out+'</pre>'}` },
];

for (var i = 0; i < tools.length; i++) {
  var t = tools[i];
  var isAsync = t.js.indexOf('async') >= 0;
  var callFn = isAsync ? 'await r(v)' : 'r(v)';

  var html = '<!DOCTYPE html>\n<html lang=en>\n<head><meta charset=UTF-8><meta name=viewport content="width=device-width,initial-scale=1.0">\n';
  html += '<title>' + t.title + '</title>\n';
  html += '<meta name=description content="' + t.desc + '">\n';
  html += '<meta name=robots content="index, follow">\n';
  html += '<link rel=canonical href="' + SITE + '/tools/' + t.slug + '/">\n';
  html += '<style>' + CSS + '</style></head>\n<body>\n<div class=wrap>\n';
  html += '<h1>' + t.h1 + '</h1>\n<p class=sub>' + t.p + '</p>\n';
  html += '<div style=text-align:center>' + t.kws.map(function(k) { return '<span class=tag>' + k + '</span>'; }).join('') + '</div>\n';
  html += '<div class=card>\n<label style="color:#888;font-size:.85rem">Input</label>\n';
  html += '<textarea id=input rows=3 placeholder="Enter your input here..."></textarea>\n';
  html += '<button onclick=run()>Run</button>\n';
  html += '<div class=result id=result></div>\n</div>\n';
  html += '<p class=meta>Free tool from <a href="' + SITE + '">AgentPro</a> | <a href="' + STORE + '">Store</a></p>\n';
  html += '</div>\n<div class=footer>\n<p>&copy; 2026 AgentPro | USDT (TRC-20): TRnz5Pi8R3hjCbBjnDuZo7ZvR57euo2q8Z</p>\n';
  html += '</div>\n</div>\n<script>\n' + t.js + '\n';
  html += 'async function run(){\nvar v=document.getElementById("input").value;\nvar d=document.getElementById("result");\nd.className="result show";\ntry{d.innerHTML=' + callFn + ';}catch(e){d.innerHTML="<pre style=color:#ff6b6b>"+e.message+"</pre>"}\n}\n';
  html += 'document.getElementById("input").addEventListener("keydown",function(e){if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();run()}});\n';
  html += '</script>\n</body>\n</html>';

  var td = path.join(TOOLS, t.slug);
  fs.mkdirSync(td, { recursive: true });
  fs.writeFileSync(path.join(td, 'index.html'), html, 'utf-8');
  console.log('Tool: ' + t.slug);
}

console.log('\nV4 batch done. Total tools should be ~51.');
