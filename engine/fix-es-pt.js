const fs = require('fs');
const path = require('path');

const lang = process.argv[2] || 'es';
const isES = lang === 'es';

const siteName = isES ? 'AutoMoney Tienda Digital' : 'AutoMoney Loja Digital';
const siteDesc = isES
  ? 'Productos digitales premium · 34+ herramientas gratuitas · Pago USDT · Entrega instantánea'
  : 'Produtos digitais premium · 34+ ferramentas grátis · Pagamento USDT · Entrega instantânea';
const kwExtra = isES
  ? 'productos digitales, herramientas en línea, herramientas gratuitas, USDT, TRC-20'
  : 'produtos digitais, ferramentas online, ferramentas grátis, USDT, TRC-20';
const navAffiliate = isES ? 'Afiliados' : 'Afiliados';
const badgeProducts = isES ? '268+ Productos' : '268+ Produtos';
const badgeRegister = isES ? 'Sin Registro' : 'Sem Registro';
const toolsViewAll = isES ? 'Ver todas las herramientas →' : 'Ver todas ferramentas →';
const shareLabel = isES ? '📤 Compartir:' : '📤 Compartilhar:';
const shareUrlText = isES
  ? 'AutoMoney%20Tienda%20Digital%20-%20Productos%20digitales%20premium%20%C2%B7%2034%2B%20herramientas%20gratuitas%20%C2%B7%20Pago%20USDT%20%C2%B7%20Entrega%20instant%C3%A1nea'
  : 'AutoMoney%20Loja%20Digital%20-%20Produtos%20digitais%20premium%20%C2%B7%2034%2B%20ferramentas%20gr%C3%A1tis%20%C2%B7%20Pagamento%20USDT%20%C2%B7%20Entrega%20instant%C3%A2nea';
const shareId = isES ? 'shareCount-es' : 'shareCount-pt';
const footerText = isES
  ? '© 2026 AutoMoney Tienda Digital · Entrega digital global · 76 productos'
  : '© 2026 AutoMoney Loja Digital · Entrega digital global · 76 produtos';
const footerAbout = isES ? 'Sobre Nosotros' : 'Sobre N\u00f3s';

const filePath = `D:\\github-20260612\\经营管理\\output\\${lang}\\index.html`;
let html = fs.readFileSync(filePath, 'utf8');

// 1. Fix html lang tag
html = html.replace(/<html lang="[^"]*" lang="[^"]*" lang="[^"]*">/, `<html lang="${lang}">`);

// 2. Fix meta description - remove Chinese mixed text
const descRegex = new RegExp('<meta name="description" content="Premium[^"]*">');
html = html.replace(descRegex, `<meta name="description" content="${siteDesc}">`);

// 3. Fix keywords
const kwRegex = isES
  ? /<meta name="keywords" content="digital products, online tools, 数字产品, Herramientas, USDT, TRC-20">/
  : /<meta name="keywords" content="digital products, online tools, 数字产品, Ferramentas, USDT, TRC-20">/;
html = html.replace(kwRegex, `<meta name="keywords" content="${kwExtra}">`);

// 4. Fix OG description
html = html.replace(
  /<meta property="og:description" content="Premium[^"]*">/,
  `<meta property="og:description" content="${siteDesc}">`
);

// 5. Fix twitter description
html = html.replace(
  /<meta name="twitter:description" content="Premium[^"]*">/,
  `<meta name="twitter:description" content="${siteDesc}">`
);

// 6. Fix canonical
html = html.replace(
  '<link rel="canonical" href="https://automoney-store.pages.dev/">',
  `<link rel="canonical" href="https://automoney-store.pages.dev/${lang}/">`
);

// 7. Fix OG url
html = html.replace(
  '<meta property="og:url" content="https://automoney-store.pages.dev/">',
  `<meta property="og:url" content="https://automoney-store.pages.dev/${lang}/">`
);

// 8. Fix OG title
html = html.replace(
  /<meta property="og:title" content="AutoMoney (Tienda Digital|Loja Digital)[^"]*">/,
  `<meta property="og:title" content="${siteName}">`
);

// 9. Fix twitter title
html = html.replace(
  /<meta name="twitter:title" content="AutoMoney (Tienda Digital|Loja Digital)[^"]*">/,
  `<meta name="twitter:title" content="${siteName}">`
);

