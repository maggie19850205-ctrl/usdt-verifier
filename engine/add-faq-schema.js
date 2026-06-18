const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'output', 'downloads');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const faqTemplates = {
  'Complete Guide': [
    { q: 'What is included in this complete guide?', a: 'This complete guide covers everything you need to know, from fundamentals to advanced techniques. It includes step-by-step instructions, best practices, expert tips, and real-world examples to help you master the topic.' },
    { q: 'Who is this guide for?', a: 'This guide is designed for beginners and intermediate users who want to build practical skills. No prior experience is required, and each concept is explained clearly.' },
    { q: 'How is this guide structured?', a: 'The guide is organized into progressive sections: introduction, core concepts, practical implementation, advanced techniques, optimization tips, and troubleshooting.' },
    { q: 'Can I use this for commercial projects?', a: 'Yes, the content and techniques in this guide can be applied to commercial projects. The file itself is for personal use only.' }
  ],
  'Checklist & Workbook': [
    { q: 'What is included in this checklist workbook?', a: 'This workbook contains structured checklists organized by phase, including foundation, setup, implementation, optimization, launch, and maintenance sections.' },
    { q: 'How do I use this workbook?', a: 'Work through each phase sequentially, checking off items as you complete them. Each section builds on the previous one for a comprehensive result.' },
    { q: 'Can I print this workbook?', a: 'Yes, the workbook is designed to be printable. You can check off items on paper or use a PDF reader on your device.' }
  ],
  'Template Pack': [
    { q: 'What formats are included in this template pack?', a: 'The template pack includes ready-to-use templates in multiple formats optimized for immediate use in your projects.' },
    { q: 'Can I customize these templates?', a: 'Yes, all templates are fully customizable. You can modify them to fit your specific needs and brand requirements.' },
    { q: 'Are these templates compatible with popular tools?', a: 'Yes, the templates are designed to work with standard software and platforms. Specific compatibility details are included in the documentation.' }
  ],
  'Ultimate Bundle': [
    { q: 'What does the ultimate bundle include?', a: 'The ultimate bundle is our most comprehensive package, combining everything from the guide, workbook, and templates into one complete resource.' },
    { q: 'Is this bundle better value than individual products?', a: 'Yes, the ultimate bundle offers significant savings compared to purchasing each component separately, plus exclusive bonus content not available elsewhere.' },
    { q: 'How long does it take to go through the bundle?', a: 'Depending on your pace, the complete bundle can take anywhere from a few hours to a few days to work through thoroughly.' }
  ]
};

function getTypeFromPage(html) {
  if (html.includes('Checklist & Workbook')) return 'Checklist & Workbook';
  if (html.includes('Template Pack')) return 'Template Pack';
  if (html.includes('Ultimate Bundle')) return 'Ultimate Bundle';
  if (html.includes('Complete Guide')) return 'Complete Guide';
  return 'Complete Guide';
}

function getTitleFromPage(html) {
  const m = html.match(/<h1>([^<]+)<\/h1>/);
  return m ? m[1].trim() : 'Digital Product';
}

function generateFaqSchema(title, type) {
  const faqs = faqTemplates[type] || faqTemplates['Complete Guide'];
  const items = faqs.map((f, i) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a }
  }));
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items
  };
}

let count = 0;
let schemaCount = 0;
for (const file of files) {
  const filePath = path.join(dir, file);
  let html = fs.readFileSync(filePath, 'utf-8');
  count++;

  // Skip if already has FAQPage schema
  if (html.includes('"FAQPage"')) {
    continue;
  }

  const title = getTitleFromPage(html);
  const type = getTypeFromPage(html);
  const schema = generateFaqSchema(title, type);
  const schemaHtml = `<script type="application/ld+json">${JSON.stringify(schema, null, 2)}</script>\n`;

  // Insert before </head>
  if (html.includes('</head>')) {
    html = html.replace('</head>', schemaHtml + '</head>');
    fs.writeFileSync(filePath, html, 'utf-8');
    schemaCount++;
  }
}

console.log(`Processed ${count} files, added FAQPage schema to ${schemaCount} files`);
