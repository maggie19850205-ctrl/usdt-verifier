const fs = require('fs');
const path = require('path');
const ai = require('./ai-provider.js');

const slugs = [
  'data-privacy-guide-diy-projects',
  'notion-productivity-system-complete-guide',
  'online-business-automation-ai-email-writer',
  'saas-pricing-strategy-ultimate-bundle',
];

const SYSTEM = 'Generate product content as JSON only: {meta,sections:[{h,b}x3],faq:[{q,a}x3]}. meta=SEO desc 20 words. h=section heading. b=2-3 sentence body. q/a=question and 1-2 sentence answer. Respond ONLY valid JSON.';

async function fix() {
  const P = path.join(__dirname, '..', 'output', 'pages');
  for (const slug of slugs) {
    const fp = path.join(P, slug, 'index.html');
    if (!fs.existsSync(fp)) { console.log('NOT FOUND:', slug); continue; }
    let h = fs.readFileSync(fp, 'utf-8');
    const name = h.match(/<title>(.+?) - AutoMoney Store<\/title>/)?.[1] || slug;
    const pm = h.match(/\$(\d+\.\d{2})/);
    const price = pm ? pm[1] : '5.99';
    process.stdout.write(name + '... ');
    const r = await ai.generate(SYSTEM, name + ' | ' + price + ' | complete-guide', 800);
    if (!r) { console.log('FAIL'); continue; }
    let d;
    try { d = JSON.parse(r); } catch { console.log('JSON FAIL'); continue; }
    let c = '';
    (d.sections || []).forEach(s => { c += '<h2>' + (s.h || s.heading || '') + '</h2><p>' + (s.b || s.body || '') + '</p>'; });
    const start = h.indexOf('<p class="price">');
    const startContent = start !== -1 ? h.indexOf('<p>', start + 15) : h.indexOf('<p>', h.indexOf('<h1>'));
    const endContent = h.indexOf('<h2>Frequently Asked Questions</h2>');
    if (startContent === -1 || endContent === -1 || startContent >= endContent) { console.log('STRUCTURE FAIL'); continue; }
    h = h.substring(0, startContent) + c + h.substring(endContent);
    if (d.meta) {
      const esc = d.meta.replace(/"/g, '&quot;');
      h = h.replace(/"description":"[^"]*"/g, '"description":"' + esc + '"');
      const esc2 = esc.replace(/&quot;/g, '&amp;quot;');
      h = h.replace(/<meta name="description" content="[^"]*">/g, '<meta name="description" content="' + esc2 + '">');
      h = h.replace(/<meta property="og:description" content="[^"]*">/g, '<meta property="og:description" content="' + esc2 + '">');
      h = h.replace(/<meta name="twitter:description" content="[^"]*">/g, '<meta name="twitter:description" content="' + esc2 + '">');
    }
    if (d.faq && d.faq.length > 0) {
      const faqS = h.indexOf('<h2>Frequently Asked Questions</h2>');
      if (faqS !== -1) {
        const before = h.substring(0, faqS);
        let faqH = '<h2>Frequently Asked Questions</h2>';
        d.faq.forEach(f => {
          const q = (f.q || f.question || '').replace(/"/g, '&quot;');
          const a = (f.a || f.answer || '').replace(/"/g, '&quot;');
          faqH += '<div class="faq-item"><div class="q">' + q + '</div><div class="a">' + a + '</div></div>';
        });
        const afterFaq = h.indexOf('<div class="footer"', faqS);
        h = before + faqH + (afterFaq !== -1 ? h.substring(afterFaq) : '');
      }
      const fj = JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        "mainEntity": d.faq.map(f => ({
          "@type": "Question",
          "name": f.q || f.question || '',
          "acceptedAnswer": { "@type": "Answer", "text": f.a || f.answer || '' }
        }))
      });
      const esc = d.meta ? d.meta.replace(/"/g, '&quot;') : '';
      h = h.replace(/"description":"[^"]*"/g, '"description":"' + esc + '"');
      h = h.replace(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage"[^]*?<\/script>/,
        '<script type="application/ld+json">' + fj + '</script>');
    }
    fs.writeFileSync(fp, h, 'utf-8');
    console.log('OK');
  }
}
fix().catch(console.error);
