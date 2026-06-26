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
  { slug: 'duplicate-remover', title: 'Duplicate Line Remover', desc: 'Remove duplicate lines from text. Keep unique lines only.', h1: 'Duplicate Line Remover', p: 'Paste text with duplicate lines to clean them.', kws: ['duplicate', 'remove', 'lines', 'unique'],
    js: `function r(v){var lines=v.split('\\n');var seen={};var result=[];for(var i=0;i<lines.length;i++){var line=lines[i].trim();if(line&&!seen[line]){seen[line]=true;result.push(line)}}return'<div style=background:#0a0a12;padding:16px;border-radius:8px><pre>'+result.join('\\n')+'</pre><p style=color:#666>'+lines.filter(function(x){return x.trim()}).length+' lines → '+result.length+' unique</p></div>'}` },

  { slug: 'line-prefixer', title: 'Line Prefix/Suffix Tool', desc: 'Add prefix and/or suffix to every line of text.', h1: 'Line Prefix/Suffix Tool', p: 'Enter text (one item per line), then set prefix and suffix.', kws: ['prefix', 'suffix', 'lines', 'batch'],
    js: `function r(v){var parts=v.split('|||');if(parts.length<3)return'<p style=color:#ff6b6b>Format: input ||| prefix ||| suffix</p>';var lines=parts[0].split('\\n').filter(function(x){return x.trim()});var prefix=parts[1];var suffix=parts[2];var result=lines.map(function(line){return prefix+line.trim()+suffix});return'<div style=background:#0a0a12;padding:16px;border-radius:8px><pre>'+result.join('\\n')+'</pre><p style=color:#666>'+result.length+' lines processed</p></div>'}` },

  { slug: 'text-to-slug', title: 'URL Slug Generator', desc: 'Convert any text to a URL-friendly slug.', h1: 'URL Slug Generator', p: 'Enter text to convert to a clean URL slug.', kws: ['slug', 'URL', 'seo', 'permalink'],
    js: `function r(v){v=v.trim().toLowerCase();var slug=v.replace(/[^\\w\\s-]/g,'').replace(/[\\s_]+/g,'-').replace(/-+/g,'-').replace(/^-|-$/g,'');return'<div style=background:#0a0a12;padding:16px;border-radius:8px><p><strong>Slug:</strong> <code style=color:#4ade80;font-size:1.1rem>'+slug+'</code></p><p style=color:#666>'+v.length+' chars → '+slug.length+' chars</p><p style=color:#555>Tip: Good slugs are short, lowercase, use hyphens between words.</p></div>'}` },

  { slug: 'markdown-to-html', title: 'Markdown to HTML Converter', desc: 'Convert Markdown text to HTML.', h1: 'Markdown to HTML', p: 'Paste Markdown to convert to HTML.', kws: ['markdown', 'html', 'converter'],
    js: `function r(v){v=v.trim();if(!v)return'';var h=v.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');h=h.replace(/^### (.+)$/gm,'<h3>$1<\\/h3>').replace(/^## (.+)$/gm,'<h2>$1<\\/h2>').replace(/^# (.+)$/gm,'<h1>$1<\\/h1>');h=h.replace(/\\*\\*(.+?)\\*\\*/g,'<strong>$1<\\/strong>').replace(/\\*(.+?)\\*/g,'<em>$1<\\/em>');h=h.replace(/^\\d+\\. (.+)$/gm,'<li>$1<\\/li>').replace(/^- (.+)$/gm,'<li>$1<\\/li>');h='<p>'+h.replace(/\\n\\n/g,'<\\/p><p>').replace(/\\n/g,'<br>')+'<\\/p>';return'<div style=background:#0a0a12;padding:16px;border-radius:8px>'+h+'<\\/div><br><textarea rows=12 readonly onclick=this.select() style=font-size:.75rem;width:100%;background:#0a0a12;border:1px solid #2a2a4a;border-radius:8px;color:#fff;padding:12px;font-family:monospace>'+h.replace(/</g,'&lt;').replace(/>/g,'&gt;')+'<\\/textarea><p style=color:#666>HTML shown above. Click textarea to select code.</p>'}` },

  { slug: 'text-to-base64', title: 'Text to Base64 Encoder/Decoder', desc: 'Encode text to Base64 or decode Base64 back to text.', h1: 'Text to Base64', p: 'Enter text to encode, or Base64 to decode.', kws: ['base64', 'encode', 'decode'],
    js: `function r(v){v=v.trim();if(!v)return'';var isB64=/^[A-Za-z0-9+/]*={0,2}$/.test(v);if(isB64&&v.length>4){try{var d=atob(v);return'<div style=background:#0a0a12;padding:16px;border-radius:8px><p><strong>Decoded:</strong></p><pre>'+d+'</pre></div>'}catch(e){}}var enc=btoa(v);return'<div style=background:#0a0a12;padding:16px;border-radius:8px><p><strong>Encoded:</strong></p><pre style=color:#4ade80>'+enc+'</pre><p style=color:#666>'+v.length+' chars encoded to '+enc.length+' chars</p></div>'}` },

  { slug: 'math-evaluator', title: 'Math Expression Evaluator', desc: 'Safely evaluate mathematical expressions.', h1: 'Math Expression Evaluator', p: 'Enter a math expression (e.g., (15 + 3) * 2 - 8/4).', kws: ['math', 'calculator', 'evaluate', 'expression'],
    js: `function r(v){v=v.trim();if(!v)return'';v=v.replace(/×/g,'*').replace(/÷/g,'/');if(/[^0-9+\\-*/.()%^ ,e]/g.test(v))return'<p style=color:#ff6b6b>Invalid characters in expression</p>';try{var result=Function('"use strict";return ('+v+')')();if(typeof result!=='number'||!isFinite(result))return'<p style=color:#ff6b6b>Invalid or infinite result</p>';return'<div style=background:#0a0a12;padding:16px;border-radius:8px><p style=font-size:1.5rem;color:#4ade80;text-align:center>'+result+'</p><p style=color:#666;text-align:center>'+v+' = '+result+'</p></div>'}catch(e){return'<p style=color:#ff6b6b>Error: '+e.message+'</p>'}` },

  { slug: 'credit-card-validator', title: 'Credit Card Validator', desc: 'Validate credit card numbers using the Luhn algorithm. Identify card type.', h1: 'Credit Card Validator', p: 'Enter a credit card number to validate.', kws: ['credit card', 'validate', 'luhn', 'payment'],
    js: `function r(v){v=v.replace(/\\s/g,'').replace(/-/g,'');if(!/^\\d{13,19}$/.test(v))return'<p style=color:#ff6b6b>Enter 13-19 digits</p>';var sum=0;var alt=false;for(var i=v.length-1;i>=0;i--){var d=parseInt(v[i],10);if(alt){d*=2;if(d>9)d-=9}sum+=d;alt=!alt}var valid=sum%10===0;var types=[['4','Visa'],['5[1-5]','MasterCard'],['3[47]','AmEx'],['6011','Discover'],['2[2-7]','MasterCard'],['35[2-8]','JCB'],['3[0689]','Diners'],['62','UnionPay']];var type='Unknown';for(var i=0;i<types.length;i++){var re=new RegExp('^'+types[i][0]);if(re.test(v)){type=types[i][1];break}}return'<div style=background:#0a0a12;padding:16px;border-radius:8px><p style=text-align:center;font-size:1.5rem>'+(valid?'✅ Valid':'❌ Invalid')+'</p><p><strong>Card Type:</strong> '+type+'</p><p><strong>Number:</strong> '+v.slice(0,4)+' **** **** '+v.slice(-4)+'</p><p><strong>Length:</strong> '+v.length+' digits</p></div>'}` },

  { slug: 'caesar-cipher', title: 'Caesar Cipher Encoder/Decoder', desc: 'Encrypt and decrypt text using the Caesar cipher (shift cipher).', h1: 'Caesar Cipher', p: 'Enter text and a shift value (1-25) to encode or decode.', kws: ['caesar', 'cipher', 'encrypt', 'decrypt'],
    js: `function r(v){var parts=v.split('|||');if(parts.length<3)return'<p style=color:#ff6b6b>Format: text ||| shift (1-25) ||| encode/decode</p>';var text=parts[0].trim();var shift=parseInt(parts[1],10);var mode=parts[2].trim().toLowerCase();if(isNaN(shift)||shift<1||shift>25)return'<p style=color:#ff6b6b>Shift must be 1-25</p>';if(mode==='decode')shift=-shift;var result='';for(var i=0;i<text.length;i++){var c=text[i];if(c>='a'&&c<='z'){var code=((c.charCodeAt(0)-97+shift+26)%26+97);result+=String.fromCharCode(code)}else if(c>='A'&&c<='Z'){var code=((c.charCodeAt(0)-65+shift+26)%26+65);result+=String.fromCharCode(code)}else{result+=c}}return'<div style=background:#0a0a12;padding:16px;border-radius:8px><p><strong>'+(mode==='decode'?'Decoded':'Encoded')+':</strong></p><pre style=color:#4ade80;font-size:1.1rem>'+result+'</pre><p style=color:#666>Shift: '+Math.abs(shift)+'</p></div>'}` },

  { slug: 'temperature-converter', title: 'Temperature Converter', desc: 'Convert between Celsius, Fahrenheit, and Kelvin.', h1: 'Temperature Converter', p: 'Enter a value with unit (e.g., 32F, 100C, 273.15K).', kws: ['temperature', 'converter', 'celsius', 'fahrenheit', 'kelvin'],
    js: `function r(v){v=v.trim().toUpperCase();if(!v)return'';var m=v.match(/^(-?[\\d.]+)\\s*([CFK])$/);if(!m)return'<p style=color:#ff6b6b>Enter like: 32F, 100C, or 273.15K</p>';var val=parseFloat(m[1]);var unit=m[2];var c,f,k;if(unit==='C'){c=val;f=val*9/5+32;k=val+273.15}else if(unit==='F'){c=(val-32)*5/9;f=val;k=c+273.15}else{k=val;c=k-273.15;f=c*9/5+32}return'<div style=background:#0a0a12;padding:16px;border-radius:8px><p><strong>Celsius:</strong> '+c.toFixed(2)+' °C</p><p><strong>Fahrenheit:</strong> '+f.toFixed(2)+' °F</p><p><strong>Kelvin:</strong> '+k.toFixed(2)+' K</p></div>'}` },

  { slug: 'email-extractor', title: 'Email Extractor', desc: 'Extract all email addresses from text.', h1: 'Email Extractor', p: 'Paste text containing email addresses.', kws: ['email', 'extract', 'scraper'],
    js: `function r(v){v=v.trim();if(!v)return'';var regex=/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}/g;var matches=v.match(regex);if(!matches||matches.length===0)return'<p style=color:#ff6b6b>No email addresses found</p>';var unique=[];var seen={};for(var i=0;i<matches.length;i++){var email=matches[i].toLowerCase();if(!seen[email]){seen[email]=true;unique.push(email)}}return'<div style=background:#0a0a12;padding:16px;border-radius:8px><pre style=color:#4ade80>'+unique.join('\\n')+'</pre><p style=color:#666>'+unique.length+' unique email'+(unique.length>1?'s':'')+' found</p><br><button onclick=navigator.clipboard.writeText("'+unique.join('\\n')+'") style="background:#2a2a4a;color:#fff;padding:8px 16px;width:auto">Copy All</button></div>'}` },
];

