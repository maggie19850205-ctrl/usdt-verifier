const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname);
const OUTPUT = path.join(ROOT, 'output');
const SITE_URL = 'https://automoney-store.pages.dev';

const pages = [];

// Root html files
for (const f of fs.readdirSync(OUTPUT)) {
  if (f.endsWith('.html') && f !== 'index.html' && f !== '404.html') {
    pages.push(f);
  }
}

// Scan directory recursively for html files
function scanDir(dir, basePath) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      const subPath = basePath ? `${basePath}/${entry.name}` : entry.name;
      // Check for index.html first
      const indexPath = path.join(dir, entry.name, 'index.html');
      if (fs.existsSync(indexPath)) {
        pages.push(subPath + '/');
      }
      // Also check for any .html files
      for (const f of fs.readdirSync(path.join(dir, entry.name))) {
        if (f.endsWith('.html') && f !== 'index.html') {
          pages.push(subPath + '/' + f);
        }
      }
      // Recurse into subdirs (for tools, blog - they have no subdirs usually)
    } else if (entry.name.endsWith('.html') && entry.name !== 'index.html') {
      pages.push(basePath ? `${basePath}/${entry.name}` : entry.name);
    }
  }
}

// Scan key directories
scanDir(path.join(OUTPUT, 'pages'), 'pages');
scanDir(path.join(OUTPUT, 'blog'), 'blog');
scanDir(path.join(OUTPUT, 'tools'), 'tools');
scanDir(path.join(OUTPUT, 'downloads'), 'downloads');
scanDir(path.join(OUTPUT, 'products'), 'products');

// Language pages - scan each language dir
for (const lang of ['en', 'es', 'pt']) {
  const langDir = path.join(OUTPUT, lang);
  if (fs.existsSync(langDir)) {
    // Language index
    if (fs.existsSync(path.join(langDir, 'index.html'))) {
      pages.push(lang + '/');
    }
    // Language products
    scanDir(path.join(langDir, 'pages'), lang + '/pages');
    // Language blog
    const langBlog = path.join(langDir, 'blog');
    if (fs.existsSync(langBlog)) {
      for (const f of fs.readdirSync(langBlog)) {
        if (f.endsWith('.html')) {
          pages.push(f === 'index.html' ? `${lang}/blog/` : `${lang}/blog/${f}`);
        }
      }
    }
  }
}

// Deduplicate
const unique = [...new Set(pages)];

const today = new Date().toISOString().split('T')[0];

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url><loc>${SITE_URL}/</loc><lastmod>${today}</lastmod><changefreq>daily</changefreq><priority>1.0</priority></url>
`;

for (const url of unique) {
  xml += `<url><loc>${SITE_URL}/${url}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>\n`;
}

xml += '</urlset>';

fs.writeFileSync(path.join(OUTPUT, 'sitemap.xml'), xml, 'utf-8');
console.log(`Sitemap generated: ${unique.length + 1} URLs`);
