const fs = require('fs');
const path = require('path');
const toolsDir = path.join(__dirname, '..', 'output', 'tools');

const files = fs.readdirSync(toolsDir).filter(f => f.endsWith('.html') && f !== 'index.html');

let count = 0;
for (const file of files) {
  const fp = path.join(toolsDir, file);
  let html = fs.readFileSync(fp, 'utf8');
  if (html.includes('lang="zh-CN"')) {
    html = html.replace('lang="zh-CN"', 'lang="en"');
    fs.writeFileSync(fp, html, 'utf8');
    count++;
    console.log('Fixed lang: ' + file);
  }
}
console.log('Total lang fixes: ' + count);
