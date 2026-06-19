const fs = require('fs');
const path = require('path');
const https = require('https');

const API_KEY = process.env.DEEPSEEK_API_KEY;
const MODEL = 'deepseek-chat';
const DOWNLOADS_DIR = path.join(__dirname, '..', 'output', 'downloads');
const BATCH_SIZE = 3;
const DELAY_MS = 1500;

function callDeepSeek(system, user) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      model: MODEL,
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
      temperature: 0.85,
      max_tokens: 8192,
      response_format: { type: 'json_object' },
    });
    const req = https.request(
      { hostname: 'api.deepseek.com', path: '/v1/chat/completions', method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${API_KEY}`,
                   'Content-Length': Buffer.byteLength(body) }, timeout: 120000 },
      (res) => {
        let data = '';
        res.on('data', c => data += c);
        res.on('end', () => {
          try {
            const j = JSON.parse(data);
            if (j.choices && j.choices[0]) resolve(j.choices[0].message.content);
            else reject(new Error('API: ' + (j.error?.message || data.slice(0,200))));
          } catch(e) { reject(new Error('Parse: ' + data.slice(0,200))); }
        });
      }
    );
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

function getVariantType(fileName) {
  if (fileName.includes('ultimate-bundle')) return 'bundle';
  if (fileName.includes('complete-guide')) return 'guide';
  if (fileName.includes('template-pack')) return 'template';
  if (fileName.includes('checklist-workbook')) return 'checklist';
  return 'standalone';
}

function getBaseName(fileName) {
  return fileName.replace(/\.html$/, '').replace(/-(ultimate-bundle|complete-guide|template-pack|checklist-workbook)$/, '');
}

function readFileSafe(fp) {
  try { return fs.readFileSync(fp, 'utf-8'); } catch { return null; }
}

function delay(ms) {
  return new Promise(r => setTimeout(r, ms));
}

// Normalize for comparison: lowercase, remove hyphens, strip common words
function normalizeForMatch(s) {
  return s.toLowerCase().replace(/[-_\s]+/g, '').replace(/^(ai|the|best|digital|free|online|ultimate|complete|guide)/g, '');
}

// Find the closest match between DeepSeek baseName and our batch base names
function findBaseMatch(deepseekBase, batchBases) {
  const ns = normalizeForMatch(deepseekBase);
  for (const b of batchBases) {
    if (normalizeForMatch(b) === ns) return b;
    // Also try substring match
    if (ns.includes(normalizeForMatch(b)) || normalizeForMatch(b).includes(ns)) return b;
  }
  return null;
}

function buildTemplateHtml(sections) {
  if (!sections || sections.length === 0) return '<p>Ready-to-use templates included.</p>';
  let html = `<p>${sections[0].body}</p>`;
  for (let i = 1; i < sections.length; i++) {
    html += `\n<h3>${sections[i].heading}</h3>`;
    html += `\n<p>${sections[i].body}</p>`;
  }
  return html;
}

function buildChecklistHtml(sections) {
  if (!sections || sections.length === 0) return '<p>Actionable checklist included.</p>';
  let html = `<p>${sections[0].body}</p>`;
  html += `\n<h2>Checklist</h2>`;
  html += `\n<ul class="checklist">`;
  for (let i = 1; i < sections.length; i++) {
    const items = sections[i].body.split('\n').filter(s => s.trim());
    for (const item of items) {
      html += `\n  <li>${item.replace(/^-\s*/, '')}</li>`;
    }
  }
  html += `\n</ul>`;
  return html;
}

function buildSectionHtml(sections) {
  if (!sections || sections.length === 0) return '<p>Comprehensive content included.</p>';
  let html = '';
  for (const sec of sections) {
    html += `\n<h2>${sec.heading}</h2>`;
    html += `\n<p>${sec.body}</p>`;
  }
  return html;
}

function updateMetaDescription(html, desc) {
  const d = desc.replace(/"/g, '&quot;');
  html = html.replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${d}"`);
  html = html.replace(/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${d}"`);
  return html;
}

function updateMetaForBundleType(html, desc) {
  const d = desc.replace(/"/g, '\\"');
  html = html.replace(/"description":"[^"]*"/, `"description":"${d}"`);
  return html;
}

function updateFaqJsonLd(html, faq) {
  if (!faq || faq.length < 3) return html;
  const faqJson = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faq.map(q => ({
      "@type": "Question",
      "name": q.q,
      "acceptedAnswer": { "@type": "Answer", "text": q.a }
    }))
  });
  html = html.replace(
    /<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/,
    `<script type="application/ld+json">${faqJson}</script>`
  );
  return html;
}

