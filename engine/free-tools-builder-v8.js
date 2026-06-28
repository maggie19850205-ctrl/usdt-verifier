const fs = require('fs');
const path = require('path');

const tools = [
  {
    slug: 'image-resizer',
    title: 'Image Resizer',
    desc: 'Resize images online to custom dimensions. Free image resizer tool for social media, web, and more.',
    category: 'image-tools',
    html: function(s) {
      return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Image Resizer - Free Online Tool | ${s.title}</title>
<meta name="description" content="Resize images online to exact dimensions. Free image resizer with quality control.">
<link rel="canonical" href="https://${s.domain}/tools/image-resizer/">
<style>body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:700px;margin:0 auto;padding:20px;background:#0d0d1a;color:#e0e0e0;line-height:1.6}h1{color:#4fc3f7;font-size:1.5rem}.row{display:flex;gap:16px;flex-wrap:wrap;margin:12px 0}.field{flex:1;min-width:120px}label{display:block;color:#aaa;font-size:.85rem;margin-bottom:4px}input{width:100%;padding:8px 12px;background:#1a1a2e;color:#e0e0e0;border:1px solid #333;border-radius:6px;box-sizing:border-box}button{background:#4fc3f7;color:#000;border:none;padding:10px 24px;border-radius:6px;cursor:pointer;font-weight:bold;margin:4px}button:hover{background:#81d4fa}canvas{display:none}img{max-width:100%;margin:12px 0;border-radius:6px}.footer{margin-top:40px;padding-top:20px;border-top:1px solid #2a2a2a;font-size:.8rem;color:#555}.footer a{color:#555}</style></head><body>
<h1>Image Resizer</h1>
<p>Upload an image and resize it to your desired dimensions.</p>
<input type="file" id="upload" accept="image/*" onchange="loadImage()">
<div class="row"><div class="field"><label>Width (px):</label><input type="number" id="width" value="800" min="1"></div><div class="field"><label>Height (px):</label><input type="number" id="height" value="600" min="1"></div><div class="field"><label>Quality (1-100):</label><input type="number" id="quality" value="90" min="1" max="100"></div></div>
<button onclick="resize()">Resize & Download</button>
<canvas id="canvas"></canvas>
<img id="preview" style="display:none">
<p id="status" style="color:#888;font-size:.85rem"></p>
<div class="footer"><p>&copy; 2026 ${s.title} | <a href="/">Home</a> | <a href="/tools/">All Tools</a></p></div>
<script>
function loadImage(){const file=document.getElementById('upload').files[0];if(!file)return;const reader=new FileReader();reader.onload=function(e){const img=new Image();img.onload=function(){const c=document.getElementById('canvas');c.width=img.naturalWidth;c.height=img.naturalHeight;c.getContext('2d').drawImage(img,0,0);document.getElementById('status').textContent='Loaded: '+img.naturalWidth+'x'+img.naturalHeight};img.src=e.target.result};reader.readAsDataURL(file)}
function resize(){const file=document.getElementById('upload').files[0];if(!file){document.getElementById('status').textContent='Please upload an image first';return}const w=parseInt(document.getElementById('width').value)||800;const h=parseInt(document.getElementById('height').value)||600;const q=parseInt(document.getElementById('quality').value)||90;const reader=new FileReader();reader.onload=function(e){const img=new Image();img.onload=function(){const c=document.getElementById('canvas');c.width=w;c.height=h;c.getContext('2d').drawImage(img,0,0,w,h);const data=c.toDataURL(file.type||'image/jpeg',q/100);const preview=document.getElementById('preview');preview.src=data;preview.style.display='block';const a=document.createElement('a');a.href=data;a.download='resized-'+w+'x'+h+'.'+file.name.split('.').pop();a.click();document.getElementById('status').textContent='Resized to '+w+'x'+h+', downloaded!'};img.src=e.target.result};reader.readAsDataURL(file)}
</script></body></html>`;
    }
  },
  {
    slug: 'text-to-speech',
    title: 'Text to Speech',
    desc: 'Convert text to speech online. Free TTS tool with multiple voice options and playback controls.',
    category: 'audio-tools',
    html: function(s) {
      return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Text to Speech - Free Online Tool | ${s.title}</title>
<meta name="description" content="Convert text to speech online for free. Text to speech tool with multiple voices and languages.">
<link rel="canonical" href="https://${s.domain}/tools/text-to-speech/">
<style>body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:700px;margin:0 auto;padding:20px;background:#0d0d1a;color:#e0e0e0;line-height:1.6}h1{color:#4fc3f7;font-size:1.5rem}textarea{width:100%;height:150px;background:#1a1a2e;color:#e0e0e0;border:1px solid #333;border-radius:6px;padding:12px;font-family:sans-serif;font-size:14px;box-sizing:border-box;margin:8px 0}select{width:100%;padding:10px;background:#1a1a2e;color:#e0e0e0;border:1px solid #333;border-radius:6px;margin:4px 0}button{background:#4fc3f7;color:#000;border:none;padding:10px 24px;border-radius:6px;cursor:pointer;font-weight:bold;margin:4px}button:hover{background:#81d4fa}button:disabled{opacity:.5;cursor:not-allowed}.footer{margin-top:40px;padding-top:20px;border-top:1px solid #2a2a2a;font-size:.8rem;color:#555}.footer a{color:#555}</style></head><body>
<h1>Text to Speech</h1>
<p>Type or paste text and listen to it spoken aloud using your browser's speech synthesis.</p>
<textarea id="text" placeholder="Enter text to speak...">Hello, welcome to AgentPro free online tools. This is a text to speech demo.</textarea>
<label style="color:#aaa;font-size:.85rem">Voice:</label>
<select id="voice"></select><br>
<button onclick="speak()">▶ Speak</button>
<button onclick="stop()">■ Stop</button>
<button onclick="pause()">❚❚ Pause</button>
<button onclick="resume()">▶ Resume</button>
<p id="status" style="color:#888;font-size:.85rem">Speak to begin</p>
<div class="footer"><p>&copy; 2026 ${s.title} | <a href="/">Home</a> | <a href="/tools/">All Tools</a></p></div>
<script>
let voices=[];let utter=null;
function loadVoices(){voices=speechSynthesis.getVoices();const sel=document.getElementById('voice');sel.innerHTML='';voices.forEach((v,i)=>{const o=document.createElement('option');o.value=i;o.textContent=v.name+' ('+v.lang+')';sel.appendChild(o)})}
loadVoices();speechSynthesis.onvoiceschanged=loadVoices;
function speak(){stop();const text=document.getElementById('text').value;if(!text.trim())return;utter=new SpeechSynthesisUtterance(text);const idx=parseInt(document.getElementById('voice').value);if(voices[idx])utter.voice=voices[idx];utter.onstart=()=>document.getElementById('status').textContent='Speaking...';utter.onend=()=>document.getElementById('status').textContent='Done';utter.onerror=()=>document.getElementById('status').textContent='Error';speechSynthesis.speak(utter)}
function stop(){speechSynthesis.cancel();document.getElementById('status').textContent='Stopped'}
function pause(){speechSynthesis.pause();document.getElementById('status').textContent='Paused'}
function resume(){speechSynthesis.resume();document.getElementById('status').textContent='Resumed'}
</script></body></html>`;
    }
  },
  {
    slug: 'unit-converter',
    title: 'Unit Converter',
    desc: 'Convert between units of length, weight, volume, and temperature. Free online unit converter.',
    category: 'converter-tools',
    html: function(s) {
      return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Unit Converter - Free Online Tool | ${s.title}</title>
<meta name="description" content="Convert between units of length, weight, volume, and temperature. Free online unit converter.">
<link rel="canonical" href="https://${s.domain}/tools/unit-converter/">
<style>body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:700px;margin:0 auto;padding:20px;background:#0d0d1a;color:#e0e0e0;line-height:1.6}h1{color:#4fc3f7;font-size:1.5rem}select,input{width:100%;padding:10px;background:#1a1a2e;color:#e0e0e0;border:1px solid #333;border-radius:6px;margin:4px 0;box-sizing:border-box}.row{display:flex;gap:12px}.col{flex:1}button{background:#4fc3f7;color:#000;border:none;padding:10px 24px;border-radius:6px;cursor:pointer;font-weight:bold;margin:4px}button:hover{background:#81d4fa}.result{background:#1a1a2e;padding:16px;border-radius:8px;margin:12px 0;font-size:1.3rem;text-align:center}label{color:#aaa;font-size:.85rem;display:block}.footer{margin-top:40px;padding-top:20px;border-top:1px solid #2a2a2a;font-size:.8rem;color:#555}.footer a{color:#555}</style></head><body>
<h1>Unit Converter</h1>
<p>Convert between different units of measurement.</p>
<label>Category:</label>
<select id="cat" onchange="updateUnits()">
<option value="length">Length</option><option value="weight">Weight</option><option value="volume">Volume</option><option value="speed">Speed</option>
</select>
<div class="row"><div class="col"><label>From:</label><select id="from"></select></div><div class="col"><label>To:</label><select id="to"></select></div></div>
<label>Value:</label><input type="number" id="val" value="1" step="any">
<button onclick="convert()">Convert</button>
<div class="result" id="result">1</div>
<div class="footer"><p>&copy; 2026 ${s.title} | <a href="/">Home</a> | <a href="/tools/">All Tools</a></p></div>
<script>
const units={length:['Meters','Kilometers','Miles','Feet','Inches','Centimeters','Millimeters'],weight:['Kilograms','Grams','Milligrams','Pounds','Ounces','Tons'],volume:['Liters','Milliliters','Gallons','Quarts','Cups','Fluid Ounces'],speed:['km/h','mph','m/s','knots']};
const rates={length:{Meters:1,Kilometers:0.001,Miles:0.000621371,Feet:3.28084,Inches:39.3701,Centimeters:100,Millimeters:1000},weight:{Kilograms:1,Grams:1000,Milligrams:1e6,Pounds:2.20462,Ounces:35.274,Tons:0.001},volume:{Liters:1,Milliliters:1000,Gallons:0.264172,Quarts:1.05669,Cups:4.22675,'Fluid Ounces':33.814},speed:{'km/h':1,'mph':0.621371,'m/s':0.277778,knots:0.539957}};
function updateUnits(){const cat=document.getElementById('cat').value;const f=document.getElementById('from');const t=document.getElementById('to');f.innerHTML='';t.innerHTML='';units[cat].forEach(u=>{f.innerHTML+='<option>'+u+'</option>';t.innerHTML+='<option>'+u+'</option>'});t.value=units[cat][1]||units[cat][0];convert()}
function convert(){const cat=document.getElementById('cat').value;const from=document.getElementById('from').value;const to=document.getElementById('to').value;const val=parseFloat(document.getElementById('val').value)||0;const r=rates[cat];if(!r||!r[from]||!r[to]){document.getElementById('result').textContent='Error';return}const base=val/r[from];const result=base*r[to];document.getElementById('result').textContent=result.toFixed(4)}
updateUnits()
</script></body></html>`;
    }
  },
  {
    slug: 'percentage-calculator',
    title: 'Percentage Calculator',
    desc: 'Calculate percentages easily. Free online percentage calculator for discounts, tips, and more.',
    category: 'calculator-tools',
    html: function(s) {
      return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Percentage Calculator - Free Online Tool | ${s.title}</title>
<meta name="description" content="Calculate percentages easily online. Free percentage calculator for discounts, tips, tax, and more.">
<link rel="canonical" href="https://${s.domain}/tools/percentage-calculator/">
<style>body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;padding:20px;background:#0d0d1a;color:#e0e0e0;line-height:1.6}h1{color:#4fc3f7;font-size:1.5rem}.mode{display:flex;gap:8px;margin:12px 0}.mode button{flex:1;background:#1a1a2e;border:1px solid #333;color:#aaa;padding:10px;border-radius:6px;cursor:pointer;font-weight:bold}.mode button.active{background:#4fc3f7;color:#000;border-color:#4fc3f7}input{width:100%;padding:12px;background:#1a1a2e;color:#e0e0e0;border:1px solid #333;border-radius:6px;font-size:18px;box-sizing:border-box;margin:4px 0;text-align:center}button.calc{background:#4fc3f7;color:#000;border:none;padding:12px;border-radius:6px;cursor:pointer;font-weight:bold;width:100%;margin:8px 0}button:hover{opacity:.9}.result{background:#1a1a2e;padding:20px;border-radius:8px;margin:12px 0;text-align:center;font-size:1.5rem;color:#4fc3f7}.desc{color:#888;font-size:.85rem}.footer{margin-top:40px;padding-top:20px;border-top:1px solid #2a2a2a;font-size:.8rem;color:#555}.footer a{color:#555}</style></head><body>
<h1>Percentage Calculator</h1>
<div class="mode"><button id="m1" class="active" onclick="setMode(1)">% of Number</button><button id="m2" onclick="setMode(2)">% Change</button><button id="m3" onclick="setMode(3)">% of What</button></div>
<div id="inputs"></div>
<button class="calc" onclick="calc()">Calculate</button>
<div class="result" id="result">0</div>
<p class="desc" id="desc">Enter values and click Calculate</p>
<div class="footer"><p>&copy; 2026 ${s.title} | <a href="/">Home</a> | <a href="/tools/">All Tools</a></p></div>
<script>
function setMode(m){document.querySelectorAll('.mode button').forEach((b,i)=>b.className=i+1===m?'active':'');render(m)}
function render(m){const d=document.getElementById('inputs');const desc=document.getElementById('desc');if(m===1){d.innerHTML='<label style="color:#aaa;font-size:.85rem">Percentage (%):</label><input type="number" id="a" value="20"><label style="color:#aaa;font-size:.85rem">Of Number:</label><input type="number" id="b" value="200">';desc.textContent='Calculate X% of Y'}else if(m===2){d.innerHTML='<label style="color:#aaa;font-size:.85rem">Original Value:</label><input type="number" id="a" value="100"><label style="color:#aaa;font-size:.85rem">New Value:</label><input type="number" id="b" value="150">';desc.textContent='Calculate percentage increase/decrease'}else{d.innerHTML='<label style="color:#aaa;font-size:.85rem">X is what % of:</label><input type="number" id="a" value="25"><label style="color:#aaa;font-size:.85rem">Y (total):</label><input type="number" id="b" value="200">';desc.textContent='X is what % of Y?'}}
function calc(){const m=document.querySelector('.mode .active')?[...document.querySelectorAll('.mode button')].findIndex(b=>b.classList.contains('active'))+1:1;const a=parseFloat(document.getElementById('a').value)||0;const b=parseFloat(document.getElementById('b').value)||0;const r=document.getElementById('result');if(m===1)r.textContent=(a/100*b).toFixed(2);else if(m===2)r.textContent=b!==0?((b-a)/a*100).toFixed(2)+'%':'Error';else r.textContent=b!==0?(a/b*100).toFixed(2)+'%':'Error'}
setMode(1)
</script></body></html>`;
    }
  },
  {
    slug: 'stopwatch',
    title: 'Online Stopwatch',
    desc: 'Free online stopwatch with start, stop, and lap timing. Accurate to milliseconds.',
    category: 'timer-tools',
    html: function(s) {
      return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Online Stopwatch - Free Online Tool | ${s.title}</title>
<meta name="description" content="Free online stopwatch with lap timing. Accurate millisecond precision stopwatch for timing tasks.">
<link rel="canonical" href="https://${s.domain}/tools/stopwatch/">
<style>body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;padding:20px;background:#0d0d1a;color:#e0e0e0;line-height:1.6;text-align:center}h1{color:#4fc3f7;font-size:1.5rem}.display{font-size:4rem;font-weight:bold;color:#fff;margin:40px 0;font-family:monospace;letter-spacing:4px}.btns{margin:20px 0}button{background:#1a1a2e;color:#fff;border:1px solid #333;padding:14px 32px;border-radius:8px;cursor:pointer;font-size:1rem;font-weight:bold;margin:4px}button:hover{opacity:.85}#start{background:#4caf50;color:#fff}#stop{background:#f44336;color:#fff}#lap{background:#2196f3;color:#fff}#reset{background:#ff9800;color:#fff}.laps{margin:20px auto;max-width:400px;text-align:left}.lap{display:flex;justify-content:space-between;padding:8px 12px;border-bottom:1px solid #2a2a4a;font-family:monospace;font-size:.9rem}.lap-num{color:#888}.lap-time{color:#4fc3f7}.footer{margin-top:40px;padding-top:20px;border-top:1px solid #2a2a2a;font-size:.8rem;color:#555}.footer a{color:#555}</style></head><body>
<h1>Online Stopwatch</h1>
<div class="display" id="display">00:00:00.00</div>
<div class="btns"><button id="start" onclick="start()">Start</button><button id="stop" onclick="stop()">Stop</button><button id="lap" onclick="recordLap()">Lap</button><button id="reset" onclick="reset()">Reset</button></div>
<div class="laps" id="laps"></div>
<div class="footer"><p>&copy; 2026 ${s.title} | <a href="/">Home</a> | <a href="/tools/">All Tools</a></p></div>
<script>
let running=false,startTime=0,elapsed=0,timerId=null,lapCount=0;
function format(ms){const total=Math.floor(ms);const hrs=Math.floor(total/3600000).toString().padStart(2,'0');const mins=Math.floor((total%3600000)/60000).toString().padStart(2,'0');const secs=Math.floor((total%60000)/1000).toString().padStart(2,'0');const cent=Math.floor((total%1000)/10).toString().padStart(2,'0');return hrs+':'+mins+':'+secs+'.'+cent}
function update(){const now=Date.now();elapsed=now-startTime;document.getElementById('display').textContent=format(elapsed);timerId=requestAnimationFrame(update)}
function start(){if(running)return;running=true;startTime=Date.now()-elapsed;timerId=requestAnimationFrame(update)}
function stop(){if(!running)return;running=false;cancelAnimationFrame(timerId)}
function reset(){running=false;cancelAnimationFrame(timerId);elapsed=0;document.getElementById('display').textContent='00:00:00.00';document.getElementById('laps').innerHTML='';lapCount=0}
function recordLap(){if(!running)return;lapCount++;const div=document.createElement('div');div.className='lap';div.innerHTML='<span class="lap-num">Lap '+lapCount+'</span><span class="lap-time">'+format(elapsed)+'</span>';document.getElementById('laps').prepend(div)}
</script></body></html>`;
    }
  },
  {
    slug: 'bmi-calculator',
    title: 'BMI Calculator',
    desc: 'Calculate your Body Mass Index (BMI) online. Free BMI calculator with healthy weight range.',
    category: 'health-tools',
    html: function(s) {
      return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>BMI Calculator - Free Online Tool | ${s.title}</title>
<meta name="description" content="Calculate your Body Mass Index (BMI) online for free. BMI calculator with weight categories and health information.">
<link rel="canonical" href="https://${s.domain}/tools/bmi-calculator/">
<style>body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;padding:20px;background:#0d0d1a;color:#e0e0e0;line-height:1.6}h1{color:#4fc3f7;font-size:1.5rem}.row{display:flex;gap:12px;margin:12px 0}.col{flex:1}label{color:#aaa;font-size:.85rem;display:block}select,input{width:100%;padding:10px;background:#1a1a2e;color:#e0e0e0;border:1px solid #333;border-radius:6px;box-sizing:border-box;margin:4px 0}button{background:#4fc3f7;color:#000;border:none;padding:12px 24px;border-radius:6px;cursor:pointer;font-weight:bold;width:100%;margin:8px 0}button:hover{background:#81d4fa}.result{background:#1a1a2e;padding:20px;border-radius:8px;margin:12px 0;text-align:center}.bmi{font-size:3rem;font-weight:bold;color:#4fc3f7}.cat{font-size:1.1rem;color:#888;margin:8px 0}.bar{height:10px;background:#2a2a4a;border-radius:5px;overflow:hidden;margin:12px 0}.bar-inner{height:100%;border-radius:5px;transition:width .5s}.footer{margin-top:40px;padding-top:20px;border-top:1px solid #2a2a2a;font-size:.8rem;color:#555}.footer a{color:#555}</style></head><body>
<h1>BMI Calculator</h1>
<p>Calculate your Body Mass Index based on height and weight.</p>
<div class="row"><div class="col"><label>Unit System:</label><select id="unit" onchange="updateLabels()"><option value="metric">Metric (cm/kg)</option><option value="imperial">Imperial (ft/in/lbs)</option></select></div></div>
<div class="row"><div class="col" id="heightLabel"><label>Height (cm):</label><input type="number" id="height" value="170" step="0.1"></div><div class="col" id="weightLabel"><label>Weight (kg):</label><input type="number" id="weight" value="70" step="0.1"></div></div>
<button onclick="calc()">Calculate BMI</button>
<div class="result" id="result"><div class="bmi" id="bmi">24.2</div><div class="cat" id="cat">Normal weight</div><div class="bar"><div class="bar-inner" style="width:45%;background:#4caf50" id="bar"></div></div><div style="display:flex;justify-content:space-between;font-size:.7rem;color:#555"><span>Underweight<br>&lt;18.5</span><span>Normal<br>18.5-25</span><span>Overweight<br>25-30</span><span>Obese<br>&gt;30</span></div></div>
<div class="footer"><p>&copy; 2026 ${s.title} | <a href="/">Home</a> | <a href="/tools/">All Tools</a></p></div>
<script>
function updateLabels(){const u=document.getElementById('unit').value;document.getElementById('heightLabel').innerHTML='<label>Height ('+(u==='metric'?'cm':'inches')+'):</label><input type="number" id="height" value="'+(u==='metric'?'170':'67')+'" step="0.1">';document.getElementById('weightLabel').innerHTML='<label>Weight ('+(u==='metric'?'kg':'lbs')+'):</label><input type="number" id="weight" value="'+(u==='metric'?'70':'154')+'" step="0.1">'}
function calc(){const u=document.getElementById('unit').value;const h=parseFloat(document.getElementById('height').value)||0;const w=parseFloat(document.getElementById('weight').value)||0;let bmi;if(u==='metric')bmi=w/((h/100)*(h/100));else bmi=(w/(h*h))*703;bmi=Math.round(bmi*10)/10;document.getElementById('bmi').textContent=bmi;let cat,color,width;if(bmi<18.5){cat='Underweight';color='#2196f3';width=15}else if(bmi<25){cat='Normal weight';color='#4caf50';width=40}else if(bmi<30){cat='Overweight';color='#ff9800';width=65}else{cat='Obese';color='#f44336';width=85}document.getElementById('cat').textContent=cat;const bar=document.getElementById('bar');bar.style.width=width+'%';bar.style.background=color}
calc()
</script></body></html>`;
    }
  },
  {
    slug: 'word-frequency-counter',
    title: 'Word Frequency Counter',
    desc: 'Count word frequency in any text. Free online word frequency analyzer for SEO and content analysis.',
    category: 'text-tools',
    html: function(s) {
      return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Word Frequency Counter - Free Online Tool | ${s.title}</title>
<meta name="description" content="Count word frequency in text online. Free word frequency analyzer for SEO keyword research and content analysis.">
<link rel="canonical" href="https://${s.domain}/tools/word-frequency-counter/">
<style>body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:700px;margin:0 auto;padding:20px;background:#0d0d1a;color:#e0e0e0;line-height:1.6}h1{color:#4fc3f7;font-size:1.5rem}textarea{width:100%;height:200px;background:#1a1a2e;color:#e0e0e0;border:1px solid #333;border-radius:6px;padding:12px;font-family:sans-serif;font-size:14px;box-sizing:border-box;margin:8px 0}button{background:#4fc3f7;color:#000;border:none;padding:10px 24px;border-radius:6px;cursor:pointer;font-weight:bold;margin:4px}button:hover{background:#81d4fa}table{width:100%;border-collapse:collapse;margin:12px 0}th,td{padding:8px 12px;text-align:left;border-bottom:1px solid #2a2a4a;font-size:.85rem}th{color:#4fc3f7;font-weight:bold}td{color:#bbb}.bar-cell{width:40%}.bar-fill{height:18px;border-radius:3px;background:#4fc3f7;min-width:2px}.num{color:#888;text-align:right;font-family:monospace}.footer{margin-top:40px;padding-top:20px;border-top:1px solid #2a2a2a;font-size:.8rem;color:#555}.footer a{color:#555}label{display:block;color:#aaa;font-size:.85rem;margin:8px 0 4px}</style></head><body>
<h1>Word Frequency Counter</h1>
<p>Analyze word frequency in any text. Great for SEO keyword research and content analysis.</p>
<label>Text Input:</label>
<textarea id="text" placeholder="Paste your text here...">The quick brown fox jumps over the lazy dog. The dog sleeps while the fox jumps again.</textarea>
<div><label>Min word length:</label><input type="number" id="minLen" value="2" style="width:80px;padding:8px;background:#1a1a2e;color:#e0e0e0;border:1px solid #333;border-radius:6px"></div>
<div><label>Stop words:</label><label style="color:#666;font-size:.8rem"><input type="checkbox" id="stopWords" checked> Remove common words (the, a, an, is, etc.)</label></div>
<button onclick="analyze()">Analyze</button>
<div id="results"></div>
<div class="footer"><p>&copy; 2026 ${s.title} | <a href="/">Home</a> | <a href="/tools/">All Tools</a></p></div>
<script>
const stopWords=new Set('the a an is are am was were be been being have has had do does did will would shall should may might must can could need dare ought used to of in on at by for with about against between through during before after above below from up down out off over under again further then once here there when where why how all each every both few more most other some such no nor not only own same so than too very just because as until while'.split(' '));
function analyze(){const text=document.getElementById('text').value.toLowerCase();const minLen=parseInt(document.getElementById('minLen').value)||2;const removeStop=document.getElementById('stopWords').checked;const words=text.match(/[a-z]+(?:'[a-z]+)?/g);if(!words){document.getElementById('results').innerHTML='<p style="color:#888">No words found.</p>';return}const freq={};let total=0;for(const w of words){if(w.length<minLen)continue;if(removeStop&&stopWords.has(w))continue;freq[w]=(freq[w]||0)+1;total++}const sorted=Object.entries(freq).sort((a,b)=>b[1]-a[1]);const maxCount=sorted[0]?sorted[0][1]:1;let html='<table><tr><th>Word</th><th>Count</th><th>Distribution</th></tr>';sorted.forEach(([word,count])=>{const pct=(count/maxCount*100).toFixed(0);html+='<tr><td>'+word+'</td><td class="num">'+count+'</td><td class="bar-cell"><div class="bar-fill" style="width:'+pct+'%"></div></td></tr>'});html+='</table>';html+='<p style="color:#666;font-size:.85rem">'+sorted.length+' unique words, '+total+' total words</p>';document.getElementById('results').innerHTML=html}
analyze()
</script></body></html>`;
    }
  },
  {
    slug: 'json-minifier',
    title: 'JSON Minifier',
    desc: 'Minify and compress JSON data online. Free JSON minifier reduces JSON file size for production.',
    category: 'developer-tools',
    html: function(s) {
      return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>JSON Minifier - Free Online Tool | ${s.title}</title>
<meta name="description" content="Minify and compress JSON data online. Free JSON minifier for reducing JSON file size in production.">
<link rel="canonical" href="https://${s.domain}/tools/json-minifier/">
<style>body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:800px;margin:0 auto;padding:20px;background:#0d0d1a;color:#e0e0e0;line-height:1.6}h1{color:#4fc3f7;font-size:1.5rem}textarea{width:100%;height:200px;background:#1a1a2e;color:#e0e0e0;border:1px solid #333;border-radius:6px;padding:12px;font-family:monospace;font-size:13px;box-sizing:border-box;margin:8px 0}button{background:#4fc3f7;color:#000;border:none;padding:10px 24px;border-radius:6px;cursor:pointer;font-weight:bold;margin:4px}button:hover{background:#81d4fa}.stats{display:flex;gap:16px;margin:8px 0;flex-wrap:wrap}.stat{background:#1a1a2e;padding:8px 16px;border-radius:6px;font-size:.85rem;color:#aaa}.stat span{color:#4fc3f7;font-weight:bold}.footer{margin-top:40px;padding-top:20px;border-top:1px solid #2a2a2a;font-size:.8rem;color:#555}.footer a{color:#555}label{display:block;color:#aaa;font-size:.85rem;margin:8px 0 4px}</style></head><body>
<h1>JSON Minifier</h1>
<p>Minify JSON data by removing whitespace. Paste your JSON below.</p>
<label>JSON Input:</label>
<textarea id="input" placeholder='{"name": "John", "age": 30, "city": "New York"}'>{"name": "John", "age": 30, "city": "New York"}</textarea>
<button onclick="minify()">Minify JSON</button>
<button onclick="format()">Format JSON</button>
<button onclick="clearAll()">Clear</button>
<button onclick="copy()">Copy Result</button>
<div class="stats"><div class="stat">Original: <span id="origSize">0</span> B</div><div class="stat">Minified: <span id="minSize">0</span> B</div><div class="stat">Saved: <span id="saved">0</span>%</div></div>
<label>Minified Output:</label>
<textarea id="output" readonly></textarea>
<div class="footer"><p>&copy; 2026 ${s.title} | <a href="/">Home</a> | <a href="/tools/">All Tools</a></p></div>
<script>
function minify(){const input=document.getElementById('input').value;if(!input.trim()){document.getElementById('output').value='Please enter JSON data.';return}try{const parsed=JSON.parse(input);const minified=JSON.stringify(parsed);document.getElementById('output').value=minified;updateStats(input,minified)}catch(e){document.getElementById('output').value='Error: '+e.message}}
function format(){const input=document.getElementById('input').value;if(!input.trim())return;try{const parsed=JSON.parse(input);const formatted=JSON.stringify(parsed,null,2);document.getElementById('output').value=formatted;updateStats(input,formatted)}catch(e){document.getElementById('output').value='Error: '+e.message}}
function updateStats(orig,min){const o=new Blob([orig]).size;const m=new Blob([min]).size;document.getElementById('origSize').textContent=o;document.getElementById('minSize').textContent=m;if(o>0)document.getElementById('saved').textContent=((o-m)/o*100).toFixed(1)}
function clearAll(){document.getElementById('input').value='';document.getElementById('output').value='';document.getElementById('origSize').textContent='0';document.getElementById('minSize').textContent='0';document.getElementById('saved').textContent='0%'}
function copy(){const out=document.getElementById('output');out.select();navigator.clipboard.writeText(out.value).then(()=>alert('Copied!')).catch(()=>alert('Copy failed.'))}
minify()
</script></body></html>`;
    }
  },
  {
    slug: 'sql-formatter',
    title: 'SQL Formatter',
    desc: 'Format and beautify SQL queries online. Free SQL formatter for cleaner, readable SQL code.',
    category: 'developer-tools',
    html: function(s) {
      return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>SQL Formatter - Free Online Tool | ${s.title}</title>
<meta name="description" content="Format and beautify SQL queries online for free. SQL formatter makes your SQL code clean and readable.">
<link rel="canonical" href="https://${s.domain}/tools/sql-formatter/">
<style>body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:800px;margin:0 auto;padding:20px;background:#0d0d1a;color:#e0e0e0;line-height:1.6}h1{color:#4fc3f7;font-size:1.5rem}textarea{width:100%;height:200px;background:#1a1a2e;color:#e0e0e0;border:1px solid #333;border-radius:6px;padding:12px;font-family:monospace;font-size:13px;box-sizing:border-box;margin:8px 0}button{background:#4fc3f7;color:#000;border:none;padding:10px 24px;border-radius:6px;cursor:pointer;font-weight:bold;margin:4px}button:hover{background:#81d4fa}.footer{margin-top:40px;padding-top:20px;border-top:1px solid #2a2a2a;font-size:.8rem;color:#555}.footer a{color:#555}label{display:block;color:#aaa;font-size:.85rem;margin:8px 0 4px}</style></head><body>
<h1>SQL Formatter</h1>
<p>Format and beautify your SQL queries for better readability.</p>
<label>SQL Input:</label>
<textarea id="input" placeholder="Paste SQL query here...">SELECT id,name,email,created_at FROM users WHERE status='active' AND age>18 ORDER BY created_at DESC LIMIT 10</textarea>
<button onclick="format()">Format SQL</button>
<button onclick="minify()">Minify SQL</button>
<button onclick="copy()">Copy</button>
<button onclick="clearAll()">Clear</button>
<label>Formatted Output:</label>
<textarea id="output" readonly></textarea>
<div class="footer"><p>&copy; 2026 ${s.title} | <a href="/">Home</a> | <a href="/tools/">All Tools</a></p></div>
<script>
const keywords=new Set('SELECT FROM WHERE AND OR NOT IN BETWEEN LIKE IS NULL EXISTS GROUP BY ORDER BY HAVING LIMIT OFFSET JOIN LEFT RIGHT INNER OUTER CROSS ON AS DESC ASC UPDATE SET INSERT INTO VALUES DELETE CREATE TABLE ALTER DROP INDEX VIEW DISTINCT COUNT SUM AVG MIN MAX CASE WHEN THEN ELSE END UNION ALL CAST COALESCE'.split(' '));
function format(){const input=document.getElementById('input').value.trim();if(!input){document.getElementById('output').value='Please enter SQL.';return}try{let sql=input.replace(/\\s+/g,' ');let out='';let indent=0;const clauses=sql.split(/(?=\\bSELECT|\\bFROM|\\bWHERE|\\bAND|\\bOR|\\bORDER BY|\\bGROUP BY|\\bHAVING|\\bLIMIT|\\bJOIN|\\bLEFT|\\bRIGHT|\\bINNER|\\bON|\\bUNION|\\bINSERT|\\bUPDATE|\\bDELETE|\\bSET|\\bVALUES|\\bCREATE|\\bALTER|\\bDROP|\\bINTO)/gi);for(const clause of clauses){const trimmed=clause.trim();if(!trimmed)continue;const kw=trimmed.split(/\\s+/)[0].toUpperCase();if(kw==='SELECT'||kw==='FROM'||kw==='WHERE'||kw.startsWith('ORDER')||kw.startsWith('GROUP')||kw==='HAVING'||kw.startsWith('LEFT')||kw.startsWith('RIGHT')||kw.startsWith('INNER')||kw.startsWith('OUTER')||kw.startsWith('CROSS')||kw==='ON'||kw==='AND'||kw==='OR'||kw==='UNION'){out+='\\n'+'  '.repeat(Math.max(0,indent-1))+trimmed+'\\n';if(kw==='SELECT')indent++;if(kw==='FROM')indent--}else{out+='  '.repeat(Math.max(0,indent))+'  '+trimmed+'\\n'}}document.getElementById('output').value=out.replace(/\\n{2,}/g,'\\n').trim()}catch(e){document.getElementById('output').value='Error: '+e.message}}
function minify(){const input=document.getElementById('input').value;document.getElementById('output').value=input.replace(/\\s+/g,' ').trim()}
function copy(){const out=document.getElementById('output');out.select();navigator.clipboard.writeText(out.value).then(()=>alert('Copied!')).catch(()=>alert('Copy failed.'))}
function clearAll(){document.getElementById('input').value='';document.getElementById('output').value=''}
format()
</script></body></html>`;
    }
  },
  {
    slug: 'color-palette-generator',
    title: 'Color Palette Generator',
    desc: 'Generate beautiful color palettes online. Free color palette generator with hex codes.',
    category: 'design-tools',
    html: function(s) {
      return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Color Palette Generator - Free Online Tool | ${s.title}</title>
<meta name="description" content="Generate beautiful color palettes online for free. Color palette generator with hex codes and copy functionality.">
<link rel="canonical" href="https://${s.domain}/tools/color-palette-generator/">
<style>body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:700px;margin:0 auto;padding:20px;background:#0d0d1a;color:#e0e0e0;line-height:1.6;text-align:center}h1{color:#4fc3f7;font-size:1.5rem}.palette{display:flex;margin:20px 0;border-radius:8px;overflow:hidden;height:120px}.color{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;transition:flex .3s;position:relative}.color:hover{flex:1.5}.color-code{background:rgba(0,0,0,.5);color:#fff;padding:4px 10px;border-radius:4px;font-size:.8rem;font-family:monospace;opacity:0;transition:opacity .3s}.color:hover .color-code{opacity:1}button{background:#4fc3f7;color:#000;border:none;padding:10px 24px;border-radius:6px;cursor:pointer;font-weight:bold;margin:4px}button:hover{background:#81d4fa}.footer{margin-top:40px;padding-top:20px;border-top:1px solid #2a2a2a;font-size:.8rem;color:#555}.footer a{color:#555}</style></head><body>
<h1>Color Palette Generator</h1>
<p>Click Generate to create a random 5-color palette. Click any color to copy its hex code.</p>
<button onclick="generate()">Generate New Palette</button>
<button onclick="copyAll()">Copy All Codes</button>
<div class="palette" id="palette"></div>
<p id="copied" style="color:#4fc3f7;font-size:.85rem"></p>
<div class="footer"><p>&copy; 2026 ${s.title} | <a href="/">Home</a> | <a href="/tools/">All Tools</a></p></div>
<script>
function randomColor(){const h=Math.floor(Math.random()*360);const s=30+Math.floor(Math.random()*60);const l=40+Math.floor(Math.random()*30);return hslToHex(h,s,l)}
function hslToHex(h,s,l){s/=100;l/=100;const k=n=>(n+h/30)%12;const a=s*Math.min(l,1-l);const f=n=>l-a*Math.max(-1,Math.min(k(n)-3,9-k(n),1));const toHex=x=>Math.round(255*f(x)).toString(16).padStart(2,'0');return '#'+toHex(0)+toHex(8)+toHex(4)}
function generate(){const palette=document.getElementById('palette');palette.innerHTML='';for(let i=0;i<5;i++){const color=randomColor();const div=document.createElement('div');div.className='color';div.style.background=color;div.innerHTML='<span class="color-code">'+color+'</span>';div.onclick=function(){navigator.clipboard.writeText(color).then(()=>{document.getElementById('copied').textContent='Copied '+color+'!'}).catch(()=>{})};palette.appendChild(div)}}
function copyAll(){const colors=[];document.querySelectorAll('.color-code').forEach(c=>colors.push(c.textContent));if(colors.length){navigator.clipboard.writeText(colors.join(', ')).then(()=>document.getElementById('copied').textContent='All colors copied!').catch(()=>{})}}
generate()
</script></body></html>`;
    }
  },
];

function buildForSite(siteDir, site) {
  const toolsDir = path.join(siteDir, 'tools');
  if (!fs.existsSync(toolsDir)) return 0;
  let count = 0;
  for (const tool of tools) {
    const toolPath = path.join(toolsDir, tool.slug);
    fs.mkdirSync(toolPath, { recursive: true });
    fs.writeFileSync(path.join(toolPath, 'index.html'), tool.html(site), 'utf-8');
    count++;
    console.log(`  Created: ${tool.slug} [${tool.category}]`);
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
console.log(`\nV8 builder complete: ${total} tools across ${siteConfigs.length} sites`);
