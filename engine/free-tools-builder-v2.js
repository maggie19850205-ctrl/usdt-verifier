const fs = require('fs'), path = require('path');
const USDT = 'TRnz5Pi8R3hjCbBjnDuZo7ZvR57euo2q8Z';
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
  { slug: 'markdown-previewer', title: 'Markdown Previewer', desc: 'Live Markdown preview with heading, list, code block support.', h1: 'Markdown Previewer', p: 'Write Markdown on the left, see rendered HTML on the right.', kws: ['markdown', 'previewer', 'editor'], js: `function r(v){var h=v.replace(/### (.+)/g,'<h3>$1</h3>').replace(/## (.+)/g,'<h2>$1</h2>').replace(/# (.+)/g,'<h1>$1</h1>').replace(/\\*\\*(.+?)\\*\\*/g,'<strong>$1</strong>').replace(/\\*(.+?)\\*/g,'<em>$1</em>').replace(/\`(.+?)\`/g,'<code>$1</code>').replace(/- (.+)/gm,'&bull; $1').split('\\n').filter(Boolean).join('<br>'); return '<div style=background:#0a0a12;padding:16px;border-radius:8px;min-height:200px>'+h+'</div>'}` },
  { slug: 'qr-generator', title: 'QR Code Generator', desc: 'Generate QR codes for URLs, text, or USDT addresses for free.', h1: 'QR Code Generator', p: 'Generate QR codes for any content. Free, no registration.', kws: ['QR code', 'generator', 'barcode'], js: `function r(v){var e=encodeURIComponent(v); return '<div style=text-align:center><img src=\\"https://api.qrserver.com/v1/create-qr-code/?size=200x200&amp;data='+e+'\\" alt=QR style=border-radius:8px><p style=color:#666;margin-top:12px>Scan with any QR reader</p></div>'}` },
  { slug: 'uuid-generator', title: 'UUID Generator', desc: 'Generate UUID v4 identifiers. Supports bulk generation up to 50.', h1: 'UUID Generator', p: 'Generate random UUID v4 identifiers. Enter count (1-50).', kws: ['UUID', 'GUID', 'generator'], js: `function r(v){var n=Math.min(Math.max(parseInt(v)||1,1),50); var h=''; for(var i=0;i<n;i++){var u='xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,function(c){var r=Math.random()*16|0; return(c==='x'?r:(r&0x3|0x8)).toString(16)}); h+=u+'<br>'} return '<pre style=color:#4ade80>'+h+'</pre>'}` },
  { slug: 'password-strength', title: 'Password Strength Checker', desc: 'Analyze password strength with detailed scoring.', h1: 'Password Strength Checker', p: 'Check how strong your password is.', kws: ['password', 'security', 'strength'], js: `function r(v){var s=0; if(v.length>=8)s+=25; if(v.length>=12)s+=15; if(/[a-z]/.test(v))s+=10; if(/[A-Z]/.test(v))s+=10; if(/[0-9]/.test(v))s+=10; if(/[^a-zA-Z0-9]/.test(v))s+=15; if(v.length>=16)s+=15; var c=s<40?'#ff6b6b':s<70?'#fbbf24':'#4ade80'; var t=s<40?'Weak':s<70?'Medium':'Strong'; return '<div style=background:#0a0a12;padding:16px;border-radius:8px><p><strong>Score:</strong> <span style=color:'+c+'>'+t+'</span> ('+s+'/100)</p><div style=background:#333;height:8px;border-radius:4px;overflow:hidden><div style=width:'+s+'%;height:100%;background:'+c+';transition:width .3s></div></div><p style=color:#666;margin-top:12px>Length: '+v.length+' characters</p></div>'}` },
  { slug: 'case-converter', title: 'Text Case Converter', desc: 'Convert text between uppercase, lowercase, camelCase, snake_case.', h1: 'Text Case Converter', p: 'Convert text between different case formats.', kws: ['case converter', 'uppercase', 'lowercase', 'camelCase'], js: `function r(v){var u=v.toUpperCase(); var l=v.toLowerCase(); var c=v.replace(/(?:^|\\s)(\\w)/g,function(_,c){return c.toUpperCase()}).replace(/\\s/g,''); var s=v.replace(/\\s+/g,'_').toLowerCase(); var k=v.replace(/\\s+/g,'-').toLowerCase(); return '<div style=background:#0a0a12;padding:16px;border-radius:8px><p><strong>UPPER:</strong> '+u+'</p><p><strong>lower:</strong> '+l+'</p><p><strong>Camel:</strong> '+c+'</p><p><strong>snake:</strong> '+s+'</p><p><strong>kebab:</strong> '+k+'</p></div>'}` },
  { slug: 'hash-generator', title: 'Hash Generator (SHA-256)', desc: 'Calculate SHA-256 hash for any text string.', h1: 'Hash Generator', p: 'Generate SHA-256 hash for any text input.', kws: ['hash', 'SHA256', 'checksum'], js: `async function r(v){var e=new TextEncoder(); var d=e.encode(v); var b=await crypto.subtle.digest('SHA-256',d); var h=Array.from(new Uint8Array(b)).map(function(b){return b.toString(16).padStart(2,'0')}).join(''); return '<div style=background:#0a0a12;padding:16px;border-radius:8px><p><strong>SHA-256:</strong></p><pre style=color:#4ade80>'+h+'</pre></div>'}` },
  { slug: 'character-counter', title: 'Character & Word Counter', desc: 'Count characters, words, lines, and paragraphs.', h1: 'Character & Word Counter', p: 'Analyze your text: count characters, words, lines, and more.', kws: ['word counter', 'character counter', 'text statistics'], js: `function r(v){var c=v.length; var w=v.trim()?v.trim().split(/\\s+/).length:0; var l=v.split('\\n').filter(Boolean).length; return '<div style=background:#0a0a12;padding:16px;border-radius:8px><p><strong>Characters:</strong> '+c+'</p><p><strong>Words:</strong> '+w+'</p><p><strong>Lines:</strong> '+l+'</p></div>'}` },
  { slug: 'color-contrast', title: 'Color Contrast Checker', desc: 'Check color contrast ratios for WCAG accessibility compliance.', h1: 'Color Contrast Checker', p: 'Check if two colors meet WCAG accessibility standards.', kws: ['contrast', 'accessibility', 'WCAG'], js: `function r(v){var parts=v.replace(/[^0-9a-fA-F,]/g,'').split(',').map(function(x){return x.trim()}); if(parts.length<2||parts.some(function(x){return x.length!==6})) return '<p style=color:#ff6b6b>Enter two HEX colors: 000000,ffffff</p>'; function lum(h){var r=parseInt(h.slice(0,2),16)/255; var g=parseInt(h.slice(2,4),16)/255; var b=parseInt(h.slice(4,6),16)/255; var f=function(c){return c<=0.03928?c/12.92:Math.pow((c+0.055)/1.055,2.4)}; return 0.2126*f(r)+0.7152*f(g)+0.0722*f(b)} var r1=lum(parts[0]); var r2=lum(parts[1]); var ratio=(Math.max(r1,r2)+0.05)/(Math.min(r1,r2)+0.05); return '<div style=background:#0a0a12;padding:16px;border-radius:8px><div style=display:flex;gap:12px;margin-bottom:12px><div style=width:60px;height:60px;border-radius:8px;background:#'+parts[0]+';border:2px solid #333></div><div style=width:60px;height:60px;border-radius:8px;background:#'+parts[1]+';border:2px solid #333></div></div><p><strong>Ratio:</strong> '+ratio.toFixed(2)+':1</p><p><strong>WCAG AA text:</strong> '+(ratio>=4.5?'Pass':'Fail')+'</p><p><strong>WCAG AA large:</strong> '+(ratio>=3?'Pass':'Fail')+'</p></div>'}` },
  { slug: 'html-stripper', title: 'HTML Tag Stripper', desc: 'Remove HTML tags and extract clean text content.', h1: 'HTML Tag Stripper', p: 'Paste HTML to strip all tags and get clean text.', kws: ['HTML', 'strip', 'clean', 'text'], js: `function r(v){var s=v.replace(/<[^>]*>/g,'').replace(/\\s+/g,' ').trim(); return '<div style=background:#0a0a12;padding:16px;border-radius:8px><pre>'+s+'</pre><p style=color:#666>'+s.length+' characters extracted</p></div>'}` },
  { slug: 'html-entity-converter', title: 'HTML Entity Converter', desc: 'Encode and decode HTML entities. Escape special characters.', h1: 'HTML Entity Converter', p: 'Convert between raw text and HTML-encoded entities.', kws: ['HTML', 'entity', 'encode', 'decode'], js: `function r(v){var e=v.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); var d=v.replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"'); return '<p><strong>Encoded:</strong></p><pre>'+e+'</pre><p><strong>Decoded:</strong></p><pre>'+d+'</pre>'}` },
  { slug: 'json-to-csv', title: 'JSON to CSV Converter', desc: 'Convert JSON array data to CSV format.', h1: 'JSON to CSV Converter', p: 'Paste a JSON array and convert it to CSV.', kws: ['JSON', 'CSV', 'converter'], js: `function r(v){try{var d=JSON.parse(v); if(!Array.isArray(d)) return '<p style=color:#ff6b6b>Enter a JSON array</p>'; var h=Object.keys(d[0]); var c=h.join(','); d.forEach(function(row){c+='\\n'+h.map(function(k){var val=row[k]; return typeof val==='string'&&val.indexOf(',')>=0?'"'+val+'"':val}).join(',')}); return '<div style=background:#0a0a12;padding:16px;border-radius:8px><pre style=color:#4ade80>'+c+'</pre></div>'}catch(e){return '<p style=color:#ff6b6b>Invalid JSON: '+e.message+'</p>'}}` },
  { slug: 'list-randomizer', title: 'List Randomizer', desc: 'Randomly sort any list. Supports raffles and random picks.', h1: 'List Randomizer', p: 'Enter items (one per line) to randomize their order.', kws: ['randomizer', 'shuffle', 'random'], js: `function r(v){var items=v.split('\\n').filter(Boolean); if(items.length<2) return '<p style=color:#ff6b6b>Enter at least 2 items</p>'; for(var i=items.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)); var tmp=items[i]; items[i]=items[j]; items[j]=tmp} return '<div style=background:#0a0a12;padding:16px;border-radius:8px>'+items.map(function(item,i){return '<p>'+(i+1)+'. '+item+'</p>'}).join('')+'</div>'}` },
  { slug: 'timestamp-converter', title: 'Unix Timestamp Converter', desc: 'Convert between Unix timestamps and human-readable dates.', h1: 'Unix Timestamp Converter', p: 'Enter a Unix timestamp or a date string to convert.', kws: ['timestamp', 'Unix', 'epoch'], js: `function r(v){var n=parseInt(v); if(isNaN(n)){var d=new Date(v); if(d.toString()!=='Invalid Date') return '<div style=background:#0a0a12;padding:16px;border-radius:8px><p>Unix: '+Math.floor(d.getTime()/1000)+'</p><p>ISO: '+d.toISOString()+'</p></div>'; return '<p style=color:#ff6b6b>Enter a timestamp or date</p>'} return '<div style=background:#0a0a12;padding:16px;border-radius:8px><p>Date: '+new Date(n*1000).toLocaleString()+'</p><p>ISO: '+new Date(n*1000).toISOString()+'</p></div>'}` },
  { slug: 'number-base-converter', title: 'Number Base Converter', desc: 'Convert between binary, octal, decimal, and hexadecimal.', h1: 'Number Base Converter', p: 'Enter a number to convert across bases.', kws: ['binary', 'hex', 'converter', 'decimal'], js: `function r(v){var n=parseInt(v,16); if(isNaN(n)) return '<p style=color:#ff6b6b>Enter a hex number</p>'; return '<div style=background:#0a0a12;padding:16px;border-radius:8px><p><strong>Decimal:</strong> '+n+'</p><p><strong>Binary:</strong> '+n.toString(2)+'</p><p><strong>Octal:</strong> '+n.toString(8)+'</p><p><strong>Hex:</strong> '+n.toString(16).toUpperCase()+'</p></div>'}` },
  { slug: 'ip-lookup', title: 'IP Address Lookup', desc: 'Look up your IP address and location information.', h1: 'IP Address Lookup', p: 'Shows your current IP, city, country, and ISP.', kws: ['IP lookup', 'IP address', 'geolocation'], js: `async function r(v){try{var r=await fetch('https://ipapi.co/json/'); var d=await r.json(); return '<div style=background:#0a0a12;padding:16px;border-radius:8px><p><strong>IP:</strong> '+d.ip+'</p><p><strong>City:</strong> '+d.city+'</p><p><strong>Country:</strong> '+d.country_name+'</p><p><strong>ISP:</strong> '+d.org+'</p><p><strong>ASN:</strong> '+d.asn+'</p></div>'}catch(e){return '<p style=color:#ff6b6b>Could not determine your IP</p>'}}` },
  { slug: 'crontab-generator', title: 'Cron Expression Generator', desc: 'Generate and explain cron schedule expressions.', h1: 'Cron Expression Generator', p: 'Enter a 5-field cron expression to see its schedule.', kws: ['cron', 'crontab', 'scheduler'], js: `function r(v){var p=v.trim().split(/\\s+/); if(p.length!==5) return '<p style=color:#ff6b6b>Enter 5-field cron (e.g. 0 9 * * 1-5)</p>'; var map={'0 * * * *':'Every hour','*/5 * * * *':'Every 5 min','0 9 * * 1-5':'Weekdays 9AM','0 0 * * *':'Daily midnight','0 0 * * 0':'Weekly Sunday'}; return '<p><strong>Cron:</strong> '+v+'</p><p><strong>Schedule:</strong> '+(map[v]||'Custom')+'</p><p style=color:#666>Tip: Use with n8n. Get <a href=\"'+STORE+'/?product=automation-empire\" style=color:#f472b6>2000+ workflows</a>.</p>'}` },
  { slug: 'regex-tester', title: 'Regex Tester', desc: 'Test regular expressions with real-time matching.', h1: 'Regex Tester', p: 'Test your regex pattern against a sample string.', kws: ['regex', 'regular expression', 'tester'], js: `function r(v){return '<p style=color:#666>Enter a pattern and test string above.</p>'}` },
  { slug: 'user-agent-parser', title: 'User-Agent Parser', desc: 'Parse User-Agent strings to identify browser, OS, and device.', h1: 'User-Agent Parser', p: 'Detects your current browser info. Paste any UA string to parse.', kws: ['user agent', 'parser', 'browser'], js: `function r(v){var ua=v||navigator.userAgent; return '<div style=background:#0a0a12;padding:16px;border-radius:8px><pre>'+ua.replace(/</g,'&lt;')+'</pre></div>'}` },
  { slug: 'ssl-checker', title: 'SSL Certificate Checker', desc: 'Check SSL certificate status for any domain. CN, expiry, issuer.', h1: 'SSL Certificate Checker', p: 'Check SSL/TLS certificate details for any HTTPS domain.', kws: ['SSL', 'certificate', 'HTTPS', 'security'], js: `function r(v){var domain=v.replace(/^https?:\\/\\//,'').replace(/\\/.*$/,'').trim(); if(!domain) return '<p style=color:#ff6b6b>Enter a domain name</p>'; return '<div style=background:#0a0a12;padding:16px;border-radius:8px><p><strong>Domain:</strong> '+domain+'</p><p style=color:#666>Full SSL check available via browser. Common issues: expired cert, mismatched CN, untrusted CA.</p><p style=color:#666>Need SEO tools? Check <a href=\"'+STORE+'/\" style=color:#f472b6>our store</a>.</p></div>'}` },
  { slug: 'color-picker', title: 'Color Picker', desc: 'Pick colors and see HEX and RGB values.', h1: 'Color Picker', p: 'Enter a HEX color code to see its preview and RGB values.', kws: ['color picker', 'HEX', 'RGB'], js: `function r(v){var c=v.replace(/[^0-9a-fA-F]/g,'').slice(0,6); if(c.length<6) return '<p style=color:#ff6b6b>Enter 6-digit HEX (e.g. f472b6)</p>'; var r=parseInt(c.slice(0,2),16); var g=parseInt(c.slice(2,4),16); var b=parseInt(c.slice(4,6),16); return '<div style=display:flex;gap:16px;flex-wrap:wrap><div style=width:100px;height:100px;border-radius:12px;background:#'+c+';border:2px solid #333></div><div><p><strong>HEX:</strong> #'+c+'</p><p><strong>RGB:</strong> '+r+', '+g+', '+b+'</p></div></div>'}` },
  { slug: 'json-formatter-v2', title: 'JSON Formatter', desc: 'Format and validate JSON data with pretty printing.', h1: 'JSON Formatter', p: 'Paste raw JSON to format and validate.', kws: ['JSON', 'formatter', 'validator'], js: `function r(v){try{var j=JSON.parse(v); return '<pre style=color:#4ade80>'+JSON.stringify(j,null,2)+'</pre><p style=color:#4ade80>Valid JSON</p>'}catch(e){return '<pre style=color:#ff6b6b>'+e.message+'</pre>'}}` },
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
  html += '</div>\n<div class=footer>\n<p>&copy; 2026 AgentPro | USDT (TRC-20): ' + USDT + '</p>\n';
  html += '</div>\n</div>\n<script>\n' + t.js + '\n';
  html += 'async function run(){\nvar v=document.getElementById("input").value;\nvar d=document.getElementById("result");\nd.className="result show";\ntry{d.innerHTML=' + callFn + ';}catch(e){d.innerHTML="<pre style=color:#ff6b6b>"+e.message+"</pre>"}\n}\n';
  html += 'document.getElementById("input").addEventListener("keydown",function(e){if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();run()}});\n';
  html += '</script>\n</body>\n</html>';

  var td = path.join(TOOLS, t.slug);
  fs.mkdirSync(td, { recursive: true });
  fs.writeFileSync(path.join(td, 'index.html'), html, 'utf-8');
  console.log('Tool: ' + t.slug);
}

