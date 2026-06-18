const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'output');

// Collect all HTML files
const files = [];

// Downloads
fs.readdirSync(path.join(ROOT, 'downloads'))
  .filter(f => f.endsWith('.html') && f !== 'index.html')
  .forEach(f => files.push(path.join(ROOT, 'downloads', f)));

// Product pages
fs.readdirSync(path.join(ROOT, 'pages')).forEach(d => {
  const dp = path.join(ROOT, 'pages', d);
  if (fs.statSync(dp).isDirectory()) {
    fs.readdirSync(dp).filter(f => f.endsWith('.html'))
      .forEach(f => files.push(path.join(dp, f)));
  }
});

let cleaned = 0;
for (const fp of files) {
  let html = fs.readFileSync(fp, 'utf-8');
  
  // Find all related-section positions
  const marker = '<div class="related-section"';
  let pos = html.indexOf(marker);
  let positions = [];
  while (pos !== -1) {
    positions.push(pos);
    pos = html.indexOf(marker, pos + 1);
  }
  
  if (positions.length > 1) {
    // For each duplicate after the first, find where it ends
    for (let i = positions.length - 1; i > 0; i--) {
      const start = positions[i];
      // Find the next footer div or </div> after this section
      const nextFooter = html.indexOf('<div class="footer"', start);
      const nextClose = html.indexOf('</div>', start + 20);
      const endPos = nextFooter !== -1 ? nextFooter : nextClose;
      
      if (endPos !== -1) {
        const duplicate = html.substring(start, endPos);
        html = html.replace(duplicate, '');
      }
    }
    fs.writeFileSync(fp, html, 'utf-8');
    cleaned++;
    console.log(`  Cleaned: ${path.basename(fp)}`);
  }
}

console.log(`\nCleaned ${cleaned} files with duplicate related-sections`);
