const fs = require('fs');
const path = require('path');
const toolsDir = path.join(__dirname, '..', 'output', 'tools');

const files = fs.readdirSync(toolsDir).filter(f =>
  f.endsWith('.html') && f !== 'index.html' &&
  f !== 'schema-generator.html' && f !== 'serp-preview.html' && f !== 'readability-score.html'
);

let count = 0;
for (const file of files) {
  const fp = path.join(toolsDir, file);
  let html = fs.readFileSync(fp, 'utf8');
  const original = html;

  const lines = html.split('\n');
  const newLines = lines.map(line => {
    if (!line.includes('name="keywords"')) return line;
    // Extract full content value
    const m = line.match(/name="keywords"\s+content="([^"]*)"/);
    if (!m) return line;
    const keywords = m[1];
    // Remove comma-separated CJK tokens
    const cleaned = keywords.split(',').map(t => t.trim()).filter(t => !/[\u4e00-\u9fff]/.test(t)).join(', ');
    if (cleaned === keywords) return line;
    return line.replace(m[1], cleaned);
  });

  html = newLines.join('\n');
  if (html !== original) {
    fs.writeFileSync(fp, html, 'utf8');
    count++;
    console.log('Fixed: ' + file);
  }
}
console.log('Total fixed: ' + count);