tools.forEach(function(t) {
  var dir = path.join(TOOLS, t.slug);
  fs.mkdirSync(dir, { recursive: true });
  var tags = t.kws.map(function(k) { return '<span class="tag">' + k + '</span>'; }).join('');
  var inputHtml = t.slug === 'image-to-base64'
    ? '<div id="inputWrap"></div>'
    : '<textarea id="input" rows="5" placeholder="Paste your input here..." autocomplete="off" style="font-family:monospace"></textarea>';
  var extraJs = t.preJs || '';
  var html = '<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width,initial-scale=1.0">\n<title>' + t.title + '</title>\n<meta name="description" content="' + t.desc + '">\n<meta name="robots" content="index, follow">\n<link rel="canonical" href="' + SITE + '/tools/' + t.slug + '/">\n<script type="application/ld+json">{"@context":"https://schema.org","@type":"WebApplication","name":"' + t.title + '","description":"' + t.desc + '","applicationCategory":"Utility","operatingSystem":"All"}</script>\n<style>' + CSS + '</style>\n</head>\n<body>\n<div class="wrap">\n<div class="tool-header" style="text-align:center;margin:20px 0 30px">\n<h1>' + t.h1 + '</h1>\n<p class="sub">' + t.p + '</p>\n<div>' + tags + '</div>\n</div>\n<div class="card">\n' + inputHtml + '\n<button onclick="run()">' + t.title + '</button>\n<div class="result" id="result"></div>\n</div>\n<p class="meta">Free tool from <a href="' + SITE + '">AgentPro</a>. Need more? <a href="' + STORE + '">Browse our digital products</a>.</p>\n</div>\n<div class="footer">\n<p>&copy; 2026 AgentPro | <a href="' + SITE + '">Home</a> | <a href="' + SITE + '/tools/">Tools</a> | <a href="' + STORE + '">Store</a> | USDT (TRC-20): TRnz5Pi8R3hjCbBjnDuZo7ZvR57euo2q8Z</p>\n</div>\n<script>\n' + extraJs + '\nfunction run() {\n  var v = document.getElementById("input") ? document.getElementById("input").value : "";\n  var d = document.getElementById("result");\n  d.className = "result show";\n  try { d.innerHTML = (function(v){' + t.js.slice(0, -1) + ';}) (v); }\n  catch(e) { d.innerHTML = "<pre style=color:#ff6b6b>" + e.message + "</pre>"; }\n}\nvar inp = document.getElementById("input");\nif(inp) inp.addEventListener("keydown",function(e){if(e.key==="Enter"&&e.ctrlKey)run()});\n</script>\n</body>\n</html>';
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  console.log('Created: ' + t.slug);
});

