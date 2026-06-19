param(
    [string]$Lang = "es"  # "es" or "pt"
)

$file = "D:\github-20260612\经营管理\output\$Lang\index.html"
$content = Get-Content -LiteralPath $file -Raw

# Language-specific values
if ($Lang -eq "es") {
    $langCode = "es"
    $langAttr = "es"
    $siteName = "AutoMoney Tienda Digital"
    $siteDesc = "Productos digitales premium · 34+ herramientas gratuitas · Pago USDT · Entrega instantánea"
    $kwExtra = "productos digitales, herramientas en línea, herramientas gratuitas, USDT, TRC-20"
    $navHome = "Inicio"
    $navTools = "Herramientas"
    $navBlog = "Blog"
    $navStore = "Tienda"
    $navAffiliate = "Afiliados"
    $heroTitle = "AutoMoney Tienda Digital"
    $heroDesc = "Productos digitales premium · 34+ herramientas gratuitas · Pago USDT · Entrega instantánea"
    $badgeProducts = "268+ Productos"
    $badgeDelivery = "Entrega Instantánea"
    $badgePayment = "USDT (TRC-20)"
    $badgeRegister = "Sin Registro"
    $catTools = "🔧 Herramientas"
    $catBlog = "📝 Blog"
    $toolsTitle = "Herramientas Gratuitas"
    $toolsDesc = "34 herramientas gratuitas · Sin registro · Sin anuncios"
    $toolsViewAll = "Ver todas las herramientas →"
    $catContent = "📰 Content & Blogging"
    $catDigital = "🎨 Design & Templates"
    $catPublishing = "📚 Publishing"
    $catPod = "👕 Print on Demand"
    $catSaaS = "🔧 SaaS & Tools"
    $catApps = "🧩 Apps & Extensions"
    $shareLabel = "📤 Compartir:"
    $trustSecureTitle = "Transacciones Seguras"
    $trustSecureDesc = "Cifrado blockchain, sin intervención de terceros"
    $trustDeliveryTitle = "Entrega Instantánea"
    $trustDeliveryDesc = "Descarga automática tras verificación"
    $trustQualityTitle = "Garantía de Calidad"
    $trustQualityDesc = "Reembolso total en 7 días si no estás satisfecho"
    $trustGlobalTitle = "Acceso Global"
    $trustGlobalDesc = "Sin necesidad de cuenta bancaria, disponible para todos"
    $footerText = "© 2026 AutoMoney Tienda Digital · Entrega digital global · 76 productos"
    $footerAddr = "USDT (TRC-20): TRnz5Pi8R3hjCbBjnDuZo7ZvR57euo2q8Z"
    $footerTools = "Herramientas"
    $footerBlog = "Blog"
    $footerAffiliate = "Afiliados"
    $footerAbout = "Sobre Nosotros"
    $shareId = "shareCount-es"
    $shareUrlText = "AutoMoney%20Tienda%20Digital%20-%20Productos%20digitales%20premium%20%C2%B7%2034%2B%20herramientas%20gratuitas%20%C2%B7%20Pago%20USDT%20%C2%B7%20Entrega%20instant%C3%A1nea"
    $waText = "AutoMoney+Tienda+Digital+https://automoney-store.pages.dev/es/"
    $tgText = "AutoMoney+Tienda+Digital"
} else {
    $langCode = "pt"
    $langAttr = "pt"
    $siteName = "AutoMoney Loja Digital"
    $siteDesc = "Produtos digitais premium · 34+ ferramentas grátis · Pagamento USDT · Entrega instantânea"
    $kwExtra = "produtos digitais, ferramentas online, ferramentas grátis, USDT, TRC-20"
    $navHome = "Início"
    $navTools = "Ferramentas"
    $navBlog = "Blog"
    $navStore = "Loja"
    $navAffiliate = "Afiliados"
    $heroTitle = "AutoMoney Loja Digital"
    $heroDesc = "Produtos digitais premium · 34+ ferramentas grátis · Pagamento USDT · Entrega instantânea"
    $badgeProducts = "268+ Produtos"
    $badgeDelivery = "Entrega Instantânea"
    $badgePayment = "USDT (TRC-20)"
    $badgeRegister = "Sem Registro"
    $catTools = "🔧 Ferramentas"
    $catBlog = "📝 Blog"
    $toolsTitle = "Ferramentas Grátis"
    $toolsDesc = "34 ferramentas grátis · Sem registro · Sem anúncios"
    $toolsViewAll = "Ver todas ferramentas →"
    $catContent = "📰 Content & Blogging"
    $catDigital = "🎨 Design & Templates"
    $catPublishing = "📚 Publishing"
    $catPod = "👕 Print on Demand"
    $catSaaS = "🔧 SaaS & Tools"
    $catApps = "🧩 Apps & Extensions"
    $shareLabel = "📤 Compartilhar:"
    $trustSecureTitle = "Transações Seguras"
    $trustSecureDesc = "Criptografia blockchain, sem intervenção de terceiros"
    $trustDeliveryTitle = "Entrega Instantânea"
    $trustDeliveryDesc = "Download automático após verificação"
    $trustQualityTitle = "Garantia de Qualidade"
    $trustQualityDesc = "Reembolso total em 7 dias se não estiver satisfeito"
    $trustGlobalTitle = "Acesso Global"
    $trustGlobalDesc = "Sem necessidade de conta bancária, disponível para todos"
    $footerText = "© 2026 AutoMoney Loja Digital · Entrega digital global · 76 produtos"
    $footerAddr = "USDT (TRC-20): TRnz5Pi8R3hjCbBjnDuZo7ZvR57euo2q8Z"
    $footerTools = "Ferramentas"
    $footerBlog = "Blog"
    $footerAffiliate = "Afiliados"
    $footerAbout = "Sobre Nós"
    $shareId = "shareCount-pt"
    $shareUrlText = "AutoMoney%20Loja%20Digital%20-%20Produtos%20digitais%20premium%20%C2%B7%2034%2B%20ferramentas%20gr%C3%A1tis%20%C2%B7%20Pagamento%20USDT%20%C2%B7%20Entrega%20instant%C3%A2nea"
    $waText = "AutoMoney+Loja+Digital+https://automoney-store.pages.dev/pt/"
    $tgText = "AutoMoney+Loja+Digital"
}

