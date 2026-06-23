const fs = require('fs');
const path = require('path');

const SITES_DIR = path.join(__dirname, '..', 'sites');
const SITE_NAMES = {
  'agentpro': { name: 'AgentPro', desc: 'AI tools, automation guides, and USDT payment gateway — build your digital product business.' },
  'automoney-store': { name: 'AutoMoney Store', desc: 'Buy digital products with USDT — AI workflows, templates, payment gateways and automation tools.' },
  'aitools-a4r': { name: 'AITools Hub', desc: 'AI tools comparison, automation workflows, and ChatGPT prompts for business productivity.' },
  'templatehub-d7b': { name: 'TemplateHub', desc: 'Premium digital templates for Notion, Canva, and productivity — USDT payment accepted.' },
  'geoseo-bq9': { name: 'GEOSEO Pro', desc: 'Generative Engine Optimization guide — rank in ChatGPT, Perplexity, and Google AI search.' },
  'cryptopay-1dm': { name: 'CryptoPay Guide', desc: 'Accept USDT TRC-20 payments for digital products — self-hosted crypto payment gateway.' },
  'sidehustle-bks': { name: 'SideHustle Pro', desc: 'Make money online with digital products — side hustle ideas and passive income strategies.' },
  'maomaolove': { name: 'MaoMaoLove', desc: 'Digital products marketplace — tools, templates, and guides for online creators.' },
};

function getSiteInfo(dirName) {
  // Try from dir name; fallback to domain
  let key = Object.keys(SITE_NAMES).find(k => dirName.includes(k) || dirName === k);
  if (key) return SITE_NAMES[key];
  return { name: dirName, desc: `${dirName} — digital products and tools.` };
}

function getDomainFromDir(dirName) {
  const domainMap = {
    'agentpro': 'agentpro.pages.dev',
    'automoney-store': 'automoney-store.pages.dev',
    'aitools-a4r': 'aitools-a4r.pages.dev',
    'templatehub-d7b': 'templatehub-d7b.pages.dev',
    'geoseo-bq9': 'geoseo-bq9.pages.dev',
    'cryptopay-1dm': 'cryptopay-1dm.pages.dev',
    'sidehustle-bks': 'sidehustle-bks.pages.dev',
    'maomaolove': 'maomaolove.pages.dev',
  };
  return domainMap[dirName] || `${dirName}.pages.dev`;
}

function getPageType(filePath, dirName) {
  const rel = path.relative(path.join(SITES_DIR, dirName), filePath).replace(/\\/g, '/');
  if (rel === 'index.html') return 'home';
  if (rel.startsWith('blog/') && rel !== 'blog/index.html') return 'article';
  if (rel.startsWith('blog/')) return 'blog';
  if (rel.startsWith('tools/') && rel.endsWith('/index.html')) {
    const slug = path.dirname(rel).replace('tools/', '');
    return slug ? 'tool' : 'tools';
  }
  if (rel.startsWith('products/')) return 'products';
  if (rel === 'faq.html') return 'faq';
  return 'page';
}

function getPageTitle(html, fallback) {
  const m = html.match(/<title>([^<]*)<\/title>/i);
  return m ? m[1].trim() : fallback;
}

function getPageDesc(html, fallback) {
  const m = html.match(/<meta name=description content="([^"]+)"/i);
  return m ? m[1].trim() : fallback;
}

function injectBefore(html, marker, content) {
  return html.replace(marker, content + '\n' + marker);
}

function injectBeforeHeadEnd(html, content) {
  return injectBefore(html, '</head>', content);
}

function injectBeforeBodyEnd(html, content) {
  return injectBefore(html, '</body>', content);
}

