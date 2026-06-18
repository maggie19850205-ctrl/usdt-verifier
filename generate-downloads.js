const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

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
  'social-media-ai-scheduler-ultimate-bundle': 'social-media-ai-scheduler-ultimate-bundle.html'
};

const CSS = `*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0a0a12;color:#e0e0e0;line-height:1.7;padding:0}
.wrap{max-width:800px;margin:0 auto;padding:40px 24px}
h1{font-size:2rem;margin-bottom:8px;background:linear-gradient(135deg,#00e676,#00bcd4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.meta{color:#666;font-size:0.85rem;margin-bottom:32px;padding-bottom:16px;border-bottom:1px solid #2a2a4a}
h2{color:#00e676;font-size:1.3rem;margin-top:32px;margin-bottom:16px}
h3{color:#00bcd4;font-size:1.1rem;margin-top:24px;margin-bottom:12px}
p{margin-bottom:16px;color:#b0b0b0}
ul,ol{margin:0 0 16px 24px;color:#b0b0b0}
li{margin-bottom:8px}
.highlight{background:#16162a;border:1px solid #2a2a4a;border-radius:8px;padding:20px;margin:24px 0}
.highlight code{display:block;background:#1e1e3a;padding:16px;border-radius:6px;font-family:'Courier New',monospace;font-size:0.85rem;color:#f59e0b;white-space:pre-wrap;margin-bottom:8px}
.highlight .label{color:#888;font-size:0.8rem;margin-bottom:4px}
.table-wrap{overflow-x:auto;margin:24px 0}
table{width:100%;border-collapse:collapse;background:#16162a;border-radius:8px;overflow:hidden}
th{background:#1e1e3a;padding:10px 14px;text-align:left;font-size:0.8rem;color:#888;font-weight:500;border-bottom:1px solid #2a2a4a}
td{padding:10px 14px;font-size:0.85rem;border-bottom:1px solid #2a2a4a}
tr:last-child td{border-bottom:none}
.checklist{list-style:none;margin-left:0}
.checklist li::before{content:"✓ ";color:#00e676;font-weight:700}
.badge{display:inline-block;background:#00e67620;color:#00e676;padding:2px 10px;border-radius:100px;font-size:0.75rem;font-weight:600}
.footer{text-align:center;padding:24px;color:#333;font-size:0.75rem;border-top:1px solid #2a2a4a;margin-top:48px}
@media(max-width:600px){.wrap{padding:24px 16px}h1{font-size:1.5rem}}`;

function slugToTitle(slug) {
  return slug.split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
    .replace(/Ai /g, 'AI ')
    .replace(/Seo /g, 'SEO ')
    .replace(/Sass /g, 'SaaS ')
    .replace(/ Api/g, ' API')
    .replace(/ Sdk/g, ' SDK')
    .replace(/ Diy/g, ' DIY')
    .replace(/ Ppt/g, ' PPT')
    .replace(/ Ui /g, ' UI ')
    .replace(/ Svg/g, ' SVG')
    .replace(/ Qr/g, ' QR');
}

