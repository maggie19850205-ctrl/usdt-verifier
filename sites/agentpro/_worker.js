// Auto-generated _worker.js with multilingual routing + auth + rate limiting
const USDT_ADDRESS = 'TRnz5Pi8R3hjCbBjnDuZo7ZvR57euo2q8Z';
const TRONSCAN_API = 'https://apilist.tronscanapi.com/api';
const SITE_URL = 'https://automoney-store.pages.dev';
const ADMIN_TOKEN = 'automoney-admin-2026';
const REVENUE_GOAL = 600;
const COMMISSION_RATE = 20;
const LANG_CODES = ["zh","en","es","pt"];

const PRODUCT_FILES = {
  'ai-productivity-tools-complete-guide': 'ai-productivity-tools-complete-guide.html',
  'why-side-hustle-ideas-matters': 'why-side-hustle-ideas-matters.html',
  'remote-work-productivity-explained-in-60s': 'remote-work-productivity-explained-in-60s.html',
  'best-ai-productivity-tools-products': 'best-ai-productivity-tools-products.html',
  'machine-learning-basics-product': 'machine-learning-basics-product.html',
  'artificial-intelligence-tools-deals-coupons': 'artificial-intelligence-tools-deals-coupons.html',
  'no-code-development-notion-dashboard': 'no-code-development-notion-dashboard.html',
  'data-privacy-guide-canva-templates': 'data-privacy-guide-canva-templates.html',
  'personal-finance-2026-spreadsheet-template': 'personal-finance-2026-spreadsheet-template.html',
  'side-hustle-ideas-svg-icon-pack': 'side-hustle-ideas-svg-icon-pack.html',
  'side-hustle-ideas-ui-design-kit': 'side-hustle-ideas-ui-design-kit.html',
  'ai-in-education-font-sfx-pack': 'ai-in-education-font-sfx-pack.html',
  'no-code-development-planner-2026': 'no-code-development-planner-2026.html',
  'the-personal-finance-2026-handbook': 'the-personal-finance-2026-handbook.html',
  'ai-productivity-tools-activity-book': 'ai-productivity-tools-activity-book.html',
  'artificial-intelligence-tools-design-collection': 'artificial-intelligence-tools-design-collection.html',
  'no-code-development-apparel-line': 'no-code-development-apparel-line.html',
  'free-pdf-tools-online-business-automation': 'free-pdf-tools-online-business-automation.html',
  'free-image-tools-no-code-development': 'free-image-tools-no-code-development.html',
  'free-text-tools-ai-productivity-tools': 'free-text-tools-ai-productivity-tools.html',
  'free-converters-crypto-blockchain': 'free-converters-crypto-blockchain.html',
  'side-hustle-ideas-qr-generator': 'side-hustle-ideas-qr-generator.html',
  'ai-productivity-tools-resume-builder': 'ai-productivity-tools-resume-builder.html',
  'ai-productivity-tools-form-builder': 'ai-productivity-tools-form-builder.html',
  'online-business-automation-ai-writing-tool': 'online-business-automation-ai-writing-tool.html',
  'sustainable-business-product': 'sustainable-business-product.html',
  'freelancing-tips-ai-voice-generator': 'freelancing-tips-ai-voice-generator.html',
  'passive-income-2026-chrome-extension': 'passive-income-2026-chrome-extension.html',
  'time-management-api': 'time-management-api.html',
  'no-code-development-stock-collection': 'no-code-development-stock-collection.html',
  'ai-productivity-tools-what-you-need-to-know': 'ai-productivity-tools-what-you-need-to-know.html',
  'data-privacy-guide-smart-money-guide': 'data-privacy-guide-smart-money-guide.html',
  'mindfulness-meditation-for-better-living': 'mindfulness-meditation-for-better-living.html',
  'investment-strategies-travel-guide': 'investment-strategies-travel-guide.html',
  'best-side-hustle-ideas-tech': 'best-side-hustle-ideas-tech.html',
  'no-code-development-tools-reviewed': 'no-code-development-tools-reviewed.html',
  'data-privacy-guide-gaming-guide': 'data-privacy-guide-gaming-guide.html',
  'content-creation-tips-pet-care-guide': 'content-creation-tips-pet-care-guide.html',
  'ai-search-optimization-parenting-tips': 'ai-search-optimization-parenting-tips.html',
  'data-privacy-guide-diy-projects': 'data-privacy-guide-diy-projects.html',
  'data-privacy-guide-crypto-guide': 'data-privacy-guide-crypto-guide.html',
  'data-privacy-guide-marketing-playbook': 'data-privacy-guide-marketing-playbook.html',
  'ai-in-education-powerpoint-deck': 'ai-in-education-powerpoint-deck.html',
  'data-privacy-guide-figma-ui-kit': 'data-privacy-guide-figma-ui-kit.html',
  'artificial-intelligence-tools-lightroom-presets': 'artificial-intelligence-tools-lightroom-presets.html',
  'online-business-automation-wordpress-theme': 'online-business-automation-wordpress-theme.html',
  'health-wellness-trends-font-collection': 'health-wellness-trends-font-collection.html',
  'data-privacy-guide-icon-collection': 'data-privacy-guide-icon-collection.html',
  'side-hustle-ideas-mockup-pack': 'side-hustle-ideas-mockup-pack.html',
  'digital-marketing-video-template': 'digital-marketing-video-template.html',
  'ai-productivity-tools-invoice-generator': 'ai-productivity-tools-invoice-generator.html',
  'ai-productivity-tools-contract-builder': 'ai-productivity-tools-contract-builder.html',
  'freelancing-tips-proposal-builder': 'freelancing-tips-proposal-builder.html',
  'passive-income-2026-slogan-generator': 'passive-income-2026-slogan-generator.html',
  'time-management-name-generator': 'time-management-name-generator.html',
  'machine-learning-basics-color-palette': 'machine-learning-basics-color-palette.html',
  'data-privacy-guide-seo-analyzer': 'data-privacy-guide-seo-analyzer.html',
  'mindfulness-meditation-keyword-tool': 'mindfulness-meditation-keyword-tool.html',
  'investment-strategies-ai-image-upscaler': 'investment-strategies-ai-image-upscaler.html',
  'no-code-development-ai-background-remover': 'no-code-development-ai-background-remover.html',
  'sustainable-business-ai-logo-maker': 'sustainable-business-ai-logo-maker.html',
  'no-code-development-ai-thumbnail-maker': 'no-code-development-ai-thumbnail-maker.html',
  'content-creation-tips-ai-caption-generator': 'content-creation-tips-ai-caption-generator.html',
  'online-business-automation-ai-email-writer': 'online-business-automation-ai-email-writer.html',
  'ai-search-optimization-pomodoro-timer': 'ai-search-optimization-pomodoro-timer.html',
  'no-code-ai-tools-habit-tracker': 'no-code-ai-tools-habit-tracker.html',
  'online-business-automation-password-generator': 'online-business-automation-password-generator.html',
  'data-privacy-guide-random-picker': 'data-privacy-guide-random-picker.html',
  'digital-nomad-lifestyle-deadline-calculator': 'digital-nomad-lifestyle-deadline-calculator.html',
  'remote-work-productivity-meeting-scheduler': 'remote-work-productivity-meeting-scheduler.html',
  'ai-in-education-tab-manager': 'ai-in-education-tab-manager.html',
  'side-hustle-ideas-scroll-marker': 'side-hustle-ideas-scroll-marker.html',
  'personal-finance-2026-color-picker': 'personal-finance-2026-color-picker.html',
  'artificial-intelligence-tools-link-saver': 'artificial-intelligence-tools-link-saver.html',
  'ai-agents-automation-checklist-workbook': 'ai-agents-automation-checklist-workbook.html',
  'ai-agents-automation-complete-guide': 'ai-agents-automation-complete-guide.html',
  'ai-agents-automation-template-pack': 'ai-agents-automation-template-pack.html',
  'ai-agents-automation-ultimate-bundle': 'ai-agents-automation-ultimate-bundle.html',
  'ai-code-generation-tools-checklist-workbook': 'ai-code-generation-tools-checklist-workbook.html',
  'ai-code-generation-tools-complete-guide': 'ai-code-generation-tools-complete-guide.html',
  'ai-code-generation-tools-template-pack': 'ai-code-generation-tools-template-pack.html',
  'ai-code-generation-tools-ultimate-bundle': 'ai-code-generation-tools-ultimate-bundle.html',
  'ai-customer-support-automation-checklist-workbook': 'ai-customer-support-automation-checklist-workbook.html',
  'ai-customer-support-automation-complete-guide': 'ai-customer-support-automation-complete-guide.html',
  'ai-customer-support-automation-template-pack': 'ai-customer-support-automation-template-pack.html',
  'ai-customer-support-automation-ultimate-bundle': 'ai-customer-support-automation-ultimate-bundle.html',
  'ai-seo-optimization-checklist-workbook': 'ai-seo-optimization-checklist-workbook.html',
  'ai-seo-optimization-complete-guide': 'ai-seo-optimization-complete-guide.html',
  'ai-seo-optimization-template-pack': 'ai-seo-optimization-template-pack.html',
  'ai-seo-optimization-ultimate-bundle': 'ai-seo-optimization-ultimate-bundle.html',
  'ai-video-generation-checklist-workbook': 'ai-video-generation-checklist-workbook.html',
  'ai-video-generation-complete-guide': 'ai-video-generation-complete-guide.html',
  'ai-video-generation-template-pack': 'ai-video-generation-template-pack.html',
  'ai-video-generation-ultimate-bundle': 'ai-video-generation-ultimate-bundle.html',
  'api-integration-marketplace-checklist-workbook': 'api-integration-marketplace-checklist-workbook.html',
  'api-integration-marketplace-complete-guide': 'api-integration-marketplace-complete-guide.html',
  'api-integration-marketplace-template-pack': 'api-integration-marketplace-template-pack.html',
  'api-integration-marketplace-ultimate-bundle': 'api-integration-marketplace-ultimate-bundle.html',
  'automated-content-creation-checklist-workbook': 'automated-content-creation-checklist-workbook.html',
  'automated-content-creation-complete-guide': 'automated-content-creation-complete-guide.html',
  'automated-content-creation-template-pack': 'automated-content-creation-template-pack.html',
  'automated-content-creation-ultimate-bundle': 'automated-content-creation-ultimate-bundle.html',
  'automated-invoice-generator-checklist-workbook': 'automated-invoice-generator-checklist-workbook.html',
  'automated-invoice-generator-complete-guide': 'automated-invoice-generator-complete-guide.html',
  'automated-invoice-generator-template-pack': 'automated-invoice-generator-template-pack.html',
  'automated-invoice-generator-ultimate-bundle': 'automated-invoice-generator-ultimate-bundle.html',
  'best-ai-agents-automation-tools-resources': 'best-ai-agents-automation-tools-resources.html',
  'best-ai-code-generation-tools-tools-resources': 'best-ai-code-generation-tools-tools-resources.html',
  'best-ai-customer-support-automation-tools-resources': 'best-ai-customer-support-automation-tools-resources.html',
  'best-ai-seo-optimization-tools-resources': 'best-ai-seo-optimization-tools-resources.html',
  'best-ai-video-generation-tools-resources': 'best-ai-video-generation-tools-resources.html',
  'best-api-integration-marketplace-tools-resources': 'best-api-integration-marketplace-tools-resources.html',
  'best-automated-content-creation-tools-resources': 'best-automated-content-creation-tools-resources.html',
  'best-automated-invoice-generator-tools-resources': 'best-automated-invoice-generator-tools-resources.html',
  'best-chatgpt-plugins-development-tools-resources': 'best-chatgpt-plugins-development-tools-resources.html',
  'best-claude-ai-prompt-engineering-tools-resources': 'best-claude-ai-prompt-engineering-tools-resources.html',
  'best-crypto-payment-gateway-tools-resources': 'best-crypto-payment-gateway-tools-resources.html',
  'best-digital-nomad-tools-tools-resources': 'best-digital-nomad-tools-tools-resources.html',
  'best-freelance-ai-assistant-tools-resources': 'best-freelance-ai-assistant-tools-resources.html',
  'best-lead-generation-automation-tools-resources': 'best-lead-generation-automation-tools-resources.html',
  'best-no-code-saas-builder-tools-resources': 'best-no-code-saas-builder-tools-resources.html',
  'best-notion-productivity-system-tools-resources': 'best-notion-productivity-system-tools-resources.html',
  'best-perplexity-ai-research-tools-resources': 'best-perplexity-ai-research-tools-resources.html',
  'best-remote-team-productivity-tools-resources': 'best-remote-team-productivity-tools-resources.html',
  'best-saas-pricing-strategy-tools-resources': 'best-saas-pricing-strategy-tools-resources.html',
  'best-social-media-ai-scheduler-tools-resources': 'best-social-media-ai-scheduler-tools-resources.html',
  'chatgpt-plugins-development-checklist-workbook': 'chatgpt-plugins-development-checklist-workbook.html',
  'chatgpt-plugins-development-complete-guide': 'chatgpt-plugins-development-complete-guide.html',
  'chatgpt-plugins-development-template-pack': 'chatgpt-plugins-development-template-pack.html',
  'chatgpt-plugins-development-ultimate-bundle': 'chatgpt-plugins-development-ultimate-bundle.html',
  'claude-ai-prompt-engineering-checklist-workbook': 'claude-ai-prompt-engineering-checklist-workbook.html',
  'claude-ai-prompt-engineering-complete-guide': 'claude-ai-prompt-engineering-complete-guide.html',
  'claude-ai-prompt-engineering-template-pack': 'claude-ai-prompt-engineering-template-pack.html',
  'claude-ai-prompt-engineering-ultimate-bundle': 'claude-ai-prompt-engineering-ultimate-bundle.html',
  'crypto-payment-gateway-checklist-workbook': 'crypto-payment-gateway-checklist-workbook.html',
  'crypto-payment-gateway-complete-guide': 'crypto-payment-gateway-complete-guide.html',
  'crypto-payment-gateway-template-pack': 'crypto-payment-gateway-template-pack.html',
  'crypto-payment-gateway-ultimate-bundle': 'crypto-payment-gateway-ultimate-bundle.html',
  'digital-nomad-tools-checklist-workbook': 'digital-nomad-tools-checklist-workbook.html',
  'digital-nomad-tools-complete-guide': 'digital-nomad-tools-complete-guide.html',
  'digital-nomad-tools-template-pack': 'digital-nomad-tools-template-pack.html',
  'digital-nomad-tools-ultimate-bundle': 'digital-nomad-tools-ultimate-bundle.html',
  'freelance-ai-assistant-checklist-workbook': 'freelance-ai-assistant-checklist-workbook.html',
  'freelance-ai-assistant-complete-guide': 'freelance-ai-assistant-complete-guide.html',
  'freelance-ai-assistant-template-pack': 'freelance-ai-assistant-template-pack.html',
  'freelance-ai-assistant-ultimate-bundle': 'freelance-ai-assistant-ultimate-bundle.html',
  'lead-generation-automation-checklist-workbook': 'lead-generation-automation-checklist-workbook.html',
  'lead-generation-automation-complete-guide': 'lead-generation-automation-complete-guide.html',
  'lead-generation-automation-template-pack': 'lead-generation-automation-template-pack.html',
  'lead-generation-automation-ultimate-bundle': 'lead-generation-automation-ultimate-bundle.html',
  'no-code-saas-builder-checklist-workbook': 'no-code-saas-builder-checklist-workbook.html',
  'no-code-saas-builder-complete-guide': 'no-code-saas-builder-complete-guide.html',
  'no-code-saas-builder-template-pack': 'no-code-saas-builder-template-pack.html',
  'no-code-saas-builder-ultimate-bundle': 'no-code-saas-builder-ultimate-bundle.html',
  'notion-productivity-system-checklist-workbook': 'notion-productivity-system-checklist-workbook.html',
  'notion-productivity-system-complete-guide': 'notion-productivity-system-complete-guide.html',
  'notion-productivity-system-template-pack': 'notion-productivity-system-template-pack.html',
  'notion-productivity-system-ultimate-bundle': 'notion-productivity-system-ultimate-bundle.html',
  'perplexity-ai-research-checklist-workbook': 'perplexity-ai-research-checklist-workbook.html',
  'perplexity-ai-research-complete-guide': 'perplexity-ai-research-complete-guide.html',
  'perplexity-ai-research-template-pack': 'perplexity-ai-research-template-pack.html',
  'perplexity-ai-research-ultimate-bundle': 'perplexity-ai-research-ultimate-bundle.html',
  'remote-team-productivity-checklist-workbook': 'remote-team-productivity-checklist-workbook.html',
  'remote-team-productivity-complete-guide': 'remote-team-productivity-complete-guide.html',
  'remote-team-productivity-template-pack': 'remote-team-productivity-template-pack.html',
  'remote-team-productivity-ultimate-bundle': 'remote-team-productivity-ultimate-bundle.html',
  'saas-pricing-strategy-checklist-workbook': 'saas-pricing-strategy-checklist-workbook.html',
  'saas-pricing-strategy-complete-guide': 'saas-pricing-strategy-complete-guide.html',
  'saas-pricing-strategy-template-pack': 'saas-pricing-strategy-template-pack.html',
  'saas-pricing-strategy-ultimate-bundle': 'saas-pricing-strategy-ultimate-bundle.html',
  'social-media-ai-scheduler-checklist-workbook': 'social-media-ai-scheduler-checklist-workbook.html',
  'social-media-ai-scheduler-complete-guide': 'social-media-ai-scheduler-complete-guide.html',
  'social-media-ai-scheduler-template-pack': 'social-media-ai-scheduler-template-pack.html',
  'social-media-ai-scheduler-ultimate-bundle': 'social-media-ai-scheduler-ultimate-bundle.html',
  'usdt-payment-gateway-self-hosted': 'usdt-payment-gateway-self-hosted.html',
  'ai-workforce-pro': 'ai-workforce-pro.html',
  'automation-empire': 'automation-empire.html',
  'geo-dominance-toolkit': 'geo-dominance-toolkit.html',
  'infinite-knowledge-factory': 'infinite-knowledge-factory.html',
  'ai-company-builder': 'ai-company-builder.html',
  'context-vault': 'context-vault.html',
  'anti-block-data-harvester': 'anti-block-data-harvester.html',
  'market-intelligence-engine': 'market-intelligence-engine.html'
};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Token',
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status, headers: { 'Content-Type': 'application/json', ...corsHeaders },
  });
}

