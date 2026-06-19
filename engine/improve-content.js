const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DOWNLOADS_DIR = path.join(__dirname, '..', 'output', 'downloads');

// ============= Human-written content sections =============

const SECTION_INTROS = {
  guide: [
    'This guide walks you through everything you need to know, from the fundamentals to advanced techniques. Each chapter builds on the previous one, so you can learn at your own pace.',
    'Whether you are just getting started or looking to deepen your expertise, this guide provides clear explanations and actionable steps that you can apply immediately.',
  ],
  checklist: [
    'This workbook contains actionable checklists broken into clear phases. Work through each phase step by step and check off items as you complete them.',
  ],
  template: [
    'This template pack includes professionally designed, fully customizable templates that are ready to use. Save hours of formatting work and focus on what matters.',
  ],
  bundle: [
    'The ultimate bundle combines our complete guide, workbook, templates, and bonus resources at a significant discount. Everything you need in one package.',
  ],
};

const WHAT_YOU_GET = {
  guide: [
    'Clear, step-by-step instructions that anyone can follow',
    'Real-world examples and practical applications',
    'Best practices and common pitfalls to avoid',
    'Actionable frameworks you can implement right away',
    'Professional tips from experienced practitioners',
  ],
  checklist: [
    'Organized checklists for each phase of implementation',
    'Clear success criteria to track your progress',
    'Space for notes and observations',
    'Reusable format for multiple projects',
    'Quick reference cards for daily use',
  ],
  template: [
    'Multiple professionally designed templates in standard formats',
    'Fully customizable — edit colors, text, and layout',
    'Detailed usage instructions for each template',
    'Compatible with popular software tools',
    'Ready to use immediately after download',
  ],
  bundle: [
    'Complete step-by-step guide covering everything from start to finish',
    'Printable workbook with checklists and exercises',
    'Professionally designed templates for daily use',
    'Quick reference cards for easy access',
    'Bonus resources and additional tips',
  ],
};

const SECTION_BODIES = {
  guide: [
    {
      heading: 'What You Will Learn',
      content: [
        'The fundamental concepts and principles explained in plain language',
        'Step-by-step implementation strategies that work in real-world scenarios',
        'Proven techniques used by industry professionals to achieve consistent results',
        'How to avoid common mistakes that cost time and money',
        'Advanced methods to take your skills to the next level',
        'Practical tips for integrating these techniques into your daily workflow',
      ],
    },
    {
      heading: 'Getting Started',
      content: [
        'No prior experience is required. The guide begins with foundational concepts and gradually progresses to more advanced topics.',
        'Each chapter includes practical exercises so you can apply what you learn immediately. Work through them at your own pace.',
        'You will need only standard tools and software that you probably already have. No expensive equipment or subscriptions required.',
      ],
    },
    {
      heading: 'Core Concepts',
      content: [
        'Understanding the fundamentals is the key to long-term success. This section breaks down complex ideas into simple, digestible concepts.',
        'Every concept is explained with real-world examples and practical applications. You will see exactly how each piece fits into the bigger picture.',
        'By the end of this section, you will have a solid foundation that allows you to confidently move on to more advanced techniques.',
      ],
    },
    {
      heading: 'Step-by-Step Implementation',
      content: [
        'Follow these proven steps to implement what you have learned. Each step is clearly explained with specific actions you can take.',
        'Start with the basics and build up gradually. Take your time with each step before moving on to the next one.',
        'If you get stuck at any point, refer back to the core concepts section. Most questions are answered by reviewing the fundamentals.',
        'By the end of this process, you will have a fully functional system that you can use and adapt for your specific needs.',
      ],
    },
    {
      heading: 'Best Practices',
      content: [
        'These best practices have been refined through years of real-world experience. Following them will help you avoid common pitfalls and achieve better results.',
        'Consistency is more important than perfection. Focus on building good habits and the results will follow naturally.',
        'Always test and validate your work before moving on. This saves time in the long run and ensures quality results.',
      ],
    },
    {
      heading: 'Common Pitfalls to Avoid',
      content: [
        'The most common mistake is trying to do everything at once. Take it step by step and master each phase before moving on.',
        'Do not skip the fundamentals. A strong foundation is essential for long-term success and prevents costly mistakes down the road.',
        'Ignore distractions and stay focused on your specific goals. Trying to implement too many features at once leads to overwhelm and poor results.',
      ],
    },
    {
      heading: 'Advanced Techniques',
      content: [
        'Once you have mastered the basics, these advanced techniques will help you get even better results and work more efficiently.',
        'These methods are used by top professionals and have been proven to deliver superior outcomes in a fraction of the time.',
        'Experiment with different approaches to find what works best for your specific situation. There is no one-size-fits-all solution.',
      ],
    },
    {
      heading: 'Resources and Next Steps',
      content: [
        'Now that you have completed the guide, you have a solid foundation and practical skills that you can start using immediately.',
        'Keep practicing and applying what you have learned. The more you use these techniques, the more natural they will become.',
        'For additional support, refer to our FAQ section or contact our support team. We are here to help you succeed.',
      ],
    },
  ],
};