# ===== FIX 1: HTML lang tag =====
$content = $content -replace '<html lang="[^"]*" lang="[^"]*" lang="[^"]*">', "<html lang=`"$langAttr`">"

# ===== FIX 2: Meta description, keywords, OG, Twitter — remove Chinese =====
$content = $content -replace '<meta name="description" content="Premium数字产品 · 34\+Herramientas · USDT支付 · Entrega Instantánea">', '<meta name="description" content="'"$siteDesc"'">'
$content = $content -replace '<meta name="description" content="Premium数字产品 · 34\+Ferramentas · USDT支付 · Entrega Instantânea">', '<meta name="description" content="'"$siteDesc"'">'
$content = $content -replace '<meta name="keywords" content="digital products, online tools, 数字产品, Herramientas, USDT, TRC-20">', '<meta name="keywords" content="'"$kwExtra"', USDT, TRC-20">'
$content = $content -replace '<meta name="keywords" content="digital products, online tools, 数字产品, Ferramentas, USDT, TRC-20">', '<meta name="keywords" content="'"$kwExtra"', USDT, TRC-20">'
$content = $content -replace '<meta property="og:description" content="Premium数字产品 · 34\+Herramientas · USDT支付 · Entrega Instantánea">', '<meta property="og:description" content="'"$siteDesc"'">'
$content = $content -replace '<meta property="og:description" content="Premium数字产品 · 34\+Ferramentas · USDT支付 · Entrega Instantânea">', '<meta property="og:description" content="'"$siteDesc"'">'
$content = $content -replace '<meta name="twitter:description" content="Premium数字产品 · 34\+Herramientas · USDT支付 · Entrega Instantánea">', '<meta name="twitter:description" content="'"$siteDesc"'">'
$content = $content -replace '<meta name="twitter:description" content="Premium数字产品 · 34\+Ferramentas · USDT支付 · Entrega Instantânea">', '<meta name="twitter:description" content="'"$siteDesc"'">'

# ===== FIX 3: Canonical =====
$content = $content -replace '<link rel="canonical" href="https://automoney-store\.pages\.dev/">', "<link rel=`"canonical`" href=`"https://automoney-store.pages.dev/$Lang/`">"

