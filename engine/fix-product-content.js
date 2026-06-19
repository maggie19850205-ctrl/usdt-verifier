const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PAGES_DIR = path.join(__dirname, '..', 'output', 'pages');

const PRODUCT_INTROS = [
  'Everything you need to master this topic, packed into one comprehensive package. Designed for busy professionals who want results without the fluff.',
  'A complete, ready-to-use resource that saves you hours of research and trial-and-error. Jump straight into what matters and start seeing results.',
  'Stop searching for scattered information. This all-in-one resource gives you a proven system that works, with clear instructions and practical examples.',
  'Whether you are a beginner or experienced professional, this resource adapts to your level. Clear explanations, actionable steps, and real results.',
];

const WHATS_INCLUDED = [
  'Comprehensive guide covering everything from fundamentals to advanced techniques',
  'Ready-to-use templates that save hours of setup and formatting work',
  'Step-by-step instructions with real-world examples and practical applications',
  'Expert tips and best practices refined through years of professional experience',
  'Lifetime access with free updates whenever new content is added',
];

const HOW_TO_USE = [
  { title: 'Download', desc: 'Instant access after payment confirmation. Download directly to your device.' },
  { title: 'Review', desc: 'Go through the material at your own pace. Each section builds on the previous one.' },
  { title: 'Apply', desc: 'Use the templates and examples to implement what you have learned right away.' },
  { title: 'Master', desc: 'Refer back anytime. With lifetime access, you can learn and re-learn at your convenience.' },
];

const FAQ_CLEAN = {
  what: 'A complete resource designed to help you master this topic efficiently. It includes step-by-step guidance, practical templates, and real-world examples that make learning easy and effective.',
  howAccess: 'After payment confirmation, you will receive a unique download link on the confirmation page. Your purchase is also saved for future access.',
  format: 'This product is delivered as a digital download in standard, widely-compatible formats. No special software is required to use it.',
  refund: 'Yes, we offer a 7-day money-back guarantee. If the product does not meet your expectations, contact us and we will issue a full refund — no questions asked.',
};

const dirs = fs.readdirSync(PAGES_DIR, { withFileTypes: true }).filter(d => d.isDirectory());

let cleaned = 0;
let skipped = 0;

