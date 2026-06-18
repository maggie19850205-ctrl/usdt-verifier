$outDir = "D:\github-20260612\经营管理\output"

$enReplace = @{
    "AutoMoney 数字产品商店" = "AutoMoney Digital Store"
    "Premium数字产品 · 34+免费工具 · USDT支付 · 即时交付" = "Premium Digital Products · 34+ Free Tools · USDT Payment · Instant Delivery"
    "76+ 个产品" = "76+ Products"
    "即时交付" = "Instant Delivery"
    "USDT (TRC-20)" = "USDT (TRC-20)"
    "无需注册" = "No Registration"
    "免费在线工具" = "Free Online Tools"
    "34个免费工具 · 无需注册 · 无广告" = "34 Free Tools · No Registration · No Ads"
    "首页" = "Home"
    "免费工具" = "Free Tools"
    "博客教程" = "Blog"
    "商店" = "Store"
    "推广联盟" = "Affiliate"
    "查看全部工具 →" = "View All Tools →"
    "安全交易" = "Secure Transactions"
    "区块链加密，无第三方干预" = "Blockchain-encrypted, no intermediaries"
    "自动验证到账即下载" = "Auto-verified, instant download"
    "质量保证" = "Quality Guarantee"
    "不满意7天内全额退款" = "7-day full refund if not satisfied"
    "全球可用" = "Global Access"
    "无需银行账户，全球用户均可购买" = "No bank account needed, buy from anywhere"
    "© 2026 AutoMoney 数字产品商店" = "© 2026 AutoMoney Digital Store"
    "全球数字交付 · 76 个产品" = "Global Digital Delivery · 76 Products"
    "免费工具 ·" = "Free Tools ·"
    "博客教程 ·" = "Blog ·"
    "推广联盟 ·" = "Affiliate ·"
    "关于我们 ·" = "About ·"
    "Sitemap" = "Sitemap"
    "关于我们" = "About Us"
    "📰 Content & Blogging📰" = "📰 Content & Blogging"
    "🎨 Design & Templates 🎨" = "🎨 Design & Templates"
    "📚 Publishing📚" = "📚 Publishing"
    "👕 Print on Demand👕" = "👕 Print on Demand"
    "🔧 SaaS & Tools🔧" = "🔧 SaaS & Tools"
    "🧩 Apps & Extensions🧩" = "🧩 Apps & Extensions"
    "查看全部工具 →" = "View All Tools →"
}

$esReplace = @{
    "AutoMoney 数字产品商店" = "AutoMoney Tienda Digital"
    "Premium数字产品 · 34+免费工具 · USDT支付 · 即时交付" = "Productos Digitales Premium · 34+ Herramientas · Pago USDT · Entrega Instantánea"
    "76+ 个产品" = "76+ Productos"
    "即时交付" = "Entrega Instantánea"
    "USDT (TRC-20)" = "USDT (TRC-20)"
    "无需注册" = "Sin Registro"
    "免费在线工具" = "Herramientas Gratuitas"
    "34个免费工具 · 无需注册 · 无广告" = "34 Herramientas Gratis · Sin Registro · Sin Anuncios"
    "首页" = "Inicio"
    "免费工具" = "Herramientas"
    "博客教程" = "Blog"
    "商店" = "Tienda"
    "推广联盟" = "Afiliados"
    "查看全部工具 →" = "Ver Todas las Herramientas →"
    "安全交易" = "Transacciones Seguras"
    "区块链加密，无第三方干预" = "Encriptado con blockchain, sin intermediarios"
    "自动验证到账即下载" = "Verificación automática, descarga inmediata"
    "质量保证" = "Garantía de Calidad"
    "不满意7天内全额退款" = "Reembolso completo en 7 días"
    "全球可用" = "Acceso Global"
    "无需银行账户，全球用户均可购买" = "Sin banco necesario, compra desde cualquier lugar"
    "© 2026 AutoMoney 数字产品商店" = "© 2026 AutoMoney Tienda Digital"
    "全球数字交付 · 76 个产品" = "Entrega Global · 76 Productos"
    "免费工具 ·" = "Herramientas ·"
    "博客教程 ·" = "Blog ·"
    "推广联盟 ·" = "Afiliados ·"
    "关于我们 ·" = "Sobre Nosotros ·"
    "Sitemap" = "Mapa del Sitio"
    "关于我们" = "Sobre Nosotros"
    "查看全部工具 →" = "Ver Todas las Herramientas →"
}