# ===== FIX 4: Schema JSON =====
$content = $content -replace '"description":"Premium数字产品 · 34\+Herramientas · USDT支付 · Entrega Instantánea"', "`"description`":`"$siteDesc`""
$content = $content -replace '"description":"Premium数字产品 · 34\+Ferramentas · USDT支付 · Entrega Instantânea"', "`"description`":`"$siteDesc`""
$content = $content -replace '"name":"AutoMoney Tienda Digital"', "`"name`":`"$siteName`""
$content = $content -replace '"name":"AutoMoney Loja Digital"', "`"name`":`"$siteName`""

# ===== FIX 5: OG url =====
$content = $content -replace '<meta property="og:url" content="https://automoney-store\.pages\.dev/">', "<meta property=`"og:url`" content=`"https://automoney-store.pages.dev/$Lang/`">"

# ===== FIX 6: hreflang block =====
$hreflangBlock = @"
    <link rel="alternate" hreflang="zh" href="https://automoney-store.pages.dev/">
    <link rel="alternate" hreflang="en" href="https://automoney-store.pages.dev/en/">
    <link rel="alternate" hreflang="es" href="https://automoney-store.pages.dev/es/">
    <link rel="alternate" hreflang="pt" href="https://automoney-store.pages.dev/pt/">
"@
# Match any hreflang block (4 lines)
$content = $content -replace '(?s)    <link rel="alternate" hreflang="[^"]+" href="https://automoney-store\.pages\.dev/[^"]*">\s+    <link rel="alternate" hreflang="[^"]+" href="https://automoney-store\.pages\.dev/[^"]*">\s+    <link rel="alternate" hreflang="[^"]+" href="https://automoney-store\.pages\.dev/[^"]*">\s+    <link rel="alternate" hreflang="[^"]+" href="https://automoney-store\.pages\.dev/[^"]*">', $hreflangBlock

# ===== FIX 7: Nav links — fix missing opening quotes =====
$content = $content -replace 'href=/es/tools/">', 'href="/es/tools/">'
$content = $content -replace 'href=/es/blog/">', 'href="/es/blog/">'
$content = $content -replace 'href=/es/affiliate.html>', 'href="/es/affiliate.html">'
$content = $content -replace 'href=/pt/tools/">', 'href="/pt/tools/">'
$content = $content -replace 'href=/pt/blog/">', 'href="/pt/blog/">'
$content = $content -replace 'href=/pt/affiliate.html>', 'href="/pt/affiliate.html">'

# ===== FIX 8: Nav link texts =====
$content = $content -replace '<a href="/">Inicio</a>', '<a href="/'"$Lang/"'">'"$navHome"'</a>'
$content = $content -replace '<a href="/">Início</a>', '<a href="/'"$Lang/"'">'"$navHome"'</a>'
$content = $content -replace '<a href="/es/tools/">Herramientas</a>', '<a href="/'"$Lang/tools/"'">'"$navTools"'</a>'
$content = $content -replace '<a href="/pt/tools/">Ferramentas</a>', '<a href="/'"$Lang/tools/"'">'"$navTools"'</a>'
$content = $content -replace '<a href="/es/blog/">Blog</a>', '<a href="/'"$Lang/blog/"'">'"$navBlog"'</a>'
$content = $content -replace '<a href="/pt/blog/">Blog</a>', '<a href="/'"$Lang/blog/"'">'"$navBlog"'</a>'
$content = $content -replace '<a href="/">Tienda</a>', '<a href="/'"$Lang/"'">'"$navStore"'</a>'
$content = $content -replace '<a href="/es/affiliate.html>Afiliados</a>', '<a href="/'"$Lang/affiliate.html"'">'"$navAffiliate"'</a>'
$content = $content -replace '<a href="/pt/affiliate.html>Afiliados</a>', '<a href="/'"$Lang/affiliate.html"'">'"$navAffiliate"'</a>'

# Fix nav blog link with missing quote
$content = $content -replace '<a href=/es/blog/" class="cat-link">📝 Blog</a>', '<a href="/es/blog/" class="cat-link">📝 Blog</a>'
$content = $content -replace '<a href=/pt/blog/" class="cat-link">📝 Blog</a>', '<a href="/pt/blog/" class="cat-link">📝 Blog</a>'

# ===== FIX 9: Nav brand link =====
$content = $content -replace '<a href="/" class="nav-brand">AutoMoney Tienda Digital</a>', '<a href="/'"$Lang/"'" class="nav-brand">'"$siteName"'</a>'
$content = $content -replace '<a href="/" class="nav-brand">AutoMoney Loja Digital</a>', '<a href="/'"$Lang/"'" class="nav-brand">'"$siteName"'</a>'

