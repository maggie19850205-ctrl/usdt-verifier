const fs = require('fs');
const path = require('path');
const ai = require('./ai-provider.js');

const DOWNLOADS_DIR = path.join(__dirname, '..', 'output', 'downloads');
const PAGES_DIR = path.join(__dirname, '..', 'output', 'pages');

const SYSTEM = `Generate product page content as JSON only, no markdown. Value every token.

Output fields by product type:
- complete-guide: {meta, sections:[{h,b}x5], faq:[{q,a}x3]}
- checklist-workbook: {meta, intro, items:[8 strings], faq:[{q,a}x3]}
- template-pack: {meta, intro, templates:[{n,d}x5], faq:[{q,a}x3]}
- ultimate-bundle: {meta, sections:[{h,b}x4], faq:[{q,a}x3]}

meta=SEO description 20 words max. h=section heading. b=2-3 sentence body with specific tools, frameworks, numbers. q/a=question and 1-2 sentence answer.`;

function extractNameAndType(filePath) {
  const html = fs.readFileSync(filePath, 'utf-8');
  const titleMatch = html.match(/<title>(.+?) - AutoMoney Store<\/title>/);
  const priceMatch = html.match(/\$(\d+\.\d{2})/);
  const name = titleMatch ? titleMatch[1] : path.basename(filePath, '.html');
  const price = priceMatch ? priceMatch[1] : '5.99';
  const typeMatch = path.basename(filePath).match(/-(complete-guide|checklist-workbook|template-pack|ultimate-bundle)\.html$/);
  const type = typeMatch ? typeMatch[1] : 'complete-guide';
  return { name, price, type, html };
}

function renderContent(data, type) {
  if (type === 'checklist-workbook') {
    let c = `<p>${data.intro || 'Use this checklist workbook to track your progress.'}</p>\n<h2>Checklist</h2>\n<ul class="checklist">\n`;
    (data.items || []).forEach(item => { c += `  <li>${item}</li>\n`; });
    c += '</ul>\n';
    return c;
  }
  if (type === 'template-pack') {
    let c = `<p>${data.intro || 'Get 5 ready-to-use templates.'}</p>\n`;
    (data.templates || []).forEach((t, i) => {
      const n = typeof t === 'string' ? t : (t.n || t.name || 'Template ' + (i+1));
      const d = typeof t === 'string' ? '' : (t.d || t.desc || '');
      c += `<h3>${i+1}. ${n}</h3>\n<p>${d}</p>\n`;
    });
    return c;
  }
  let c = '';
  (data.sections || []).forEach(s => {
    c += `<h2>${s.h || s.heading || ''}</h2>\n<p>${s.b || s.body || ''}</p>\n`;
  });
  return c;
}

function renderFaq(data) {
  const faq = data.faq || [];
  let h = '';
  faq.forEach(f => {
    h += `  <div>\n    <h3>${f.q || f.question || ''}</h3>\n    <p>${f.a || f.answer || ''}</p>\n  </div>\n`;
  });
  return h;
}

function updateHtml(filePath, data, type) {
  let html = fs.readFileSync(filePath, 'utf-8');
  const productName = extractNameAndType(filePath).name;

  // 1. Replace main content (between content start and buy-section/Payment)
  const contentHtml = renderContent(data, type);
  let contentStart = html.indexOf('<p class="meta">');
  if (contentStart !== -1) {
    contentStart = html.indexOf('</p>', contentStart) + 4;
  } else {
    // Type B: no meta line, start after <h1>
    contentStart = html.indexOf('</h1>') + 5;
  }
  let contentEnd = html.indexOf('<div class="buy-section">');
  if (contentEnd === -1) contentEnd = html.indexOf('<h2>Payment</h2>');
  if (contentEnd === -1) contentEnd = html.indexOf('<h2>Support</h2>');
  if (contentStart === -1 || contentEnd === -1 || contentStart >= contentEnd) return false;

  const before = html.slice(0, contentStart);
  const after = html.slice(contentEnd);
  html = before + '\n\n' + contentHtml + '\n' + after;

  // 2. Replace FAQ HTML
  const faqStart = html.indexOf('<h2>Frequently Asked Questions</h2>');
  let faqEnd = html.indexOf('<div class="related-section"', faqStart);
  if (faqEnd === -1 || faqEnd < faqStart) faqEnd = html.indexOf('<div class="footer"', faqStart);
  if (faqStart !== -1 && faqEnd !== -1 && faqEnd > faqStart) {
    const beforeFaq = html.slice(0, faqStart);
    const afterFaq = html.slice(faqEnd);
    html = beforeFaq + '<h2>Frequently Asked Questions</h2>\n' + renderFaq(data) + '  \n  ' + afterFaq;
  }

  // 3. Update ALL Product schema descriptions + meta tag
  const escaped = (data.meta || '').replace(/"/g, '&quot;');
  html = html.replace(/"description":"[^"]*"/g, `"description":"${escaped}"`);
  html = html.replace(/<meta name="description" content="[^"]*">/g, `<meta name="description" content="${escaped.replace(/&quot;/g, '&amp;quot;')}">`);
  html = html.replace(/<meta property="og:description" content="[^"]*">/g, `<meta property="og:description" content="${escaped.replace(/&quot;/g, '&amp;quot;')}">`);

  // 4. Update FAQ schema
  const schemaFaq = html.match(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage"[^]*?<\/script>/);
  if (schemaFaq && data.faq && data.faq.length > 0) {
    const faqJson = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": (data.faq || []).map(f => ({
        "@type": "Question",
        "name": f.q || f.question || '',
        "acceptedAnswer": { "@type": "Answer", "text": f.a || f.answer || '' }
      }))
    };
    const newSchema = `<script type="application/ld+json">${JSON.stringify(faqJson)}</script>`;
    html = html.replace(schemaFaq[0], newSchema);
  }

  // 5. Update HowTo schema description
  const schemaHowTo = html.match(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"HowTo","name":"[^"]*","description":"[^"]*"/);
  if (schemaHowTo) {
    const escaped = (data.meta || productName).replace(/"/g, '&quot;');
    const newHowTo = schemaHowTo[0].replace(/"description":"[^"]*"/, `"description":"${escaped}"`);
    html = html.replace(schemaHowTo[0], newHowTo);
  }

  fs.writeFileSync(filePath, html, 'utf-8');
  return true;
}

