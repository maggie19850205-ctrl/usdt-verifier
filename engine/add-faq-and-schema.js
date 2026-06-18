const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'output', 'downloads');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const USDT_ADDRESS = 'TRnz5Pi8R3hjCbBjnDuZo7ZvR57euo2q8Z';

const typeLabels = {
  'Complete Guide': 'Guide',
  'Checklist & Workbook': 'Workbook',
  'Template Pack': 'Templates',
  'Ultimate Bundle': 'Bundle'
};

function getTypeMeta(html) {
  if (html.includes('Checklist & Workbook')) return { type: 'Checklist & Workbook', label: 'Workbook', faqs: [
    { q: 'How is this workbook organized?', a: 'The workbook is organized into progressive phases covering foundation, setup, implementation, optimization, launch, and maintenance. Each phase has actionable checklists you can complete step by step.' },
    { q: 'Can I reuse this workbook for multiple projects?', a: 'Yes, the checklists are designed to be reusable. You can apply them to different projects by adapting the tasks to your specific context.' },
    { q: 'Is prior experience required?', a: 'No prior experience is required. The workbook starts with foundational concepts and gradually builds up to advanced techniques.' },
    { q: 'How long does it take to complete?', a: 'Most users complete the workbook in 1-2 hours, though you can work through it at your own pace.' }
  ]};
  if (html.includes('Template Pack')) return { type: 'Template Pack', label: 'Templates', faqs: [
    { q: 'What formats are the templates in?', a: 'Templates are provided in standard formats compatible with popular software. Each template is ready to use immediately after download.' },
    { q: 'Can I customize the templates?', a: 'Absolutely. All templates are fully editable so you can tailor them to your specific needs, branding, and requirements.' },
    { q: 'How many templates are included?', a: 'The template pack includes multiple variations and versions, giving you plenty of options to choose from for different use cases.' },
    { q: 'Are there usage restrictions?', a: 'You may use the templates for personal and commercial projects. Redistribution or resale of the raw template files is not permitted.' }
  ]};
  if (html.includes('Ultimate Bundle')) return { type: 'Ultimate Bundle', label: 'Bundle', faqs: [
    { q: 'What is included in the ultimate bundle?', a: 'The ultimate bundle is our most complete package, combining the comprehensive guide, workbook, and templates into one discounted package with exclusive bonus content.' },
    { q: 'How is this different from buying separately?', a: 'The bundle includes everything from individual products plus exclusive bonus content not available elsewhere, all at a significant discount compared to separate purchases.' },
    { q: 'How long to complete the bundle?', a: 'Depending on your pace and experience level, the complete bundle takes 2-4 hours to work through thoroughly.' },
    { q: 'Is the bundle suitable for beginners?', a: 'Yes, the bundle is designed for all skill levels. Beginners can start from the beginning, while experienced users can jump to advanced sections.' }
  ]};
  return { type: 'Complete Guide', label: 'Guide', faqs: [
    { q: 'What does this guide cover?', a: 'This guide covers fundamental concepts, practical implementation steps, advanced techniques, optimization strategies, and troubleshooting tips.' },
    { q: 'Who is this guide for?', a: 'This guide is suitable for beginners through intermediate users who want to develop practical skills and knowledge.' },
    { q: 'How is the guide structured?', a: 'The guide is organized into progressive sections: introduction, core concepts, step-by-step implementation, advanced topics, and best practices.' },
    { q: 'Can I apply this to commercial projects?', a: 'Yes, the knowledge and techniques can be applied to commercial projects. The guide file itself is for personal use only.' }
  ]};
}

function getTitle(html) {
  const m = html.match(/<h1>([^<]+)<\/h1>/);
  return m ? m[1].trim() : 'Digital Product';
}

function makeSlugFromTitle(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function buildProductSchema(title, typeMeta, slug) {
  const t = typeMeta.type;
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: title,
    description: `${title} - ${t} from AutoMoney Store. ${t === 'Complete Guide' ? 'A comprehensive step-by-step guide' : t === 'Checklist & Workbook' ? 'A practical checklist and workbook' : t === 'Template Pack' ? 'Ready-to-use templates' : 'The complete bundle'} for mastering ${slug.replace(/-/g, ' ')}.`,
    offers: {
      '@type': 'Offer',
      price: '5.00',
      priceCurrency: 'USD',
      priceValidUntil: '2027-12-31',
      availability: 'https://schema.org/InStock',
      url: `https://automoney-store.pages.dev/downloads/${slug}`
    },
    url: `https://automoney-store.pages.dev/downloads/${slug}`
  };
}

function buildFaqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a }
    }))
  };
}

function buildFaqHtml(faqs) {
  const items = faqs.map(f => `
  <div>
    <h3>${f.q}</h3>
    <p>${f.a}</p>
  </div>`).join('');
  return `
<h2>Frequently Asked Questions</h2>${items}`;
}

let count = 0;
let updated = 0;
for (const file of files) {
  const fp = path.join(dir, file);
  let html = fs.readFileSync(fp, 'utf-8');
  count++;

  // Skip if already processed
  if (html.includes('"Product"') && html.includes('"FAQPage"')) {
    continue;
  }

  const title = getTitle(html);
  const slug = path.basename(file, '.html');
  const typeMeta = getTypeMeta(html);

  // Build schemas
  const productSchema = buildProductSchema(title, typeMeta, slug);
  const faqSchema = buildFaqSchema(typeMeta.faqs);
  const schemas = `<script type="application/ld+json">${JSON.stringify(productSchema)}</script>\n<script type="application/ld+json">${JSON.stringify(faqSchema)}</script>\n`;

  // Add schemas before </head>
  html = html.replace('</head>', schemas + '</head>');

  // Add visible FAQ section before .footer
  const faqVisible = buildFaqHtml(typeMeta.faqs);
  html = html.replace('<div class="footer">', faqVisible + '\n<div class="footer">');

  fs.writeFileSync(fp, html, 'utf-8');
  updated++;
}

console.log(`Processed ${count} files, added Product + FAQPage schema + visible FAQs to ${updated} files`);