# ===== FIX 10: Lang-switcher =====
$langSwitcherBlock = @"
<div class="lang-switcher"><span class="ls-label">🌐</span><a href="/" data-lang="zh">🇨🇳 中文</a><a href="/en/" data-lang="en">🇺🇸 English</a><a href="/es/" data-lang="es">🇪🇸 Español</a><a href="/pt/" data-lang="pt">🇧🇷 Português</a></div>
"@
$content = $content -replace '<div class="lang-switcher">.*?</div>', $langSwitcherBlock

# ===== FIX 11: Active lang in switcher =====
$content = $content -replace 'href="/" class="ls-active" data-lang="es"', 'href="/" class="" data-lang="zh"'
$content = $content -replace 'href="/en/" class="" data-lang="es"', 'href="/en/" class="" data-lang="en"'
# Now set active for current language
if ($Lang -eq "es") {
    $content = $content -replace '<a href="/es/" data-lang="es">', '<a href="/es/" class="ls-active" data-lang="es">'
} else {
    $content = $content -replace '<a href="/pt/" data-lang="pt">', '<a href="/pt/" class="ls-active" data-lang="pt">'
}

$content = $content -replace 'href="/" class="" data-lang="pt"', 'href="/" class="" data-lang="zh"'
$content = $content -replace 'href="/en/" class="" data-lang="pt"', 'href="/en/" class="" data-lang="en"'
$content = $content -replace 'href="/es/" class="" data-lang="es"', 'href="/es/" class="" data-lang="es"'

# ===== FIX 12: Hero section =====
$content = $content -replace '<h1>AutoMoney Tienda Digital</h1>', "<h1>$heroTitle</h1>"
$content = $content -replace '<h1>AutoMoney Loja Digital</h1>', "<h1>$heroTitle</h1>"
$content = $content -replace '<p>Premium数字产品 · 34\+Herramientas · USDT支付 · Entrega Instantánea</p>', "<p>$heroDesc</p>"
$content = $content -replace '<p>Premium数字产品 · 34\+Ferramentas · USDT支付 · Entrega Instantânea</p>', "<p>$heroDesc</p>"

# Fix badge texts
$content = $content -replace '76\+ Productos', $badgeProducts
$content = $content -replace '76\+ Produtos', $badgeProducts
$content = $content -replace 'Entrega Instantánea</span>', "$badgeDelivery</span>"
$content = $content -replace 'Entrega Instantânea</span>', "$badgeDelivery</span>"
$content = $content -replace 'USDT \(TRC-20\)</span>', "$badgePayment</span>"
$content = $content -replace 'Sin Registro</span>', "$badgeRegister</span>"
$content = $content -replace 'Sem Registro</span>', "$badgeRegister</span>"

# ===== FIX 13: Tools section heading/description =====
$content = $content -replace '<h2>Herramientas Gratuitas</h2>', "<h2>$toolsTitle</h2>"
$content = $content -replace '<h2>Ferramentas Grátis</h2>', "<h2>$toolsTitle</h2>"
$content = $content -replace '<p>34个Herramientas · Sin Registro · 无广告</p>', "<p>$toolsDesc</p>"
$content = $content -replace '<p>34个Ferramentas · Sem Registro · 无广告</p>', "<p>$toolsDesc</p>"

# View all tools link
$content = $content -replace 'Ver Herramientas →</a>', "$toolsViewAll</a>"
$content = $content -replace 'Ver Ferramentas →</a>', "$toolsViewAll</a>"

