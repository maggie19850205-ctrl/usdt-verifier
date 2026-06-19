const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DOWNLOADS_DIR = path.join(__dirname, '..', 'output', 'downloads');

const WHAT_YOU_GET_CONTENT = [
  'A complete, step-by-step guide that walks you through everything from setup to mastery',
  'Practical examples and real-world scenarios that show you exactly how to apply each concept',
  'Professional tips and best practices that save you time and help you avoid costly mistakes',
  'Ready-to-use templates and checklists that make implementation quick and easy',
  'Clear explanations suitable for both beginners and experienced professionals',
  'Instant digital delivery so you can start learning within minutes of purchase',
];

const PERFECT_FOR = [
  'Entrepreneurs and business owners who want to streamline their operations and save time',
  'Freelancers and consultants looking to deliver better results to their clients',
  'Professionals who want to learn new skills quickly without wasting time on trial and error',
  'Anyone who prefers practical, actionable knowledge over abstract theory',
];

const STEP_DESCRIPTIONS = [
  'Open the downloaded file on your computer or mobile device. No special software is required.',
  'Read through the material at your own pace. Each section builds on the previous one.',
  'Apply what you learn using the included templates and exercises. Practice is key to mastery.',
  'Refer back to specific sections whenever you need a refresher. The material is designed for repeated use.',
];

const files = fs.readdirSync(DOWNLOADS_DIR).filter(f => f.endsWith('.html') && f !== 'index.html');
let updated = 0;

for (const file of files) {
  const fp = path.join(DOWNLOADS_DIR, file);
  let html = fs.readFileSync(fp, 'utf-8');

  // Skip if already has new content (Type A pages already cleaned)
  if (html.includes('Take it step by step and master each phase')) continue;
  // Skip if it's a Type A page that was cleaned differently
  if (html.includes('What You Will Learn') && html.includes('Core Concepts')) continue;

  // Only process Type B pages (no <p class="meta">)
  if (html.includes('<p class="meta">')) continue;

  let seed = crypto.createHash('md5').update(file).digest().readUInt32LE(0);
  const rng = () => { seed = (seed * 1103515245 + 12345) >>> 0; return (seed & 0x7fffffff) / 0x7fffffff; };

  // Get product name
  const titleMatch = html.match(/<h1>([^<]+)<\/h1>/);
  const productName = titleMatch ? titleMatch[1].trim() : 'Digital Product';

  // Find the What You'll Get section
  const wygStart = html.indexOf('<h2>What You\'ll Get</h2>');
  if (wygStart === -1) continue;

  // Find the Payment section (end of content to replace)
  const payStart = html.indexOf('<h2>Payment</h2>', wygStart);
  if (payStart === -1) continue;

  // Generate clean content
  const shuffled = [...WHAT_YOU_GET_CONTENT].sort(() => rng() - 0.5);
  const items = shuffled.slice(0, 5 + Math.floor(rng() * 2));
  const perfectFor = [...PERFECT_FOR].sort(() => rng() - 0.5).slice(0, 3);

  let newContent = '';
  newContent += `\n<p>This ${productName.toLowerCase()} is designed to give you exactly what you need — no fluff, no filler. Every section has been carefully crafted to deliver maximum value in minimum time.</p>`;
  newContent += `\n<ul>`;
  for (const item of items) {
    newContent += `\n  <li>${item}</li>`;
  }
  newContent += `\n</ul>`;
  newContent += `\n<div class="highlight">`;
  newContent += `\n<h3>Perfect for:</h3>`;
  newContent += `\n<ul>`;
  for (const item of perfectFor) {
    newContent += `\n  <li>${item}</li>`;
  }
  newContent += `\n</ul>`;
  newContent += `\n</div>`;

  // Replace content between What You'll Get and Payment
  const before = html.substring(0, wygStart + '<h2>What You\'ll Get</h2>'.length);
  const after = html.substring(payStart);
  html = before + newContent + '\n\n' + after;

  fs.writeFileSync(fp, html, 'utf-8');
  updated++;
  if (updated <= 5) console.log(`  ${file}`);
}

console.log(`\nUpdated ${updated} Type B pages`);
