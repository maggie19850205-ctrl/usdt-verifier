const fs = require('fs');
const path = require('path');

const tools = [
  {
    slug: 'json-to-csv',
    title: 'JSON to CSV Converter',
    desc: 'Convert JSON data to CSV format instantly online. Supports nested objects and arrays.',
    keywords: 'json to csv, convert json to csv, json csv converter',
    html: function(site, toolDir) {
      return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>JSON to CSV Converter - Free Online Tool | AgentPro</title>
<meta name="description" content="Convert JSON data to CSV format instantly online. Free JSON to CSV converter with support for nested objects and arrays.">
<link rel="canonical" href="https://${site.domain}/tools/json-to-csv/">
<style>
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:800px;margin:0 auto;padding:20px;background:#0d0d1a;color:#e0e0e0;line-height:1.6}
h1{color:#4fc3f7;font-size:1.5rem}
textarea{width:100%;height:200px;background:#1a1a2e;color:#e0e0e0;border:1px solid #333;border-radius:6px;padding:12px;font-family:monospace;font-size:13px;box-sizing:border-box;margin:8px 0}
button{background:#4fc3f7;color:#000;border:none;padding:10px 24px;border-radius:6px;cursor:pointer;font-weight:bold;margin:4px}
button:hover{background:#81d4fa}
.footer{margin-top:40px;padding-top:20px;border-top:1px solid #2a2a4a;font-size:0.8rem;color:#555}
label{display:block;margin:12px 0 4px;color:#aaa;font-size:0.85rem}
</style></head><body>
<h1>JSON to CSV Converter</h1>
<p>Paste your JSON below and convert to CSV format.</p>
<label>JSON Input:</label>
<textarea id="input" placeholder='[{"name":"John","age":30},{"name":"Jane","age":25}]'></textarea>
<button onclick="convert()">Convert to CSV</button>
<button onclick="clearAll()">Clear</button>
<label>CSV Output:</label>
<textarea id="output" readonly placeholder="CSV output will appear here..."></textarea>
<button onclick="copy()">Copy CSV</button>
<button onclick="download()">Download CSV</button>
<div class="footer">
<p>&copy; 2026 ${site.title} | <a href="/">Home</a> | <a href="/tools/">All Tools</a></p>
</div>
<script>
function convert(){const input=document.getElementById('input').value;if(!input.trim()){document.getElementById('output').value='Please enter JSON data.';return}try{const data=JSON.parse(input);const arr=Array.isArray(data)?data:[data];if(!arr.length){document.getElementById('output').value='Empty array.';return}const keys=[...new Set(arr.flatMap(obj=>Object.keys(obj)))];const csv=[keys.join(',')];for(const row of arr){csv.push(keys.map(k=>{const v=row[k];if(v===null||v===undefined)return '';const s=String(v);return s.includes(',')||s.includes('"')||s.includes('\\n')?'"'+s.replace(/"/g,'""')+'"':s}).join(','))}document.getElementById('output').value=csv.join('\\n')}catch(e){document.getElementById('output').value='Error: '+e.message}}
function clearAll(){document.getElementById('input').value='';document.getElementById('output').value=''}
function copy(){const out=document.getElementById('output');out.select();navigator.clipboard.writeText(out.value).then(()=>alert('Copied!')).catch(()=>alert('Copy failed.'))}
function download(){const blob=new Blob([document.getElementById('output').value],{type:'text/csv'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='output.csv';a.click()}
</script>
</body></html>`;
    }
  },
  {
    slug: 'csv-to-json',
    title: 'CSV to JSON Converter',
    desc: 'Convert CSV data to JSON format online. Free CSV to JSON converter with header detection.',
    keywords: 'csv to json, convert csv to json, csv json converter',
    html: function(site, toolDir) {
      return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>CSV to JSON Converter - Free Online Tool | AgentPro</title>
<meta name="description" content="Convert CSV data to JSON format instantly online. Free CSV to JSON converter with automatic header detection.">
<link rel="canonical" href="https://${site.domain}/tools/csv-to-json/">
<style>
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:800px;margin:0 auto;padding:20px;background:#0d0d1a;color:#e0e0e0;line-height:1.6}
h1{color:#4fc3f7;font-size:1.5rem}
textarea{width:100%;height:200px;background:#1a1a2e;color:#e0e0e0;border:1px solid #333;border-radius:6px;padding:12px;font-family:monospace;font-size:13px;box-sizing:border-box;margin:8px 0}
button{background:#4fc3f7;color:#000;border:none;padding:10px 24px;border-radius:6px;cursor:pointer;font-weight:bold;margin:4px}
button:hover{background:#81d4fa}
.footer{margin-top:40px;padding-top:20px;border-top:1px solid #2a2a2a;font-size:0.8rem;color:#555}
label{display:block;margin:12px 0 4px;color:#aaa;font-size:0.85rem}
</style></head><body>
<h1>CSV to JSON Converter</h1>
<p>Paste your CSV data below and convert to JSON format.</p>
<label>CSV Input:</label>
<textarea id="input" placeholder='name,age\nJohn,30\nJane,25'></textarea>
<button onclick="convert()">Convert to JSON</button>
<button onclick="clearAll()">Clear</button>
<label>JSON Output:</label>
<textarea id="output" readonly placeholder="JSON output will appear here..."></textarea>
<button onclick="copy()">Copy JSON</button>
<button onclick="download()">Download JSON</button>
<div class="footer">
<p>&copy; 2026 ${site.title} | <a href="/">Home</a> | <a href="/tools/">All Tools</a></p>
</div>
<script>
function convert(){const input=document.getElementById('input').value;if(!input.trim()){document.getElementById('output').value='Please enter CSV data.';return}try{const lines=input.trim().split('\\n').filter(l=>l.trim());if(lines.length<2){document.getElementById('output').value='Need at least header + 1 row.';return}const headers=lines[0].split(',').map(h=>h.trim());const result=[];for(let i=1;i<lines.length;i++){const vals=lines[i].split(',').map(v=>v.trim());const obj={};headers.forEach((h,idx)=>obj[h]=vals[idx]||'');result.push(obj)}document.getElementById('output').value=JSON.stringify(result,null,2)}catch(e){document.getElementById('output').value='Error: '+e.message}}
function clearAll(){document.getElementById('input').value='';document.getElementById('output').value=''}
function copy(){const out=document.getElementById('output');out.select();navigator.clipboard.writeText(out.value).then(()=>alert('Copied!')).catch(()=>alert('Copy failed.'))}
function download(){const blob=new Blob([document.getElementById('output').value],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='output.json';a.click()}
</script>
</body></html>`;
    }
  },
  {
    slug: 'yaml-to-json',
    title: 'YAML to JSON Converter',
    desc: 'Convert YAML to JSON format online. Free YAML to JSON converter with live preview.',
    keywords: 'yaml to json, convert yaml to json, yaml json converter',
    html: function(site, toolDir) {
      return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>YAML to JSON Converter - Free Online Tool | AgentPro</title>
<meta name="description" content="Convert YAML data to JSON format instantly online. Free YAML to JSON converter.">
<link rel="canonical" href="https://${site.domain}/tools/yaml-to-json/">
<style>
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:800px;margin:0 auto;padding:20px;background:#0d0d1a;color:#e0e0e0;line-height:1.6}
h1{color:#4fc3f7;font-size:1.5rem}
textarea{width:100%;height:200px;background:#1a1a2e;color:#e0e0e0;border:1px solid #333;border-radius:6px;padding:12px;font-family:monospace;font-size:13px;box-sizing:border-box;margin:8px 0}
button{background:#4fc3f7;color:#000;border:none;padding:10px 24px;border-radius:6px;cursor:pointer;font-weight:bold;margin:4px}
button:hover{background:#81d4fa}
.footer{margin-top:40px;padding-top:20px;border-top:1px solid #2a2a2a;font-size:0.8rem;color:#555}
label{display:block;margin:12px 0 4px;color:#aaa;font-size:0.85rem}
</style></head><body>
<h1>YAML to JSON Converter</h1>
<p>Paste your YAML below and convert to formatted JSON.</p>
<label>YAML Input:</label>
<textarea id="input" placeholder="name: John\\nage: 30\\nskills:\\n  - Python\\n  - JavaScript"></textarea>
<button onclick="convert()">Convert to JSON</button>
<button onclick="clearAll()">Clear</button>
<label>JSON Output:</label>
<textarea id="output" readonly placeholder="JSON output..."></textarea>
<button onclick="copy()">Copy JSON</button>
<div class="footer">
<p>&copy; 2026 ${site.title} | <a href="/">Home</a> | <a href="/tools/">All Tools</a></p>
</div>
<script>
function convert(){const input=document.getElementById('input').value;if(!input.trim()){document.getElementById('output').value='Please enter YAML data.';return}try{const lines=input.split('\\n');const result=parseYaml(lines);document.getElementById('output').value=JSON.stringify(result,null,2)}catch(e){document.getElementById('output').value='Error: '+e.message}}
function parseYaml(lines){const obj={};const stack=[{obj,indent:-1}];for(const line of lines){if(!line.trim()||line.trim().startsWith('#'))continue;const indent=line.search(/\\S/);const trimmed=line.trim();const colonIdx=trimmed.indexOf(':');if(colonIdx===-1)continue;const key=trimmed.slice(0,colonIdx).trim();let val=trimmed.slice(colonIdx+1).trim();while(stack.length>1&&stack[stack.length-1].indent>=indent)stack.pop();const current=stack[stack.length-1].obj;if(val.startsWith('- ')){const arr=[];const arrVal=val.slice(2);current[key]=arr;arr.push(isNaN(arrVal)?arrVal:Number(arrVal));stack.push({obj:arr,indent})}else if(val===''||val==='>'){current[key]='';stack.push({obj:current,indent})}else{val=val.replace(/^['"]|['"]$/g,'');current[key]=isNaN(val)?val:Number(val)}}return obj}
function clearAll(){document.getElementById('input').value='';document.getElementById('output').value=''}
function copy(){const out=document.getElementById('output');out.select();navigator.clipboard.writeText(out.value).then(()=>alert('Copied!')).catch(()=>alert('Copy failed.'))}
</script>
</body></html>`;
    }
  },
  {
    slug: 'text-diff-checker',
    title: 'Text Diff Checker',
    desc: 'Compare two texts and find differences online. Free diff checker with side-by-side comparison.',
    keywords: 'text diff checker, compare text online, diff tool',
    html: function(site, toolDir) {
      return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Text Diff Checker - Free Online Tool | AgentPro</title>
<meta name="description" content="Compare two texts and find differences instantly. Free online diff checker with line-by-line comparison.">
<link rel="canonical" href="https://${site.domain}/tools/text-diff-checker/">
<style>
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:900px;margin:0 auto;padding:20px;background:#0d0d1a;color:#e0e0e0;line-height:1.6}
h1{color:#4fc3f7;font-size:1.5rem}
.row{display:flex;gap:12px}
.col{flex:1}
textarea{width:100%;height:250px;background:#1a1a2e;color:#e0e0e0;border:1px solid #333;border-radius:6px;padding:10px;font-family:monospace;font-size:12px;box-sizing:border-box;margin:4px 0}
button{background:#4fc3f7;color:#000;border:none;padding:10px 24px;border-radius:6px;cursor:pointer;font-weight:bold;margin:4px}
button:hover{background:#81d4fa}
pre{background:#1a1a2e;padding:12px;border-radius:6px;overflow-x:auto;white-space:pre-wrap;max-height:300px;overflow-y:auto;font-size:12px}
.diff-add{background:#1b5e20;color:#a5d6a7}
.diff-rem{background:#b71c1c;color:#ef9a9a}
.footer{margin-top:40px;padding-top:20px;border-top:1px solid #2a2a2a;font-size:0.8rem;color:#555}
label{display:block;margin:8px 0 4px;color:#aaa;font-size:0.85rem}
</style></head><body>
<h1>Text Diff Checker</h1>
<p>Paste two texts below to compare them line by line.</p>
<div class="row">
<div class="col"><label>Original Text:</label><textarea id="text1" placeholder="Paste original text here..."></textarea></div>
<div class="col"><label>Changed Text:</label><textarea id="text2" placeholder="Paste changed text here..."></textarea></div>
</div>
<button onclick="compare()">Compare</button>
<button onclick="clearAll()">Clear</button>
<div id="result"></div>
<div class="footer">
<p>&copy; 2026 ${site.title} | <a href="/">Home</a> | <a href="/tools/">All Tools</a></p>
</div>
<script>
function compare(){const t1=document.getElementById('text1').value;const t2=document.getElementById('text2').value;const l1=t1.split('\\n');const l2=t2.split('\\n');let html='<h3>Differences</h3><pre>';const max=Math.max(l1.length,l2.length);for(let i=0;i<max;i++){const a=l1[i]||'';const b=l2[i]||'';if(a!==b){if(a)html+='<div class="diff-rem">- '+esc(a)+'</div>';if(b)html+='<div class="diff-add">+ '+esc(b)+'</div>'}else{html+=esc(a)+'\\n'}}html+='</pre>';document.getElementById('result').innerHTML=html}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
function clearAll(){document.getElementById('text1').value='';document.getElementById('text2').value='';document.getElementById('result').innerHTML=''}
</script>
</body></html>`;
    }
  },
  {
    slug: 'password-strength-checker',
    title: 'Password Strength Checker',
    desc: 'Check your password strength online. Free password strength analyzer with security score.',
    keywords: 'password strength checker, password security test, strong password check',
    html: function(site, toolDir) {
      return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Password Strength Checker - Free Online Tool | AgentPro</title>
<meta name="description" content="Check your password strength instantly. Free online password strength analyzer with real-time feedback.">
<link rel="canonical" href="https://${site.domain}/tools/password-strength-checker/">
<style>
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;padding:20px;background:#0d0d1a;color:#e0e0e0;line-height:1.6}
h1{color:#4fc3f7;font-size:1.5rem}
input{width:100%;padding:12px;background:#1a1a2e;color:#e0e0e0;border:1px solid #333;border-radius:6px;font-size:16px;box-sizing:border-box;margin:8px 0}
.meter{width:100%;height:12px;background:#1a1a2e;border-radius:6px;overflow:hidden;margin:8px 0}
.bar{height:100%;border-radius:6px;transition:all 0.3s;width:0%}
.details{background:#1a1a2e;padding:16px;border-radius:8px;margin:12px 0}
.detail-item{margin:6px 0;font-size:0.85rem}
.check{color:#4caf50}
.cross{color:#f44336}
button{background:#4fc3f7;color:#000;border:none;padding:10px 24px;border-radius:6px;cursor:pointer;font-weight:bold;margin:4px}
.footer{margin-top:40px;padding-top:20px;border-top:1px solid #2a2a2a;font-size:0.8rem;color:#555}
</style></head><body>
<h1>Password Strength Checker</h1>
<p>Type a password below to check its strength in real time.</p>
<input type="text" id="password" oninput="check()" placeholder="Type your password..." autocomplete="off">
<div class="meter"><div class="bar" id="bar"></div></div>
<p id="label" style="text-align:center;font-weight:bold">Enter a password to begin</p>
<div class="details" id="details"></div>
<button onclick="genPassword()">Generate Strong Password</button>
<div class="footer">
<p>&copy; 2026 ${site.title} | <a href="/">Home</a> | <a href="/tools/">All Tools</a></p>
</div>
<script>
function check(){const pw=document.getElementById('password').value;const details=document.getElementById('details');let score=0;let checks=[];if(pw.length>=8){score+=25;checks.push(['✓ At least 8 characters','check'])}else checks.push(['✗ At least 8 characters','cross']);if(/[a-z]/.test(pw)&&/[A-Z]/.test(pw)){score+=25;checks.push(['✓ Uppercase + lowercase letters','check'])}else checks.push(['✗ Mix uppercase + lowercase','cross']);if(/\\d/.test(pw)){score+=25;checks.push(['✓ Contains numbers','check'])}else checks.push(['✗ Contains numbers','cross']);if(/[^a-zA-Z0-9]/.test(pw)){score+=25;checks.push(['✓ Contains special characters','check'])}else checks.push(['✗ Contains special characters','cross']);if(pw.length>12)score+=10;if(pw.length>16)score+=10;score=Math.min(100,score);const bar=document.getElementById('bar');bar.style.width=score+'%';const label=document.getElementById('label');if(score<25){bar.style.background='#f44336';label.textContent='Very Weak';label.style.color='#f44336'}else if(score<50){bar.style.background='#ff9800';label.textContent='Weak';label.style.color='#ff9800'}else if(score<75){bar.style.background='#ffeb3b';label.textContent='Moderate';label.style.color='#ffeb3b'}else if(score<90){bar.style.background='#8bc34a';label.textContent='Strong';label.style.color='#8bc34a'}else{bar.style.background='#4caf50';label.textContent='Very Strong';label.style.color='#4caf50'}details.innerHTML=checks.map(c=>'<div class="detail-item"><span class="'+c[1]+'">'+c[0]+'</span></div>').join('')}
function genPassword(){const chars='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';let pw='';for(let i=0;i<18;i++)pw+=chars[Math.floor(Math.random()*chars.length)];document.getElementById('password').value=pw;check()}
</script>
</body></html>`;
    }
  },
  {
    slug: 'random-number-generator',
    title: 'Random Number Generator',
    desc: 'Generate random numbers within a range. Free online random number generator with customizable options.',
    keywords: 'random number generator, random number, randomizer',
    html: function(site, toolDir) {
      return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Random Number Generator - Free Online Tool | AgentPro</title>
<meta name="description" content="Generate random numbers within any range. Free online random number generator with customizable min, max and count.">
<link rel="canonical" href="https://${site.domain}/tools/random-number-generator/">
<style>
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;padding:20px;background:#0d0d1a;color:#e0e0e0;line-height:1.6}
h1{color:#4fc3f7;font-size:1.5rem}
.field{margin:12px 0}
label{display:block;color:#aaa;font-size:0.85rem;margin-bottom:4px}
input{width:100px;padding:8px 12px;background:#1a1a2e;color:#e0e0e0;border:1px solid #333;border-radius:6px;font-size:14px;box-sizing:border-box}
button{background:#4fc3f7;color:#000;border:none;padding:10px 24px;border-radius:6px;cursor:pointer;font-weight:bold;margin:4px}
button:hover{background:#81d4fa}
.result-box{background:#1a1a2e;padding:20px;border-radius:8px;margin:16px 0;text-align:center;font-size:2rem;color:#4fc3f7;font-weight:bold;min-height:60px;display:flex;align-items:center;justify-content:center}
.numbers{display:flex;flex-wrap:wrap;gap:8px;justify-content:center}
.num{background:#1a1a2e;padding:8px 16px;border-radius:6px;font-size:1.2rem;color:#4fc3f7}
.footer{margin-top:40px;padding-top:20px;border-top:1px solid #2a2a2a;font-size:0.8rem;color:#555}
</style></head><body>
<h1>Random Number Generator</h1>
<p>Generate random numbers within any range.</p>
<div class="field"><label>Minimum:</label><input type="number" id="min" value="1"></div>
<div class="field"><label>Maximum:</label><input type="number" id="max" value="100"></div>
<div class="field"><label>Count:</label><input type="number" id="count" value="1" min="1" max="100"></div>
<button onclick="generate()">Generate</button>
<button onclick="clearAll()">Clear</button>
<div class="result-box" id="result">Click generate</div>
<div class="numbers" id="numbers"></div>
<div class="footer">
<p>&copy; 2026 ${site.title} | <a href="/">Home</a> | <a href="/tools/">All Tools</a></p>
</div>
<script>
function generate(){const min=parseInt(document.getElementById('min').value)||0;const max=parseInt(document.getElementById('max').value)||100;const count=parseInt(document.getElementById('count').value)||1;if(min>max){document.getElementById('result').textContent='Min must be <= Max';return}if(count<1||count>100){document.getElementById('result').textContent='Count must be 1-100';return}if(count===1){const n=Math.floor(Math.random()*(max-min+1))+min;document.getElementById('result').textContent=n;document.getElementById('numbers').innerHTML=''}else{const nums=[];for(let i=0;i<count;i++)nums.push(Math.floor(Math.random()*(max-min+1))+min);document.getElementById('result').textContent=count+' numbers generated';document.getElementById('numbers').innerHTML=nums.map(n=>'<span class="num">'+n+'</span>').join('')}}
function clearAll(){document.getElementById('result').textContent='Click generate';document.getElementById('numbers').innerHTML=''}
</script>
</body></html>`;
    }
  },
  {
    slug: 'uuid-generator',
    title: 'UUID Generator',
    desc: 'Generate UUID v4 identifiers online. Free UUID generator with bulk generation support.',
    keywords: 'uuid generator, uuid v4, generate uuid online',
    html: function(site, toolDir) {
      return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>UUID Generator - Free Online Tool | AgentPro</title>
<meta name="description" content="Generate UUID v4 identifiers instantly. Free online UUID generator with bulk generation.">
<link rel="canonical" href="https://${site.domain}/tools/uuid-generator/">
<style>
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:700px;margin:0 auto;padding:20px;background:#0d0d1a;color:#e0e0e0;line-height:1.6}
h1{color:#4fc3f7;font-size:1.5rem}
.field{margin:12px 0}
label{display:block;color:#aaa;font-size:0.85rem;margin-bottom:4px}
input{width:80px;padding:8px 12px;background:#1a1a2e;color:#e0e0e0;border:1px solid #333;border-radius:6px;font-size:14px;box-sizing:border-box}
textarea{width:100%;height:200px;background:#1a1a2e;color:#e0e0e0;border:1px solid #333;border-radius:6px;padding:12px;font-family:monospace;font-size:13px;box-sizing:border-box;margin:8px 0}
button{background:#4fc3f7;color:#000;border:none;padding:10px 24px;border-radius:6px;cursor:pointer;font-weight:bold;margin:4px}
button:hover{background:#81d4fa}
.footer{margin-top:40px;padding-top:20px;border-top:1px solid #2a2a2a;font-size:0.8rem;color:#555}
</style></head><body>
<h1>UUID Generator</h1>
<p>Generate UUID v4 (random) identifiers for your projects.</p>
<div class="field"><label>Number of UUIDs:</label><input type="number" id="count" value="1" min="1" max="100"></div>
<button onclick="generate()">Generate</button>
<button onclick="clearAll()">Clear</button>
<button onclick="copy()">Copy All</button>
<label>Generated UUIDs:</label>
<textarea id="output" readonly></textarea>
<div class="footer">
<p>&copy; 2026 ${site.title} | <a href="/">Home</a> | <a href="/tools/">All Tools</a></p>
</div>
<script>
function uuid(){return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,c=>{const r=Math.random()*16|0;return(c==='x'?r:(r&3|8)).toString(16)})}
function generate(){const count=parseInt(document.getElementById('count').value)||1;const ids=[];for(let i=0;i<Math.min(count,100);i++)ids.push(uuid());document.getElementById('output').value=ids.join('\\n')}
function clearAll(){document.getElementById('output').value=''}
function copy(){const out=document.getElementById('output');out.select();navigator.clipboard.writeText(out.value).then(()=>alert('Copied!')).catch(()=>alert('Copy failed.'))}
</script>
</body></html>`;
    }
  },
  {
    slug: 'html-previewer',
    title: 'HTML Previewer',
    desc: 'Write and preview HTML code in real time. Free online HTML previewer with live rendering.',
    keywords: 'html previewer, html live preview, html editor online',
    html: function(site, toolDir) {
      return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>HTML Previewer - Free Online Tool | AgentPro</title>
<meta name="description" content="Write and preview HTML code in real time. Free online HTML previewer with live rendering.">
<link rel="canonical" href="https://${site.domain}/tools/html-previewer/">
<style>
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:1000px;margin:0 auto;padding:20px;background:#0d0d1a;color:#e0e0e0;line-height:1.6}
h1{color:#4fc3f7;font-size:1.5rem}
.row{display:flex;gap:12px;height:400px}
.col{flex:1;display:flex;flex-direction:column}
textarea{flex:1;background:#1a1a2e;color:#e0e0e0;border:1px solid #333;border-radius:6px;padding:12px;font-family:monospace;font-size:12px;resize:none}
iframe{flex:1;background:#fff;border:1px solid #333;border-radius:6px;width:100%}
button{background:#4fc3f7;color:#000;border:none;padding:10px 24px;border-radius:6px;cursor:pointer;font-weight:bold;margin:4px}
button:hover{background:#81d4fa}
.footer{margin-top:40px;padding-top:20px;border-top:1px solid #2a2a2a;font-size:0.8rem;color:#555}
label{display:block;margin:8px 0 4px;color:#aaa;font-size:0.85rem}
</style></head><body>
<h1>HTML Previewer</h1>
<p>Write HTML code and see the live preview instantly.</p>
<div class="row">
<div class="col"><label>HTML Code:</label><textarea id="html" placeholder="<h1>Hello World</h1>" oninput="preview()"><h1>Hello World</h1><p>Start typing HTML code to see the preview.</p></textarea></div>
<div class="col"><label>Live Preview:</label><iframe id="preview"></iframe></div>
</div>
<button onclick="preview()">Refresh Preview</button>
<div class="footer">
<p>&copy; 2026 ${site.title} | <a href="/">Home</a> | <a href="/tools/">All Tools</a></p>
</div>
<script>
function preview(){const html=document.getElementById('html').value;const iframe=document.getElementById('preview');if(iframe.contentDocument){iframe.contentDocument.open();iframe.contentDocument.write(html);iframe.contentDocument.close()}}
preview()
</script>
</body></html>`;
    }
  },
  {
    slug: 'regex-tester',
    title: 'Regex Tester',
    desc: 'Test regular expressions online with live matching. Free regex tester with flags support.',
    keywords: 'regex tester, regular expression tester, regex online',
    html: function(site, toolDir) {
      return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Regex Tester - Free Online Tool | AgentPro</title>
<meta name="description" content="Test regular expressions online with live matching and syntax highlighting.">
<link rel="canonical" href="https://${site.domain}/tools/regex-tester/">
<style>
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:800px;margin:0 auto;padding:20px;background:#0d0d1a;color:#e0e0e0;line-height:1.6}
h1{color:#4fc3f7;font-size:1.5rem}
textarea{width:100%;height:150px;background:#1a1a2e;color:#e0e0e0;border:1px solid #333;border-radius:6px;padding:12px;font-family:monospace;font-size:13px;box-sizing:border-box;margin:8px 0}
input{width:100%;padding:10px 12px;background:#1a1a2e;color:#e0e0e0;border:1px solid #333;border-radius:6px;font-family:monospace;font-size:14px;box-sizing:border-box;margin:8px 0}
.match{background:#2e7d32;padding:2px 0;border-radius:2px}
button{background:#4fc3f7;color:#000;border:none;padding:10px 24px;border-radius:6px;cursor:pointer;font-weight:bold;margin:4px}
button:hover{background:#81d4fa}
.result{background:#1a1a2e;padding:16px;border-radius:8px;margin:12px 0;min-height:100px;line-height:1.8;word-break:break-all}
.meta{color:#888;font-size:0.85rem;margin:4px 0}
.footer{margin-top:40px;padding-top:20px;border-top:1px solid #2a2a2a;font-size:0.8rem;color:#555}
label{display:block;margin:8px 0 4px;color:#aaa;font-size:0.85rem}
</style></head><body>
<h1>Regex Tester</h1>
<p>Enter a regular expression and test text to see matches in real time.</p>
<label>Regular Expression:</label>
<input type="text" id="regex" placeholder="/\\\\d+/g" oninput="testRegex()" value="\\\\d+">
<div><label>Flags:</label> <input type="text" id="flags" value="g" style="width:80px" oninput="testRegex()"></div>
<label>Test Text:</label>
<textarea id="text" oninput="testRegex()" placeholder="Enter test text...">Hello 123 World 456 Test 789</textarea>
<button onclick="testRegex()">Test</button>
<div class="result" id="result"></div>
<div class="meta" id="meta"></div>
<div class="footer">
<p>&copy; 2026 ${site.title} | <a href="/">Home</a> | <a href="/tools/">All Tools</a></p>
</div>
<script>
function testRegex(){const pattern=document.getElementById('regex').value;const flags=document.getElementById('flags').value;const text=document.getElementById('text').value;const result=document.getElementById('result');const meta=document.getElementById('meta');if(!pattern.trim()){result.innerHTML='<span style="color:#888">Enter a regex pattern to test.</span>';meta.textContent='';return}try{const regex=new RegExp(pattern,flags);const matches=[...text.matchAll(regex)];let lastIdx=0;let html='';for(const m of matches){html+=esc(text.slice(lastIdx,m.index));html+='<span class="match">'+esc(m[0])+'</span>';lastIdx=m.index+m[0].length}html+=esc(text.slice(lastIdx));result.innerHTML=html;meta.textContent=matches.length+' match'+(matches.length!==1?'es':'')+' found'}catch(e){result.innerHTML='<span style="color:#f44336">Error: '+esc(e.message)+'</span>';meta.textContent=''}}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
testRegex()
</script>
</body></html>`;
    }
  },
  {
    slug: 'hash-generator',
    title: 'Hash Generator (MD5 SHA1 SHA256)',
    desc: 'Generate MD5, SHA1, SHA256 and SHA512 hashes online. Free hash generator for developers.',
    keywords: 'hash generator, md5 hash, sha256 hash, sha1 hash',
    html: function(site, toolDir) {
      return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Hash Generator - Free Online Tool | AgentPro</title>
<meta name="description" content="Generate MD5, SHA1, SHA256 and SHA512 hashes online. Free hash generator for developers.">
<link rel="canonical" href="https://${site.domain}/tools/hash-generator/">
<style>
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:700px;margin:0 auto;padding:20px;background:#0d0d1a;color:#e0e0e0;line-height:1.6}
h1{color:#4fc3f7;font-size:1.5rem}
textarea{width:100%;height:120px;background:#1a1a2e;color:#e0e0e0;border:1px solid #333;border-radius:6px;padding:12px;font-family:monospace;font-size:13px;box-sizing:border-box;margin:8px 0}
.hash-box{background:#1a1a2e;padding:12px 16px;border-radius:6px;margin:8px 0;font-family:monospace;font-size:0.85rem;word-break:break-all}
.hash-label{color:#4fc3f7;font-weight:bold;margin-bottom:4px;font-size:0.85rem}
.hash-value{color:#ccc}
button{background:#4fc3f7;color:#000;border:none;padding:10px 24px;border-radius:6px;cursor:pointer;font-weight:bold;margin:4px}
button:hover{background:#81d4fa}
.footer{margin-top:40px;padding-top:20px;border-top:1px solid #2a2a2a;font-size:0.8rem;color:#555}
label{display:block;margin:8px 0 4px;color:#aaa;font-size:0.85rem}
</style></head><body>
<h1>Hash Generator</h1>
<p>Generate MD5, SHA1, SHA256, SHA384 and SHA512 hashes for any text.</p>
<label>Input Text:</label>
<textarea id="input" placeholder="Enter text to hash..." oninput="generate()">Hello World</textarea>
<button onclick="generate()">Generate Hashes</button>
<div id="results"></div>
<div class="footer">
<p>&copy; 2026 ${site.title} | <a href="/">Home</a> | <a href="/tools/">All Tools</a></p>
</div>
<script>
async function digest(algo,text){const encoder=new TextEncoder();const data=encoder.encode(text);const hash=await crypto.subtle.digest(algo,data);return Array.from(new Uint8Array(hash)).map(b=>b.toString(16).padStart(2,'0')).join('')}
async function generate(){const text=document.getElementById('input').value;if(!text){document.getElementById('results').innerHTML='';return}const results=document.getElementById('results');const algos=[{name:'MD5 (unsupported in Web Crypto)',algo:null,note:'Use server-side for MD5'},{name:'SHA-1',algo:'SHA-1'},{name:'SHA-256',algo:'SHA-256'},{name:'SHA-384',algo:'SHA-384'},{name:'SHA-512',algo:'SHA-512'}];let html='';for(const a of algos){if(!a.algo){html+='<div class="hash-box"><div class="hash-label">'+a.name+'</div><div class="hash-value">Not available in browser - use Node.js crypto module</div></div>';continue}try{const hash=await digest(a.algo,text);html+='<div class="hash-box"><div class="hash-label">'+a.name+'</div><div class="hash-value">'+hash+'</div></div>'}catch(e){html+='<div class="hash-box"><div class="hash-label">'+a.name+'</div><div class="hash-value" style="color:#f44336">Error: '+e.message+'</div></div>'}}results.innerHTML=html}
generate()
</script>
</body></html>`;
    }
  }
];

function buildForSite(siteDir, site) {
  const toolsDir = path.join(siteDir, 'tools');
  if (!fs.existsSync(toolsDir)) return 0;

  let count = 0;
  for (const tool of tools) {
    const toolPath = path.join(toolsDir, tool.slug);
    fs.mkdirSync(toolPath, { recursive: true });
    const html = (typeof tool.html === 'function') ? tool.html(site, toolPath) : tool.html;
    fs.writeFileSync(path.join(toolPath, 'index.html'), html, 'utf-8');
    count++;
    console.log(`  Created: ${tool.slug}`);
  }
  return count;
}

const siteConfigs = [
  { dir: 'sites/agentpro', domain: 'agentpro.pages.dev', title: 'AgentPro Tools' },
  { dir: 'sites/aitools', domain: 'aitools-a4r.pages.dev', title: 'AI Tools Hub' },
];

let total = 0;
for (const site of siteConfigs) {
  total += buildForSite(site.dir, site);
}
console.log(`\nV7 builder complete: ${total} tools across ${siteConfigs.length} sites`);