# ===== FIX 14: Tools link missing quotes =====
$content = $content -replace 'href=/es/tools/word-counter.html', 'href="/es/tools/word-counter.html'
$content = $content -replace 'href=/es/tools/password-generator.html', 'href="/es/tools/password-generator.html'
$content = $content -replace 'href=/es/tools/uuid-generator.html', 'href="/es/tools/uuid-generator.html'
$content = $content -replace 'href=/es/tools/age-calculator.html', 'href="/es/tools/age-calculator.html'
$content = $content -replace 'href=/es/tools/random-number.html', 'href="/es/tools/random-number.html'
$content = $content -replace 'href=/es/tools/color-palette.html', 'href="/es/tools/color-palette.html'
$content = $content -replace 'href=/es/tools/json-formatter.html', 'href="/es/tools/json-formatter.html'
$content = $content -replace 'href=/es/tools/markdown-editor.html', 'href="/es/tools/markdown-editor.html'
$content = $content -replace 'href=/es/tools/bmi-calculator.html', 'href="/es/tools/bmi-calculator.html'
$content = $content -replace 'href=/es/tools/qr-code.html', 'href="/es/tools/qr-code.html'
$content = $content -replace 'href=/es/tools/unit-converter.html', 'href="/es/tools/unit-converter.html'
$content = $content -replace 'href=/es/tools/stopwatch.html', 'href="/es/tools/stopwatch.html'
$content = $content -replace 'href=/es/tools/case-converter.html', 'href="/es/tools/case-converter.html'
$content = $content -replace 'href=/es/tools/percentage-calculator.html', 'href="/es/tools/percentage-calculator.html'
$content = $content -replace 'href=/es/tools/base64.html', 'href="/es/tools/base64.html'
$content = $content -replace 'href=/es/tools/image-resizer.html', 'href="/es/tools/image-resizer.html'
$content = $content -replace 'href=/es/tools/text-to-speech.html', 'href="/es/tools/text-to-speech.html'
$content = $content -replace 'href=/es/tools/hash-generator.html', 'href="/es/tools/hash-generator.html'
$content = $content -replace 'href=/es/tools/url-encoder.html', 'href="/es/tools/url-encoder.html'
$content = $content -replace 'href=/es/tools/regex-tester.html', 'href="/es/tools/regex-tester.html'
$content = $content -replace 'href=/es/tools/lorem-ipsum.html', 'href="/es/tools/lorem-ipsum.html'
$content = $content -replace 'href=/es/tools/number-base.html', 'href="/es/tools/number-base.html'
$content = $content -replace 'href=/es/tools/timestamp.html', 'href="/es/tools/timestamp.html'
$content = $content -replace 'href=/es/tools/color-converter.html', 'href="/es/tools/color-converter.html'
$content = $content -replace 'href=/es/tools/loan-calculator.html', 'href="/es/tools/loan-calculator.html'
$content = $content -replace 'href=/es/tools/date-calc.html', 'href="/es/tools/date-calc.html'
$content = $content -replace 'href=/es/tools/currency-converter.html', 'href="/es/tools/currency-converter.html'
$content = $content -replace 'href=/es/tools/file-size.html', 'href="/es/tools/file-size.html'
$content = $content -replace 'href=/es/tools/browser-info.html', 'href="/es/tools/browser-info.html'
$content = $content -replace 'href=/es/tools/word-frequency.html', 'href="/es/tools/word-frequency.html'
$content = $content -replace 'href=/es/tools/guid-generator.html', 'href="/es/tools/guid-generator.html'
$content = $content -replace 'href=/es/tools/html-preview.html', 'href="/es/tools/html-preview.html'
$content = $content -replace 'href=/es/tools/morse-code.html', 'href="/es/tools/morse-code.html'
$content = $content -replace 'href=/es/tools/list-sorter.html', 'href="/es/tools/list-sorter.html'

