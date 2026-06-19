const fs = require('fs');
const path = require('path');

const DOWNLOADS = path.join(__dirname, '..', 'output', 'downloads');
const OUTPUT = path.join(__dirname, '..', 'output');

// === 1. Create llms.txt ===
const productFiles = fs.readdirSync(DOWNLOADS).filter(f => f.endsWith('.html') && f !== 'index.html');
let llmsContent = `# AutoMoney Store - AI-powered digital products\n> Digital products for productivity, SEO, content creation, and business automation built with AI workflows.\n\n## Products\n`;
for (const file of productFiles) {
  const name = file.replace(/\.html$/, '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  llmsContent += `- [${name}](https://automoney-store.pages.dev/downloads/${file}): AI-powered ${file.includes('ultimate-bundle') ? 'bundle with templates, guides, and checklists' : file.includes('template') ? 'ready-to-use template pack' : file.includes('guide') ? 'comprehensive guide' : 'practical workbook'}\n`;
}
llmsContent += `\n## Tools\n- [Schema Generator](https://automoney-store.pages.dev/tools/schema-generator.html)\n- [SERP Preview](https://automoney-store.pages.dev/tools/serp-preview.html)\n- [Readability Score](https://automoney-store.pages.dev/tools/readability-score.html)\n- [Word Counter](https://automoney-store.pages.dev/tools/word-counter.html)\n- [QR Code Generator](https://automoney-store.pages.dev/tools/qr-code.html)\n- [More free tools](https://automoney-store.pages.dev/tools/)\n\n## Blog\n- [Blog Home](https://automoney-store.pages.dev/blog/)\n`;
fs.writeFileSync(path.join(OUTPUT, 'llms.txt'), llmsContent, 'utf8');
console.log('Created llms.txt');

// === 2. Update robots.txt ===
const robotsContent = `User-agent: PerplexityBot
Allow: /

User-agent: *
Allow: /
Sitemap: https://automoney-store.pages.dev/sitemap.xml
`;
fs.writeFileSync(path.join(OUTPUT, 'robots.txt'), robotsContent, 'utf8');
console.log('Updated robots.txt');

// === 3. Add Organization schema + improve FAQ on ALL product pages ===
const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "AutoMoney Store",
  "url": "https://automoney-store.pages.dev",
  "description": "Digital products marketplace powered by AI workflows",
  "sameAs": ["https://github.com/maggie19850205-ctrl/auto-money-system-v3"]
};

const ORG_TAG = `<script type="application/ld+json">${JSON.stringify(ORG_SCHEMA)}</script>`;

function getBetterQuestions(productName) {
  const isBundle = productName.includes('ultimate-bundle');
  const isTemplate = productName.includes('template-pack');
  const isGuide = productName.includes('complete-guide');
  const isChecklist = productName.includes('checklist-workbook');
  const category = productName.replace(/-(ultimate-bundle|template-pack|complete-guide|checklist-workbook)/g, '').replace(/-/g, ' ');
  const name = productName.replace(/-/g, ' ');
  const type = isBundle ? 'a complete set of templates, step-by-step guides, and actionable checklists' : isTemplate ? 'ready-to-use templates you can customize immediately' : isGuide ? 'a comprehensive guide covering best practices and workflows' : 'a practical workbook with checklists and exercises';

  return [
    { q: `What exactly is included in the ${name}?`,
      a: `The ${name} includes ${type} designed to help you implement AI-driven solutions for ${category} in under 30 minutes. You get instant digital access after purchase.` },
    { q: `How can ${category} tools improve my daily workflow?`,
      a: `${category.charAt(0).toUpperCase() + category.slice(1)} tools automate repetitive tasks, reduce manual effort by up to 60%, and help you focus on high-value strategic work. Our templates save an average of 8 hours per week compared to building from scratch.` },
    { q: `Is this product suitable for beginners with no experience in ${category}?`,
      a: `Yes, this product is designed for all skill levels. The templates include step-by-step instructions and examples, making it easy for beginners to start while still providing advanced techniques for experienced users. No prior experience in ${category} is required.` },
    { q: `What format are the files delivered in and can I edit them?`,
      a: `All files are delivered as editable PDF, DOCX, and spreadsheet formats compatible with Google Docs, Microsoft Office 365, and Notion. You can fully customize every template to match your brand and requirements.` },
    { q: `Can I use these templates for commercial projects and client work?`,
      a: `Yes, you may use the templates and content for your own commercial projects and client work. However, reselling or redistributing the raw digital files is not permitted under the license agreement. Each purchase covers one user.` },
    { q: `How long does it take to get my files after payment?`,
      a: `Files are delivered instantly after payment verification. Simply send USDT (TRC-20) to our wallet address, enter your email and transaction ID, and you will receive immediate download links. The entire process takes less than 5 minutes.` },
    { q: `What if the product doesn't meet my expectations?`,
      a: `Due to the digital nature of all products, sales are final. However, we stand behind our quality. If you experience any technical issues accessing your files, contact our support team and we will resolve your issue within 24 hours.` }
  ];
}

