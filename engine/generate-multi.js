const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SITE_URL = 'https://automoney-store.pages.dev';

const ZH_SOURCE_DIR = path.join(ROOT, 'output', 'pages');
const LANG_DIRS = {
  en: path.join(ROOT, 'output', 'en', 'pages'),
  es: path.join(ROOT, 'output', 'es', 'pages'),
  pt: path.join(ROOT, 'output', 'pt', 'pages'),
};

const LANG_NAMES = { en: 'English', es: 'Español', pt: 'Português' };

// Translation maps
const EN_NAV = { home: 'Home', blog: 'Blog', tools: 'Tools', cart: 'Cart' };
const ES_NAV = { home: 'Inicio', blog: 'Blog', tools: 'Herramientas', cart: 'Carrito' };
const PT_NAV = { home: 'Início', blog: 'Blog', tools: 'Ferramentas', cart: 'Carrinho' };

const EN_TRUST = { rating: 'Rating', sold: 'Sold', reviews: 'Reviews', updates: 'Updates' };
const ES_TRUST = { rating: 'Calificación', sold: 'Vendidos', reviews: 'Reseñas', updates: 'Actualizaciones' };
const PT_TRUST = { rating: 'Classificação', sold: 'Vendidos', reviews: 'Avaliações', updates: 'Atualizações' };

const EN_CTA = { buy: 'Buy Now', who: 'Who Is This For?', included: "What's Included", faq: 'Frequently Asked Questions', how: 'How to Buy', learn: 'Learn more on our blog' };
const ES_CTA = { buy: 'Comprar Ahora', who: '¿Para quién es?', included: '¿Qué incluye?', faq: 'Preguntas Frecuentes', how: 'Cómo Comprar', learn: 'Aprende más en nuestro blog' };
const PT_CTA = { buy: 'Comprar Agora', who: 'Para quem é?', included: 'O que está incluído', faq: 'Perguntas Frequentes', how: 'Como Comprar', learn: 'Saiba mais no nosso blog' };

const TRANSLATIONS = {
  en: { nav: EN_NAV, trust: EN_TRUST, cta: EN_CTA },
  es: { nav: ES_NAV, trust: ES_TRUST, cta: ES_CTA },
  pt: { nav: PT_NAV, trust: PT_TRUST, cta: PT_CTA },
};

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function translateContent(lang, text) {
  // For MVP, keep English content as-is for ES/PT
  return text;
}

function generateLanguageProduct(lang, zhFile, zhHtml) {
  const t = TRANSLATIONS[lang];
  let html = zhHtml;

  // Replace navigation
  html = html.replace(/首页/g, t.nav.home);
  html = html.replace(/博客/g, t.nav.blog);
  html = html.replace(/工具/g, t.nav.tools);
  html = html.replace(/购物车/g, t.nav.cart);

  // Replace trust bar labels
  html = html.replace(/评分/g, t.trust.rating);
  html = html.replace(/已售/g, t.trust.sold);
  html = html.replace(/评价/g, t.trust.reviews);
  html = html.replace(/更新/g, t.trust.updates);

  // Replace CTA labels
  html = html.replace(/立即购买/g, t.cta.buy);
  html = html.replace(/buy now/i, t.cta.buy);
  html = html.replace(/为谁而设/g, t.cta.who);
  html = html.replace(/Who Is This For\?/g, t.cta.who);
  html = html.replace(/包含内容/g, t.cta.included);
  html = html.replace(/What's Included/g, t.cta.included);
  html = html.replace(/常见问题/g, t.cta.faq);
  html = html.replace(/购买方式/g, t.cta.how);
  html = html.replace(/How to Buy/g, t.cta.how);
  html = html.replace(/了解更多/g, t.cta.learn);

  // Update product links to language-specific
  html = html.replace(/\/pages\//g, `/${lang}/pages/`);

  // Update blog links
  html = html.replace(/\/blog\//g, `/${lang}/blog/`);

  return html;
}

function processLanguage(lang) {
  const outDir = LANG_DIRS[lang];
  console.log(`Processing ${lang} (${LANG_NAMES[lang]})...`);

  if (!fs.existsSync(ZH_SOURCE_DIR)) {
    console.log(`  Source directory missing: ${ZH_SOURCE_DIR}`);
    return 0;
  }

  const zhDirs = fs.readdirSync(ZH_SOURCE_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory());

  let count = 0;
  for (const dir of zhDirs) {
    const zhIndex = path.join(ZH_SOURCE_DIR, dir.name, 'index.html');
    if (!fs.existsSync(zhIndex)) continue;

    const targetDir = path.join(outDir, dir.name);
    fs.mkdirSync(targetDir, { recursive: true });

    const zhHtml = fs.readFileSync(zhIndex, 'utf-8');
    const translated = generateLanguageProduct(lang, zhIndex, zhHtml);
    fs.writeFileSync(path.join(targetDir, 'index.html'), translated, 'utf-8');
    count++;
  }

  return count;
}

// Main
for (const lang of ['en', 'es', 'pt']) {
  const count = processLanguage(lang);
  console.log(`  Generated ${count} pages for ${lang}`);
}

console.log('Multi-language generation complete!');