$content = $content -replace 'href=/pt/tools/word-counter.html', 'href="/pt/tools/word-counter.html'
$content = $content -replace 'href=/pt/tools/password-generator.html', 'href="/pt/tools/password-generator.html'
$content = $content -replace 'href=/pt/tools/uuid-generator.html', 'href="/pt/tools/uuid-generator.html'
$content = $content -replace 'href=/pt/tools/age-calculator.html', 'href="/pt/tools/age-calculator.html'
$content = $content -replace 'href=/pt/tools/random-number.html', 'href="/pt/tools/random-number.html'
$content = $content -replace 'href=/pt/tools/color-palette.html', 'href="/pt/tools/color-palette.html'
$content = $content -replace 'href=/pt/tools/json-formatter.html', 'href="/pt/tools/json-formatter.html'
$content = $content -replace 'href=/pt/tools/markdown-editor.html', 'href="/pt/tools/markdown-editor.html'
$content = $content -replace 'href=/pt/tools/bmi-calculator.html', 'href="/pt/tools/bmi-calculator.html'
$content = $content -replace 'href=/pt/tools/qr-code.html', 'href="/pt/tools/qr-code.html'
$content = $content -replace 'href=/pt/tools/unit-converter.html', 'href="/pt/tools/unit-converter.html'
$content = $content -replace 'href=/pt/tools/stopwatch.html', 'href="/pt/tools/stopwatch.html'
$content = $content -replace 'href=/pt/tools/case-converter.html', 'href="/pt/tools/case-converter.html'
$content = $content -replace 'href=/pt/tools/percentage-calculator.html', 'href="/pt/tools/percentage-calculator.html'
$content = $content -replace 'href=/pt/tools/base64.html', 'href="/pt/tools/base64.html'
$content = $content -replace 'href=/pt/tools/image-resizer.html', 'href="/pt/tools/image-resizer.html'
$content = $content -replace 'href=/pt/tools/text-to-speech.html', 'href="/pt/tools/text-to-speech.html'
$content = $content -replace 'href=/pt/tools/hash-generator.html', 'href="/pt/tools/hash-generator.html'
$content = $content -replace 'href=/pt/tools/url-encoder.html', 'href="/pt/tools/url-encoder.html'
$content = $content -replace 'href=/pt/tools/regex-tester.html', 'href="/pt/tools/regex-tester.html'
$content = $content -replace 'href=/pt/tools/lorem-ipsum.html', 'href="/pt/tools/lorem-ipsum.html'
$content = $content -replace 'href=/pt/tools/number-base.html', 'href="/pt/tools/number-base.html'
$content = $content -replace 'href=/pt/tools/timestamp.html', 'href="/pt/tools/timestamp.html'
$content = $content -replace 'href=/pt/tools/color-converter.html', 'href="/pt/tools/color-converter.html'
$content = $content -replace 'href=/pt/tools/loan-calculator.html', 'href="/pt/tools/loan-calculator.html'
$content = $content -replace 'href=/pt/tools/date-calc.html', 'href="/pt/tools/date-calc.html'
$content = $content -replace 'href=/pt/tools/currency-converter.html', 'href="/pt/tools/currency-converter.html'
$content = $content -replace 'href=/pt/tools/file-size.html', 'href="/pt/tools/file-size.html'
$content = $content -replace 'href=/pt/tools/browser-info.html', 'href="/pt/tools/browser-info.html'
$content = $content -replace 'href=/pt/tools/word-frequency.html', 'href="/pt/tools/word-frequency.html'
$content = $content -replace 'href=/pt/tools/guid-generator.html', 'href="/pt/tools/guid-generator.html'
$content = $content -replace 'href=/pt/tools/html-preview.html', 'href="/pt/tools/html-preview.html'
$content = $content -replace 'href=/pt/tools/morse-code.html', 'href="/pt/tools/morse-code.html'
$content = $content -replace 'href=/pt/tools/list-sorter.html', 'href="/pt/tools/list-sorter.html'

# ===== FIX 15: View all tools link missing quote =====
$content = $content -replace 'href=/es/tools/"', 'href="/es/tools/"'
$content = $content -replace 'href=/pt/tools/"', 'href="/pt/tools/"'

# ===== FIX 16: Product page links missing quotes =====
$content = $content -replace 'href=/es/pages/', 'href="/es/pages/'
$content = $content -replace 'href=/pt/pages/', 'href="/pt/pages/'

# ===== FIX 17: Share section =====
$shareBlock = @"
<div class="share-bar">
  <div style="text-align:center;padding:16px 0">
    <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;font-size:0.85rem">
      <span style="color:var(--text5)">$shareLabel</span>
      <a href="https://twitter.com/intent/tweet?text=$shareUrlText&url=https://automoney-store.pages.dev/$Lang/" target="_blank" rel="noopener" style="color:var(--accent);text-decoration:none" onclick="fetch('/api/share',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({platform:'twitter',url:window.location.href})})">𝕏</a>
      <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://automoney-store.pages.dev/$Lang/" target="_blank" rel="noopener" style="color:var(--accent);text-decoration:none" onclick="fetch('/api/share',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({platform:'linkedin',url:window.location.href})})">💼</a>
      <a href="https://www.facebook.com/sharer/sharer.php?u=https://automoney-store.pages.dev/$Lang/" target="_blank" rel="noopener" style="color:var(--accent);text-decoration:none" onclick="fetch('/api/share',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({platform:'facebook',url:window.location.href})})">📘</a>
      <a href="https://wa.me/?text=$waText" target="_blank" rel="noopener" style="color:var(--accent);text-decoration:none" onclick="fetch('/api/share',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({platform:'whatsapp',url:window.location.href})})">💬</a>
      <a href="https://t.me/share/url?url=https://automoney-store.pages.dev/$Lang/&text=$tgText" target="_blank" rel="noopener" style="color:var(--accent);text-decoration:none" onclick="fetch('/api/share',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({platform:'telegram',url:window.location.href})})">✈️</a>
      <span style="color:var(--text7);font-size:0.75rem" id="$shareId"></span>
    </div>
  </div>