// Template descriptions (replaces the RNG garbage in template tables)
const TEMPLATE_DESCRIPTIONS = [
  'Track your milestones and key deliverables across the entire project lifecycle. Includes visual progress indicators.',
  'Plan and manage your budget with this detailed allocation sheet. Track expenses, forecast costs, and stay on budget.',
  'Collect structured feedback from clients and stakeholders. Pre-built questions that get you actionable insights.',
  'Identify and evaluate potential risks before they become problems. Includes probability and impact scoring.',
  'Monitor performance metrics and KPIs over time. Visual charts make it easy to spot trends and issues.',
  'Allocate resources efficiently across teams and projects. Avoid overloading team members or missing deadlines.',
  'Keep a clear record of all communications with stakeholders, clients, and team members. Never lose track of important conversations.',
  'Generate professional stakeholder reports with key metrics, progress updates, and recommendations in minutes.',
  'Log daily operations and track routine tasks. Maintain consistency and identify areas for improvement.',
  'Quality control checklist with pass/fail criteria for each item. Ensure consistent quality across all deliverables.',
  'Strategic planning template for setting goals, defining strategies, and tracking progress over time.',
  'Visual project timeline with Gantt chart. Plan dependencies, track milestones, and manage deadlines effectively.',
];

function pick(arr, seed) {
  const rng = seedRand(seed);
  return arr[Math.floor(rng() * arr.length)];
}

function seedRand(seed) {
  let s = seed >>> 0;
  return () => { s = (s * 1103515245 + 12345) >>> 0; return (s & 0x7fffffff) / 0x7fffffff; };
}

function getTypeFromBadge(html) {
  if (html.includes('>Checklist & Workbook<')) return 'checklist';
  if (html.includes('>Template Pack<')) return 'template';
  if (html.includes('>Ultimate Bundle<')) return 'bundle';
  return 'guide';
}

function getProductName(html) {
  const m = html.match(/<h1>([^<]+)<\/h1>/);
  return m ? m[1].trim() : 'Digital Product';
}

// Generate clean section HTML for guide pages
function generateGuideContent(productName, seed) {
  const rng = seedRand(seed);
  const intro = SECTION_INTROS.guide[Math.floor(rng() * SECTION_INTROS.guide.length)];
  const whatYouGet = WHAT_YOU_GET.guide;
  const sections = SECTION_BODIES.guide;

  let html = `<p>${intro}</p>`;
  html += `\n<h2>${sections[0].heading}</h2>`;
  html += `\n<ul>`;
  for (const item of whatYouGet) {
    html += `\n  <li>${item}</li>`;
  }
  html += `\n</ul>`;

  for (let i = 1; i < sections.length; i++) {
    const sec = sections[i];
    html += `\n<h2>${sec.heading}</h2>`;
    for (const p of sec.content) {
      html += `\n<p>${p}</p>`;
    }
  }
  return html;
}

// Generate clean checklist HTML
function generateChecklistContent(productName, seed) {
  const rng = seedRand(seed);
  const whatYouGet = WHAT_YOU_GET.checklist;
  const phases = [
    {
      name: 'Phase 1: Foundation',
      items: [
        'Define your goals and what success looks like',
        'Identify the key resources and tools you will need',
        'Set up your workspace and prepare your materials',
        'Review the fundamentals before getting started',
      ],
    },
    {
      name: 'Phase 2: Setup',
      items: [
        'Configure your tools according to the recommended settings',
        'Create your tracking and documentation system',
        'Set up your workflow and establish timelines',
        'Test your setup with a small trial run',
      ],
    },
    {
      name: 'Phase 3: Implementation',
      items: [
        'Begin with the highest-priority tasks first',
        'Follow the step-by-step process systematically',
        'Document your progress and note any issues',
        'Adjust your approach based on initial results',
      ],
    },
    {
      name: 'Phase 4: Optimization',
      items: [
        'Review your results and identify areas for improvement',
        'Fine-tune your process based on what you have learned',
        'Remove bottlenecks and streamline your workflow',
        'Implement improvements and measure the impact',
      ],
    },
    {
      name: 'Phase 5: Maintenance',
      items: [
        'Set up a regular review schedule',
        'Monitor key metrics and track changes over time',
        'Update your documentation as things evolve',
        'Plan for continuous improvement',
      ],
    },
  ];

  let html = `<p>${SECTION_INTROS.checklist[0]}</p>`;
  html += `\n<h2>Checklist</h2>`;
  html += `\n<ul class="checklist">`;
  for (const phase of phases) {
    html += `\n  <li><strong>${phase.name}</strong></li>`;
    for (const item of phase.items) {
      html += `\n  <li>${item}</li>`;
    }
  }
  html += `\n</ul>`;
  return html;
}

