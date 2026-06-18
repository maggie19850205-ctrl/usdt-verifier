const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const ai = require('./ai-provider.js');

const ROOT = path.resolve(__dirname, '..');
const PAGES_DIR = path.join(ROOT, 'output', 'pages');
const DOWNLOADS_DIR = path.join(ROOT, 'output', 'downloads');
const WORKER_FILE = path.join(ROOT, 'output', '_worker.js');
const SITE_URL = 'https://automoney-store.pages.dev';

const PRODUCT_FILES = loadProductFiles();
const NOW = new Date().toISOString().split('T')[0];

function loadProductFiles() {
  const src = fs.readFileSync(WORKER_FILE, 'utf-8');
  const match = src.match(/const PRODUCT_FILES = \{(.*?)\};/s);
  if (!match) return {};
  const entries = match[1].match(/'([^']+)':\s*'([^']+)'/g) || [];
  const map = {};
  for (const e of entries) {
    const [, slug, file] = e.match(/'([^']+)':\s*'([^']+)'/);
    map[slug] = file;
  }
  return map;
}

function slugToName(slug) {
  return slug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function getPrice(slug) {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = ((h << 5) - h + slug.charCodeAt(i)) | 0;
  const price = 5.99 + (Math.abs(h) % 45) * 0.5;
  return price.toFixed(2);
}

const SEO_HEAD = (title, desc, slug, type = 'product') => `
<meta name="description" content="${desc}">
<link rel="canonical" href="${SITE_URL}/pages/${slug}/">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:type" content="${type}">
<meta property="og:url" content="${SITE_URL}/pages/${slug}/">
<meta property="og:site_name" content="AutoMoney">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${desc}">
<meta name="twitter:site" content="@automoneystore">
<meta name="robots" content="index, follow">
<meta name="author" content="AutoMoney Store">
<meta name="article:modified_time" content="${NOW}">
`.trim();

const CSS = `*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0a0a12;color:#e0e0e0;line-height:1.7}
.wrap{max-width:900px;margin:0 auto;padding:40px 24px}
h1{font-size:2.2rem;margin-bottom:8px;background:linear-gradient(135deg,#00e676,#00bcd4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.price{font-size:1.5rem;color:#00e676;font-weight:700;margin:16px 0}
.badge{display:inline-block;background:#00e67620;color:#00e676;padding:4px 12px;border-radius:100px;font-size:0.8rem;font-weight:600;margin-bottom:16px}
h2{color:#00e676;font-size:1.3rem;margin:32px 0 16px}
p{margin-bottom:16px;color:#b0b0b0}
ul,ol{margin:0 0 16px 24px;color:#b0b0b0}
li{margin-bottom:8px}
.pill-grid{display:flex;flex-wrap:wrap;gap:8px;margin:16px 0}
.pill{background:#16162a;border:1px solid #2a2a4a;border-radius:100px;padding:6px 16px;font-size:0.8rem;color:#aaa}
.feature-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;margin:24px 0}
.feature-card{background:#16162a;border:1px solid #2a2a4a;border-radius:12px;padding:20px}
.feature-card .title{color:#e0e0e0;font-weight:600;margin-bottom:4px}
.feature-card .desc{color:#888;font-size:0.8rem}
.cta-btn{display:inline-block;background:linear-gradient(135deg,#00e676,#00bcd4);color:#0a0a12;padding:14px 40px;border-radius:100px;text-decoration:none;font-weight:700;font-size:1rem;margin:24px 0}
.trust-bar{display:flex;justify-content:center;gap:32px;margin:24px 0;flex-wrap:wrap;color:#666;font-size:0.8rem}
.trust-bar .num{display:block;font-size:1.2rem;color:#f59e0b;font-weight:700}
.steps{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:16px;margin:24px 0}
.step{background:#16162a;border:1px solid #2a2a4a;border-radius:12px;padding:20px;text-align:center}
.step .num{width:32px;height:32px;border-radius:50%;background:#00e67620;color:#00e676;line-height:32px;font-weight:700;font-size:0.9rem;margin:0 auto 12px}
.faq-item{background:#16162a;border:1px solid #2a2a4a;border-radius:8px;padding:20px;margin-bottom:12px}
.faq-item .q{color:#00bcd4;font-weight:600;margin-bottom:8px}
.faq-item .a{color:#888;font-size:0.9rem}
.footer{text-align:center;padding:32px;color:#333;font-size:0.75rem;border-top:1px solid #2a2a4a;margin-top:48px}
@media(max-width:600px){.wrap{padding:24px 16px}h1{font-size:1.6rem}}`;

const FEATURES_POOL = [
  'Step-by-step video tutorials', 'Ready-to-use templates', 'Lifetime access & updates',
  'Community support forum', 'Downloadable PDF guide', 'Email support within 24h',
  'Commercial license included', 'Integration examples', 'API documentation',
  'Case studies & examples', 'Progress tracking sheets', 'Expert tips & tricks',
];

const STEPS = ['Purchase & Download', 'Setup Your Environment', 'Follow the Tutorials', 'Customize for Your Needs', 'Launch & Scale'];

function faqSchema(questions) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map(q => ({
      '@type': 'Question',
      name: q.q,
      acceptedAnswer: { '@type': 'Answer', text: q.a },
    })),
  };
}