</div>
"@
$content = $content -replace '(?s)<div class="share-bar">.*?</div>\s*</div>', ($shareBlock -replace '(?m)\r?\n$', '')

# ===== FIX 18: Trust bar — fix mixed Chinese =====
$content = $content -replace '区块链加密，无第三方干预', $trustSecureDesc
$content = $content -replace '自动验证到账即下载', $trustDeliveryDesc
$content = $content -replace '不满意7天内全额退款', $trustQualityDesc
$content = $content -replace '无需银行账户，全球用户均可购买', $trustGlobalDesc

# Fix trust titles
$content = $content -replace 'Transacciones Seguras', $trustSecureTitle
$content = $content -replace 'Transações Seguras', $trustSecureTitle
$content = $content -replace 'Entrega Instantánea</div>', "$trustDeliveryTitle</div>"
$content = $content -replace 'Entrega Instantânea</div>', "$trustDeliveryTitle</div>"
$content = $content -replace 'Garantía de Calidad', $trustQualityTitle
$content = $content -replace 'Garantia de Qualidade', $trustQualityTitle
$content = $content -replace 'Acceso Global', $trustGlobalTitle
$content = $content -replace 'Acesso Global', $trustGlobalTitle

# ===== FIX 19: Footer =====
$content = $content -replace '© 2026 AutoMoney Tienda Digital · 全球数字交付 · 76 个产品', $footerText
$content = $content -replace '© 2026 AutoMoney Loja Digital · 全球数字交付 · 76 个产品', $footerText
$content = $content -replace '<p class="addr">USDT \(TRC-20\): TRnz5Pi8R3hjCbBjnDuZo7ZvR57euo2q8Z</p>', "<p class=`"addr`">$footerAddr</p>"

# Footer links
$content = $content -replace '<a href=/es/tools/">Herramientas</a>', '<a href="/'"$Lang/tools/"'">'"$footerTools"'</a>'
$content = $content -replace '<a href=/pt/tools/">Ferramentas</a>', '<a href="/'"$Lang/tools/"'">'"$footerTools"'</a>'
$content = $content -replace '<a href=/es/blog/">Blog</a>', '<a href="/'"$Lang/blog/"'">'"$footerBlog"'</a>'
$content = $content -replace '<a href=/pt/blog/">Blog</a>', '<a href="/'"$Lang/blog/"'">'"$footerBlog"'</a>'
$content = $content -replace '<a href=/es/affiliate.html>Afiliados</a>', '<a href="/'"$Lang/affiliate.html"'">'"$footerAffiliate"'</a>'
$content = $content -replace '<a href=/pt/affiliate.html>Afiliados</a>', '<a href="/'"$Lang/affiliate.html"'">'"$footerAffiliate"'</a>'
$content = $content -replace 'Sobre Nosotros</a>', "$footerAbout</a>"
$content = $content -replace 'Sobre Nós</a>', "$footerAbout</a>"

# About link
$content = $content -replace '<a href="/es/about.html">', '<a href="/'"$Lang/about.html"'"">'
$content = $content -replace '<a href="/pt/about.html">', '<a href="/'"$Lang/about.html"'"">'

# ===== FIX 20: JS share-count ID =====
$content = $content -replace "shareCount-zh", $shareId

# ===== FIX 21: OG title =====
$content = $content -replace '<meta property="og:title" content="AutoMoney Tienda Digital · Herramientas Gratuitas">', '<meta property="og:title" content="'"$siteName"'"">'
$content = $content -replace '<meta property="og:title" content="AutoMoney Loja Digital · Ferramentas Grátis">', '<meta property="og:title" content="'"$siteName"'"">'
$content = $content -replace '<meta name="twitter:title" content="AutoMoney Tienda Digital · Herramientas Gratuitas">', '<meta name="twitter:title" content="'"$siteName"'"">'
$content = $content -replace '<meta name="twitter:title" content="AutoMoney Loja Digital · Ferramentas Grátis">', '<meta name="twitter:title" content="'"$siteName"'"">'

Write-Output "Fixed $file"
Set-Content -LiteralPath $file -Value $content -Encoding UTF8
