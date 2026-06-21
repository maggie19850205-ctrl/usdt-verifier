const puppeteer = require('puppeteer-core');
const https = require('https');
const path = require('path');
const fs = require('fs');

const EMAIL = 'maomaolove@zohomail.cn';
const PASSWORD = 'Zxcvbnm,./20131224';
const SITE = 'https://maomaolove.pages.dev';
const PRODUCT_TAGLINE = 'The first fully automated digital products marketplace powered by USDT TRC-20 — no registration, instant delivery';

const LOG = path.join(__dirname, '..', 'submit-results.log');
fs.writeFileSync(LOG, `=== Auto Submit Log ${new Date().toISOString()} ===\n\n`);

function log(...args) {
  const msg = args.join(' ');
  console.log(msg);
  fs.appendFileSync(LOG, msg + '\n');
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function chromePath() {
  const p = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  if (fs.existsSync(p)) return p;
  return 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
}

// === BetaList ===
async function submitBetaList(browser) {
  log('\n--- BetaList ---');
  const page = await browser.newPage();
  try {
    await page.goto('https://betalist.com/submit', { waitUntil: 'networkidle0', timeout: 30000 });
    await sleep(2000);
    await page.type('input[name="first_name"]', 'Maggie');
    await page.type('input[name="last_name"]', 'Chen');
    await page.type('input[name="email"]', EMAIL);
    await page.type('input[name="product_name"]', 'MaoMaoLove');
    await page.type('input[name="product_url"]', SITE);
    await page.type('input[name="tagline"]', PRODUCT_TAGLINE);
    await page.type('textarea[name="description"]', 'MaoMaoLove is a premium digital products marketplace. We accept USDT TRC-20 payments and deliver instantly with no registration required. Features: 268+ products, AI tools, templates, business guides, instant delivery, blockchain-verified payments.');
    await page.type('input[name="twitter"]', '@maomaolove');
    const btn = await page.$('button[type="submit"]');
    if (btn) { await btn.click(); log('BetaList: form submitted'); }
    else { log('BetaList: submit button not found'); }
    await page.screenshot({ path: path.join(__dirname, '..', 'screenshot-betalist.png') });
  } catch(e) { log('BetaList error:', e.message); }
  await page.close();
}

// === AlternativeTo ===
async function submitAlternativeTo(browser) {
  log('\n--- AlternativeTo ---');
  const page = await browser.newPage();
  try {
    await page.goto('https://alternativeto.net/', { waitUntil: 'networkidle0', timeout: 30000 });
    await sleep(2000);
    await page.goto('https://alternativeto.net/users/sign_up/', { waitUntil: 'networkidle0', timeout: 30000 });
    await sleep(2000);
    const emailInput = await page.$('input[type="email"]');
    const passInput = await page.$('input[type="password"]');
    if (emailInput && passInput) {
      await emailInput.type(EMAIL);
      await passInput.type(PASSWORD);
      const signupBtn = await page.$('button[type="submit"]');
      if (signupBtn) { await signupBtn.click(); log('AlternativeTo: signup submitted'); }
    } else {
      log('AlternativeTo: trying login page');
      await page.goto('https://alternativeto.net/users/sign_in/', { waitUntil: 'networkidle0', timeout: 30000 });
      await sleep(2000);
    }
    await page.screenshot({ path: path.join(__dirname, '..', 'screenshot-alternativeto.png') });
  } catch(e) { log('AlternativeTo error:', e.message); }
  await page.close();
}

// === SaaSHub ===
async function submitSaaSHub(browser) {
  log('\n--- SaaSHub ---');
  const page = await browser.newPage();
  try {
    await page.goto('https://www.saashub.com/submit', { waitUntil: 'networkidle0', timeout: 30000 });
    await sleep(2000);
    const emailIn = await page.$('input[type="email"]');
    if (emailIn) {
      await emailIn.type(EMAIL);
      await page.type('input[name="name"]', 'MaoMaoLove');
      await page.type('input[name="url"]', SITE);
      await page.type('textarea[name="description"]', PRODUCT_TAGLINE);
      const btn = await page.$('button[type="submit"]');
      if (btn) { await btn.click(); log('SaaSHub: form submitted'); }
    } else { log('SaaSHub: form fields not found'); }
    await page.screenshot({ path: path.join(__dirname, '..', 'screenshot-saashub.png') });
  } catch(e) { log('SaaSHub error:', e.message); }
  await page.close();
}

// === Product Hunt ===
async function submitProductHunt(browser) {
  log('\n--- Product Hunt (most important) ---');
  const page = await browser.newPage();
  try {
    log('Navigating to Product Hunt...');
    await page.goto('https://www.producthunt.com/', { waitUntil: 'networkidle0', timeout: 30000 });
    await sleep(2000);

    // Login
    log('Clicking login...');
    const loginLink = await page.$('a[href*="login"]');
    if (loginLink) { await loginLink.click(); await sleep(3000); }

    await page.screenshot({ path: path.join(__dirname, '..', 'screenshot-ph-login.png') });
    log('Screenshot saved. Please check: screenshot-ph-login.png');
    log('Product Hunt may require solving CAPTCHA or email verification.');
    log('If logged in, the script will continue to submit...');

    // Try to fill login form
    const emailField = await page.$('input[type="email"], input[name="email"]');
    if (emailField) {
      await emailField.type(EMAIL);
      const passField = await page.$('input[type="password"], input[name="password"]');
      if (passField) { await passField.type(PASSWORD); }
      const submitBtn = await page.$('button[type="submit"]');
      if (submitBtn) { await submitBtn.click(); log('Login submitted'); await sleep(5000); }
    }

    await page.screenshot({ path: path.join(__dirname, '..', 'screenshot-ph-after-login.png') });

    // Navigate to new post
    log('Navigating to new post page...');
    await page.goto('https://www.producthunt.com/posts/new', { waitUntil: 'networkidle0', timeout: 30000 });
    await sleep(3000);

    await page.screenshot({ path: path.join(__dirname, '..', 'screenshot-ph-new-post.png') });

    // Fill the product name
    const nameField = await page.$('#post_name, input[name="post[name]"], [data-test="post-name"]');
    if (nameField) {
      await nameField.type('MaoMaoLove');
      log('Filled name');
    }

    const taglineField = await page.$('#post_tagline, input[name="post[tagline]"], [data-test="post-tagline"]');
    if (taglineField) {
      await taglineField.type('Digital Products Store Powered by USDT TRC-20 — No Registration, Instant Delivery');
      log('Filled tagline');
    }

    const descField = await page.$('textarea[name="post[description]"], [data-test="post-description"]');
    if (descField) {
      await descField.type('MaoMaoLove is a fully automated digital products marketplace with 268+ products. Pay with USDT (TRC-20), get instant access. No registration, no bank account, no chargebacks. Features AI prompt libraries, Notion templates, Canva designs, business guides, SEO/GEO resources, and automation bundles. Built with Cloudflare Workers, TRON blockchain verification, and zero human touch from purchase to delivery.');
      log('Filled description');
    }

    // Fill URL
    const urlField = await page.$('input[name="post[url]"], [data-test="post-url"]');
    if (urlField) {
      await urlField.type('https://maomaolove.pages.dev');
      log('Filled URL');
    }

    await page.screenshot({ path: path.join(__dirname, '..', 'screenshot-ph-filled.png') });
    log('Product Hunt form filled. You may need to upload images and submit manually.');
    log('Product Hunt submission form is intentionally hard to fully automate.');
    log('Check screenshot-ph-filled.png and complete the submission.');

  } catch(e) { log('Product Hunt error:', e.message); }
  await page.close();
}

async function main() {
  log('Starting browser automation...');
  log(`Target: ${SITE}`);
  log(`Email: ${EMAIL}`);

  let browser;
  try {
    browser = await puppeteer.launch({
      executablePath: chromePath(),
      headless: false,
      defaultViewport: { width: 1280, height: 800 },
      args: ['--disable-blink-features=AutomationControlled']
    });
    log('Browser launched\n');

    // Run all submissions
    await submitBetaList(browser);
    await sleep(3000);
    await submitAlternativeTo(browser);
    await sleep(3000);
    await submitSaaSHub(browser);
    await sleep(3000);
    await submitProductHunt(browser);

  } catch(e) {
    log('Fatal error:', e.message);
    console.error(e);
  } finally {
    if (browser) await browser.close();
    log('\n=== Done ===');
    log(`Full log: ${LOG}`);
    console.log(`\nSubmit log saved to: ${LOG}`);
  }
}

main();