let orgAdded = 0, faqImproved = 0;

for (const file of productFiles) {
  const fp = path.join(DOWNLOADS, file);
  let html = fs.readFileSync(fp, 'utf8');
  const productName = file.replace('.html', '');

  if (!html.includes('"@type":"Organization"') && !html.includes('"@type": "Organization"')) {
    html = html.replace('</head>', `  ${ORG_TAG}\n</head>`);
    orgAdded++;
  }

  const betterFAQs = getBetterQuestions(productName);
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": betterFAQs.map(f => ({
    "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a }
  }))};
  const newFaqTag = `<script type="application/ld+json">${JSON.stringify(faqSchema)}</script>`;

  const oldFaqJson = /<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage"[\s\S]*?<\/script>/;
  if (oldFaqJson.test(html)) {
    html = html.replace(oldFaqJson, newFaqTag);
  } else {
    html = html.replace('</head>', `  ${newFaqTag}\n</head>`);
  }
  faqImproved++;

  const oldFaqSection = /<h2>Frequently Asked Questions<\/h2>[\s\S]*?(?=(?:<div class="related-section|<div class="footer))/;
  let faqHtml = '<h2>Frequently Asked Questions</h2>\n';
  for (const f of betterFAQs) {
    faqHtml += `  <div>\n    <h3>${f.q}</h3>\n    <p>${f.a}</p>\n  </div>\n`;
  }
  html = html.replace(oldFaqSection, faqHtml);

  fs.writeFileSync(fp, html, 'utf8');
}

console.log(`Organization schema added: ${orgAdded} pages`);
console.log(`FAQ schema improved: ${faqImproved} pages`);

// === 4. Add Article schema to blog pages ===
const BLOG = path.join(OUTPUT, 'blog');
if (fs.existsSync(BLOG)) {
  const blogFiles = fs.readdirSync(BLOG).filter(f => f.endsWith('.html') && f !== 'index.html');
  for (const file of blogFiles) {
    const fp = path.join(BLOG, file);
    let html = fs.readFileSync(fp, 'utf8');
    if (!html.includes('"@type":"Article"') && !html.includes('"@type": "Article"')) {
      const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": file.replace('.html', '').replace(/-/g, ' '),
        "datePublished": "2026-06-19",
        "dateModified": "2026-06-19",
        "author": { "@type": "Person", "name": "AutoMoney Team" },
        "publisher": { "@type": "Organization", "name": "AutoMoney Store", "url": "https://automoney-store.pages.dev" }
      };
      html = html.replace('</head>', `  <script type="application/ld+json">${JSON.stringify(articleSchema)}</script>\n</head>`);
      fs.writeFileSync(fp, html, 'utf8');
    }
  }
}

console.log('\nGEO optimization complete!');
