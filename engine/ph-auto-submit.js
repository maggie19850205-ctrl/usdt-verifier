const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const EMAIL = 'maomaolove@zohomail.cn';
const PASSWORD = 'Zxcvbnm,./20131224';
const LOG = path.join(__dirname, '..', 'submit-log.txt');
const SS = prefix => path.join(__dirname, '..', prefix + '.png');

function log(m) { console.log(m); fs.appendFileSync(LOG, m + '\n'); }
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function chromePath() {
  const p = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  if (fs.existsSync(p)) return p;
  return 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
}

async function fillField(page, selectors, value) {
  for (const sel of selectors) {
    const el = await page.$(sel);
    if (el) { await el.click({clickCount: 3}); await el.type(value, {delay: 30}); return true; }
  }
  return false;
}

async function main() {
  log('=== Product Hunt Auto Submit ===');
  fs.writeFileSync(LOG, '');

  const browser = await puppeteer.launch({
    executablePath: chromePath(),
    headless: false,
    defaultViewport: { width: 1280, height: 800 },
    args: ['--disable-blink-features=AutomationControlled']
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36');

  try {
    // Step 1: Go to Product Hunt
    log('1. Opening Product Hunt...');
    await page.goto('https://www.producthunt.com/', { waitUntil: 'networkidle0', timeout: 60000 });
    await sleep(3000);

    // Step 2: Click Sign In
    log('2. Clicking Sign In...');
    // Try JS-based click (more reliable than CSS selectors for PH)
    await page.evaluate(() => {
      const btns = document.querySelectorAll('a, button, span');
      for (const b of btns) {
        if (b.textContent.includes('Sign in') || b.textContent.includes('Log in')) {
          b.click(); return;
        }
      }
    });
    log('Clicked Sign In via JS');
    await sleep(2000);
    await sleep(3000);
    await page.screenshot({ path: SS('ph-login-modal') });

    // Step 3: Fill login form
    log('3. Filling login form...');
    // PH login might use email first, then password
    const emailField = await page.$('input[type="email"], input[name="email"], input[autocomplete="email"]');
    if (emailField) {
      await emailField.type(EMAIL, {delay: 30});
      log('Email filled');
      await sleep(1000);
    }

    // Check for "Continue" or "Next" button (multi-step login) via JS
    const hasContinue = await page.evaluate(() => {
      const btns = document.querySelectorAll('button, a');
      for (const b of btns) {
        if (b.textContent.includes('Continue') || b.textContent.includes('Next')) {
          b.click(); return true;
        }
      }
      return false;
    });
    if (hasContinue) { log('Clicked Continue/Next'); await sleep(3000); }

    // Fill password
    const passField = await page.$('input[type="password"], input[name="password"]');
    if (passField) {
      await passField.type(PASSWORD, {delay: 30});
      log('Password filled');
      await sleep(1000);
    }

    // Submit login
    const submitBtn = await page.$('button[type="submit"]');
    if (submitBtn) {
      await submitBtn.click();
      log('Login submitted');
    } else {
      await page.keyboard.press('Enter');
      log('Pressed Enter for login');
    }
    await sleep(5000);
    await page.screenshot({ path: SS('ph-after-login') });
    log('Page URL after login:', page.url());

    // Wait for login to complete
    await page.waitForNavigation({ timeout: 30000 }).catch(() => {});
    await sleep(3000);

    // Step 4: Navigate to new post
    log('4. Navigating to new post...');
    await page.goto('https://www.producthunt.com/posts/new', { waitUntil: 'networkidle0', timeout: 60000 });
    await sleep(5000);
    await page.screenshot({ path: SS('ph-new-post') });
    log('New post page URL:', page.url());

    // Save page HTML for analysis
    const html = await page.content();
    fs.writeFileSync('ph-new-post.html', html, 'utf-8');

    // Step 5: Fill the form
    log('5. Filling submission form...');
    const formData = {
      name: 'MaoMaoLove',
      tagline: 'Digital Products Store Powered by USDT TRC-20 — Instant Delivery, No Registration',
      description: 'MaoMaoLove is a fully automated digital products marketplace with 268+ premium products. Pay with USDT (TRC-20) cryptocurrency, get instant download access. No registration, no bank account, no chargebacks.\n\nCatalog includes:\n• AI Prompt Libraries (500+ prompts)\n• Notion Business Dashboards\n• Canva & Figma Templates\n• SEO/GEO Audit Checklists\n• Content Creation Template Packs\n• Business Automation Suites\n\nBuilt with Cloudflare Workers + TRON blockchain verification. Every purchase is verified on-chain and delivered automatically.',
      url: 'https://maomaolove.pages.dev',
      youtubeUrl: '',
      twitterUrl: ''
    };

    // Try multiple selector strategies
    const nameSelectors = [
      '#post_name', 'input[name="post[name]"]', '[data-test="post-name"]',
      'input[placeholder*="Name"]', 'input[placeholder*="name"]', 'input[aria-label*="Name"]'
    ];
    const taglineSelectors = [
      '#post_tagline', 'input[name="post[tagline]"]', '[data-test="post-tagline"]',
      'input[placeholder*="Tagline"]', 'input[placeholder*="tagline"]', 'input[aria-label*="Tagline"]'
    ];
    const descSelectors = [
      '#post_description', 'textarea[name="post[description]"]', '[data-test="post-description"]',
      'textarea[placeholder*="Description"]', 'textarea[aria-label*="Description"]'
    ];
    const urlSelectors = [
      '#post_url', 'input[name="post[url]"]', '[data-test="post-url"]',
      'input[placeholder*="URL"]', 'input[placeholder*="url"]', 'input[aria-label*="URL"]'
    ];

    // Try to find fields by placeholder text
    const allInputs = await page.$$('input, textarea');
    for (const el of allInputs) {
      const placeholder = await el.evaluate(e => e.placeholder || '').catch(() => '');
      const ariaLabel = await el.evaluate(e => e.getAttribute('aria-label') || '').catch(() => '');
      const name = await el.evaluate(e => e.name || '').catch(() => '');
      const id = await el.evaluate(e => e.id || '').catch(() => '');
      const type = await el.evaluate(e => e.type || '').catch(() => '');
      log(`Field: id="${id}" name="${name}" type="${type}" placeholder="${placeholder}" aria-label="${ariaLabel}"`);
    }

    // Fill each field
    if (await fillField(page, nameSelectors, formData.name)) log('Name: filled');
    if (await fillField(page, taglineSelectors, formData.tagline)) log('Tagline: filled');
    if (await fillField(page, descSelectors, formData.description)) log('Description: filled');
    if (await fillField(page, urlSelectors, formData.url)) log('URL: filled');

    await page.screenshot({ path: SS('ph-form-filled') });
    log('6. Form filled. Submit button should be visible.');
    log('Please check the Chrome window - if CAPTCHA is needed, solve it and click Submit.');

    // Don't auto-submit - let user check and submit
    log('\n=== WAITING FOR YOU ===');
    log('The form is filled in the Chrome window.');
    log('If there is a CAPTCHA, solve it.');
    log('Then click the Submit button.');
    log('The script will wait 3 minutes...');

    // Wait for manual submission or timeout
    await sleep(180000);
    log('Timeout reached. Script ending.');

  } catch(e) {
    log('Error: ' + e.message);
    console.error(e);
  }

  await browser.close();
  log('\n=== Done ===');
  log('Screenshots saved. Check ph-*.png files.');
}

main();
