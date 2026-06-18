const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'output');
const DOWNLOADS_DIR = path.join(ROOT, 'downloads');
const PAGES_DIR = path.join(ROOT, 'pages');

// Extract meaningful keywords from a title
function extractKeywords(title) {
  const stopWords = ['the', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
    'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'can', 'could',
    'may', 'might', 'shall', 'should', 'to', 'of', 'in', 'for', 'on', 'with',
    'at', 'by', 'from', 'as', 'into', 'through', 'during', 'before', 'after',
    'above', 'below', 'between', 'out', 'off', 'over', 'under', 'again',
    'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how',
    'all', 'each', 'every', 'both', 'few', 'more', 'most', 'other', 'some',
    'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too',
    'very', 'just', 'and', 'but', 'or', 'if', 'because', 'about', 'up',
    'your', 'his', 'her', 'its', 'our', 'their', 'this', 'that', 'these',
    'those', 'it', 'its', 'what', 'which', 'who', 'whom'];

  const words = title.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 2 && !stopWords.includes(w));

  // Deduplicate
  return [...new Set(words)];
}

// Score relevance between two keyword sets
function scoreRelevance(kw1, kw2) {
  let score = 0;
  for (const w of kw1) {
    if (kw2.includes(w)) score += 2;
    for (const w2 of kw2) {
      if (w.includes(w2) || w2.includes(w)) score += 1;
    }
  }
  return score;
}

// Collect all downloads metadata
function collectDownloads() {
  const files = fs.readdirSync(DOWNLOADS_DIR).filter(f => f.endsWith('.html') && f !== 'index.html');
  const items = [];
  for (const f of files) {
    const fp = path.join(DOWNLOADS_DIR, f);
    const html = fs.readFileSync(fp, 'utf-8');
    const titleMatch = html.match(/<h1>([^<]+)<\/h1>/);
    const title = titleMatch ? titleMatch[1].trim() : f.replace(/\.html$/, '');
    const slug = f.replace(/\.html$/, '');
    const kw = extractKeywords(title);
    items.push({ slug, title, keywords: kw, file: f, html });
  }
  return items;
}

// Collect all product pages metadata
function collectProducts() {
  const items = [];
  const dirs = fs.readdirSync(PAGES_DIR).filter(d => {
    const dpath = path.join(PAGES_DIR, d);
    return fs.statSync(dpath).isDirectory();
  });
  for (const d of dirs) {
    const htmlFiles = fs.readdirSync(path.join(PAGES_DIR, d)).filter(f => f.endsWith('.html'));
    for (const f of htmlFiles) {
      const fp = path.join(PAGES_DIR, d, f);
      const html = fs.readFileSync(fp, 'utf-8');
      const titleMatch = html.match(/<h1>([^<]+)<\/h1>/);
      const title = titleMatch ? titleMatch[1].trim() : f.replace(/\.html$/, '');
      // Also get tags from the product page
      const tagMatch = html.match(/<span>([^<]+)<\/span>/g);
      const tags = tagMatch ? tagMatch.map(t => t.replace(/<\/?span>/g, '')) : [];
      const slug = `pages/${d}/${f.replace(/\.html$/, '')}`;
      const kw = extractKeywords(title);
      // Add tags as keywords too
      for (const tag of tags) {
        const tagWords = extractKeywords(tag);
        kw.push(...tagWords);
      }
      items.push({ slug, title, keywords: [...new Set(kw)], file: path.join(d, f), html, dir: d });
    }
  }
  return items;
}

// Find top N related items with fallback to random
function findRelated(item, allItems, count = 5) {
  const scored = allItems
    .filter(other => other.slug !== item.slug)
    .map(other => ({
      ...other,
      score: scoreRelevance(item.keywords, other.keywords)
    }));

  const matched = scored.filter(s => s.score > 0);
  matched.sort((a, b) => b.score - a.score);

  if (matched.length >= count) return matched.slice(0, count);

  // If not enough matches, fill with random items
  const matchedSlugs = new Set(matched.map(m => m.slug));
  const unmatched = scored.filter(s => !matchedSlugs.has(s.slug) && s.score === 0);
  // Shuffle
  for (let i = unmatched.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [unmatched[i], unmatched[j]] = [unmatched[j], unmatched[i]];
  }
  const filler = unmatched.slice(0, count - matched.length);
  return [...matched, ...filler];
}

// Generate related links HTML
function generateRelatedHtml(links, type) {
  if (!links.length) return '';
  const heading = type === 'product' ? 'Related Products' : 'You May Also Like';
  const items = links.map(l => {
    const url = type === 'product'
      ? `https://automoney-store.pages.dev/${l.slug}/`
      : `https://automoney-store.pages.dev/downloads/${l.slug}`;
    return `<li><a href="${url}">${l.title}</a></li>`;
  }).join('\n      ');
  return `
  <div class="related-section" style="margin-top:40px;padding-top:24px;border-top:1px solid #2a2a4a">
    <h2 style="color:#00e676;font-size:1.2rem;margin-bottom:16px">${heading}</h2>
    <ul style="list-style:none;padding:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:8px">
      ${items}
    </ul>
  </div>`;
}

// === MAIN ===

console.log('Scanning download pages...');
const downloads = collectDownloads();
console.log(`Found ${downloads.length} download pages`);

console.log('Scanning product pages...');
const products = collectProducts();
console.log(`Found ${products.length} product pages`);

// Build keyword index for efficient matching
console.log('\nGenerating cross-links...');