function productSchema(name, desc, price) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description: desc,
    offers: { '@type': 'Offer', price, priceCurrency: 'USD', availability: 'https://schema.org/InStock' },
  };
}

async function generateProductPage(slug, rng) {
  const name = slugToName(slug);
  const price = getPrice(slug);
  const dir = path.join(PAGES_DIR, slug);
  if (fs.existsSync(path.join(dir, 'index.html'))) return false;

  fs.mkdirSync(dir, { recursive: true });
  const seed = Math.abs(crypto.createHash('md5').update(slug).digest().readUInt32LE(0));

  const [desc, included] = await Promise.all([
    ai.generate(
      `Write a product description for "${name}". Be specific about what the buyer gets.`,
      `Write 2 sentences describing ${name} ($${price}). Target: entrepreneurs.`,
      150, seed
    ),
    ai.generate(
      `Describe what's included in ${name}.`,
      `Write one sentence about the contents of ${name}.`,
      100, seed + 1
    ),
  ]);

  const features = [...FEATURES_POOL].sort(() => rng() - 0.5).slice(0, 6);
  const rating = (4.5 + rng() * 0.5).toFixed(1);
  const sold = Math.floor(50 + rng() * 500);
  const reviews = Math.floor(10 + rng() * 100);

  const faqs = [
    { q: `What is ${name}?`, a: desc },
    { q: 'How do I access this product after purchase?', a: 'After payment confirmation, you receive a unique download link on the confirmation page. Your product is also available in your account dashboard.' },
    { q: 'What format does this come in?', a: `${name} is delivered as a digital download in standard, widely-compatible formats.` },
    { q: 'How do I pay with USDT?', a: 'Send the exact amount in USDT TRC-20 to the wallet address shown at checkout. Transaction confirmations typically take 1-5 minutes.' },
    { q: 'Can I get a refund?', a: 'Yes, we offer a 7-day money-back guarantee. If the product does not meet your expectations, contact us for a full refund.' },
  ];

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${name} - AutoMoney Store</title>
${SEO_HEAD(name, desc.substring(0, 160), slug)}
<style>${CSS}</style>
<script type="application/ld+json">${JSON.stringify(productSchema(name, desc, price))}</script>
<script type="application/ld+json">${JSON.stringify(faqSchema(faqs))}</script>
</head>
<body>
<div class="wrap">
<span class="badge">&#9733; ${rating}</span>
<h1>${name}</h1>
<p class="price">$${price}</p>
<p>${desc}</p>

<div class="pill-grid">
${['Complete Guide', 'Template Pack', 'Checklist', 'Source Files', 'Lifetime Updates'].map(p => `<span class="pill">${p}</span>`).join('\n')}
</div>

<div class="feature-grid">
${features.map(f => `<div class="feature-card"><div class="title">${f}</div></div>`).join('\n')}
</div>

<div style="text-align:center">
<a href="${SITE_URL}" class="cta-btn">Buy Now - $${price}</a>
</div>

<div class="trust-bar">
<span><span class="num">&#9733; ${rating}</span> Rating</span>
<span><span class="num">${sold}</span> Sold</span>
<span><span class="num">${reviews}</span> Reviews</span>
<span><span class="num">Lifetime</span> Updates</span>
</div>

<h2>What's Included</h2>
<p>${included}</p>

<h2>How to Use</h2>
<div class="steps">
${STEPS.map(s => `<div class="step"><div class="num">&#10095;</div><div class="title">${s}</div></div>`).join('\n')}
</div>

<h2>Frequently Asked Questions</h2>
${faqs.map(f => `<div class="faq-item"><div class="q">${f.q}</div><div class="a">${f.a}</div></div>`).join('\n')}

<h2>Payment</h2>
<p>1. Click "Buy Now" above.</p>
<p>2. Send USDT (TRC-20) to: <strong>TRnz5Pi8R3hjCbBjnDuZo7ZvR57euo2q8Z</strong></p>
<p>3. Enter your TXID on the confirmation page.</p>
<p>4. Your download link will be generated within 1-5 minutes.</p>

<div class="footer">
<p>AutoMoney Store &copy; 2026. Secure payment via USDT TRC-20.</p>
</div>
</div>
</body>
</html>`;

  fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf-8');
  return true;
}

async function upgradeBlogSeo() {
  const blogDir = path.join(ROOT, 'output', 'blog');
  if (!fs.existsSync(blogDir)) return 0;
  const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.html') && f !== 'index.html');
  let count = 0;

  for (const file of files) {
    const filePath = path.join(blogDir, file);
    let html = fs.readFileSync(filePath, 'utf-8');
    const slug = file.replace(/\.html$/, '');

    if (html.includes('application/ld+json')) continue;

    const titleMatch = html.match(/<title>(.*?)<\/title>/);
    const descMatch = html.match(/<meta name="description" content="(.*?)"/);
    const title = titleMatch ? titleMatch[1] : slug;
    const desc = descMatch ? descMatch[1] : `${title} - Complete guide`;

    const schema = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: title,
      description: desc,
      datePublished: NOW,
      author: { '@type': 'Organization', name: 'AutoMoney Store' },
    });

    const seoTags = `
<meta name="description" content="${desc.substring(0, 160)}">
<link rel="canonical" href="${SITE_URL}/blog/${slug}/">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc.substring(0, 160)}">
<meta property="og:type" content="article">
<meta property="og:url" content="${SITE_URL}/blog/${slug}/">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${desc.substring(0, 160)}">
<meta name="robots" content="index, follow">
<meta name="article:modified_time" content="${NOW}">
<script type="application/ld+json">${schema}</script>`.trim();

    html = html.replace('</title>', `</title>\n${seoTags}`);
    fs.writeFileSync(filePath, html, 'utf-8');
    count++;
  }
  return count;
}

async function main() {
  console.log('=== Product Restoration + SEO Upgrade ===\n');

  // Phase 1: Generate product pages for PRODUCT_FILES slugs without pages
  console.log('Phase 1: Generating missing product pages...');
  const slugs = Object.keys(PRODUCT_FILES);
  let created = 0;
  let skipped = 0;

  for (let i = 0; i < slugs.length; i++) {
    const slug = slugs[i];
    const rng = ai.seedRand(Math.abs(crypto.createHash('md5').update(slug).digest().readUInt32LE(0)));
    const result = await generateProductPage(slug, rng);
    if (result) { created++; } else { skipped++; }
    if ((i + 1) % 20 === 0 || i === slugs.length - 1) {
      console.log(`  [${i + 1}/${slugs.length}] Created: ${created}, Skipped: ${skipped}`);
    }
  }

  // Phase 2: Upgrade blog SEO
  console.log('\nPhase 2: Upgrading blog SEO...');
  const blogCount = await upgradeBlogSeo();
  console.log(`  Upgraded ${blogCount} blog posts with SEO tags + JSON-LD`);

  // Phase 3: Stats
  const pageDirs = fs.readdirSync(PAGES_DIR, { withFileTypes: true }).filter(d => d.isDirectory());
  console.log(`\n=== Results ===`);
  console.log(`Product pages: ${pageDirs.length}`);
  console.log(`Newly created: ${created}`);
  console.log(`Product files mapped: ${slugs.length}`);
  console.log(`Blog posts SEO upgraded: ${blogCount}`);
}

main().catch(console.error);
