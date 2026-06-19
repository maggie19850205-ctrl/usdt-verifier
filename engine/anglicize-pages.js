const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DIRS = ['output/pages', 'output/en/pages', 'output/es/pages', 'output/pt/pages'];

const CN_TO_EN = {
  '终身使用': 'Lifetime Access',
  '即时交付': 'Instant Delivery',
  '商业授权': 'Commercial License',
  '安全支付': 'Secure Payment',
  '付款后即时下载': 'Instant Download After Payment',
  '无需等待人工审核': 'No Manual Review Needed',
  '区块链自动验证': 'Blockchain Auto-Verified',
  '无需提供个人信息': 'No Personal Info Required',
  '一次性付费': 'One-Time Payment',
  '无订阅费': 'No Subscription Fees',
  '包含商业授权': 'Commercial License Included',
  '可用于客户项目': 'Use in Client Projects',
  '兼容所有设备和平台': 'Works on All Devices & Platforms',
  '定期更新和改进': 'Regular Updates & Improvements',
  '购买后永久免费升级': 'Free Lifetime Upgrades',
  '谁适合使用这个产品': 'Who Is This For',
  '自由职业者提升工作效率': 'Freelancers Boost Productivity',
  '节省30': 'Save 30',
  '以上的重复工作时间': 'Hours of Repetitive Work',
  '小团队无需招聘专业人才': 'Small Teams Need No Extra Hires',
  '直接使用专业级模板和工具': 'Use Pro Templates & Tools Instantly',
  '创业者快速搭建产品原型': 'Founders Build Prototypes Fast',
  '缩短上市时间': 'Shorten Time to Market',
  '学生和职场人士提升个人技能': 'Students & Professionals Level Up',
  '增加竞争力': 'Increase Competitiveness',
  '安全交易': 'Safe Transactions',
  '区块链加密': 'Blockchain Encrypted',
  '无第三方干预': 'No Third-Party Interference',
  '自动验证到账即下载': 'Auto-Verified, Instant Download',
  '质量保证': 'Quality Guaranteed',
  '不满意7天内全额退款': '7-Day Full Refund',
  '全球可用': 'Global Access',
  '无需银行账户': 'No Bank Account Needed',
  '全球用户均可购买': 'Available Worldwide',
  '样机模板': 'Mockup Templates',
  '设计资产': 'Design Assets',
  '视频模板': 'Video Templates',
  '码生成器': 'Code Generator',
  '图片增强': 'Image Enhancer',
  '主题模板': 'Theme Templates',
  '低内容书': 'Low Content Books',
  '语音配音': 'Voiceover',
  '写作助手': 'Writing Assistant',
  '文案生成': 'Copy Generator',
  '头像生成': 'Avatar Generator',
  '邮件助手': 'Email Assistant',
  '关键词工具': 'Keyword Tool',
  '命名生成器': 'Name Generator',
  '密码生成器': 'Password Generator',
  '取色器扩展': 'Color Picker Extension',
  '链接收藏扩展': 'Link Saver Extension',
  '标签管理扩展': 'Tab Manager Extension',
  '滚动标记扩展': 'Scroll Marker Extension',
  '随机选择器': 'Random Picker',
  '计划任务': 'Task Planner',
  '截止日计算': 'Deadline Calculator',
  '博客网络': 'Blog Network',
  '联盟评测站': 'Affiliate Review Site',
  '对比评测站': 'Comparison Review Site',
  '科技评测站': 'Tech Review Site',
  '游戏攻略站': 'Gaming Guide Site',
  '优惠券站': 'Coupon Site',
  '营销知识站': 'Marketing Knowledge Site',
  '理财博客': 'Finance Blog',
  '健康生活站': 'Healthy Living Site',
  '旅行攻略站': 'Travel Guide Site',
  '育儿经验站': 'Parenting Tips Site',
  '手工DIY站': 'DIY Crafts Site',
  '手工diy站': 'DIY Crafts Site',
  '宠物养护站': 'Pet Care Site',
  '加密金融站': 'Crypto Finance Site',
  '图片工具站': 'Image Tools Site',
  '文本工具站': 'Text Tools Site',
  '计算器站': 'Calculator Site',
  '转换器站': 'Converter Site',
  '开发工具站': 'Developer Tools Site',
  '图标合集包': 'Icon Collection Pack',
  '字体合集包': 'Font Collection Pack',
  '字体音效包': 'Font & Sound Pack',
  '番茄计时器': 'Pomodoro Timer',
  '习惯追踪器': 'Habit Tracker',
  '发票生成器': 'Invoice Generator',
  '简历生成器': 'Resume Builder',
  '合同创建器': 'Contract Creator',
  '表单创建器': 'Form Builder',
  '方案创建器': 'Solution Builder',
  '标语生成器': 'Slogan Generator',
  '配色生成器': 'Color Palette Generator',
  '会议排期器': 'Meeting Scheduler',
  '计划任务器': 'Task Scheduler',
  '考试创': 'Exam Creator',
  '电子表格': 'Spreadsheet',
  '条评价': 'Reviews',
  '已售': 'Sold',
  '包含': 'Includes',
  '模板': 'Template',
  '图标包': 'Icon Pack',
  '去背景': 'Remove Background',
  '缩略图': 'Thumbnail',
  '新闻站': 'News Site',
  '电子书': 'eBook',
  '涂色书': 'Coloring Book',
  '活动书': 'Activity Book',
  '工具站': 'Tools Site',
  '评测站': 'Review Site',
  '分析器': 'Analyzer',
  '矩阵': 'Matrix',
  '设计': 'Design',
  '扩展': 'Extension',
  '素材': 'Assets',
  '预设': 'Presets',
  '服务': 'Service',
  '密': '',
  '拼音': 'Pinyin',
  '音频': 'Audio',
  '远程': 'Remote',
  '问答': 'Q&A',
  '插件': 'Plugin',
  '翻译': 'Translation',
  '笔记': 'Notes',
  'B2B': 'B2B',
  '文档': 'Document',
  '学术': 'Academic',
  '生成': 'Generate',
  'PDF': 'PDF',
  '对话': 'Conversation',
  '网页': 'Web Page',
  '搭建': 'Build',
  '字幕': 'Subtitles',
  '转录': 'Transcription',
  '克隆': 'Clone',
  '数字': 'Digital',
  '人': 'Person',
  '转换': 'Convert',
  '尺寸': 'Size',
  '优化': 'Optimize',
  '数据': 'Data',
  '图片': 'Image',
  '视频': 'Video',
  '合并': 'Merge',
  '压缩': 'Compress',
  '剪切': 'Crop',
  '格式': 'Format',
  'Collection包': 'Collection Pack',
  'Collection站': 'Collection Site',
  ' Pack包': ' Pack',
  '包': ' Pack',
  '站': ' Site',
};

let totalFixed = 0;
let fileCount = 0;

for (const dir of DIRS) {
  const fullDir = path.join(ROOT, dir);
  if (!fs.existsSync(fullDir)) continue;

  const entries = fs.readdirSync(fullDir, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const pageDir = path.join(fullDir, entry.name);
    const htmlFiles = fs.readdirSync(pageDir).filter(f => f.endsWith('.html'));
    for (const htmlFile of htmlFiles) {
      const fp = path.join(pageDir, htmlFile);
      let html = fs.readFileSync(fp, 'utf-8');
      let fixed = false;
      for (const [cn, en] of Object.entries(CN_TO_EN)) {
        if (html.includes(cn)) {
          html = html.split(cn).join(en);
          fixed = true;
        }
      }
      if (fixed) {
        fs.writeFileSync(fp, html, 'utf-8');
        totalFixed++;
      }
      fileCount++;
    }
  }
}

console.log(`Scanned ${fileCount} files, anglicized ${totalFixed} files across ${DIRS.length} directories`);