// Update tools index
var toolsList = fs.readdirSync(TOOLS).filter(function(f) { return fs.statSync(path.join(TOOLS, f)).isDirectory(); });
var html = '<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width,initial-scale=1.0">\n<title>Free Online Tools - AgentPro</title>\n<meta name="description" content="' + toolsList.length + ' free online tools. USDT TRC-20 verifier, GEO checker, schema generator, JSON formatter, and more.">\n<meta name="robots" content="index, follow">\n<link rel="canonical" href="' + SITE + '/tools/">\n<style>' + CSS + '.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:12px;margin:24px 0}.card{background:#16162a;border:1px solid #2a2a4a;border-radius:12px;padding:20px;text-decoration:none;color:#e0e0e0;display:block}.card:hover{border-color:#f472b6}.card h3{font-size:1rem;color:#fff;margin:0 0 6px}.card p{font-size:.8rem;color:#666;margin:0}</style>\n</head>\n<body>\n<div class="wrap">\n<h1>Free Online Tools</h1>\n<p class="sub">' + toolsList.length + ' free online tools for developers, content creators, and SEO professionals.</p>\n<div class="grid">\n';
toolsList.sort().forEach(function(slug) {
  var content = fs.readFileSync(path.join(TOOLS, slug, 'index.html'), 'utf8');
  var title = (content.match(/<title>([^<]+)<\/title>/) || [,'Tool'])[1];
  var desc = (content.match(/<meta name="description" content="([^"]+)">/) || [,''])[1];
  html += '<a class="card" href="/tools/' + slug + '/"><h3>' + title + '</h3><p>' + desc + '</p></a>\n';
});
html += '</div>\n<p class="meta">Need more tools? Check our <a href="' + STORE + '">store</a> for premium products.</p>\n</div>\n<div class="footer">\n<p>&copy; 2026 AgentPro | <a href="' + SITE + '">Home</a> | <a href="' + SITE + '/tools/">Tools</a> | <a href="' + STORE + '">Store</a> | USDT (TRC-20): TRnz5Pi8R3hjCbBjnDuZo7ZvR57euo2q8Z</p>\n</div>\n</body>\n</html>';
fs.writeFileSync(path.join(TOOLS, '..', 'tools', 'index.html'), html);
console.log('Tools index updated. Total: ' + toolsList.length + ' tools');
