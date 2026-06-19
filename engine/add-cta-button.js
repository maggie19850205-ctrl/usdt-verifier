const fs = require('fs');
const path = require('path');

const DOWNLOADS_DIR = path.join(__dirname, '..', 'output', 'downloads');

function getProductName(html) {
  const m = html.match(/<h1>([^<]+)<\/h1>/);
  return m ? m[1].trim() : 'Digital Product';
}

function getPrice(html) {
  const m = html.match(/"price":\s*"([\d.]+)"/);
  return m ? parseFloat(m[1]) : 5.00;
}

function getSlug(html) {
  const m = html.match(/\/downloads\/([^"'\s/]+)/);
  return m ? m[1] : '';
}

const files = fs.readdirSync(DOWNLOADS_DIR).filter(f => f.endsWith('.html') && f !== 'index.html');
let added = 0;

for (const file of files) {
  const fp = path.join(DOWNLOADS_DIR, file);
  let html = fs.readFileSync(fp, 'utf-8');

  // Skip if already has cta-btn
  if (html.includes('.cta-btn')) continue;
  // Only process Type A (has <p class="meta"> but no cta-btn)
  if (!html.includes('<p class="meta">')) continue;

  const name = getProductName(html);
  const price = getPrice(html);
  const slug = getSlug(html);

  // Add .cta-btn CSS before .footer
  const ctaCss = `.cta-btn{display:inline-block;background:linear-gradient(135deg,#00e676,#00bcd4);color:#0a0a12;padding:14px 40px;border-radius:100px;text-decoration:none;font-weight:700;margin:24px 0;cursor:pointer;border:none;font-size:1rem}
.cta-btn:hover{opacity:.9}
.buy-section{text-align:center;margin:32px 0}
`;

  // Insert cta-btn CSS before the closing </style>
  html = html.replace('</style>', ctaCss + '</style>');

  // Add CTA button before <h2>Support</h2>
  const buyBtn = `<div class="buy-section">
<a href="javascript:void(0)" onclick="openModal('${name.replace(/'/g, "\\'")}', ${price.toFixed(2)}, '${slug}')" class="cta-btn">Buy Now - $${price.toFixed(2)} USDT</a>
</div>

`;
  html = html.replace('<h2>Support</h2>', buyBtn + '<h2>Support</h2>');

  fs.writeFileSync(fp, html, 'utf-8');
  added++;
  if (added <= 3) console.log(`  ${file}`);
}

console.log(`\nAdded CTA button to ${added} Type A pages`);