function html(content, status = 200) {
  return new Response(content, {
    status, headers: { 'Content-Type': 'text/html;charset=utf-8' },
  });
}

function requireAdmin(request) {
  const token = request.headers.get('X-Admin-Token');
  if (token !== ADMIN_TOKEN) {
    return json({ error: 'Unauthorized' }, 401);
  }
  return null;
}

function slugify(text) {
  return (text || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function generateToken() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
}

// In-memory KV fallback when KV_BINDING is not bound
const memStore = new Map();

function kv(env) {
  return env.KV_BINDING || {
    async get(key) {
      const val = memStore.get(key);
      if (!val) return null;
      const { data, ttl, ts } = val;
      if (ttl && Date.now() - ts > ttl * 1000) { memStore.delete(key); return null; }
      return data;
    },
    async put(key, value, opts) {
      memStore.set(key, { data: value, ttl: (opts && opts.expirationTtl) || 0, ts: Date.now() });
      if (memStore.size > 1000) { const first = memStore.keys().next().value; if (first) memStore.delete(first); }
    },
  };
}




async function rateLimit(env, key, maxRequests = 60, windowMs = 60000) {
  const now = Date.now();
  const rlKey = `rl:${key}`;
  try {
    const raw = await kv(env).get( rlKey);
    const data = raw ? JSON.parse(raw) : { count: 0, windowStart: now };
    if (now - data.windowStart > windowMs) {
      data.count = 1;
      data.windowStart = now;
    } else {
      data.count++;
    }
    if (data.count > maxRequests) {
      return { limited: true, retryAfter: Math.ceil((data.windowStart + windowMs - now) / 1000) };
    }
    await kv(env).put(rlKey, JSON.stringify(data), { expirationTtl: Math.ceil(windowMs / 1000) });
  } catch {}
  return { limited: false };
}

async function verifyTRC20(txid, expectedAmount) {
  const res = await fetch(`${TRONSCAN_API}/transaction-info?hash=${txid}`);
  const tx = await res.json();
  if (!tx.confirmed && !tx.blockNumber) {
    return { valid: false, reason: 'Transaction not found' };
  }
  const transfers = tx.tokenTransfer || [];
  const usdtTransfer = transfers.find(t =>
    t.tokenName === 'USDT' && t.to_address === USDT_ADDRESS && t.amount
  );
  if (!usdtTransfer) {
    return { valid: false, reason: 'No USDT transfer found' };
  }
  const receivedAmount = parseFloat(usdtTransfer.amount) / 1000000;
  const amountMatch = Math.abs(receivedAmount - expectedAmount) < 0.01;
  return { valid: true, from: usdtTransfer.from_address, amount: receivedAmount, amountMatch, expectedAmount, txid, timestamp: tx.timestamp };
}

function langFromPath(pathname) {
  const m = pathname.match(/^\/(en|es|pt)\b/);
  return m ? m[1] : 'zh';
}

function langRedirectPath(pathname) {
  if (pathname === '/zh' || pathname.startsWith('/zh/')) {
    return pathname.replace(/^\/zh(\/|$)/, '/');
  }
  return null;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    if (method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    const zhRedirect = langRedirectPath(path);
    if (zhRedirect) {
      return Response.redirect(`${SITE_URL}${zhRedirect}${url.search}`, 301);
    }

    // Serve IndexNow key file directly (bypass ASSETS SPA fallback)
    if (path === '/625e8ab739f0c8372a98ca1a573ff570.txt') {
      return new Response('625e8ab739f0c8372a98ca1a573ff570', {
        headers: { 'Content-Type': 'text/plain;charset=utf-8' }
      });
    }

    try {
      // Bypass rate limiting for search engine crawlers
      const ua = (request.headers.get('User-Agent') || '').toLowerCase();
      const crawlers = ['googlebot','bingbot','perplexitybot','gptbot','chatgpt-user','anthropic-ai','claude-web','ccbot','duckduckbot','yandexbot','slurp','facebookexternalhit','twitterbot','baiduspider','applebot'];
      const isCrawler = crawlers.some(c => ua.includes(c));
      if (!isCrawler) {
        const clientIP = request.headers.get('CF-Connecting-IP') || 'unknown';
        const rl = await rateLimit(env, clientIP, 120, 60000);
        if (rl.limited) {
          return json({ error: 'Rate limited', retryAfter: rl.retryAfter }, 429);
        }
      }

      // 鈹€鈹€ API routes 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€
      if (path === '/api/verify-payment' && method === 'POST') {
        const body = await request.json();
        const { txid, email, product, amount } = body;
        const ref = url.searchParams.get('ref') || '';
        if (!txid || !email) {
          return json({ valid: false, reason: 'Missing txid or email' }, 400);
        }
        const result = await verifyTRC20(txid, amount || 0);
        if (result.valid && result.amountMatch) {
          const slug = slugify(product || '');
          const match = PRODUCT_FILES[slug];
          const token = generateToken();
          await kv(env).put(`dl:${token}`, JSON.stringify({
            product: product || 'Digital Product', slug, file: match || null, created: Date.now(), downloads: 0,
          }), { expirationTtl: 604800 });
          const order = {
            id: `ORD-${Date.now().toString(36).toUpperCase()}`, product: product || 'Digital Product',
            amount: result.amount, email, txid, status: 'verified', downloadUrl: `/download/${token}`, referrer: ref,
            directUrl: match ? `${SITE_URL}/downloads/${match.replace(/\.html$/g, '')}` : null, timestamp: new Date().toISOString(), fromAddress: result.from,
          };
          let orders = [];
          try { const raw = await kv(env).get( 'orders'); orders = raw ? JSON.parse(raw) : []; } catch {}
          orders.push(order);
          await kv(env).put('orders', JSON.stringify(orders));
          let stats = {};
          try { const raw = await kv(env).get( 'stats'); stats = raw ? JSON.parse(raw) : {}; } catch {}
          stats.totalRevenue = (stats.totalRevenue || 0) + result.amount;
          stats.totalOrders = (stats.totalOrders || 0) + 1;
          stats.lastOrder = new Date().toISOString();
          await kv(env).put('stats', JSON.stringify(stats));
          return json({ valid: true, downloadUrl: `/download/${token}`, directUrl: order.directUrl });
        }
        if (result.valid && !result.amountMatch) {
          return json({ valid: false, reason: `Amount mismatch: received $${result.amount.toFixed(2)}, expected ~$${amount.toFixed(2)}` });
        }
        return json({ valid: false, reason: result.reason || 'Payment not found' });
      }

      if (path === '/api/share' && method === 'POST') {
        const body = await request.json();
        const { platform, url: sharedUrl } = body;
        if (!platform || !sharedUrl) return json({ ok: false, reason: 'Missing platform or url' }, 400);
        let shares = [];
        try { const raw = await kv(env).get( 'shares'); shares = raw ? JSON.parse(raw) : []; } catch {}
        shares.push({ platform, url: sharedUrl, ts: Date.now(), date: new Date().toISOString() });
        if (shares.length > 10000) shares.splice(0, shares.length - 10000);
        await kv(env).put('shares', JSON.stringify(shares));
        return json({ ok: true });
      }

      if (path === '/api/share-count' && method === 'GET') {
        const reqUrl = url.searchParams.get('url') || '/';
        let shares = [];
        try { const raw = await kv(env).get( 'shares'); shares = raw ? JSON.parse(raw) : []; } catch {}
        const count = shares.filter(s => s.url === reqUrl).length;
        return json({ count });
      }

      if (path === '/api/track' && method === 'POST') {
        const body = await request.json();
        const { page, referrer, ua } = body;
        let tracking = [];
        try { const raw = await kv(env).get( 'tracking'); tracking = raw ? JSON.parse(raw) : []; } catch {}
        tracking.push({ page: page || '/', referrer: referrer || '', ua: ua || '', ts: Date.now(), date: new Date().toISOString().split('T')[0] });
        if (tracking.length > 10000) tracking.splice(0, tracking.length - 10000);
        await kv(env).put('tracking', JSON.stringify(tracking));
        const ref = url.searchParams.get('ref');
        if (ref) {
          let affiliates = [];
          try { const raw = await kv(env).get( 'affiliates'); affiliates = raw ? JSON.parse(raw) : []; } catch {}
          const affIdx = affiliates.findIndex(a => a.code === ref);
          if (affIdx >= 0) {
            affiliates[affIdx].clicks = (affiliates[affIdx].clicks || 0) + 1;
            affiliates[affIdx].lastClick = new Date().toISOString();
            await kv(env).put('affiliates', JSON.stringify(affiliates));
          }
        }
        return json({ ok: true });
      }

      if (path === '/api/traffic' && method === 'GET') {
        const authErr = requireAdmin(request);
        if (authErr) return authErr;
        let tracking = [];
        try { const raw = await kv(env).get( 'tracking'); tracking = raw ? JSON.parse(raw) : []; } catch {}
        const now = Date.now();
        const today = new Date().toISOString().split('T')[0];
        const total = tracking.length;
        const todayPV = tracking.filter(t => t.date === today).length;
        const uniquePages = [...new Set(tracking.map(t => t.page))].length;
        const last24h = tracking.filter(t => now - t.ts < 86400000).length;
        const pageCounts = {};
        tracking.forEach(t => { pageCounts[t.page] = (pageCounts[t.page] || 0) + 1; });
        const topPages = Object.entries(pageCounts).sort((a, b) => b[1] - a[1]).slice(0, 20);
        return json({ total, todayPV, uniquePages, last24h, topPages });
      }

      if (path === '/api/orders' && method === 'GET') {
        const authErr = requireAdmin(request);
        if (authErr) return authErr;
        let orders = [], stats = {};
        try { const oRaw = await kv(env).get( 'orders'); orders = oRaw ? JSON.parse(oRaw) : []; } catch {}
        try { const sRaw = await kv(env).get( 'stats'); stats = sRaw ? JSON.parse(sRaw) : {}; } catch {}
        return json({ orders, stats });
      }

      if (path === '/api/stats' && method === 'GET') {
        const authErr = requireAdmin(request);
        if (authErr) return authErr;
        let orders = [], stats = {}, tracking = [];
        try { const oRaw = await kv(env).get( 'orders'); orders = oRaw ? JSON.parse(oRaw) : []; } catch {}
        try { const sRaw = await kv(env).get( 'stats'); stats = sRaw ? JSON.parse(sRaw) : {}; } catch {}
        try { const tRaw = await kv(env).get( 'tracking'); tracking = tRaw ? JSON.parse(tRaw) : []; } catch {}
        const revenue = stats.totalRevenue || 0;
        const revenuePercent = Math.min(100, (revenue / REVENUE_GOAL) * 100);
        const bestSellers = {};
        orders.forEach(o => {
          const p = o.product || 'Unknown';
          bestSellers[p] = (bestSellers[p] || 0) + 1;
        });
        const topProducts = Object.entries(bestSellers).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([name, count]) => ({ name, count }));
        return json({
          revenue, totalOrders: stats.totalOrders || 0, lastOrder: stats.lastOrder || null,
          revenuePercent, revenueGoal: REVENUE_GOAL, avgOrderValue: stats.totalOrders > 0 ? (revenue / stats.totalOrders).toFixed(2) : 0,
          totalPV: tracking.length, topProducts, commissionRate: COMMISSION_RATE,
        });
      }

      if (path === '/api/affiliate-stats' && method === 'GET') {
        const ref = url.searchParams.get('ref');
        let affiliates = [], orders = [];
        try { const r1 = await kv(env).get( 'affiliates'); affiliates = r1 ? JSON.parse(r1) : []; } catch {}
        try { const r2 = await kv(env).get( 'orders'); orders = r2 ? JSON.parse(r2) : []; } catch {}
        const aff = affiliates.find(a => a.code === ref);
        if (!aff) return json({ ok: false, reason: 'Invalid ref' });
        const refOrders = orders.filter(o => o.referrer === ref);
        const totalCommission = refOrders.reduce((s, o) => s + (o.amount || 0) * 0.2, 0);
        return json({ ok: true, clicks: aff.clicks || 0, orders: refOrders.length, totalCommission: totalCommission.toFixed(2), referralUrl: aff.referralUrl });
      }

      if (path === '/api/affiliate-register' && method === 'POST') {
        const body = await request.json();
        const { name, email, website } = body;
        if (!email || !email.includes('@')) return json({ ok: false, reason: 'Invalid email' }, 400);
        let affiliates = [];
        try { const raw = await kv(env).get( 'affiliates'); affiliates = raw ? JSON.parse(raw) : []; } catch {}
        const exists = affiliates.some(a => a.email === email.toLowerCase());
        if (exists) return json({ ok: false, reason: 'Already registered' });
        const code = Math.random().toString(36).slice(2, 8);
        affiliates.push({ name: name || '', email: email.toLowerCase(), website: website || '', code, registeredAt: new Date().toISOString(), referralUrl: `${SITE_URL}?ref=${code}` });
        await kv(env).put('affiliates', JSON.stringify(affiliates));
        return json({ ok: true, code, referralUrl: `${SITE_URL}?ref=${code}` });
      }

      if (path === '/api/subscribe' && method === 'POST') {
        const body = await request.json();
        const { email, name, source } = body;
        if (!email || !email.includes('@')) {
          return json({ ok: false, reason: 'Invalid email' }, 400);
        }
        const entry = {
          email: email.trim().toLowerCase(),
          name: (name || '').trim() || email.split('@')[0],
          source: source || 'tools-page',
          subscribedAt: new Date().toISOString(),
          ts: Date.now(),
        };
        let subscribers = [];
        try { const raw = await kv(env).get( 'subscribers'); subscribers = raw ? JSON.parse(raw) : []; } catch {}
        const exists = subscribers.some(s => s.email === entry.email);
        if (!exists) {
          subscribers.push(entry);
          await kv(env).put('subscribers', JSON.stringify(subscribers));
          await kv(env).put(`sub:${entry.email.replace(/[.@]/g, '_')}`, JSON.stringify(entry));
        }
        return json({ ok: true, subscribed: !exists });
      }

      if (path === '/api/subscribers' && method === 'GET') {
        const authErr = requireAdmin(request);
        if (authErr) return authErr;
        let subscribers = [];
        try { const raw = await kv(env).get( 'subscribers'); subscribers = raw ? JSON.parse(raw) : []; } catch {}
        return json({ total: subscribers.length, subscribers: subscribers.slice(-50).reverse() });
      }

      if (path === '/dashboard') {
        return html(htmlDashboard());
      }

      if (path.startsWith('/download/')) {
        return serveDownload(path, env);
      }

      if (path === '/api/ping-search' && method === 'GET') {
        const results = [];
        const sitemapUrl = SITE_URL+'/sitemap.xml';
        // Google ping (GET)
        try {
          const c = new AbortController(); const t = setTimeout(() => c.abort(), 15000);
          const r = await fetch('https://www.google.com/ping?sitemap=' + encodeURIComponent(sitemapUrl), { signal: c.signal });
          clearTimeout(t); results.push({ engine: 'Google', status: r.status === 200 ? 'submitted' : r.status });
        } catch (e) { results.push({ engine: 'Google', error: e.message }); }
        // Bing IndexNow (POST) 鈥?submit all product URLs individually
        try {
          const urls = Object.values(PRODUCT_FILES).map(f => `${SITE_URL}/downloads/${f.replace(/\.html$/g, '')}`);
          urls.push(SITE_URL, SITE_URL+'/sitemap.xml', SITE_URL+'/about.html', SITE_URL+'/affiliate.html');
          const body = JSON.stringify({ host: 'automoney-store.pages.dev', key: '625e8ab739f0c8372a98ca1a573ff570', keyLocation: SITE_URL+'/625e8ab739f0c8372a98ca1a573ff570.txt', urlList: urls.slice(0, 10000) });
          const r = await fetch('https://api.indexnow.org/indexnow', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });
          results.push({ engine: 'Bing/IndexNow', status: r.status === 200 ? 'submitted ' + urls.length + ' URLs' : r.status });
        } catch (e) { results.push({ engine: 'Bing/IndexNow', error: e.message }); }
        // Yandex ping
        try {
          const c = new AbortController(); const t = setTimeout(() => c.abort(), 15000);
          const r = await fetch('https://webmaster.yandex.com/ping?sitemap=' + encodeURIComponent(sitemapUrl), { signal: c.signal });
          clearTimeout(t); results.push({ engine: 'Yandex', status: r.status === 200 ? 'submitted' : r.status });
        } catch (e) { results.push({ engine: 'Yandex', error: 'Yandex unreachable from CF edge (expected)' }); }
        return json({ ok: true, results });
      }

      // -- AI Generate endpoint (OpenAI/Claude via Worker edge) --
      if (path === '/api/ai-generate' && method === 'POST') {
        try {
          const { system, user, model, maxTokens } = await request.json();
          if (!system || !user) return json({ error: 'Missing system or user prompt' }, 400);
          const apiKey = env.AI_API_KEY || '';
          if (!apiKey) return json({ error: 'AI_API_KEY not configured' }, 503);
          const ms = (model || 'gpt-4o-mini').toLowerCase();
          let result = null;
          if (ms.startsWith('gpt') || ms.startsWith('openai')) {
            const r = await fetch('https://api.openai.com/v1/chat/completions', {
              method: 'POST', headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
              body: JSON.stringify({ model: 'gpt-4o-mini', messages: [{ role: 'system', content: system }, { role: 'user', content: user }], max_tokens: maxTokens || 500, temperature: 0.7 })
            });
            const d = await r.json(); result = d?.choices?.[0]?.message?.content || null;
          } else if (ms.startsWith('claude')) {
            const r = await fetch('https://api.anthropic.com/v1/messages', {
              method: 'POST', headers: { 'x-api-key': apiKey, 'anthropic-version': '2023-06-01', 'Content-Type': 'application/json' },
              body: JSON.stringify({ model: 'claude-3-haiku-20240307', max_tokens: maxTokens || 500, system: system, messages: [{ role: 'user', content: user }] })
            });
            const d = await r.json(); result = d?.content?.[0]?.text || null;
          } else if (ms.startsWith('deepseek')) {
            const r = await fetch('https://api.deepseek.com/v1/chat/completions', {
              method: 'POST', headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
              body: JSON.stringify({ model: 'deepseek-chat', messages: [{ role: 'system', content: system }, { role: 'user', content: user }], max_tokens: maxTokens || 500, temperature: 0.7 })
            });
            const d = await r.json();
            if (!r.ok) return json({ error: 'DeepSeek API error', status: r.status, details: d }, 502);
            result = d?.choices?.[0]?.message?.content || null;
            if (!result) return json({ error: 'DeepSeek returned no content', raw: d }, 502);
          }
          if (!result) return json({ error: 'No response from AI', details: 'Check API key and model name' }, 502);
          return json({ content: result.trim() });
        } catch (e) { return json({ error: e.message }, 500); }
      }
      // 鈹€鈹€ Language-based routing 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€
      const langMatch = path.match(/^\/(en|es|pt)(\/|$)/);
      if (langMatch) {
        const lang = langMatch[1];
        const subPath = langMatch[2] === '/' ? path.slice(3) || '/' : '/index.html';
        const assetPath = `/${lang}${subPath}`;
        const assetRequest = new Request(`${url.origin}${assetPath}${url.search}`, request);
        try {
          const response = await env.ASSETS.fetch(assetRequest);
          if (response.status !== 404) return response;
        } catch {}
        try {
          const fallbackRequest = new Request(`${url.origin}/${lang}/404.html`, request);
          const fallback = await env.ASSETS.fetch(fallbackRequest);
          if (fallback.status !== 404) return new Response(fallback.body, { status: 404, headers: fallback.headers });
        } catch {}
      }

      try {
        return await env.ASSETS.fetch(request);
      } catch (e) {
        try {
          const fallback = await env.ASSETS.fetch(new Request(`${url.origin}/404.html`, request));
          return new Response(fallback.body, { status: 404, headers: fallback.headers });
        } catch {
          return new Response('Not Found', { status: 404 });
        }
      }
    } catch (e) {
      return json({ error: e.message }, 500);
    }
  },
};

