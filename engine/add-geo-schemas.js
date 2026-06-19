const fs = require('fs');
const path = require('path');

const DOWNLOADS_DIR = path.join(__dirname, '..', 'output', 'downloads');
const SITE = 'https://automoney-store.pages.dev';

function getSlug(html) {
  const m = html.match(/\/downloads\/([^"'/?]+)/);
  return m ? m[1] : '';
}

function getTitle(html) {
  const m = html.match(/<h1>([^<]+)<\/h1>/);
  return m ? m[1].trim().replace(/"/g, '&quot;') : 'Digital Product';
}

const files = fs.readdirSync(DOWNLOADS_DIR).filter(f => f.endsWith('.html') && f !== 'index.html');
let bcAdded = 0;
let howtoAdded = 0;

for (const file of files) {
  const fp = path.join(DOWNLOADS_DIR, file);
  let html = fs.readFileSync(fp, 'utf-8');
  const slug = getSlug(html);
  const title = getTitle(html);

  if (!slug) continue;

  // Only add schemas to pages without them
  const hasBreadcrumb = html.includes('BreadcrumbList');
  const hasHowTo = html.includes('HowTo');

  // BreadcrumbList
  if (!hasBreadcrumb) {
    const bc = `<script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"${SITE}/"},{"@type":"ListItem","position":2,"name":"Downloads","item":"${SITE}/downloads/"},{"@type":"ListItem","position":3,"name":"${title}","item":"${SITE}/downloads/${slug}"}]}</script>`;
    html = html.replace('</head>', bc + '\n</head>');
    bcAdded++;
  }

  // HowTo schema for guide pages (Complete Guide type)
  if (!hasHowTo && html.includes('Complete Guide')) {
    const howto = `<script type="application/ld+json">{"@context":"https://schema.org","@type":"HowTo","name":"${title}","description":"A complete step-by-step guide to mastering ${title.toLowerCase().replace(/&quot;/g, '')}.","step":[{"@type":"HowToStep","position":1,"name":"Download","text":"Purchase and download the guide instantly via digital delivery."},{"@type":"HowToStep","position":2,"name":"Review","text":"Read through each section at your own pace. Concepts build on each other."},{"@type":"HowToStep","position":3,"name":"Apply","text":"Use the included templates, checklists, and exercises to implement what you learn."},{"@type":"HowToStep","position":4,"name":"Master","text":"Refer back to specific sections anytime. Lifetime access included."}],"totalTime":"P1D"}</script>`;
    html = html.replace('</head>', howto + '\n</head>');
    howtoAdded++;
  }

  fs.writeFileSync(fp, html, 'utf-8');
}

console.log(`BreadcrumbList: ${bcAdded} pages\nHowTo: ${howtoAdded} pages (guides only)`);