function updateFaqBody(html, faq) {
  if (!faq || faq.length < 3) return html;
  const faqHtml = faq.map(q =>
    `  <div>\n    <h3>${q.q}</h3>\n    <p>${q.a}</p>\n  </div>`
  ).join('\n');
  html = html.replace(
    /<h2>Frequently Asked Questions<\/h2>[\s\S]*?(?=<div class="related-section|<div class="footer)/,
    `<h2>Frequently Asked Questions</h2>\n${faqHtml}\n  `
  );
  return html;
}

function replaceBodyContent(html, newContentHtml) {
  let startIdx = -1;
  
  // Layout A: <p class="meta"> (standard template)
  const metaEnd = html.match(/<p class="meta">.*?<\/p>/);
  if (metaEnd) {
    startIdx = metaEnd.index + metaEnd[0].length;
  } else {
    // Layout B: <span class="badge"> then <h1> (alt template) - start after </h1>
    const h1End = html.match(/<\/h1>/);
    if (h1End) {
      startIdx = h1End.index + h1End[0].length;
    }
  }
  
  if (startIdx === -1) return null;
  
  let endIdx = html.indexOf('<h2>Support</h2>', startIdx);
  if (endIdx === -1) endIdx = html.indexOf('<h2>Frequently Asked Questions</h2>', startIdx);
  if (endIdx === -1) endIdx = html.indexOf('<div class="buy-section"', startIdx);
  if (endIdx === -1) endIdx = html.indexOf('<h2>Payment</h2>', startIdx);
  if (endIdx === -1) { 
    endIdx = html.indexOf('<h2>Support', startIdx);
  }
  if (endIdx === -1) return null;
  return html.substring(0, startIdx) + '\n\n' + newContentHtml + '\n\n' + html.substring(endIdx);
}