async function processDownloads() {
  const files = fs.readdirSync(DOWNLOADS_DIR)
    .filter(f => f.endsWith('.html'))
    .sort();
  console.log(`Found ${files.length} download pages`);

  let done = 0, fail = 0, skip = 0;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const filePath = path.join(DOWNLOADS_DIR, file);
    const { name, price, type } = extractNameAndType(filePath);

    process.stdout.write(`[${i+1}/${files.length}] ${name}... `);

    const user = `${name} | ${type} | $${price}`;
    const result = await ai.generate(SYSTEM, user, type === 'ultimate-bundle' ? 1000 : 800);

    if (!result) {
      console.log('FAIL (no AI response)');
      fail++;
      continue;
    }

    let data;
    try { data = JSON.parse(result); } catch {
      console.log('FAIL (JSON parse)');
      fail++;
      continue;
    }

    const updated = updateHtml(filePath, data, type);
    if (updated) {
      console.log('OK');
      done++;
    } else {
      console.log('SKIP (structure mismatch)');
      skip++;
    }
  }

  console.log(`\nDone: ${done} updated, ${fail} failed, ${skip} skipped`);
}

async function processPages() {
  const dirs = fs.readdirSync(PAGES_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory());
  console.log(`\nFound ${dirs.length} product page dirs`);

  let done = 0, fail = 0;

  for (let i = 0; i < dirs.length; i++) {
    const dir = dirs[i].name;
    const indexFile = path.join(PAGES_DIR, dir, 'index.html');
    if (!fs.existsSync(indexFile)) continue;

    const html = fs.readFileSync(indexFile, 'utf-8');
    const titleMatch = html.match(/<title>(.+?) - AutoMoney Store<\/title>/);
    const name = titleMatch ? titleMatch[1] : dir;
    const type = 'complete-guide'; // product pages are all guide-style
    const priceMatch = html.match(/\$(\d+\.\d{2})/);
    const price = priceMatch ? priceMatch[1] : '5.99';

    process.stdout.write(`[${i+1}/${dirs.length}] ${name}... `);

    const user = `${name} | ${type} | $${price}`;
    const result = await ai.generate(SYSTEM, user, 800);

    if (!result) {
      console.log('FAIL');
      fail++;
      continue;
    }
    let data;
    try { data = JSON.parse(result); } catch {
      console.log('FAIL (JSON)');
      fail++;
      continue;
    }

    // Update product page: replace main content
    let updated = html;
    const contentHtml = renderContent(data, type);

    const bodyMatch = updated.match(/<div class="product-content">([\s\S]*?)<\/div>\s*<div class="cta-section">/);
    if (bodyMatch) {
      updated = updated.replace(bodyMatch[0], `<div class="product-content">\n${contentHtml}\n</div>\n<div class="cta-section">`);
    }

    // Update meta description in schema
    const schemaMatch = updated.match(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"Product","name":"[^"]*","description":"[^"]*"/);
    if (schemaMatch && data.meta) {
      const escaped = data.meta.replace(/"/g, '&quot;');
      updated = updated.replace(schemaMatch[0], schemaMatch[0].replace(/"description":"[^"]*"/, `"description":"${escaped}"`));
    }

    fs.writeFileSync(indexFile, updated, 'utf-8');
    console.log('OK');
    done++;
  }

  console.log(`\nDone: ${done} updated, ${fail} failed`);
}

async function main() {
  console.log('=== Regenerate All Product Content with DeepSeek ===\n');
  console.log('Step 1: Download pages');
  await processDownloads();
  console.log('\nStep 2: Product pages');
  await processPages();
}

main().catch(console.error);