for (const dir of dirs) {
  const idxPath = path.join(PAGES_DIR, dir.name, 'index.html');
  if (!fs.existsSync(idxPath)) continue;

  let html = fs.readFileSync(idxPath, 'utf-8');

  // Skip if page already has clean content (check for new intro text)
  if (html.includes('Everything you need to master this topic, packed into one comprehensive package')) {
    skipped++;
    continue;
  }

  let seed = crypto.createHash('md5').update(dir.name).digest().readUInt32LE(0);
  const rng = () => { seed = (seed * 1103515245 + 12345) >>> 0; return (seed & 0x7fffffff) / 0x7fffffff; };
  const productName = dir.name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  // 1. Clean opening paragraph (first <p> after <p class="price">)
  const intro = PRODUCT_INTROS[Math.floor(rng() * PRODUCT_INTROS.length)];
  const priceEnd = html.indexOf('</p>', html.indexOf('<p class="price">'));
  if (priceEnd === -1) continue;

  // Find the opening paragraph (first <p> after price)
  const firstPSearch = html.indexOf('<p>', priceEnd);
  const firstPEnd = html.indexOf('</p>', firstPSearch);
  if (firstPSearch === -1 || firstPEnd === -1) continue;

  const introPara = `<p>${intro}</p>`;
  html = html.substring(0, firstPSearch) + introPara + html.substring(firstPEnd + 4);

  // 2. Clean meta description
  const descMatch = html.match(/<meta name="description" content="[^"]*">/);
  const ogDescMatch = html.match(/<meta property="og:description" content="[^"]*">/);
  const twDescMatch = html.match(/<meta name="twitter:description" content="[^"]*">/);
  const cleanMeta = productName + '. ' + intro.substring(0, 100).replace(/"/g, '&quot;');
  
  if (descMatch) html = html.replace(descMatch[0], `<meta name="description" content="${cleanMeta}">`);
  if (ogDescMatch) html = html.replace(ogDescMatch[0], `<meta property="og:description" content="${cleanMeta}">`);
  if (twDescMatch) html = html.replace(twDescMatch[0], `<meta name="twitter:description" content="${cleanMeta}">`);

  // 3. Fix schema description
  const schemaDescMatch = html.match(/"description":"[^"]*"/);
  if (schemaDescMatch) {
    const cleanSchemaDesc = productName + '. ' + intro.replace(/"/g, '&quot;').substring(0, 120);
    html = html.replace(schemaDescMatch[0], `"description":"${cleanSchemaDesc}"`);
  }

  // 4. Clean "What's Included" section
  const incH2 = html.indexOf('<h2>What\'s Included</h2>');
  if (incH2 !== -1) {
    const incEndP = html.indexOf('</p>', incH2);
    const incNextH2 = html.indexOf('<h2>', incH2 + 20);
    const incEnd = incEndP !== -1 ? incEndP + 4 : incNextH2;

    const shuffled = [...WHATS_INCLUDED].sort(() => rng() - 0.5);
    const incItems = shuffled.slice(0, 4 + Math.floor(rng() * 2));
    let incContent = '';
    for (const item of incItems) {
      incContent += `\n  <li>${item}</li>`;
    }
    const incHtml = `\n<ul>${incContent}\n</ul>`;
    
    html = html.substring(0, incH2 + '<h2>What\'s Included</h2>'.length) + incHtml + html.substring(incEnd);
  }

  // 5. Fix "How to Use" section — replace everything between <h2>How to Use</h2> and next <h2>
  const stepsH2 = html.indexOf('<h2>How to Use</h2>');
  if (stepsH2 !== -1) {
    const nextH2 = html.indexOf('<h2>', stepsH2 + 1);
    if (nextH2 !== -1) {
      let newSteps = '\n<div class="steps">\n';
      for (const step of HOW_TO_USE) {
        newSteps += `<div class="step"><div class="num"></div><strong style="color:#e0e0e0">${step.title}</strong><p style="color:#888;font-size:0.8rem;margin-top:4px">${step.desc}</p></div>\n`;
      }
      newSteps += '<p style="color:#666;font-size:0.85rem;margin-top:12px;text-align:center">Detailed instructions are included with your download.</p>\n';
      }
      newSteps += '</div>\n';
      html = html.substring(0, stepsH2 + '<h2>How to Use</h2>'.length) + newSteps + html.substring(nextH2);
    }
  }

  // 6. Fix FAQ first answer (garbage description)
  const faqMatch = html.match(/<h2>Frequently Asked Questions<\/h2>[\s\S]*?<div class="faq-item">/);
  if (faqMatch) {
    // Replace the first FAQ answer (what is this product)
    const firstADiv = html.indexOf('<div class="a">');
    if (firstADiv !== -1) {
      const firstAEnd = html.indexOf('</div>', firstADiv);
      if (firstAEnd !== -1) {
        html = html.substring(0, firstADiv + '<div class="a">'.length) + FAQ_CLEAN.what + html.substring(firstAEnd);
      }
    }
  }

  // 7. Fix schema FAQ first answer
  const schemaFaqMatch = html.match(/"name":"What is[^"]*"/);
  if (schemaFaqMatch) {
    const answerMatch = html.match(new RegExp(`"acceptedAnswer":\\{"@type":"Answer","text":"[^"]*"\\},\\{"@type":"Question","name":"How do I access`));
    if (answerMatch) {
      const answerStr = answerMatch[0];
      html = html.replace(answerStr, `"acceptedAnswer":{"@type":"Answer","text":"${FAQ_CLEAN.what.replace(/"/g, '&quot;')}"},{"@type":"Question","name":"How do I access`);
    }
  }

  fs.writeFileSync(idxPath, html, 'utf-8');
  cleaned++;
  if (cleaned <= 3) console.log(`  ${dir.name}`);
}

console.log(`\nCleaned ${cleaned} product pages, ${skipped} skipped`);
