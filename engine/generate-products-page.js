const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PAGES_DIR = path.join(ROOT, 'output', 'pages');
const SITE_URL = 'https://automoney-store.pages.dev';

// Collect all product directories with their names
const products = fs.readdirSync(PAGES_DIR, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => {
    let name = d.name;
    let price = '';

    const slugFile = path.join(PAGES_DIR, d.name, `${d.name}.html`);
    if (fs.existsSync(slugFile)) {
      const html = fs.readFileSync(slugFile, 'utf-8');
      const titleMatch = html.match(/<title>(.*?)<\/title>/);
      if (titleMatch) name = titleMatch[1].replace(/ [\-|] AutoMoney Store$/, '');
      const priceMatch = html.match(/<div class="price-hero">\$(\d+\.\d+)/);
      if (priceMatch) price = `$${priceMatch[1]}`;
    }
    if (!price) price = '';

    return { slug: d.name, name, price, isNew: d.name.includes('-ultimate-bundle') || !d.name.match(/^\d{2}-/) };
  })
  .sort((a, b) => {
    if (a.isNew !== b.isNew) return a.isNew ? 1 : -1;
    return a.slug.localeCompare(b.slug);
  });

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>All Products - AutoMoney Store</title>
<meta name="description" content="Browse all ${products.length} digital products at AutoMoney Store. AI tools, templates, guides, and more. Instant delivery via USDT TRC-20 payment.">
<link rel="canonical" href="${SITE_URL}/products/">
<meta property="og:title" content="All Products - AutoMoney Store">
<meta property="og:description" content="Browse all ${products.length} digital products">
<meta property="og:type" content="website">
<meta name="robots" content="index, follow">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"ItemList","itemListElement":[${products.map((p, i) => `{"@type":"ListItem","position":${i+1},"item":{"@type":"Product","name":"${p.name.replace(/"/g, '&quot;')}","url":"${SITE_URL}/pages/${p.slug}/"}}`).join(',')}]}</script>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0a0a12;color:#e0e0e0;line-height:1.6}
.wrap{max-width:1100px;margin:0 auto;padding:32px 24px}
h1{font-size:2rem;margin-bottom:8px;background:linear-gradient(135deg,#00e676,#00bcd4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.sub{color:#666;font-size:0.9rem;margin-bottom:32px;border-bottom:1px solid #2a2a4a;padding-bottom:16px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:12px}
.card{display:block;background:#16162a;border:1px solid #2a2a4a;border-radius:12px;padding:20px;text-decoration:none;transition:all 0.2s}
.card:hover{border-color:#00e67640;transform:translateY(-2px);background:#1a1a30}
.card .title{color:#e0e0e0;font-weight:600;font-size:0.95rem;margin-bottom:6px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.card .price{color:#00e676;font-weight:700;font-size:1rem}
.card .badge{display:inline-block;background:#00e67615;color:#00e676;padding:2px 8px;border-radius:100px;font-size:0.7rem;font-weight:600;margin-bottom:8px}
.card:hover .title{color:#00e676}
.search{margin-bottom:24px}
.search input{width:100%;padding:12px 16px;border-radius:8px;border:1px solid #2a2a4a;background:#16162a;color:#e0e0e0;font-size:0.9rem;outline:none}
.search input:focus{border-color:#00e676}
.stats{color:#666;font-size:0.8rem;margin:16px 0 24px}
.footer{text-align:center;padding:32px;color:#333;font-size:0.75rem;border-top:1px solid #2a2a4a;margin-top:48px}
@media(max-width:600px){.wrap{padding:24px 16px}.grid{grid-template-columns:1fr}}
</style>
</head>
<body>
<div class="wrap">
<h1>All Products</h1>
<p class="sub">Browse all ${products.length} digital products — instant delivery via USDT TRC-20</p>

<div class="search"><input type="text" id="search" placeholder="Search products..." oninput="filter(this.value)"></div>
<p class="stats" id="stats">Showing all ${products.length} products</p>

<div class="grid" id="grid">
${products.map(p => `<a href="/pages/${p.slug}/" class="card">
${p.isNew ? '<span class="badge">NEW</span>' : ''}
<div class="title">${p.name}</div>
${p.price ? `<div class="price">${p.price}</div>` : ''}
</a>`).join('\n')}
</div>

<div class="footer"><p>AutoMoney Store &copy; 2026. Secure payment via USDT TRC-20.</p></div>
</div>

<script>
function filter(q) {
  q = q.toLowerCase();
  const cards = document.querySelectorAll('.card');
  let visible = 0;
  cards.forEach(c => {
    const match = c.textContent.toLowerCase().includes(q);
    c.style.display = match ? '' : 'none';
    if (match) visible++;
  });
  document.getElementById('stats').textContent = 'Showing ' + visible + ' of ${products.length} products';
}
</script>
</body>
</html>`;

const outDir = path.join(ROOT, 'output', 'products');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf-8');
console.log(`Generated /products/ with ${products.length} products`);
