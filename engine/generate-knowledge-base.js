const fs = require('fs');
const path = require('path');
const SITE = 'https://automoney-store.pages.dev';

const CSS = `*{margin:0;padding:0;box-sizing:border-box}
body{font-family:Inter,-apple-system,BlinkMacSystemFont,sans-serif;background:#0a0a12;color:#e0e0e0;line-height:1.8}
.wrap{max-width:800px;margin:0 auto;padding:40px 24px}
h1{font-size:2.2rem;font-weight:700;color:#fff;margin-bottom:8px}
.subtitle{color:#666;font-size:1rem;margin-bottom:40px}
h2{font-size:1.3rem;font-weight:600;color:#fff;margin:40px 0 16px;padding-bottom:8px;border-bottom:1px solid #2a2a4a}
h3{font-size:1.1rem;font-weight:600;color:#ddd;margin:24px 0 12px}
.category{display:inline-block;background:#1a1a3e;color:#8b7cf7;font-size:.75rem;padding:2px 10px;border-radius:100px;margin-right:6px}
p{color:#b0b0c0;margin-bottom:16px}
.qa{padding:16px;margin:8px 0;background:#16162a;border:1px solid #2a2a4a;border-radius:8px}
.qa-q{color:#fff;font-weight:600;margin-bottom:8px;font-size:0.95rem}
.qa-a{color:#b0b0c0;font-size:0.9rem;line-height:1.7}
.qa-a a{color:#8b7cf7;text-decoration:none}
a{color:#8b7cf7;text-decoration:none}a:hover{color:#a99eff}
.footer{text-align:center;padding:24px;color:#333;font-size:0.75rem;border-top:1px solid #2a2a4a;margin-top:48px}
.breadcrumb{padding:16px 24px 0;font-size:0.8rem;color:#555;max-width:800px;margin:0 auto}
.bc-sep{margin:0 8px;color:#444}`;