function processHtml(filePath, dirName) {
  let html = fs.readFileSync(filePath, 'utf-8');
  let original = html;
  const domain = getDomainFromDir(dirName);
  const siteInfo = getSiteInfo(dirName);

  // Relative URL from site root
  const rel = path.relative(path.join(SITES_DIR, dirName), filePath).replace(/\\/g, '/');
  const url = rel === 'index.html' ? `https://${domain}/` :
    rel.endsWith('/index.html') ? `https://${domain}/${rel.replace('/index.html', '/')}` :
    rel.endsWith('.html') ? `https://${domain}/${rel}` :
    `https://${domain}/${rel}`;

  const pageType = getPageType(filePath, dirName);
  const pageTitle = getPageTitle(html, siteInfo.name);
  const pageDesc = getPageDesc(html, siteInfo.desc);

  // Breadcrumb path
  const parts = rel.replace(/\.html$/, '').split('/').filter(Boolean);
  let breadcrumbItems = [{ name: 'Home', url: `https://${domain}/` }];
  let currentPath = '';
  parts.forEach((p, i) => {
    if (p === 'index') return;
    currentPath += '/' + p;
    breadcrumbItems.push({
      name: p.charAt(0).toUpperCase() + p.slice(1).replace(/-/g, ' '),
      url: `https://${domain}${currentPath}/`
    });
  });

  // Build JSON-LD
  let schemas = [];

  // Organization + WebSite (on every page)
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteInfo.name,
    url: `https://${domain}/`,
    description: siteInfo.desc,
  });

  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteInfo.name,
    url: `https://${domain}/`,
    description: siteInfo.desc,
  });

  // BreadcrumbList
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    }))
  });

  // Article schema for blog posts
  if (pageType === 'article') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: pageTitle,
      description: pageDesc,
      url: url,
      author: { '@type': 'Organization', name: siteInfo.name },
      publisher: { '@type': 'Organization', name: siteInfo.name },
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    });
  }

  // FAQPage schema
  if (pageType === 'faq') {
    const faqItems = [];
    const qs = html.match(/<h3[^>]*>([^<]+)<\/h3>\s*<p>([^<]+)<\/p>/g);
    if (qs) {
      for (const q of qs) {
        const m = q.match(/<h3[^>]*>([^<]+)<\/h3>\s*<p>([^<]+)<\/p>/);
        if (m && faqItems.length < 20) faqItems.push({ question: m[1], answer: m[2] });
      }
    }
    if (faqItems.length > 0) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqItems.map(f => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer }
        }))
      });
    }
  }

  // Tool schema
  if (pageType === 'tool') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: pageTitle,
      url: url,
      description: pageDesc,
      applicationCategory: 'Utility',
      operatingSystem: 'All'
    });
  }

  const schemaHtml = schemas.map(s => `<script type="application/ld+json">\n${JSON.stringify(s, null, 2)}\n</script>`).join('\n');
  html = injectBeforeHeadEnd(html, schemaHtml);

  // Open Graph + Twitter Card (if not present)
  const ogTags = [
    `<meta property="og:title" content="${pageTitle.replace(/"/g, '&quot;')}">`,
    `<meta property="og:description" content="${pageDesc.replace(/"/g, '&quot;')}">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:type" content="${pageType === 'article' ? 'article' : 'website'}">`,
    `<meta property="og:site_name" content="${siteInfo.name}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${pageTitle.replace(/"/g, '&quot;')}">`,
    `<meta name="twitter:description" content="${pageDesc.replace(/"/g, '&quot;')}">`,
  ];

  const existingOg = html.match(/<meta property="og:/gi);
  if (!existingOg) {
    html = injectBeforeHeadEnd(html, ogTags.join('\n'));
  }

  // Add viewport if missing
  if (!html.includes('viewport')) {
    html = injectBeforeHeadEnd(html, '<meta name=viewport content="width=device-width,initial-scale=1.0">');
  }

  if (html !== original) {
    fs.writeFileSync(filePath, html, 'utf-8');
    return true;
  }
  return false;
}

let totalFiles = 0;
let changedFiles = 0;

const dirs = fs.readdirSync(SITES_DIR).filter(d => {
  const dp = path.join(SITES_DIR, d);
  return fs.statSync(dp).isDirectory() && SITE_NAMES[d.split('.')[0]] || d === 'agentpro' || d === 'automoney-store' || d === 'aitools-a4r' || d === 'templatehub-d7b' || d === 'geoseo-bq9' || d === 'cryptopay-1dm' || d === 'sidehustle-bks' || d === 'maomaolove';
});

// Use all subdirs that look like site dirs
const allSiteDirs = fs.readdirSync(SITES_DIR).filter(d => {
  const dp = path.join(SITES_DIR, d);
  return fs.statSync(dp).isDirectory();
});

allSiteDirs.forEach((dirName, idx) => {
  const siteDir = path.join(SITES_DIR, dirName);
  if (!fs.statSync(siteDir).isDirectory()) return;
  const htmlFiles = [];
  function walk(dir) {
    const entries = fs.readdirSync(dir);
    for (const e of entries) {
      const fp = path.join(dir, e);
      const st = fs.statSync(fp);
      if (st.isDirectory()) walk(fp);
      else if (e.endsWith('.html')) htmlFiles.push(fp);
    }
  }
  walk(siteDir);
  console.log(`  [${idx+1}/${allSiteDirs.length}] ${dirName}: ${htmlFiles.length} HTML files`);

  htmlFiles.forEach(fp => {
    totalFiles++;
    try {
      if (processHtml(fp, dirName)) changedFiles++;
    } catch (e) {
      console.error(`  Error: ${fp} — ${e.message}`);
    }
  });
});

console.log(`\nSEO optimizer complete: ${totalFiles} files processed, ${changedFiles} enhanced.`);