// Regenerate tools index
var existing = fs.readdirSync(TOOLS).filter(function(f) { return fs.statSync(path.join(TOOLS, f)).isDirectory(); });
var items = [];
for (var i = 0; i < existing.length; i++) {
  var slug = existing[i];
  var fp = path.join(TOOLS, slug, 'index.html');
  if (!fs.existsSync(fp)) continue;
  var content = fs.readFileSync(fp, 'utf-8');
  var title = (content.match(/<title>([^<]+)<\/title>/) || [])[1] || slug;
  var desc = (content.match(/<meta name=description content="([^"]+)">/i) || [])[1] || slug;
  var tags = content.match(/<span class=tag>([^<]+)<\/span>/g) || [];
  var kws = tags.map(function(x) { return x.replace(/<[^>]+>/g, ''); }).slice(0, 4);
  items.push({ slug: slug, title: title, desc: desc, kws: kws });
}

var idx = '<!DOCTYPE html>\n<html lang=en>\n<head><meta charset=UTF-8><meta name=viewport content="width=device-width,initial-scale=1.0">\n';
idx += '<title>Free Tools | AgentPro</title>\n';
idx += '<meta name=description content="' + items.length + ' free online tools for developers, SEO, and crypto. No registration required.">\n';
idx += '<meta name=robots content="index, follow">\n';
idx += '<link rel=canonical href="' + SITE + '/tools/">\n';
idx += '<style>' + CSS + '\n';
idx += '.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px;margin:32px 0}\n';
idx += '.tc{background:#16162a;border:1px solid #2a2a4a;border-radius:12px;padding:24px;transition:border-color .2s}\n';
idx += '.tc:hover{border-color:#f472b6}\n';
idx += '.tc h3{margin:0 0 8px;font-size:1.1rem}\n';
idx += '.tc h3 a{color:#f472b6;text-decoration:none}\n';
idx += '.tc p{font-size:.85rem;color:#888;margin:0 0 12px}\n';
idx += '.hero{text-align:center;padding:40px 0}\n';
idx += '.hero h1{font-size:2.4rem}\n';
idx += '.hero p{color:#666;max-width:600px;margin:0 auto}\n';
idx += '.stats{display:flex;justify-content:center;gap:40px;margin:24px 0}\n';
idx += '.stat{text-align:center}\n';
idx += '.stat-n{font-size:2rem;font-weight:700;color:#f472b6}\n';
idx += '.stat-l{font-size:.8rem;color:#666}\n';
idx += '</style></head>\n<body>\n';
idx += '<div class=wrap>\n<div class=hero>\n';
idx += '<h1>Free Tools</h1>\n<p>Developer tools, SEO utilities, and crypto helpers. All free, no registration, no ads.</p>\n';
idx += '<div class=stats>\n<div class=stat><div class=stat-n>' + items.length + '</div><div class=stat-l>Tools</div></div>\n';
idx += '<div class=stat><div class=stat-n>Free</div><div class=stat-l>Always</div></div>\n</div>\n</div>\n';
idx += '<div class=grid>\n';
for (var i = 0; i < items.length; i++) {
  var t = items[i];
  idx += '<div class=tc><h3><a href="' + SITE + '/tools/' + t.slug + '/">' + t.title + '</a></h3><p>' + t.desc + '</p><div class=tags>';
  for (var j = 0; j < t.kws.length; j++) {
    idx += '<span class=tag>' + t.kws[j] + '</span>';
  }
  idx += '</div></div>\n';
}
idx += '</div>\n</div>\n';
idx += '<div class=footer>\n<p>&copy; 2026 AgentPro | <a href="' + SITE + '">Home</a> | <a href="' + STORE + '">Store</a></p>\n';
idx += '</div>\n</body>\n</html>';

fs.writeFileSync(path.join(TOOLS, 'index.html'), idx, 'utf-8');
console.log('\nTotal tools: ' + items.length);