// For each download page, find related products
let dlUpdated = 0;
for (const dl of downloads) {
  const related = findRelated(dl, products, 5);
  if (!related.length) continue;

  const html = dl.html;
  // Skip if already has cross-links
  if (html.includes('related-section')) continue;

  const relatedHtml = generateRelatedHtml(related, 'product');

  // Insert before footer
  if (html.includes('<div class="footer">')) {
    const newHtml = html.replace('<div class="footer">', relatedHtml + '\n<div class="footer">');
    if (newHtml !== html) {
      fs.writeFileSync(path.join(DOWNLOADS_DIR, dl.file), newHtml, 'utf-8');
      dlUpdated++;
    }
  }
}
console.log(`Updated ${dlUpdated} download pages with related product links`);

// For each product page, find related downloads
// Use category-based matching for better relevance
const categoryMap = {
  'blog': ['blog', 'content', 'seo', 'article', 'writing', 'newsletter'],
  'medium': ['content', 'writing', 'blog', 'article'],
  'youtube': ['video', 'youtube', 'tiktok', 'social', 'content'],
  'affiliate': ['affiliate', 'marketing', 'sales', 'funnel'],
  'comparison': ['review', 'comparison', 'affiliate', 'seo'],
  'coupon': ['coupon', 'deal', 'marketing', 'sales'],
  'notion': ['notion', 'productivity', 'template', 'dashboard'],
  'canva': ['canva', 'template', 'design', 'social'],
  'svg': ['icon', 'svg', 'design', 'ui'],
  'icon': ['icon', 'svg', 'design', 'ui'],
  'ui': ['ui', 'design', 'icon', 'svg', 'template'],
  'font': ['font', 'design', 'sfx'],
  'ebook': ['ebook', 'book', 'guide', 'writing'],
  'coloring': ['coloring', 'book', 'activity', 'kids'],
  'activity': ['activity', 'coloring', 'book', 'kids'],
  'redbubble': ['print', 'design', 'art', 'merch'],
  'teepublic': ['print', 'design', 'art', 'merch'],
  'pdf': ['pdf', 'tool', 'document'],
  'image': ['image', 'photo', 'design', 'tool'],
  'text': ['text', 'writing', 'content', 'tool'],
  'dev': ['developer', 'code', 'api', 'tool'],
  'calculator': ['calculator', 'tool', 'math'],
  'converter': ['converter', 'tool', 'format'],
  'qr': ['qr', 'code', 'tool'],
  'seo': ['seo', 'search', 'ranking', 'content'],
  'password': ['password', 'security', 'tool'],
  'crypto': ['crypto', 'blockchain', 'bitcoin', 'payment'],
  'email': ['email', 'newsletter', 'marketing'],
  'invoice': ['invoice', 'billing', 'template'],
  'contract': ['contract', 'legal', 'template', 'document'],
  'resume': ['resume', 'cv', 'job', 'career'],
  'finance': ['finance', 'money', 'invest', 'budget'],
  'fitness': ['fitness', 'health', 'workout'],
  'travel': ['travel', 'trip', 'vacation'],
  'recipe': ['recipe', 'cooking', 'food'],
  'mindfulness': ['mindfulness', 'meditation', 'health'],
  'parent': ['parent', 'kids', 'family'],
  'password': ['password', 'security', 'tool'],
  'habit': ['habit', 'tracker', 'productivity'],
  'planner': ['planner', 'calendar', 'organizer'],
  'social': ['social', 'instagram', 'twitter', 'tiktok', 'facebook'],
  'marketing': ['marketing', 'social', 'ads', 'funnel'],
  'shopify': ['shopify', 'ecommerce', 'store'],
  'freelance': ['freelance', 'proposal', 'client', 'invoice'],
};

let prodUpdated = 0;
for (const prod of products) {
  // Try keyword-based matching first
  let related = findRelated(prod, downloads, 5);

  // If not enough matches, try category-based
  if (related.length < 3) {
    const dirLower = prod.dir.toLowerCase();
    const catKeys = Object.keys(categoryMap);
    const relevantCats = catKeys.filter(k => dirLower.includes(k));
    const catKeywords = [];
    for (const ck of relevantCats) {
      catKeywords.push(...categoryMap[ck]);
    }
    if (catKeywords.length > 0) {
      const catRelated = downloads
        .filter(dl => {
          const dlTitle = dl.title.toLowerCase();
          return catKeywords.some(kw => dlTitle.includes(kw));
        })
        .map(dl => ({ ...dl, score: 1 }))
        .slice(0, 5);

      if (catRelated.length > 0) {
        // Merge with existing matches, deduplicate
        const seen = new Set(related.map(r => r.slug));
        for (const cr of catRelated) {
          if (!seen.has(cr.slug) && related.length < 5) {
            related.push(cr);
            seen.add(cr.slug);
          }
        }
      }
    }
  }

  // Final fallback: if still < 3, add random popular downloads
  if (related.length < 3) {
    const seen = new Set(related.map(r => r.slug));
    const remaining = downloads.filter(d => !seen.has(d.slug));
    for (let i = remaining.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [remaining[i], remaining[j]] = [remaining[j], remaining[i]];
    }
    for (const r of remaining) {
      if (related.length >= 3) break;
      related.push({ ...r, score: 0 });
    }
  }

  if (!related.length) continue;

  const html = prod.html;
  const relatedHtml = generateRelatedHtml(related, 'download');

  // Skip if already has cross-links
  if (html.includes('related-section')) continue;

  // Insert before footer (handles both footer-section and simple footer)
  let marker = '<div class="footer-section">';
  if (!html.includes(marker)) {
    marker = '<div class="footer">';
  }
  if (html.includes(marker)) {
    const newHtml = html.replace(marker, relatedHtml + '\n' + marker);
    if (newHtml !== html) {
      fs.writeFileSync(path.join(PAGES_DIR, prod.file), newHtml, 'utf-8');
      prodUpdated++;
    }
  }
}
console.log(`Updated ${prodUpdated} product pages with related download links`);

console.log('\nDone!');
