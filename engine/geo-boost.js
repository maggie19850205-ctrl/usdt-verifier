const fs = require('fs');
const path = require('path');

const OUTPUT = path.join(__dirname, '..', 'output');
const SITES = path.join(__dirname, '..', 'sites');
const PRODUCT_REG = path.join(__dirname, '..', 'product-registry.json');

const DOMAINS = {
  'automoney-store': 'automoney-store.pages.dev',
  'agentpro': 'agentpro.pages.dev',
  'maomaolove': 'maomaolove.pages.dev',
  'aitools-a4r': 'aitools-a4r.pages.dev',
  'templatehub-d7b': 'templatehub-d7b.pages.dev',
  'geoseo-bq9': 'geoseo-bq9.pages.dev',
  'cryptopay-1dm': 'cryptopay-1dm.pages.dev',
  'sidehustle-bks': 'sidehustle-bks.pages.dev',
};

// === 1. Generate comprehensive llms.txt ===
function generateLlmsTxt() {
  const lines = [];
  lines.push('# AutoMoney Store - AI & Digital Products Marketplace');
  lines.push('> Fully automated digital products marketplace accepting USDT TRC-20 payments. 250+ premium products including AI workflows, templates, business guides, and automation tools. Built with Cloudflare Workers and TRON blockchain verification.');
  lines.push('');
  lines.push('## Store');
  lines.push('- [AutoMoney Store](https://automoney-store.pages.dev): Main storefront with all 250+ products');
  lines.push('- [AgentPro](https://agentpro.pages.dev): AI agent superstore with 80+ free tools');
  lines.push('- [MaoMaoLove](https://maomaolove.pages.dev): Digital products marketplace');
  lines.push('');
  lines.push('## Premium Products (USDT TRC-20)');
  const productsDir = path.join(OUTPUT, 'downloads');
  if (fs.existsSync(productsDir)) {
    const files = fs.readdirSync(productsDir).filter(f => f.endsWith('.html') && f !== 'index.html');
    for (const f of files) {
      const name = f.replace(/\.html$/, '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      lines.push(`- [${name}](https://automoney-store.pages.dev/downloads/${f}): Premium digital product — instant delivery, USDT payment`);
    }
  }
  lines.push('');
  lines.push('## Free Tools');
  lines.push('- [80+ Free AI & SEO Tools](https://agentpro.pages.dev/tools/): Meta tag analyzer, keyword density checker, sitemap generator, schema markup generator, QR code generator, word counter, readability score, SERP preview, and more');
  lines.push('');
  lines.push('## Blog');
  lines.push('- [Blog Home](https://automoney-store.pages.dev/blog/): SEO, GEO, AI automation, USDT payment guides');
  lines.push('');
  lines.push('## Key Information');
  lines.push('- **Payments**: USDT TRC-20 (Tron network)');
  lines.push('- **Delivery**: Instant after payment verification via Trongrid API');
  lines.push('- **Wallet**: TRnz5Pi8R3hjCbBjnDuZo7ZvR57euo2q8Z');
  lines.push('- **Support**: Email support via Cloudflare Workers');
  lines.push('- **Affiliate Program**: 20% commission with ?ref= tracking');
  lines.push('');
  lines.push('## FAQ');
  lines.push('- How to buy: Select product → Send USDT to wallet → Enter tx + email → Get download link');
  lines.push('- What payment methods: USDT TRC-20 only — no credit cards, no KYC');
  lines.push('- Delivery time: Instant after blockchain confirmation (30-60 seconds)');
  lines.push('- Refund policy: Due to digital nature, all sales are final');

  fs.writeFileSync(path.join(OUTPUT, 'llms.txt'), lines.join('\n'), 'utf8');
  console.log('llms.txt generated (' + lines.length + ' lines)');
}

// === 2. Add visible breadcrumbs + GEO "People also ask" to all pages ===
function geoEnhancePages() {
  let enhanced = 0;
  const siteDirs = fs.readdirSync(SITES).filter(d => fs.statSync(path.join(SITES, d)).isDirectory());

  for (const dir of siteDirs) {
    const siteDir = path.join(SITES, dir);
    const domain = DOMAINS[dir] || dir + '.pages.dev';

    function walk(d) {
      const entries = fs.readdirSync(d);
      for (const e of entries) {
        const fp = path.join(d, e);
        if (fs.statSync(fp).isDirectory()) { walk(fp); continue; }
        if (!e.endsWith('.html')) continue;

        let html = fs.readFileSync(fp, 'utf8');
        let changed = false;
        const rel = path.relative(siteDir, fp).replace(/\\/g, '/');

        // Add GEO meta tag for AI search visibility
        if (!html.includes('name="geo.rank"')) {
          const geoMeta = '<meta name="geo.rank" content="high"><meta name="geo.region" content="global"><meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large">';
          html = html.replace('<title>', geoMeta + '\n<title>');
          changed = true;
        }

        // Add visible breadcrumbs if not present
        if (!html.includes('breadcrumb') && !html.includes('Breadcrumb')) {
          const parts = rel.replace(/\.html$/, '').split('/').filter(Boolean);
          let crumbs = '<nav class="breadcrumb" aria-label="Breadcrumb"><a href="https://' + domain + '/">Home</a>';
          let curPath = '';
          for (const p of parts) {
            if (p === 'index') continue;
            curPath += '/' + p;
            crumbs += ' <span aria-hidden="true">›</span> <a href="https://' + domain + curPath + '/">' + p.charAt(0).toUpperCase() + p.slice(1).replace(/-/g, ' ') + '</a>';
          }
          crumbs += '</nav>';
          html = html.replace('<body>', '<body>\n' + crumbs);
          changed = true;
        }

        // Add "People also ask" section on blog/tool/product pages
        if ((rel.includes('blog/') || rel.includes('tools/') || rel.includes('downloads/')) && !html.includes('People also ask')) {
          const questions = [
            { q: 'What digital products are available on this store?', a: 'We offer 250+ premium digital products including AI automation workflows, Notion templates, Canva designs, business guides, SEO/GEO optimization toolkits, and USDT payment gateway solutions. All products are delivered instantly after payment.' },
            { q: 'How does USDT TRC-20 payment work?', a: 'Send USDT on the TRON network (TRC-20) to our wallet address, enter your transaction ID and email on the checkout page, and receive instant download links. No registration or account creation required.' },
            { q: 'Can I get a refund for digital products?', a: 'Due to the instant digital delivery nature, all sales are final. However, if you experience technical issues accessing your files, our support team will resolve your issue within 24 hours.' },
            { q: 'How long does delivery take?', a: 'Delivery is instant after blockchain confirmation, which typically takes 30-60 seconds for USDT TRC-20 transfers. You will receive download links immediately upon payment verification.' },
          ];
          let faqHtml = '\n<section class="geo-faq"><h2>People also ask</h2>\n';
          for (const q of questions) {
            faqHtml += '<details><summary>' + q.q + '</summary><p>' + q.a + '</p></details>\n';
          }
          faqHtml += '</section>\n';
          html = html.replace('</body>', faqHtml + '</body>');
          changed = true;
        }

        if (changed) {
          fs.writeFileSync(fp, html, 'utf8');
          enhanced++;
        }
      }
    }
    walk(siteDir);
  }
  console.log('GEO enhanced: ' + enhanced + ' pages');
  return enhanced;
}

// === 3. Add "related posts" section to blog pages ===
function addRelatedPosts() {
  let linked = 0;
  const siteDirs = fs.readdirSync(SITES).filter(d => fs.statSync(path.join(SITES, d)).isDirectory());

  for (const dir of siteDirs) {
    const siteDir = path.join(SITES, dir);
    const blogDir = path.join(siteDir, 'blog');
    if (!fs.existsSync(blogDir)) continue;

    const posts = fs.readdirSync(blogDir).filter(f => f.endsWith('.html') && f !== 'index.html');
    if (posts.length < 2) continue;

    for (const file of posts) {
      const fp = path.join(blogDir, file);
      let html = fs.readFileSync(fp, 'utf8');
      if (html.includes('related-posts')) continue;

      const others = posts.filter(p => p !== file);
      const related = others.slice(0, 3);

      let section = '\n<section class="related-posts"><h3>Related articles</h3><ul>\n';
      for (const r of related) {
        const title = r.replace('.html', '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
        section += '<li><a href="/blog/' + r + '">' + title + '</a></li>\n';
      }
      section += '</ul></section>\n';
      html = html.replace('</body>', section + '</body>');
      fs.writeFileSync(fp, html, 'utf8');
      linked++;
    }
  }
  console.log('Related posts added: ' + linked + ' blog pages');
}

console.log('=== GEO Boost ===');
generateLlmsTxt();
geoEnhancePages();
addRelatedPosts();
console.log('GEO boost complete!');