$ptReplace = @{
    "AutoMoney 数字产品商店" = "AutoMoney Loja Digital"
    "Premium数字产品 · 34+免费工具 · USDT支付 · 即时交付" = "Produtos Digitais Premium · 34+ Ferramentas · Pagamento USDT · Entrega Instantânea"
    "76+ 个产品" = "76+ Produtos"
    "即时交付" = "Entrega Instantânea"
    "USDT (TRC-20)" = "USDT (TRC-20)"
    "无需注册" = "Sem Registro"
    "免费在线工具" = "Ferramentas Grátis"
    "34个免费工具 · 无需注册 · 无广告" = "34 Ferramentas Grátis · Sem Registro · Sem Anúncios"
    "首页" = "Início"
    "免费工具" = "Ferramentas"
    "博客教程" = "Blog"
    "商店" = "Loja"
    "推广联盟" = "Afiliados"
    "查看全部工具 →" = "Ver Todas as Ferramentas →"
    "安全交易" = "Transações Seguras"
    "区块链加密，无第三方干预" = "Criptografado em blockchain, sem intermediários"
    "自动验证到账即下载" = "Verificação automática, download imediato"
    "质量保证" = "Garantia de Qualidade"
    "不满意7天内全额退款" = "Reembolso total em 7 dias"
    "全球可用" = "Acesso Global"
    "无需银行账户，全球用户均可购买" = "Sem necessidade de banco, compre de qualquer lugar"
    "© 2026 AutoMoney 数字产品商店" = "© 2026 AutoMoney Loja Digital"
    "全球数字交付 · 76 个产品" = "Entrega Global · 76 Produtos"
    "免费工具 ·" = "Ferramentas ·"
    "博客教程 ·" = "Blog ·"
    "推广联盟 ·" = "Afiliados ·"
    "关于我们 ·" = "Sobre Nós ·"
    "Sitemap" = "Mapa do Site"
    "关于我们" = "Sobre Nós"
    "查看全部工具 →" = "Ver Todas as Ferramentas →"
}

$langs = @{ "en" = $enReplace; "es" = $esReplace; "pt" = $ptReplace }

foreach ($langCode in $langs.Keys) {
    $file = "$outDir\$langCode\index.html"
    if (-not (Test-Path $file)) { Write-Output "MISSING: $file"; continue }
    
    $content = Get-Content -Path $file -Encoding UTF8 -Raw
    $orig = $content
    
    foreach ($zh in $langs[$langCode].Keys) {
        $escaped = [regex]::Escape($zh)
        $content = $content -replace $escaped, $langs[$langCode][$zh]
    }
    
    if ($content -ne $orig) {
        [System.IO.File]::WriteAllText($file, $content, (New-Object System.Text.UTF8Encoding($false)))
        Write-Output "$langCode/index.html: translated"
    } else {
        Write-Output "$langCode/index.html: no changes"
    }
}

# Also fix ES/PT product page blog links (the "Learn More in Our Blog" section)
# For ES, replace with Spanish; for PT with Portuguese
foreach ($langCode in @("es", "pt")) {
    $files = Get-ChildItem -Path "$outDir\$langCode\pages" -Recurse -Filter "*.html" -File
    $fixed = 0
    $headingText = if ($langCode -eq "es") { "Aprende más en nuestro blog" } else { "Saiba mais no nosso blog" }
    $viewAllText = if ($langCode -eq "es") { "Ver todos los artículos →" } else { "Ver todos os artigos →" }
    
    foreach ($file in $files) {
        $content = [System.Text.Encoding]::UTF8.GetString([System.IO.File]::ReadAllBytes($file.FullName))
        $origContent = $content
        $content = $content -replace "Learn More in Our Blog", $headingText
        $content = $content -replace "View All Articles →", $viewAllText
        if ($content -ne $origContent) {
            [System.IO.File]::WriteAllBytes($file.FullName, [System.Text.Encoding]::UTF8.GetBytes($content))
            $fixed++
        }
    }
    Write-Output "$langCode product pages: fixed '$headingText' heading in $fixed files"
}

Write-Output "Done"