// 10. Fix schema JSON name and description
html = html.replace(
  /"name":"AutoMoney (Tienda Digital|Loja Digital)"/,
  `"name":"${siteName}"`
);
html = html.replace(
  /"description":"Premium[^"]+"/,
  `"description":"${siteDesc}"`
);

// 11. Fix hreflang block - replace all 4 lines
const hreflangBlock = `    <link rel="alternate" hreflang="zh" href="https://automoney-store.pages.dev/">
    <link rel="alternate" hreflang="en" href="https://automoney-store.pages.dev/en/">
    <link rel="alternate" hreflang="es" href="https://automoney-store.pages.dev/es/">
    <link rel="alternate" hreflang="pt" href="https://automoney-store.pages.dev/pt/">`;
html = html.replace(
  /(    <link rel="alternate" hreflang="[^"]+" href="https:\/\/automoney-store\.pages\.dev\/[^"]*">\n?){4}/,
  hreflangBlock + '\n'
);

// 12. Fix nav missing opening quotes
html = html.replace(/href=\/(es|pt)\/tools\/">/g, 'href="/$1/tools/">');
html = html.replace(/href=\/(es|pt)\/blog\/">/g, 'href="/$1/blog/">');
html = html.replace(/href=\/(es|pt)\/affiliate\.html>/g, 'href="/$1/affiliate.html">');

// 13. Fix nav link hrefs to point to /lang/
html = html.replace('<a href="/">Inicio</a>', `<a href="/${lang}/">Inicio</a>`);
html = html.replace('<a href="/">In\u00edcio</a>', `<a href="/${lang}/">In\u00edcio</a>`);
html = html.replace('<a href="/">Tienda</a>', `<a href="/${lang}/">Tienda</a>`);
html = html.replace('<a href="/">Loja</a>', `<a href="/${lang}/">Loja</a>`);

// Fix nav brand link
html = html.replace(
  /<a href="\/" class="nav-brand">AutoMoney (Tienda Digital|Loja Digital)<\/a>/,
  `<a href="/${lang}/" class="nav-brand">${siteName}</a>`
);

// 14. Fix lang-switcher - completely replace with correct one
const langSwitcher = `<div class="lang-switcher"><span class="ls-label">\uD83C\uDF10</span><a href="/" data-lang="zh">\uD83C\uDDE8\uD83C\uDDF3 \u4E2D\u6587</a><a href="/en/" data-lang="en">\uD83C\uDDFA\uD83C\uDDF8 English</a><a href="/es/" data-lang="es">\uD83C\uDDEA\uD83C\uDDF8 Espa\u00F1ol</a><a href="/pt/" data-lang="pt">\uD83C\uDDE7\uD83C\uDDF7 Portugu\u00EAs</a></div>`;
// Mark the current lang as active
const activeSwitcher = langSwitcher.replace(
  `href="/${lang}/" data-lang="${lang}"`,
  `href="/${lang}/" class="ls-active" data-lang="${lang}"`
);
html = html.replace(/<div class="lang-switcher">.*?<\/div>/, activeSwitcher);

// 15. Fix hero description mixed Chinese
html = html.replace(
  /<p>Premium数字产品 · 34\+(Herramientas|Ferramentas) · USDT支付 · (Entrega Instantánea|Entrega Instantânea)<\/p>/,
  `<p>${siteDesc}</p>`
);

// 16. Fix badge counts
html = html.replace(/76\+ Productos/, badgeProducts);
html = html.replace(/76\+ Produtos/, badgeProducts);

// 17. Fix tools section description mixed Chinese
const toolsDesc = isES
  ? '34 herramientas gratuitas · Sin registro · Sin anuncios'
  : '34 ferramentas gr\u00e1tis · Sem registro · Sem an\u00fancios';
html = html.replace(/<p>34个(Herramientas|Ferramentas) · (Sin Registro|Sem Registro) · 无广告<\/p>/, `<p>${toolsDesc}</p>`);

// 18. Fix tools link missing quotes (all href=/LANG/tools/...)
html = html.replace(new RegExp(`href=/${lang}/tools/`, 'g'), `href="/${lang}/tools/`);
html = html.replace(new RegExp(`href=/${lang}/pages/`, 'g'), `href="/${lang}/pages/`);

// 19. Fix view-all tools link
html = html.replace(new RegExp(`href=/${lang}/tools/"`), `href="/${lang}/tools/"`);

// 20. Fix share section - Chinese URL encoded text
const waText = isES
  ? 'AutoMoney+Tienda+Digital+https://automoney-store.pages.dev/es/'
  : 'AutoMoney+Loja+Digital+https://automoney-store.pages.dev/pt/';
const tgText = isES ? 'AutoMoney+Tienda+Digital' : 'AutoMoney+Loja+Digital';

// Replace share section completely
const shareSectionRegex = /<div class="share-bar">[\s\S]*?<\/div>\s*<\/div>/;
const newShareSection = `<div class="share-bar">
  <div style="text-align:center;padding:16px 0">
    <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;font-size:0.85rem">
      <span style="color:var(--text5)">${shareLabel}</span>
      <a href="https://twitter.com/intent/tweet?text=${shareUrlText}&url=https://automoney-store.pages.dev/${lang}/" target="_blank" rel="noopener" style="color:var(--accent);text-decoration:none" onclick="fetch('/api/share',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({platform:'twitter',url:window.location.href})})">\uD835\uDD4F</a>
      <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://automoney-store.pages.dev/${lang}/" target="_blank" rel="noopener" style="color:var(--accent);text-decoration:none" onclick="fetch('/api/share',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({platform:'linkedin',url:window.location.href})})">\uD83D\uDCBC</a>
      <a href="https://www.facebook.com/sharer/sharer.php?u=https://automoney-store.pages.dev/${lang}/" target="_blank" rel="noopener" style="color:var(--accent);text-decoration:none" onclick="fetch('/api/share',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({platform:'facebook',url:window.location.href})})">\uD83D\uDCD8</a>
      <a href="https://wa.me/?text=${waText}" target="_blank" rel="noopener" style="color:var(--accent);text-decoration:none" onclick="fetch('/api/share',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({platform:'whatsapp',url:window.location.href})})">\uD83D\uDCAC</a>
      <a href="https://t.me/share/url?url=https://automoney-store.pages.dev/${lang}/&text=${tgText}" target="_blank" rel="noopener" style="color:var(--accent);text-decoration:none" onclick="fetch('/api/share',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({platform:'telegram',url:window.location.href})})">\u2708\uFE0F</a>
      <span style="color:var(--text7);font-size:0.75rem" id="${shareId}"></span>
    </div>
  </div>
</div>`;
html = html.replace(shareSectionRegex, newShareSection);

// 21. Fix trust bar - replace remaining Chinese descriptions with proper translations
const trustDescs = isES
  ? ['Cifrado blockchain, sin intervenci\u00F3n de terceros', 'Descarga autom\u00E1tica tras verificaci\u00F3n', 'Reembolso total en 7 d\u00EDas si no est\u00E1s satisfecho', 'Sin necesidad de cuenta bancaria, disponible para todos']
  : ['Criptografia blockchain, sem interven\u00E7\u00E3o de terceiros', 'Download autom\u00E1tico ap\u00F3s verifica\u00E7\u00E3o', 'Reembolso total em 7 dias se n\u00E3o estiver satisfeito', 'Sem necessidade de conta banc\u00E1ria, dispon\u00EDvel para todos'];

html = html.replace('区块链加密，无第三方干预', trustDescs[0]);
html = html.replace('自动验证到账即下载', trustDescs[1]);
html = html.replace('不满意7天内全额退款', trustDescs[2]);
html = html.replace('无需银行账户，全球用户均可购买', trustDescs[3]);

// 22. Fix footer mixed Chinese
html = html.replace(/© 2026 AutoMoney (Tienda Digital|Loja Digital) · 全球数字交付 · 76 个产品/, footerText);

// 23. Fix footer links missing quotes
html = html.replace(new RegExp(`href=/${lang}/tools/">`, 'g'), `href="/${lang}/tools/">`);
html = html.replace(new RegExp(`href=/${lang}/blog/">`, 'g'), `href="/${lang}/blog/">`);
html = html.replace(new RegExp(`href=/${lang}/affiliate\\.html>`, 'g'), `href="/${lang}/affiliate.html">`);

// 24. Fix about link
html = html.replace(
  new RegExp(`href="/${lang === 'es' ? 'es' : 'pt'}/about\\.html">`),
  `href="/${lang}/about.html">`
);

// 25. Fix footer about text
html = html.replace('Sobre Nosotros', footerAbout);
html = html.replace('Sobre N\u00f3s', footerAbout);

// 26. Fix shareCount id in JS
html = html.replace('shareCount-zh', shareId);

fs.writeFileSync(filePath, html, 'utf8');
console.log(`Fixed ${filePath}`);
