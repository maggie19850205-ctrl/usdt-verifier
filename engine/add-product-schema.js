const fs = require('fs');
const path = require('path');

const PAGES_DIR = path.join(__dirname, '..', 'output', 'pages');
const USDT_ADDRESS = 'TRnz5Pi8R3hjCbBjnDuZo7ZvR57euo2q8Z';

function getTitle(html) {
  const m = html.match(/<h1>([^<]+)<\/h1>/);
  return m ? m[1].trim() : 'Digital Product';
}

function getSlug(html) {
  const m = html.match(/canonical.*?automoney-store\.pages\.dev\/pages\/([^/]+)/);
  return m ? m[1] : '';
}

function buildProductSchema(title, slug) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: title,
    description: `${title} - The complete ultimate bundle from AutoMoney Store. Includes comprehensive guides, workbooks, and templates.`,
    offers: {
      '@type': 'Offer',
      price: '5.00',
      priceCurrency: 'USD',
      priceValidUntil: '2027-12-31',
      availability: 'https://schema.org/InStock',
      url: `https://automoney-store.pages.dev/pages/${slug}/`
    },
    url: `https://automoney-store.pages.dev/pages/${slug}/`
  };
}

function buildFaqSchema(title) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: `What is included in ${title}?`, acceptedAnswer: { '@type': 'Answer', text: `The ultimate bundle includes everything from the complete guide, checklist workbook, and template pack - all combined into one comprehensive package with exclusive bonus content.` } },
      { '@type': 'Question', name: `How do I access ${title} after purchase?`, acceptedAnswer: { '@type': 'Answer', text: 'After payment verification, you will receive an immediate download link. The product is delivered digitally, so there is no shipping time.' } },
      { '@type': 'Question', name: 'What format does this come in?', acceptedAnswer: { '@type': 'Answer', text: 'This digital product is delivered in standard, widely-compatible formats. You can access and use the files immediately after payment verification.' } },
      { '@type': 'Question', name: 'How do I pay with USDT?', acceptedAnswer: { '@type': 'Answer', text: 'Send the exact amount in USDT TRC-20 to the provided wallet address. After sending, enter your transaction hash for instant verification and immediate download access.' } },
      { '@type': 'Question', name: 'Can I get a refund?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, we offer a 7-day money-back guarantee. If the product does not meet your expectations, contact us for a full refund.' } }
    ]
  };
}

let updated = 0;
const dirs = fs.readdirSync(PAGES_DIR).filter(d => {
  return fs.statSync(path.join(PAGES_DIR, d)).isDirectory();
});

for (const d of dirs) {
  const files = fs.readdirSync(path.join(PAGES_DIR, d)).filter(f => f.endsWith('.html'));
  for (const f of files) {
    const fp = path.join(PAGES_DIR, d, f);
    let html = fs.readFileSync(fp, 'utf-8');
    
    // Skip if already has schema
    if (html.includes('schema.org')) continue;
    
    const title = getTitle(html);
    const slug = getSlug(html) || d;
    
    const productSchema = buildProductSchema(title, slug);
    const faqSchema = buildFaqSchema(title);
    
    const schemas = `
<script type="application/ld+json">${JSON.stringify(productSchema)}</script>
<script type="application/ld+json">${JSON.stringify(faqSchema)}</script>`;
    
    // Insert before </head>
    html = html.replace('</head>', schemas + '\n</head>');
    fs.writeFileSync(fp, html, 'utf-8');
    updated++;
    console.log(`  Added schema: ${d}/${f}`);
  }
}

console.log(`\nUpdated ${updated} product pages with schema`);