function seedRand(seed) {
  let s = seed;
  return function() {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

const GUIDE_SECTIONS = [
  { title: 'What You Will Learn', paragraphs: 3 },
  { title: 'Getting Started', paragraphs: 3 },
  { title: 'Core Concepts', paragraphs: 4 },
  { title: 'Step-by-Step Implementation', paragraphs: 4 },
  { title: 'Best Practices', paragraphs: 3 },
  { title: 'Common Pitfalls to Avoid', paragraphs: 3 },
  { title: 'Advanced Techniques', paragraphs: 3 },
  { title: 'Resources & Next Steps', paragraphs: 2 },
];

const CHECKLIST_SECTIONS = [
  { title: 'Phase 1: Foundation', items: 6 },
  { title: 'Phase 2: Setup', items: 5 },
  { title: 'Phase 3: Implementation', items: 7 },
  { title: 'Phase 4: Optimization', items: 5 },
  { title: 'Phase 5: Launch', items: 4 },
  { title: 'Phase 6: Maintenance', items: 4 },
  { title: 'Success Metrics', items: 5 },
];

const TEMPLATE_ITEMS = [
  'Strategic Planning Template', 'Daily Operations Log', 'Performance Tracker',
  'Budget Allocation Sheet', 'Timeline Gantt Chart', 'Stakeholder Report',
  'Risk Assessment Matrix', 'Quality Checklist', 'Resource Allocation Map',
  'Communication Log', 'Milestone Tracker', 'Feedback Collection Form',
];

function generateText(rng, words) {
  const vocab = [
    'Implement', 'Optimize', 'Automate', 'Streamline', 'Integrate', 'Leverage',
    'Build', 'Deploy', 'Configure', 'Analyze', 'Monitor', 'Scale', 'Design',
    'Develop', 'Test', 'Launch', 'Track', 'Measure', 'Improve', 'Transform',
    'system', 'workflow', 'pipeline', 'platform', 'solution', 'framework',
    'strategy', 'process', 'tool', 'resource', 'team', 'data', 'metric',
    'automation', 'integration', 'optimization', 'deployment', 'configuration',
    'efficient', 'scalable', 'reliable', 'robust', 'flexible', 'maintainable',
    'critical', 'essential', 'powerful', 'comprehensive', 'advanced', 'modern',
    'By implementing', 'When building', 'For optimal', 'To achieve',
    'Consider using', 'Start by', 'Begin with', 'Focus on',
    'business', 'digital', 'automated', 'smart', 'intelligent', 'seamless',
    'productivity', 'efficiency', 'performance', 'quality', 'growth', 'revenue',
  ];
  let text = '';
  for (let i = 0; i < words; i += 15) {
    const n = Math.min(15, words - i);
    const sentence = [];
    for (let j = 0; j < n; j++) {
      sentence.push(vocab[Math.floor(rng() * vocab.length)]);
    }
    text += sentence.join(' ') + '. ';
  }
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function makeTemplates(rng) {
  const shuffled = [...TEMPLATE_ITEMS].sort(() => rng() - 0.5);
  return shuffled.map((name, i) => ({
    name,
    description: generateText(rng, 12),
  }));
}

const BASE_URL_ = 'https://automoney-store.pages.dev';
const OUT_DIR = path.join(__dirname, 'output', 'downloads');

fs.mkdirSync(OUT_DIR, { recursive: true });

let count = 0;
for (const [slug, filename] of Object.entries(PRODUCT_FILES)) {
  const rng = seedRand(crypto.createHash('md5').update(slug).digest().readUInt32LE(0));
  const title = slugToTitle(slug);
  const isGuide = slug.includes('complete-guide');
  const isChecklist = slug.includes('checklist-workbook');
  const isTemplates = slug.includes('template-pack');
  const isBundle = slug.includes('ultimate-bundle');
  const isResources = slug.includes('tools-resources');

  let type, sections;

  if (isGuide) { type = 'Complete Guide'; sections = GUIDE_SECTIONS; }
  else if (isChecklist) { type = 'Checklist & Workbook'; sections = CHECKLIST_SECTIONS; }
  else if (isTemplates) { type = 'Template Pack'; sections = TEMPLATE_ITEMS; }
  else if (isBundle) { type = 'Ultimate Bundle'; sections = [...GUIDE_SECTIONS, ...CHECKLIST_SECTIONS]; }
  else if (isResources) { type = 'Tools & Resources'; sections = GUIDE_SECTIONS; }
  else { type = 'Digital Product'; sections = GUIDE_SECTIONS; }

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${title} - AutoMoney Store</title>
<style>${CSS}</style>
</head>
<body>
<div class="wrap">
<h1>${title}</h1>
<p class="meta"><span class="badge">${type}</span> &middot; AutoMoney Store &middot; ${new Date().toISOString().split('T')[0]}</p>
<p>Thank you for your purchase! This ${type.toLowerCase()} contains everything you need to master ${title.toLowerCase()}.</p>
`;

  if (isGuide || isResources || (!isChecklist && !isTemplates)) {
    for (const section of sections) {
      if (!section.items) {
        html += `<h2>${section.title}</h2>\n`;
        for (let p = 0; p < section.paragraphs; p++) {
          html += `<p>${generateText(rng, 30 + Math.floor(rng() * 40))}</p>\n`;
        }
      }
    }
  }

  if (isChecklist || isBundle) {
    html += `<h2>Checklist</h2>\n<ul class="checklist">\n`;
    for (const section of (isChecklist ? CHECKLIST_SECTIONS : sections.filter(s => s.items))) {
      html += `<li><strong>${section.title}</strong></li>\n`;
      if (section.items) {
        for (let i = 0; i < section.items; i++) {
          html += `<li>${generateText(rng, 8)}</li>\n`;
        }
      }
    }
    html += `</ul>\n`;
  }

  if (isTemplates || isBundle) {
    html += `<h2>Included Templates</h2>\n<div class="table-wrap"><table>\n<thead><tr><th>#</th><th>Template</th><th>Description</th></tr></thead>\n<tbody>\n`;
    const templates = makeTemplates(rng);
    templates.forEach((t, i) => {
      html += `<tr><td>${i + 1}</td><td><strong>${t.name}</strong></td><td>${t.description}</td></tr>\n`;
    });
    html += `</tbody></table></div>\n`;
  }

  html += `<h2>Support</h2>
<p>If you have any questions about this product, please contact our support team. We typically respond within 24 hours.</p>

<h2>License</h2>
<p>This product is for personal use only. Redistribution or resale is strictly prohibited. You may use the content for your own projects, including commercial projects, but you may not share the raw files with others.</p>

<div class="footer">
<p>AutoMoney Store &copy; 2026. All rights reserved.</p>
<p><a href="${BASE_URL_}" style="color:#444;text-decoration:none">${BASE_URL_}</a></p>
</div>
</div>
</body>
</html>`;

  fs.writeFileSync(path.join(OUT_DIR, filename), html, 'utf-8');
  count++;
  if (count % 20 === 0) console.log(`Generated ${count}/${Object.keys(PRODUCT_FILES).length} files`);
}

console.log(`Done! Generated ${count} download files in ${OUT_DIR}`);