const categories = {
  'Getting Started': [
    {q:'What is AutoMoney Store?', a:'AutoMoney is a digital products marketplace offering premium guides, templates, tools, and bundles for online entrepreneurs. All products are delivered instantly after USDT TRC-20 payment verification. No registration or account creation required.'},
    {q:'How do I buy a product?', a:'Click "Buy" on any product page. You will see the price in USDT and our wallet address. Send the exact amount via USDT TRC-20, then paste the transaction hash (TXID) on the verification page. Your download link appears automatically once confirmed.'},
    {q:'Do I need to create an account?', a:'No. We do not require registration, social login, or email verification. Just send payment and download your product. Your transaction is verified on the Tron blockchain.'},
    {q:'What payment methods do you accept?', a:'We accept USDT (TRC-20) only. This is the most widely used stablecoin on the Tron network with fast confirmation times and low transaction fees (< $0.50).'},
    {q:'Is my payment information secure?', a:'All transactions happen on the Tron blockchain. We never see or store your wallet private keys. Your payment is verified through the public Tronscan API. The transaction is immutable and transparent.'}
  ],
  'Products & Downloads': [
    {q:'What types of digital products do you sell?', a:'We offer guides and workbooks, template packs (Notion, Canva, Figma), AI prompt libraries, business automation bundles, spreadsheets and dashboards, design assets, and complete online business systems. Browse all products at ' + SITE + '/products/.'},
    {q:'How do I access my purchase after payment?', a:'After payment verification, you receive a unique download URL. Click it to download your files directly. The download link is valid for 7 days and allows 3 downloads. Save your files after downloading.'},
    {q:'Can I get a refund?', a:'Yes. We offer a 7-day refund policy for all digital products. Contact us with your TXID and reason for refund. Since payments are on blockchain, refunds are processed by sending USDT back to your wallet.'},
    {q:'What format are the products in?', a:'Guides and workbooks: PDF. Templates: Canva template links or Google Drive folders. Prompt libraries: HTML or Markdown. Spreadsheets: Google Sheets or Excel. All formats are universally accessible.'},
    {q:'Can I access my purchases on multiple devices?', a:'Yes. Your download link works on any device with internet access. Download the files once, then transfer them to all your devices. We recommend storing backups in cloud storage.'}
  ],
  'USDT & Crypto Payments': [
    {q:'What is USDT TRC-20?', a:'USDT (Tether) is a stablecoin pegged 1:1 to the US Dollar. TRC-20 is the token standard on the Tron blockchain. USDT TRC-20 combines the stability of USD with the speed and low fees of the Tron network. It is the most popular stablecoin for digital payments worldwide.'},
    {q:'How do I buy USDT?', a:'You can buy USDT on any major cryptocurrency exchange: Binance, Coinbase, Kraken, OKX, KuCoin, or Bybit. Purchase with fiat currency (USD, EUR, CNY) using bank transfer, credit card, or P2P trading. Withdraw to your personal wallet.'},
    {q:'How much are transaction fees?', a:'TRC-20 transaction fees are typically $0.20-0.50 per transfer. This is significantly cheaper than Ethereum ERC-20 ($2-10) or Bitcoin ($1-5). The fee goes to Tron network validators, not to us.'},
    {q:'How long does a TRC-20 transaction take?', a:'Most TRC-20 transactions confirm within 30-60 seconds. The Tron network processes approximately 2000 transactions per second, so there is rarely congestion or delays.'},
    {q:'What wallet should I use?', a:'Popular wallets include Trust Wallet (mobile), TronLink (browser extension), and exchange wallets (Binance, OKX). For long-term storage, use a private wallet where you control the private keys.'},
    {q:'What if I send the wrong amount?', a:'Our verification system checks the exact amount with a small tolerance window. If the amount does not match, the system asks you to send the difference or contact support for a partial refund.'},
    {q:'Can I get a chargeback?', a:'No. Crypto transactions are irreversible. Once confirmed on the blockchain, the payment cannot be reversed. This protects merchants from chargeback fraud. We offer voluntary refunds within 7 days as a trust signal.'}
  ],
  'SEO & Traffic': [
    {q:'How do you drive traffic without social media?', a:'We use pure SEO (Search Engine Optimization) and GEO (Generative Engine Optimization). Our content is optimized for Google, Bing, and AI search engines like Perplexity, ChatGPT Search, and Google AI Overview. No social media promotion, no email marketing.'},
    {q:'What is GEO (Generative Engine Optimization)?', a:'GEO is the practice of optimizing content to be cited by AI-powered search engines. Unlike traditional SEO that targets search result rankings, GEO targets being referenced as an authoritative source within AI-generated answers. We use FAQ schema, Article schema, and direct answer formats to maximize citations.'},
    {q:'How do you get indexed by search engines?', a:'We submit our sitemap via IndexNow protocol (supported by Bing, Yandex, Seznam) and directly to Google Search Console. Our content is fully static and fast-loading on Cloudflare Pages, which helps with search engine crawling.'},
    {q:'Do you use backlinks for SEO?', a:'We focus on content quality and structured data rather than traditional backlink building. In GEO, structured data and answer completeness matter more than domain authority. Our content earns citations from AI search engines through quality and clarity.'},
    {q:'How long does it take to get search traffic?', a:'Initial impressions typically appear within 2-4 weeks after content is published. Significant traffic builds over 3-6 months as content compounds. Consistency in publishing is more important than volume.'}
  ],
  'Tools & Free Resources': [
    {q:'What free tools do you offer?', a:'We offer 34+ free online tools including: SEO HTML Analyzer, Schema Generator, SERP Preview Tool, Readability Score, Word Counter, Password Generator, UUID Generator, Age Calculator, and more. All tools are free with no registration. Visit ' + SITE + '/tools/.'},
    {q:'Do I need to create an account to use the tools?', a:'No. All our tools are completely free with no registration, no login, and no ads. Just open the tool page and start using it immediately.'},
    {q:'What is the SEO HTML Analyzer?', a:'It scans your webpage and checks: meta title and description, heading structure (H1-H6), image alt attributes, schema markup validity, Open Graph and Twitter Card tags, keyword density, internal and external links, and page load indicators. Available at ' + SITE + '/tools/seo-analyzer.html.'},
    {q:'What is the Schema Generator?', a:'It generates valid JSON-LD schema markup for: Article, FAQPage, Product, HowTo, BreadcrumbList, and Organization. You fill in the fields and it outputs ready-to-copy schema code. Available at ' + SITE + '/tools/schema-generator.html.'},
    {q:'What is the SERP Preview Tool?', a:'It shows a realistic preview of how your page appears in Google search results based on your title tag and meta description. Helps optimize click-through rate before publishing. Available at ' + SITE + '/tools/serp-preview.html.'},
    {q:'What is the Readability Score tool?', a:'It calculates the Flesch Reading Ease and Flesch-Kincaid Grade Level scores for your content. Easy-to-read content ranks better in search and performs better with AI search engines. Available at ' + SITE + '/tools/readability-score.html.'}
  ],
  'Affiliate Program': [
    {q:'How does the affiliate program work?', a:'You earn 20% commission on every sale you refer. Share your unique referral link. When someone clicks your link and makes a purchase within 30 days, you earn 20% of the sale amount. Commissions are paid in USDT TRC-20.'},
    {q:'How do I join the affiliate program?', a:'Visit the affiliate page at ' + SITE + '/affiliate.html and register with your name, email, and website (optional). You receive a unique referral code immediately. No approval process.'},
    {q:'When do I get paid?', a:'Commissions are paid weekly in USDT TRC-20. You must have at least $10 in accrued commissions to receive a payout. Payments are sent to your provided USDT wallet address.'},
    {q:'Can I promote your products on any platform?', a:'Yes. You can promote on websites, blogs, YouTube, or any platform. You cannot use spam, paid ads on our brand name, or misrepresent our products.'}
  ]
};

