param(
  [string]$Action = "all"
)

$root = Split-Path -Parent $PSScriptRoot
$output = Join-Path $root "output"
$config = @{
  SiteUrl = "https://automoney-store.pages.dev"
  OutputDir = $output
  UsdtAddress = "TRnz5Pi8R3hjCbBjnDuZo7ZvR57euo2q8Z"
  LangCodes = @("zh","en","es","pt")
}

function Log($msg) {
  $time = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
  Write-Output "[$time] $msg"
}

function Step($name, $script) {
  Log "Starting: $name"
  try {
    & $script
    Log "Completed: $name"
  } catch {
    Log "FAILED: $name - $($_.Exception.Message)"
  }
}

switch ($Action) {
  "posts" {
    Step "Generate trending blog posts" {
      node (Join-Path $PSScriptRoot "generate-trending-posts.js")
    }
  }
  "products" {
    Step "Generate trending products" {
      node (Join-Path $PSScriptRoot "trending-products.js")
    }
  }
  "i18n" {
    Step "Generate multi-language pages" {
      node (Join-Path $PSScriptRoot "generate-multi.js")
    }
  }
  "fix" {
    Step "Fix purchase flow" {
      node (Join-Path $PSScriptRoot "fix-purchase-flow.js")
    }
  }
  "sitemap" {
    Step "Regenerate sitemap" {
      node (Join-Path $PSScriptRoot ".." "generate-sitemap.js")
    }
  }
  "deploy" {
    Step "Deploy to Cloudflare Pages" {
      Set-Location -LiteralPath $root
      npx wrangler pages deploy $output --branch main --commit-dirty=true 2>&1
    }
  }
  "all" {
    Log "=== Daily Auto-Run Pipeline ==="
    Step "1. Generate blog posts" { node (Join-Path $PSScriptRoot "generate-trending-posts.js") }
    Step "2. Generate products" { node (Join-Path $PSScriptRoot "trending-products.js") }
    Step "3. Multi-language" { node (Join-Path $PSScriptRoot "generate-multi.js") }
    Step "4. Fix purchase flow" { node (Join-Path $PSScriptRoot "fix-purchase-flow.js") }
    Step "5. Sitemap" { node (Join-Path $root "generate-sitemap.js") }
    Step "6. Deploy" {
      Set-Location -LiteralPath $root
      npx wrangler pages deploy $output --branch main --commit-dirty=true 2>&1
    }
    Log "=== Pipeline Complete ==="
  }
  default {
    Write-Output "Usage: .\daily-autorun.ps1 [-Action all|posts|products|i18n|fix|sitemap|deploy]"
  }
}
