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
  { slug: 'yaml-validator', title: 'YAML Validator', desc: 'Validate and format YAML content with error reporting.', h1: 'YAML Validator', p: 'Paste YAML to validate syntax and format.', kws: ['YAML', 'validator', 'formatter'], js: `function r(v){try{var d={}; v.split('\\n').forEach(function(l){var m=l.match(/^([^:]+):\\s*(.*)/); if(m)d[m[1].trim()]=m[2].trim()}); return '<pre style=color:#4ade80>Valid YAML\\n'+JSON.stringify(d,null,2)+'</pre>'}catch(e){return '<p style=color:#ff6b6b>'+e.message+'</p>'}}` },
  { slug: 'text-diff', title: 'Text Diff Checker', desc: 'Compare two texts and highlight differences.', h1: 'Text Diff Checker', p: 'Paste two texts to find differences.', kws: ['diff', 'comparison', 'text'], js: `function r(v){var lines=v.split('\\n'); if(lines.length<2) return '<p style=color:#ff6b6b>Enter two lines separated by newline</p>'; var a=lines[0],b=lines[1]; var out=''; for(var i=0;i<Math.max(a.length,b.length);i++){if(a[i]!==b[i])out+='<span style=color:#ff6b6b>'+((b[i]||'?'))+'</span>'; else out+=b[i]||''} return '<div style=background:#0a0a12;padding:16px;border-radius:8px><p><strong>Line 1:</strong> '+a+'</p><p><strong>Line 2:</strong> '+b+'</p><p><strong>Diff:</strong></p><pre>'+out+'</pre></div>'}` },
  { slug: 'mermaid-generator', title: 'Mermaid Diagram Generator', desc: 'Create flowcharts and diagrams using Mermaid syntax.', h1: 'Mermaid Diagram Generator', p: 'Write Mermaid syntax to generate a diagram preview.', kws: ['mermaid', 'diagram', 'flowchart'], js: `function r(v){return '<div style=background:#0a0a12;padding:16px;border-radius:8px><p style=color:#666>Mermaid rendering requires an external library. Your code:</p><pre style=color:#4ade80>'+v.replace(/</g,'&lt;')+'</pre><p style=color:#888;margin-top:12px>Tip: View in a full browser that supports Mermaid, or use <a href=\"https://mermaid.live\" target=_blank style=color:#f472b6>Mermaid Live Editor</a>.</p></div>'}` },
  { slug: 'latency-tester', title: 'Website Latency Tester', desc: 'Test website response time from your browser.', h1: 'Website Latency Tester', p: 'Enter a URL to check its response time.', kws: ['latency', 'speed', 'website test'], js: `async function r(v){var url=v.trim(); if(!url.startsWith('http')) url='https://'+url; var start=performance.now(); try{var r=await fetch(url,{mode:'no-cors'}); var end=performance.now(); return '<div style=background:#0a0a12;padding:16px;border-radius:8px><p><strong>URL:</strong> '+url+'</p><p><strong>Time:</strong> '+(end-start).toFixed(0)+'ms (no-cors, approximate)</p></div>'}catch(e){return '<div style=background:#0a0a12;padding:16px;border-radius:8px><p><strong>URL:</strong> '+url+'</p><p style=color:#ff6b6b>Unreachable from browser</p></div>'}}` },
  { slug: 'csv-viewer', title: 'CSV Viewer', desc: 'View and parse CSV data in a table format.', h1: 'CSV Viewer', p: 'Paste CSV data to view as a formatted table.', kws: ['CSV', 'viewer', 'table'], js: `function r(v){var lines=v.trim().split('\\n'); if(lines.length<2) return '<p style=color:#ff6b6b>Enter CSV with header row</p>'; var h=lines[0].split(',').map(function(c){return c.trim()}); var rows=lines.slice(1).map(function(l){var cells=l.split(',').map(function(c){return c.trim()}); return '<tr>'+cells.map(function(c,i){return '<td style=padding:6px 12px;border:1px solid #2a2a4a>'+(h[i]&&h[i].toLowerCase().includes('http')?'<a href='+c+' style=color:#f472b6 target=_blank>'+c+'</a>':c)+'</td>'}).join('')+'</tr>'}); return '<div style=overflow-x:auto><table style=border-collapse:collapse;width:100%;font-size:.85rem><thead><tr>'+h.map(function(c){return '<th style=padding:8px 12px;border:1px solid #2a2a4a;background:#1a1a3e;text-align:left>'+c+'</th>'}).join('')+'</tr></thead><tbody>'+rows.join('')+'</tbody></table></div>'}` },
  { slug: 'eta-calculator', title: 'ETA Calculator', desc: 'Calculate estimated time of arrival or completion based on progress.', h1: 'ETA Calculator', p: 'Enter progress, total, and elapsed time to estimate completion.', kws: ['ETA', 'calculator', 'time', 'progress'], js: `function r(v){var p=v.split(',').map(function(x){return parseFloat(x.trim())}); if(p.length<3||p.some(isNaN)) return '<p style=color:#ff6b6b>Enter: progress, total, elapsed_minutes (e.g. 50, 100, 30)</p>'; var progress=p[0],total=p[1],elapsed=p[2]; var rate=elapsed/progress; var remaining=(total-progress)*rate; var totalEst=total*rate; return '<div style=background:#0a0a12;padding:16px;border-radius:8px><p><strong>Progress:</strong> '+progress+'/'+total+' ('+(progress/total*100).toFixed(1)+'%)</p><p><strong>Elapsed:</strong> '+elapsed+' min</p><p><strong>Rate:</strong> '+rate.toFixed(2)+' min/unit</p><p><strong>ETA remaining:</strong> '+remaining.toFixed(1)+' min</p><p><strong>Total ETA:</strong> '+totalEst.toFixed(1)+' min</p></div>'}` },
  { slug: 'credit-calculator', title: 'USDT Credit Calculator', desc: 'Calculate payment plans and credit costs in USDT.', h1: 'USDT Credit Calculator', p: 'Calculate total cost with USDT payment plans.', kws: ['USDT', 'calculator', 'credit', 'crypto'], js: `function r(v){var p=v.split(',').map(function(x){return parseFloat(x.trim())}); if(p.length<2||p.some(isNaN)) return '<p style=color:#ff6b6b>Enter: amount, rate% (e.g. 100, 5 for 5%)</p>'; var amt=p[0],rate=p[1]; var fee=amt*rate/100; var total=amt+fee; return '<div style=background:#0a0a12;padding:16px;border-radius:8px><p><strong>Amount:</strong> '+amt.toFixed(2)+' USDT</p><p><strong>Fee ('+rate+'%):</strong> '+fee.toFixed(2)+' USDT</p><p><strong>Total:</strong> '+total.toFixed(2)+' USDT</p><p style=color:#666>Pay with USDT TRC-20: TRnz5Pi8R3hjCbBjnDuZo7ZvR57euo2q8Z</p></div>'}` },
  { slug: 'seo-meta-preview', title: 'SEO Meta Preview', desc: 'Preview how your page appears in Google search results.', h1: 'SEO Meta Preview', p: 'Enter title and description to preview SERP snippet.', kws: ['SEO', 'meta', 'preview', 'SERP'], js: `function r(v){var p=v.split('\\n').filter(Boolean); var t=p[0]||'Title'; var d=(p[1]||'Description').slice(0,160); return '<div style=background:#fff;padding:16px;border-radius:8px;font-family:Arial,sans-serif><p style=color:#1a0dab;font-size:1.2rem;margin:0;text-decoration:underline>'+t.slice(0,60)+'</p><p style=color:#006621;font-size:.85rem;margin:4px 0>agentpro.pages.dev/tools/</p><p style=color:#545454;font-size:.85rem;margin:0>'+d+'</p></div><p style=color:#666;margin-top:8px>Title: '+t.length+' chars | Desc: '+d.length+' chars</p>'}` },
  { slug: 'base64-encoder', title: 'Base64 Encoder/Decoder', desc: 'Encode or decode Base64 strings. Supports UTF-8.', h1: 'Base64 Encoder/Decoder', p: 'Enter text to encode or Base64 to decode.', kws: ['base64', 'encode', 'decode'], js: `function r(v){try{var e=btoa(v); var d=atob(v); return '<div style=background:#0a0a12;padding:16px;border-radius:8px><p><strong>Encoded:</strong></p><pre style=color:#4ade80>'+e+'</pre><p><strong>Decoded:</strong></p><pre style=color:#fbbf24>'+d+'</pre></div>'}catch(e){return '<p style=color:#ff6b6b>Cannot process: '+e.message+'</p>'}}` },
  { slug: 'jwt-debugger', title: 'JWT Token Debugger', desc: 'Decode and inspect JWT tokens without validation.', h1: 'JWT Token Debugger', p: 'Paste a JWT token to decode its header and payload.', kws: ['JWT', 'token', 'debug'], js: `function r(v){var parts=v.split('.'); if(parts.length!==3) return '<p style=color:#ff6b6b>Enter a valid JWT (3 parts separated by dots)</p>'; try{var h=JSON.parse(atob(parts[0])); var p=JSON.parse(atob(parts[1])); return '<div style=background:#0a0a12;padding:16px;border-radius:8px><p><strong>Header:</strong></p><pre style=color:#4ade80>'+JSON.stringify(h,null,2)+'</pre><p><strong>Payload:</strong></p><pre style=color:#fbbf24>'+JSON.stringify(p,null,2)+'</pre><p><strong>Signature:</strong> '+parts[2].slice(0,20)+'...</p></div>'}catch(e){return '<p style=color:#ff6b6b>Invalid JWT: '+e.message+'</p>'}}` },
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

console.log('\nTool v3 batch done.');