const allFaqs = [];
let bodyHtml = '';

for (const [cat, qas] of Object.entries(categories)) {
  bodyHtml += `<h2>${cat}</h2>\n`;
  for (const {q, a} of qas) {
    allFaqs.push({q, a});
    bodyHtml += `<div class="qa"><div class="qa-q">${q}</div><div class="qa-a">${a}</div></div>\n`;
  }
}

const schema = `<script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[${allFaqs.map(f => `{"@type":"Question","name":${JSON.stringify(f.q)},"acceptedAnswer":{"@type":"Answer","text":${JSON.stringify(f.a)}}}`).join(',')}]}</script>`;

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Knowledge Base & FAQ | AutoMoney Store</title>
<meta name="description" content="Complete knowledge base covering digital products, USDT TRC-20 payments, GEO/SEO, free tools, affiliate program, and more. Find answers to all your questions.">
<link rel="canonical" href="${SITE}/knowledge-base.html">
<meta property="og:title" content="Knowledge Base & FAQ | AutoMoney Store">
<meta property="og:description" content="Complete knowledge base covering digital products, USDT payments, GEO/SEO, free tools, and affiliate program.">
<meta property="og:url" content="${SITE}/knowledge-base.html">
<meta name="robots" content="index, follow">
${schema}
<style>${CSS}</style>
</head>
<body>
<nav class="breadcrumb" aria-label="Breadcrumb">
  <a href="/">Home</a><span class="bc-sep">\u203a</span><span>Knowledge Base</span>
</nav>
<div class="wrap">
<h1>Knowledge Base & FAQ</h1>
<p class="subtitle">Everything you need to know about AutoMoney Store — from buying products to understanding our SEO strategy.</p>

${bodyHtml}

<div class="footer">
  <p>AutoMoney Store &copy; 2026 | <a href="${SITE}/">Home</a> | <a href="${SITE}/products/">Products</a> | <a href="${SITE}/tools/">Free Tools</a> | <a href="${SITE}/blog/">Blog</a> | <a href="${SITE}/affiliate.html">Affiliate</a></p>
</div>
</div>
</body>
</html>`;

const outPath = path.resolve(__dirname, '..', 'output', 'knowledge-base.html');
fs.writeFileSync(outPath, html, 'utf-8');
console.log('Created: knowledge-base.html (' + allFaqs.length + ' Q&A pairs)');