// Generate clean template content
function generateTemplateContent(productName, seed) {
  const rng = seedRand(seed);
  const whatYouGet = WHAT_YOU_GET.template;
  const names = [
    'Strategy Planner', 'Task Organizer', 'Progress Dashboard',
    'Resource Manager', 'Communication Tracker', 'Quality Control Sheet',
    'Timeline Scheduler', 'Budget Planner', 'Feedback Form',
    'Risk Register', 'Performance Report', 'Daily Log',
  ];

  // Pick 10-12 template names, shuffle
  const shuffled = [...names].sort(() => rng() - 0.5);
  const count = Math.floor(rng() * 3) + 10; // 10-12
  const selected = shuffled.slice(0, count);

  let html = `<p>${SECTION_INTROS.template[0]}</p>`;
  html += `\n<h2>Included Templates</h2>`;

  html += `\n<ul>`;
  for (const name of selected) {
    const desc = TEMPLATE_DESCRIPTIONS[Math.floor(rng() * TEMPLATE_DESCRIPTIONS.length)];
    html += `\n  <li><strong>${name}:</strong> ${desc}</li>`;
  }
  html += `\n</ul>`;

  html += `\n<h2>What You Get</h2>`;
  html += `\n<ul>`;
  for (const item of whatYouGet) {
    html += `\n  <li>${item}</li>`;
  }
  html += `\n</ul>`;

  return html;
}

// Generate clean bundle content
function generateBundleContent(productName, seed) {
  const rng = seedRand(seed);
  const whatYouGet = WHAT_YOU_GET.bundle;

  let html = `<p>${SECTION_INTROS.bundle[0]}</p>`;
  html += `\n<p>Save time and money by getting everything in one convenient package. Each component is designed to work together, giving you a complete system rather than disconnected pieces.</p>`;
  html += `\n<h2>What is Included</h2>`;
  html += `\n<ul>`;
  for (const item of whatYouGet) {
    html += `\n  <li>${item}</li>`;
  }
  html += `\n</ul>`;
  html += `\n<p>This bundle represents our best value. Purchasing each item separately would cost significantly more. Get the complete system today and start seeing results immediately.</p>`;
  return html;
}

// ============= Main processing =============

const files = fs.readdirSync(DOWNLOADS_DIR).filter(f => f.endsWith('.html') && f !== 'index.html');
let updated = 0;
let skipped = 0;

for (const file of files) {
  const fp = path.join(DOWNLOADS_DIR, file);
  let html = fs.readFileSync(fp, 'utf-8');

  // Skip if already cleaned (check for our new content marker)
  if (html.includes('Take it step by step and master each phase')) {
    skipped++;
    continue;
  }

  const productName = getProductName(html);
  const type = getTypeFromBadge(html);
  const seed = crypto.createHash('md5').update(file).digest().readUInt32LE(0);

  // Find the range to replace: after meta </p> to before <h2>Support</h2>
  const metaEndMatch = html.match(/<p class="meta">.*?<\/p>/);
  if (!metaEndMatch) { skipped++; continue; }

  const replaceStart = metaEndMatch.index + metaEndMatch[0].length;
  
  // Find Support section (or FAQ)
  let replaceEnd = html.indexOf('<h2>Support</h2>', replaceStart);
  if (replaceEnd === -1) {
    replaceEnd = html.indexOf('<h2>Frequently Asked Questions</h2>', replaceStart);
  }
  if (replaceEnd === -1) {
    replaceEnd = html.indexOf('<div class="related-section"', replaceStart);
  }
  if (replaceEnd === -1) {
    console.log(`  SKIP (no Support/FAQ): ${file}`);
    skipped++;
    continue;
  }

  // Generate new content based on type
  let newContent;
  switch (type) {
    case 'checklist': newContent = generateChecklistContent(productName, seed); break;
    case 'template': newContent = generateTemplateContent(productName, seed); break;
    case 'bundle': newContent = generateBundleContent(productName, seed); break;
    default: newContent = generateGuideContent(productName, seed); break;
  }

  // Replace the old content
  const before = html.substring(0, replaceStart);
  const after = html.substring(replaceEnd);
  html = before + '\n\n' + newContent + '\n\n' + after;

  fs.writeFileSync(fp, html, 'utf-8');
  updated++;

  if (updated <= 5) {
    console.log(`  ${type.padEnd(10)} ${file}`);
  }
}

console.log(`\nDone. ${updated} updated, ${skipped} skipped`);
