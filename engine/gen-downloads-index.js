const fs = require('fs');
const path = require('path');

const dlDir = path.resolve(__dirname, '..', 'output', 'downloads');
const files = fs.readdirSync(dlDir).filter(f => f.endsWith('.html') && f !== 'index.html').sort();

const prices = { 'complete-guide': 5.99, 'checklist-workbook': 3.99, 'template-pack': 4.99, 'ultimate-bundle': 8.99 };
const typeLabels = { 'complete-guide': 'Complete Guide', 'checklist-workbook': 'Checklist', 'template-pack': 'Template Pack', 'ultimate-bundle': 'Ultimate Bundle' };
const typeClasses = { 'complete-guide': 'guide', 'checklist-workbook': 'checklist', 'template-pack': 'template', 'ultimate-bundle': 'bundle' };

let items = [];
for (const f of files) {
  const slug = f.replace(/\.html$/, '');
  const parts = slug.split('-');
  let typeKey3 = parts.slice(-3).join('-');
  let typeKey2 = parts.slice(-2).join('-');
  let type, productParts;
  if (typeLabels[typeKey3]) {
    type = typeKey3;
    productParts = parts.slice(0, -3);
  } else if (typeLabels[typeKey2]) {
    type = typeKey2;
    productParts = parts.slice(0, -2);
  } else {
    type = '';
    productParts = parts;
  }
  const productName = productParts.join(' ').replace(/\b\w/g, c => c.toUpperCase());
  const price = prices[type] || 4.99;
  const label = typeLabels[type] || 'Download';
  const cls = typeClasses[type] || 'guide';
  items.push({ slug, productName, type, label, cls, price });
}

let html = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">';
html += '<title>Digital Product Downloads - automoney.store</title>';
html += '<meta name="description" content="Browse ' + items.length + ' digital product downloads including guides, checklists, templates, and bundles for AI, marketing, business, and productivity.">';
html += '<link rel="canonical" href="https://automoney-store.pages.dev/downloads/">';
html += '<style>*{margin:0;padding:0;box-sizing:border-box}';
html += 'body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;background:#f5f5f7;color:#1d1d1f;line-height:1.6}';
html += '.container{max-width:1200px;margin:0 auto;padding:20px}h1{font-size:2rem;margin-bottom:8px;text-align:center}';
html += '.subtitle{text-align:center;color:#6e6e73;margin-bottom:32px}';
html += '.filters{display:flex;gap:12px;margin-bottom:24px;flex-wrap:wrap;justify-content:center}';
html += '.filters input,.filters select{padding:10px 16px;border:1px solid #d2d2d7;border-radius:8px;font-size:14px}';
html += '.filters input{flex:1;min-width:200px;max-width:400px}';
html += '.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px}';
html += '.card{background:#fff;border-radius:12px;padding:20px;box-shadow:0 2px 8px rgba(0,0,0,.04);transition:transform .15s;border:1px solid #e8e8ed}';
html += '.card:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,.08)}';
html += '.card h3{font-size:1rem;margin-bottom:6px}.card h3 a{color:#1d1d1f;text-decoration:none}.card h3 a:hover{color:#0071e3}';
html += '.card .type{display:inline-block;font-size:.75rem;padding:2px 8px;border-radius:4px;margin-bottom:8px}';
html += '.type-guide{background:#e8f5e9;color:#2e7d32}.type-checklist{background:#fff3e0;color:#e65100}';
html += '.type-template{background:#e3f2fd;color:#1565c0}.type-bundle{background:#f3e5f5;color:#7b1fa2}';
html += '.card .price{font-size:1.25rem;font-weight:700;color:#1d1d1f;margin:8px 0}';
html += '.card .price small{font-weight:400;font-size:.8rem;color:#6e6e73}';
html += '.count{text-align:center;color:#6e6e73;margin-bottom:24px;font-size:.9rem}';
html += '.breadcrumb{font-size:.85rem;margin-bottom:20px;color:#6e6e73}.breadcrumb a{color:#0071e3;text-decoration:none}';
html += '@media(max-width:600px){.grid{grid-template-columns:1fr}}';
html += '</style></head><body><div class="container">';
html += '<nav class="breadcrumb"><a href="/">Home</a> &raquo; Downloads</nav>';
html += '<h1>Digital Product Downloads</h1>';
html += '<p class="subtitle">AI-powered digital product downloads for entrepreneurs, creators, and professionals</p>';
html += '<div class="filters">';
html += '<input type="text" id="search" placeholder="Search..." oninput="filterCards()">';
html += '<select id="typeFilter" onchange="filterCards()">';
html += '<option value="">All Types</option>';
html += '<option value="guide">Complete Guide ($5.99)</option>';
html += '<option value="checklist">Checklist & Workbook ($3.99)</option>';
html += '<option value="template">Template Pack ($4.99)</option>';
html += '<option value="bundle">Ultimate Bundle ($8.99)</option>';
html += '</select></div>';
html += '<p class="count" id="count">' + items.length + ' products</p>';
html += '<div class="grid" id="grid">';

for (const item of items) {
  html += '<div class="card" data-type="' + item.cls + '" data-name="' + item.productName.toLowerCase() + '">';
  html += '<span class="type type-' + item.cls + '">' + item.label + '</span>';
  html += '<h3><a href="/downloads/' + item.slug + '/">' + item.productName + '</a></h3>';
  html += '<div class="price">$' + item.price.toFixed(2) + ' <small>USD</small></div>';
  html += '<div class="desc">' + item.label + ' for ' + item.productName + '</div>';
  html += '</div>';
}

html += '</div></div>';
html += '<script>function filterCards(){var s=document.getElementById("search").value.toLowerCase();var t=document.getElementById("typeFilter").value;var cards=document.querySelectorAll(".card");var c=0;cards.forEach(function(card){var m=true;if(s&&card.getAttribute("data-name").indexOf(s)===-1)m=false;if(t&&card.getAttribute("data-type")!==t)m=false;card.style.display=m?"":"none";if(m)c++});document.getElementById("count").textContent=c+" products"}</script>';
html += '</body></html>';

fs.writeFileSync(path.join(dlDir, 'index.html'), html, 'utf-8');
console.log('Downloads index: ' + items.length + ' products');