function htmlDashboard() {
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>AutoMoney - Dashboard</title><style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,sans-serif;background:#0a0a12;color:#e0e0e0;padding:24px}
.wrap{max-width:1000px;margin:0 auto}h1{font-size:1.8rem;margin-bottom:4px}
.goal{color:#f59e0b;font-size:0.85rem;margin-bottom:24px}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:16px;margin-bottom:32px}
.card{background:#16162a;border:1px solid #2a2a4a;border-radius:12px;padding:20px}
.card .num{font-size:2rem;font-weight:700;color:#00e676}
.card .label{color:#666;font-size:0.8rem;margin-top:4px}
.card .sub{color:#444;font-size:0.7rem;margin-top:8px}
.goal-bar{background:#2a2a4a;border-radius:100px;height:8px;margin-top:8px;overflow:hidden}
.goal-fill{height:100%;border-radius:100px;background:linear-gradient(90deg,#f59e0b,#00e676);transition:width 1s}
h2{font-size:1rem;color:#888;margin-bottom:12px;font-weight:500}
table{width:100%;border-collapse:collapse;background:#16162a;border-radius:12px;overflow:hidden;margin-bottom:32px}
th{background:#1e1e3a;padding:10px;text-align:left;font-size:0.75rem;color:#888;font-weight:500}
td{padding:10px;border-top:1px solid #2a2a4a;font-size:0.8rem}
.top-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;margin-bottom:32px}
.top-item{background:#16162a;border:1px solid #2a2a4a;border-radius:8px;padding:12px;display:flex;justify-content:space-between;align-items:center}
.top-item .name{color:#e0e0e0;font-size:0.85rem}
.top-item .count{color:#00e676;font-weight:700;font-size:0.9rem}
.auth-msg{background:#1e1e3a;border:1px solid #2a2a4a;border-radius:8px;padding:12px;margin-bottom:24px;font-size:0.75rem;color:#888;text-align:center}
.auth-msg code{background:#2a2a4a;padding:2px 8px;border-radius:4px;color:#f59e0b}
footer{text-align:center;padding:32px;color:#333;font-size:0.75rem}
</style></head><body><div class="wrap">
<h1>AutoMoney Dashboard</h1>
<p class="goal">Set X-Admin-Token header to access this data</p>
<div id="stats" class="grid"></div>
<h2>Revenue Goal</h2>
<div class="card" id="goalCard"></div>
<h2>Best Selling Products</h2>
<div id="topProducts" class="top-grid"></div>
<h2>Recent Orders</h2>
<table><thead><tr><th>Product</th><th>Amount</th><th>Email</th><th>TXID</th><th>Date</th></tr></thead><tbody id="orders"></tbody></table>
<footer>&copy; 2026 AutoMoney</footer></div>
<script>
const TOKEN = prompt('Enter admin token:') || '';
async function load() {
  const headers = {'X-Admin-Token': TOKEN};
  try {
    const [s, o] = await Promise.all([
      fetch('/api/stats', {headers}).then(r=>r.json()),
      fetch('/api/orders', {headers}).then(r=>r.json())
    ]);
    const stats = s || {  'ai-chatbot-setup-guide-checklist-workbook': 'ai-chatbot-setup-guide-checklist-workbook.html',
  'ai-chatbot-setup-guide-complete-guide': 'ai-chatbot-setup-guide-complete-guide.html',
  'ai-chatbot-setup-guide-template-pack': 'ai-chatbot-setup-guide-template-pack.html',
  'ai-chatbot-setup-guide-ultimate-bundle': 'ai-chatbot-setup-guide-ultimate-bundle.html',
  'ai-code-review-checklist-checklist-workbook': 'ai-code-review-checklist-checklist-workbook.html',
  'ai-code-review-checklist-complete-guide': 'ai-code-review-checklist-complete-guide.html',
  'ai-code-review-checklist-template-pack': 'ai-code-review-checklist-template-pack.html',
  'ai-code-review-checklist-ultimate-bundle': 'ai-code-review-checklist-ultimate-bundle.html',
  'ai-content-repurposing-system-checklist-workbook': 'ai-content-repurposing-system-checklist-workbook.html',
  'ai-content-repurposing-system-complete-guide': 'ai-content-repurposing-system-complete-guide.html',
  'ai-content-repurposing-system-template-pack': 'ai-content-repurposing-system-template-pack.html',
  'ai-content-repurposing-system-ultimate-bundle': 'ai-content-repurposing-system-ultimate-bundle.html',
  'ai-customer-service-automation-checklist-workbook': 'ai-customer-service-automation-checklist-workbook.html',
  'ai-customer-service-automation-complete-guide': 'ai-customer-service-automation-complete-guide.html',
  'ai-customer-service-automation-template-pack': 'ai-customer-service-automation-template-pack.html',
  'ai-customer-service-automation-ultimate-bundle': 'ai-customer-service-automation-ultimate-bundle.html',
  'ai-data-analysis-workbook-checklist-workbook': 'ai-data-analysis-workbook-checklist-workbook.html',
  'ai-data-analysis-workbook-complete-guide': 'ai-data-analysis-workbook-complete-guide.html',
  'ai-data-analysis-workbook-template-pack': 'ai-data-analysis-workbook-template-pack.html',
  'ai-data-analysis-workbook-ultimate-bundle': 'ai-data-analysis-workbook-ultimate-bundle.html',
  'ai-email-auto-responder-pack-checklist-workbook': 'ai-email-auto-responder-pack-checklist-workbook.html',
  'ai-email-auto-responder-pack-complete-guide': 'ai-email-auto-responder-pack-complete-guide.html',
  'ai-email-auto-responder-pack-template-pack': 'ai-email-auto-responder-pack-template-pack.html',
  'ai-email-auto-responder-pack-ultimate-bundle': 'ai-email-auto-responder-pack-ultimate-bundle.html',
  'ai-fitness-coach-prompt-pack-checklist-workbook': 'ai-fitness-coach-prompt-pack-checklist-workbook.html',
  'ai-fitness-coach-prompt-pack-complete-guide': 'ai-fitness-coach-prompt-pack-complete-guide.html',
  'ai-fitness-coach-prompt-pack-template-pack': 'ai-fitness-coach-prompt-pack-template-pack.html',
  'ai-fitness-coach-prompt-pack-ultimate-bundle': 'ai-fitness-coach-prompt-pack-ultimate-bundle.html',
  'ai-image-generation-prompt-pack-checklist-workbook': 'ai-image-generation-prompt-pack-checklist-workbook.html',
  'ai-image-generation-prompt-pack-complete-guide': 'ai-image-generation-prompt-pack-complete-guide.html',
  'ai-image-generation-prompt-pack-template-pack': 'ai-image-generation-prompt-pack-template-pack.html',
  'ai-image-generation-prompt-pack-ultimate-bundle': 'ai-image-generation-prompt-pack-ultimate-bundle.html',
  'ai-meeting-note-taker-template-checklist-workbook': 'ai-meeting-note-taker-template-checklist-workbook.html',
  'ai-meeting-note-taker-template-complete-guide': 'ai-meeting-note-taker-template-complete-guide.html',
  'ai-meeting-note-taker-template-template-pack': 'ai-meeting-note-taker-template-template-pack.html',
  'ai-meeting-note-taker-template-ultimate-bundle': 'ai-meeting-note-taker-template-ultimate-bundle.html',
  'ai-recipe-generator-templates-checklist-workbook': 'ai-recipe-generator-templates-checklist-workbook.html',
  'ai-recipe-generator-templates-complete-guide': 'ai-recipe-generator-templates-complete-guide.html',
  'ai-recipe-generator-templates-template-pack': 'ai-recipe-generator-templates-template-pack.html',
  'ai-recipe-generator-templates-ultimate-bundle': 'ai-recipe-generator-templates-ultimate-bundle.html',
  'ai-resume-builder-templates-checklist-workbook': 'ai-resume-builder-templates-checklist-workbook.html',
  'ai-resume-builder-templates-complete-guide': 'ai-resume-builder-templates-complete-guide.html',
  'ai-resume-builder-templates-template-pack': 'ai-resume-builder-templates-template-pack.html',
  'ai-resume-builder-templates-ultimate-bundle': 'ai-resume-builder-templates-ultimate-bundle.html',
  'ai-seo-content-optimizer-guide-checklist-workbook': 'ai-seo-content-optimizer-guide-checklist-workbook.html',
  'ai-seo-content-optimizer-guide-complete-guide': 'ai-seo-content-optimizer-guide-complete-guide.html',
  'ai-seo-content-optimizer-guide-template-pack': 'ai-seo-content-optimizer-guide-template-pack.html',
  'ai-seo-content-optimizer-guide-ultimate-bundle': 'ai-seo-content-optimizer-guide-ultimate-bundle.html',
  'ai-social-media-post-generator-checklist-workbook': 'ai-social-media-post-generator-checklist-workbook.html',
  'ai-social-media-post-generator-complete-guide': 'ai-social-media-post-generator-complete-guide.html',
  'ai-social-media-post-generator-template-pack': 'ai-social-media-post-generator-template-pack.html',
  'ai-social-media-post-generator-ultimate-bundle': 'ai-social-media-post-generator-ultimate-bundle.html',
  'ai-travel-planner-workbook-checklist-workbook': 'ai-travel-planner-workbook-checklist-workbook.html',
  'ai-travel-planner-workbook-complete-guide': 'ai-travel-planner-workbook-complete-guide.html',
  'ai-travel-planner-workbook-template-pack': 'ai-travel-planner-workbook-template-pack.html',
  'ai-travel-planner-workbook-ultimate-bundle': 'ai-travel-planner-workbook-ultimate-bundle.html',
  'ai-video-script-generator-checklist-workbook': 'ai-video-script-generator-checklist-workbook.html',
  'ai-video-script-generator-complete-guide': 'ai-video-script-generator-complete-guide.html',
  'ai-video-script-generator-template-pack': 'ai-video-script-generator-template-pack.html',
  'ai-video-script-generator-ultimate-bundle': 'ai-video-script-generator-ultimate-bundle.html',
  'ai-voiceover-script-templates-checklist-workbook': 'ai-voiceover-script-templates-checklist-workbook.html',
  'ai-voiceover-script-templates-complete-guide': 'ai-voiceover-script-templates-complete-guide.html',
  'ai-voiceover-script-templates-template-pack': 'ai-voiceover-script-templates-template-pack.html',
  'ai-voiceover-script-templates-ultimate-bundle': 'ai-voiceover-script-templates-ultimate-bundle.html',
  'ai-workflow-automation-blueprint-checklist-workbook': 'ai-workflow-automation-blueprint-checklist-workbook.html',
  'ai-workflow-automation-blueprint-complete-guide': 'ai-workflow-automation-blueprint-complete-guide.html',
  'ai-workflow-automation-blueprint-template-pack': 'ai-workflow-automation-blueprint-template-pack.html',
  'ai-workflow-automation-blueprint-ultimate-bundle': 'ai-workflow-automation-blueprint-ultimate-bundle.html',
  'autogpt-agent-configuration-guide-checklist-workbook': 'autogpt-agent-configuration-guide-checklist-workbook.html',
  'autogpt-agent-configuration-guide-complete-guide': 'autogpt-agent-configuration-guide-complete-guide.html',
  'autogpt-agent-configuration-guide-template-pack': 'autogpt-agent-configuration-guide-template-pack.html',
  'autogpt-agent-configuration-guide-ultimate-bundle': 'autogpt-agent-configuration-guide-ultimate-bundle.html',
  'brand-voice-style-guide-kit-checklist-workbook': 'brand-voice-style-guide-kit-checklist-workbook.html',
  'brand-voice-style-guide-kit-complete-guide': 'brand-voice-style-guide-kit-complete-guide.html',
  'brand-voice-style-guide-kit-template-pack': 'brand-voice-style-guide-kit-template-pack.html',
  'brand-voice-style-guide-kit-ultimate-bundle': 'brand-voice-style-guide-kit-ultimate-bundle.html',
  'canva-template-bundle-checklist-workbook': 'canva-template-bundle-checklist-workbook.html',
  'canva-template-bundle-complete-guide': 'canva-template-bundle-complete-guide.html',
  'chatgpt-prompt-engineering-bundle-checklist-workbook': 'chatgpt-prompt-engineering-bundle-checklist-workbook.html',
  'chatgpt-prompt-engineering-bundle-complete-guide': 'chatgpt-prompt-engineering-bundle-complete-guide.html',
  'chatgpt-prompt-engineering-bundle-template-pack': 'chatgpt-prompt-engineering-bundle-template-pack.html',
  'chatgpt-prompt-engineering-bundle-ultimate-bundle': 'chatgpt-prompt-engineering-bundle-ultimate-bundle.html',
  'client-onboarding-kit-checklist-workbook': 'client-onboarding-kit-checklist-workbook.html',
  'client-onboarding-kit-complete-guide': 'client-onboarding-kit-complete-guide.html',
  'client-onboarding-kit-template-pack': 'client-onboarding-kit-template-pack.html',
  'client-onboarding-kit-ultimate-bundle': 'client-onboarding-kit-ultimate-bundle.html',
  'contract-template-bundle-checklist-workbook': 'contract-template-bundle-checklist-workbook.html',
  'contract-template-bundle-complete-guide': 'contract-template-bundle-complete-guide.html',
  'contract-template-bundle-template-pack': 'contract-template-bundle-template-pack.html',
  'contract-template-bundle-ultimate-bundle': 'contract-template-bundle-ultimate-bundle.html',
  'conversion-rate-optimization-kit-checklist-workbook': 'conversion-rate-optimization-kit-checklist-workbook.html',
  'conversion-rate-optimization-kit-complete-guide': 'conversion-rate-optimization-kit-complete-guide.html',
  'conversion-rate-optimization-kit-template-pack': 'conversion-rate-optimization-kit-template-pack.html',
  'conversion-rate-optimization-kit-ultimate-bundle': 'conversion-rate-optimization-kit-ultimate-bundle.html',
  'email-marketing-funnel-blueprint-checklist-workbook': 'email-marketing-funnel-blueprint-checklist-workbook.html',
  'email-marketing-funnel-blueprint-complete-guide': 'email-marketing-funnel-blueprint-complete-guide.html',
  'email-marketing-funnel-blueprint-template-pack': 'email-marketing-funnel-blueprint-template-pack.html',
  'email-marketing-funnel-blueprint-ultimate-bundle': 'email-marketing-funnel-blueprint-ultimate-bundle.html',
  'facebook-ads-cheat-sheet-checklist-workbook': 'facebook-ads-cheat-sheet-checklist-workbook.html',
  'facebook-ads-cheat-sheet-complete-guide': 'facebook-ads-cheat-sheet-complete-guide.html',
  'facebook-ads-cheat-sheet-template-pack': 'facebook-ads-cheat-sheet-template-pack.html',
  'facebook-ads-cheat-sheet-ultimate-bundle': 'facebook-ads-cheat-sheet-ultimate-bundle.html',
  'freelance-proposal-templates-checklist-workbook': 'freelance-proposal-templates-checklist-workbook.html',
  'freelance-proposal-templates-complete-guide': 'freelance-proposal-templates-complete-guide.html',
  'freelance-proposal-templates-template-pack': 'freelance-proposal-templates-template-pack.html',
  'freelance-proposal-templates-ultimate-bundle': 'freelance-proposal-templates-ultimate-bundle.html',
  'instagram-growth-checklist-checklist-workbook': 'instagram-growth-checklist-checklist-workbook.html',
  'instagram-growth-checklist-complete-guide': 'instagram-growth-checklist-complete-guide.html',
  'instagram-growth-checklist-template-pack': 'instagram-growth-checklist-template-pack.html',
  'instagram-growth-checklist-ultimate-bundle': 'instagram-growth-checklist-ultimate-bundle.html',
  'invoice-template-pack-checklist-workbook': 'invoice-template-pack-checklist-workbook.html',
  'invoice-template-pack-complete-guide': 'invoice-template-pack-complete-guide.html',
  'invoice-template-pack-template-pack': 'invoice-template-pack-template-pack.html',
  'invoice-template-pack-ultimate-bundle': 'invoice-template-pack-ultimate-bundle.html',
  'landing-page-copy-templates-checklist-workbook': 'landing-page-copy-templates-checklist-workbook.html',
  'landing-page-copy-templates-complete-guide': 'landing-page-copy-templates-complete-guide.html',
  'landing-page-copy-templates-template-pack': 'landing-page-copy-templates-template-pack.html',
  'landing-page-copy-templates-ultimate-bundle': 'landing-page-copy-templates-ultimate-bundle.html',
  'linkedin-lead-gen-templates-checklist-workbook': 'linkedin-lead-gen-templates-checklist-workbook.html',
  'linkedin-lead-gen-templates-complete-guide': 'linkedin-lead-gen-templates-complete-guide.html',
  'linkedin-lead-gen-templates-template-pack': 'linkedin-lead-gen-templates-template-pack.html',
  'linkedin-lead-gen-templates-ultimate-bundle': 'linkedin-lead-gen-templates-ultimate-bundle.html',
  'machine-learning-project-starter-kit-checklist-workbook': 'machine-learning-project-starter-kit-checklist-workbook.html',
  'machine-learning-project-starter-kit-complete-guide': 'machine-learning-project-starter-kit-complete-guide.html',
  'machine-learning-project-starter-kit-template-pack': 'machine-learning-project-starter-kit-template-pack.html',
  'machine-learning-project-starter-kit-ultimate-bundle': 'machine-learning-project-starter-kit-ultimate-bundle.html',
  'marketing-analytics-dashboard-checklist-workbook': 'marketing-analytics-dashboard-checklist-workbook.html',
  'marketing-analytics-dashboard-complete-guide': 'marketing-analytics-dashboard-complete-guide.html',
  'marketing-analytics-dashboard-template-pack': 'marketing-analytics-dashboard-template-pack.html',
  'marketing-analytics-dashboard-ultimate-bundle': 'marketing-analytics-dashboard-ultimate-bundle.html',
  'newsletter-content-templates-checklist-workbook': 'newsletter-content-templates-checklist-workbook.html',
  'newsletter-content-templates-complete-guide': 'newsletter-content-templates-complete-guide.html',
  'newsletter-content-templates-template-pack': 'newsletter-content-templates-template-pack.html',
  'newsletter-content-templates-ultimate-bundle': 'newsletter-content-templates-ultimate-bundle.html',
  'notion-dashboard-system-checklist-workbook': 'notion-dashboard-system-checklist-workbook.html',
  'notion-dashboard-system-complete-guide': 'notion-dashboard-system-complete-guide.html',
  'pinterest-seo-strategy-pack-checklist-workbook': 'pinterest-seo-strategy-pack-checklist-workbook.html',
  'pinterest-seo-strategy-pack-complete-guide': 'pinterest-seo-strategy-pack-complete-guide.html',
  'pinterest-seo-strategy-pack-template-pack': 'pinterest-seo-strategy-pack-template-pack.html',
  'pinterest-seo-strategy-pack-ultimate-bundle': 'pinterest-seo-strategy-pack-ultimate-bundle.html',
  'project-management-templates-checklist-workbook': 'project-management-templates-checklist-workbook.html',
  'project-management-templates-complete-guide': 'project-management-templates-complete-guide.html',
  'project-management-templates-template-pack': 'project-management-templates-template-pack.html',
  'project-management-templates-ultimate-bundle': 'project-management-templates-ultimate-bundle.html',
  'sales-funnel-builder-workbook-checklist-workbook': 'sales-funnel-builder-workbook-checklist-workbook.html',
  'sales-funnel-builder-workbook-complete-guide': 'sales-funnel-builder-workbook-complete-guide.html',
  'sales-funnel-builder-workbook-template-pack': 'sales-funnel-builder-workbook-template-pack.html',
  'sales-funnel-builder-workbook-ultimate-bundle': 'sales-funnel-builder-workbook-ultimate-bundle.html',
  'shopify-store-setup-guide-checklist-workbook': 'shopify-store-setup-guide-checklist-workbook.html',
  'shopify-store-setup-guide-complete-guide': 'shopify-store-setup-guide-complete-guide.html',
  'social-media-content-calendar-checklist-workbook': 'social-media-content-calendar-checklist-workbook.html',
  'social-media-content-calendar-complete-guide': 'social-media-content-calendar-complete-guide.html',
  'social-media-content-calendar-template-pack': 'social-media-content-calendar-template-pack.html',
  'social-media-content-calendar-ultimate-bundle': 'social-media-content-calendar-ultimate-bundle.html',
  'tiktok-viral-video-formula-checklist-workbook': 'tiktok-viral-video-formula-checklist-workbook.html',
  'tiktok-viral-video-formula-complete-guide': 'tiktok-viral-video-formula-complete-guide.html',
  'tiktok-viral-video-formula-template-pack': 'tiktok-viral-video-formula-template-pack.html',
  'tiktok-viral-video-formula-ultimate-bundle': 'tiktok-viral-video-formula-ultimate-bundle.html',
  'time-tracking-spreadsheet-checklist-workbook': 'time-tracking-spreadsheet-checklist-workbook.html',
  'time-tracking-spreadsheet-complete-guide': 'time-tracking-spreadsheet-complete-guide.html',
  'twitter-x-growth-system-checklist-workbook': 'twitter-x-growth-system-checklist-workbook.html',
  'twitter-x-growth-system-complete-guide': 'twitter-x-growth-system-complete-guide.html',
  'twitter-x-growth-system-template-pack': 'twitter-x-growth-system-template-pack.html',
  'twitter-x-growth-system-ultimate-bundle': 'twitter-x-growth-system-ultimate-bundle.html',
  'youtube-seo-optimization-guide-checklist-workbook': 'youtube-seo-optimization-guide-checklist-workbook.html',
  'youtube-seo-optimization-guide-complete-guide': 'youtube-seo-optimization-guide-complete-guide.html',
  'youtube-seo-optimization-guide-template-pack': 'youtube-seo-optimization-guide-template-pack.html',
  'youtube-seo-optimization-guide-ultimate-bundle': 'youtube-seo-optimization-guide-ultimate-bundle.html',
};
    const orders = o.orders || [];
    const totalRevenue = stats.revenue || 0;
    const revenuePercent = stats.revenuePercent || 0;
    document.getElementById('stats').innerHTML = [
      {num:'$' + totalRevenue.toFixed(2), label:'Total Revenue', sub:'Goal: $' + (stats.revenueGoal || 600)},
      {num:stats.totalOrders || 0, label:'Orders', sub:'Avg: $' + (stats.avgOrderValue || 0)},
      {num:stats.totalPV || 0, label:'Page Views', sub:'Total traffic'},
      {num:stats.totalOrders > 0 ? new Date(orders[orders.length-1].timestamp).toLocaleDateString() : '-', label:'Last Order', sub:'Most recent sale'}
    ].map(c => '<div class="card"><div class="num">' + c.num + '</div><div class="label">' + c.label + '</div><div class="sub">' + c.sub + '</div></div>').join('');
    document.getElementById('goalCard').innerHTML = '<div class="num" style="font-size:1rem;color:#f59e0b">' + revenuePercent.toFixed(1) + '% of $' + (stats.revenueGoal || 600) + ' goal</div><div class="goal-bar"><div class="goal-fill" style="width:' + Math.min(revenuePercent, 100) + '%"></div></div><div class="sub">' + (revenuePercent >= 100 ? 'Goal reached!' : '$' + (Math.max(0, (stats.revenueGoal||600) - totalRevenue)).toFixed(2) + ' remaining') + '</div>';
    if (stats.topProducts && stats.topProducts.length) {
      document.getElementById('topProducts').innerHTML = stats.topProducts.map(p => '<div class="top-item"><span class="name">' + p.name + '</span><span class="count">' + p.count + 'x</span></div>').join('');
    } else {
      document.getElementById('topProducts').innerHTML = '<div class="card" style="text-align:center;color:#555">No sales yet</div>';
    }
    document.getElementById('orders').innerHTML = orders.slice().reverse().map(o => '<tr><td>' + o.product + '</td><td>$' + o.amount.toFixed(2) + '</td><td>' + o.email + '</td><td style="font-family:monospace;font-size:0.7rem;color:#888">' + o.txid.slice(0,16) + '...</td><td>' + new Date(o.timestamp).toLocaleDateString() + '</td></tr>').join('') || '<tr><td colspan="5" style="text-align:center;color:#555">No orders yet</td></tr>';
  } catch(e) {
    document.getElementById('stats').innerHTML = '<div class="card"><div class="num" style="color:#ef4444">Error</div><div class="label">' + e.message + '</div></div>';
  }
}
load();
</script></body></html>`;
}

async function serveDownload(path, env) {
  const token = path.replace('/download/', '');
  try {
    const raw = await kv(env).get(`dl:${token}`);
    if (!raw) return new Response('Download link expired', { status: 404 });
    const info = JSON.parse(raw);
    info.downloads++;
    await kv(env).put(`dl:${token}`, JSON.stringify(info), { expirationTtl: 604800 });
    const fileUrl = info.file ? `${SITE_URL}/downloads/${info.file.replace(/\.html$/g, '')}` : null;
    return html(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Download - ${info.product}</title><style>body{font-family:-apple-system,sans-serif;background:#0f0f1a;color:#e0e0e0;display:flex;align-items:center;justify-content:center;min-height:100vh;text-align:center;padding:20px}.dl-box{max-width:500px;padding:40px;background:#1a1a2e;border-radius:16px;border:1px solid #2a2a4a}h1{color:#00e676;font-size:24px;margin-bottom:8px}p{color:#888;margin-bottom:20px;line-height:1.6}.btn{display:inline-block;background:#00e676;color:#000;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:600;font-size:16px;margin-top:8px}.btn:hover{opacity:.9}.thank{color:#555;font-size:12px;margin-top:20px}</style></head><body><div class="dl-box"><div style="font-size:48px;margin-bottom:12px">馃摜</div><h1>Thank you!</h1><p>"${info.product}" ready.</p>${fileUrl ? `<a href="${fileUrl}" class="btn" target="_blank">Download Now</a>` : '<p style="color:#f59e0b">Coming soon</p>'}<p class="thank">ID: ${token}</p></div></body></html>`);
  } catch { return new Response('Invalid link', { status: 404 }); }
}

