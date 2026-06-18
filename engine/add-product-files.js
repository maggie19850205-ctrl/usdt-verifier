const fs = require('fs');
const path = require('path');

const workerPath = path.resolve(__dirname, '..', 'output', '_worker.js');
let content = fs.readFileSync(workerPath, 'utf-8');

const existingSlugs = new Set();
const regex = /'([^']+)':\s*'[^']+'/g;
let m;
while ((m = regex.exec(content)) !== null) {
  existingSlugs.add(m[1]);
}

const dlDir = path.resolve(__dirname, '..', 'output', 'downloads');
const files = fs.readdirSync(dlDir)
  .filter(f => f.endsWith('.html') && f !== 'index.html')
  .sort();

const missing = [];
for (const f of files) {
  const slug = f.replace(/\.html$/, '');
  if (!existingSlugs.has(slug)) {
    missing.push({ slug, file: f });
  }
}

console.log('Existing: ' + existingSlugs.size + ', Missing: ' + missing.length);

let newEntries = '';
for (const { slug, file } of missing) {
  newEntries += "  '" + slug + "': '" + file + "',\n";
}

const insertPoint = content.lastIndexOf('};');
if (insertPoint === -1) {
  console.error('Could not find closing brace');
  process.exit(1);
}

content = content.slice(0, insertPoint) + newEntries + content.slice(insertPoint);

const totalEntries = (content.match(/'[^']+':/g) || []).length - 1;
console.log('Total PRODUCT_FILES entries: ' + totalEntries);

fs.writeFileSync(workerPath, content, 'utf-8');
console.log('Done!');