async function main() {
  if (!API_KEY) { console.error('Set DEEPSEEK_API_KEY'); process.exit(1); }

  // Read ALL files, group by base name
  const allFiles = fs.readdirSync(DOWNLOADS_DIR).filter(f => f.endsWith('.html') && f !== 'index.html');
  const groups = {};
  for (const f of allFiles) {
    const base = getBaseName(f);
    if (!groups[base]) groups[base] = [];
    groups[base].push(f);
  }
  const families = Object.entries(groups).sort((a, b) => b[1].length - a[1].length);
  console.log(`Total product families: ${families.length}, ${allFiles.length} files`);

  let totalUpdated = 0;
  let batchNum = 0;
  let batchedFamiliesDone = 0;

  const START_IDX = parseInt(process.env.START_IDX || '0', 10);
  const END_IDX = parseInt(process.env.END_IDX || String(families.length), 10);

  for (let i = START_IDX; i < Math.min(families.length, END_IDX); i += BATCH_SIZE) {
    const batch = families.slice(i, i + BATCH_SIZE);
    batchNum++;

    const productLines = batch.map(([base, files]) => {
      const types = [...new Set(files.map(f => getVariantType(f)))];
      // For standalone products, treat as "guide" type
      const variantTypes = types.filter(t => t !== 'standalone');
      if (variantTypes.length === 0) variantTypes.push('guide');
      return `- baseNameSlug: "${base}" (name: "${base.split('-').map(w=>w.charAt(0).toUpperCase()+w.slice(1)).join(' ')}"). Variants: ${variantTypes.join(', ')}`;
    }).join('\n');

    const batchBases = batch.map(([b]) => b);

    console.log(`\n[Batch ${batchNum}/${Math.ceil(families.length/BATCH_SIZE)}] ${batchBases.join(', ')}`);

    const systemPrompt = `You are an expert SEO copywriter for a digital marketplace. Generate unique, specific, human-sounding content for digital product pages.

Each product has one or more of these variant types:
- "guide": Complete Guide — educational content. H2 sections with actionable advice.
- "bundle": Ultimate Bundle — value overview. H2 sections highlighting components and benefits.
- "template": Template Pack — 1 intro paragraph + 5 h3 template cards (name + description).
- "checklist": Checklist & Workbook — 1 intro paragraph + h2 "Checklist" with bullet-point items.

CRITICAL: Use the EXACT "baseNameSlug" value I provide. Do NOT modify it.
Each variant needs: metaDescription (120-155 chars), 3-5 sections (heading + body 2-3 sentences), 3 FAQ (q + a 1-2 sentences).

Return ONLY valid JSON:
{
  "products": [
    {
      "baseNameSlug": "ai-agents-automation",
      "variants": {
        "bundle": { "metaDescription": "...", "sections": [{"heading":"H2","body":"..."}], "faq": [{"q":"?","a":"."}] },
        "guide": { ... },
        "template": { ... },
        "checklist": { ... }
      }
    }
  ]
}`;

    const userPrompt = `Generate content for these ${batch.length} products. ONLY include variants that exist.

Products:
${productLines}`;

    try {
      console.log(`  Calling DeepSeek...`);
      const response = await callDeepSeek(systemPrompt, userPrompt);
      console.log(`  Response: ${(response.length/1024).toFixed(1)}KB`);

      let result;
      try { result = JSON.parse(response); }
      catch(e) { console.error(`  JSON parse fail: ${e.message.slice(0,100)}`); await delay(DELAY_MS); continue; }

      let products = [];
      if (result.products) products = result.products;
      else if (result.product) products = [result.product];
      else products = [result]; // bare object

      let updatedInBatch = 0;

      for (const product of products) {
        // Find matching base
        const dsBase = product.baseNameSlug || product.baseName || product.base || product.name || '';
        const matchedBase = findBaseMatch(dsBase, batchBases);
        
        if (!matchedBase) {
          console.log(`  NO MATCH for "${dsBase}" (tried: ${batchBases.join(', ')})`);
          // Try logging what was returned
          console.log(`  Keys in product: ${Object.keys(product).join(', ')}`);
          continue;
        }

        const baseEntry = batch.find(([b]) => b === matchedBase);
        if (!baseEntry) continue;

        const files = baseEntry[1];
        const variants = product.variants || {};

        for (const [variantType, content] of Object.entries(variants)) {
          let matchingFile = files.find(f => getVariantType(f) === variantType);
          // If variant type not found, try matching 'guide' to standalone
          if (!matchingFile && variantType === 'guide') {
            matchingFile = files.find(f => getVariantType(f) === 'standalone');
          }
          if (!matchingFile) continue;

          const fp = path.join(DOWNLOADS_DIR, matchingFile);
          let html = readFileSafe(fp);
          if (!html) continue;

          let newHtml;
          if (variantType === 'template') newHtml = buildTemplateHtml(content.sections);
          else if (variantType === 'checklist') newHtml = buildChecklistHtml(content.sections);
          else newHtml = buildSectionHtml(content.sections);

          html = updateMetaDescription(html, content.metaDescription);
          html = updateMetaForBundleType(html, content.metaDescription);
          html = updateFaqJsonLd(html, content.faq);
          html = updateFaqBody(html, content.faq);
          const replaced = replaceBodyContent(html, newHtml);
          if (replaced) {
            fs.writeFileSync(fp, replaced, 'utf-8');
            updatedInBatch++;
            totalUpdated++;
          } else {
            console.log(`  REPLACE FAILED: ${matchingFile}`);
          }
        }
      }

      console.log(`  Batch: ${updatedInBatch} files updated`);
      batchedFamiliesDone += batch.length;

    } catch (err) {
      console.error(`  ERROR: ${err.message.slice(0,200)}`);
    }

    await delay(DELAY_MS);
  }

  console.log(`\n=== DONE. Updated ${totalUpdated} files across ${batchedFamiliesDone} families ===`);
}

main().catch(console.error);
