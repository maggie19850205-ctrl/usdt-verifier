param(
  [string]$SiteUrl = "https://automoney-store.pages.dev",
  [string]$OutputDir = (Join-Path (Split-Path -Parent $PSScriptRoot) "output"),
  [string]$SitemapFile = (Join-Path (Split-Path -Parent $PSScriptRoot) "output\sitemap.xml")
)

$ErrorActionPreference = "Stop"

# Step 1: Generate or load IndexNow key
$keyFile = Join-Path $OutputDir "indexnow-key.txt"
if (Test-Path $keyFile) {
  $key = Get-Content $keyFile -Raw -Encoding UTF8 | ForEach-Object { $_.Trim() }
  Write-Output "[IndexNow] Loaded existing key: $key"
} else {
  $key = -join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | ForEach-Object { [char]$_ })
  Set-Content -Path $keyFile -Value $key -Encoding UTF8 -NoNewline
  Write-Output "[IndexNow] Generated new key: $key"
}

# Step 2: Create the key verification file (must be at /{key}.txt)
$verifyFile = Join-Path $OutputDir "$key.txt"
if (-not (Test-Path $verifyFile)) {
  Set-Content -Path $verifyFile -Value $key -Encoding UTF8 -NoNewline
  Write-Output "[IndexNow] Created verification file: $key.txt"
}

# Step 3: Extract all URLs from sitemap
Write-Output "[IndexNow] Reading sitemap: $SitemapFile"
$xml = [xml](Get-Content $SitemapFile -Raw -Encoding UTF8)
$urls = $xml.urlset.url | ForEach-Object { $_.loc }
Write-Output "[IndexNow] Found $($urls.Count) URLs"

# Step 4: Submit via IndexNow API (batch of 10,000 max)
$body = @{
  host = ([System.Uri]$SiteUrl).Host
  key = $key
  keyLocation = "$SiteUrl/$key.txt"
  urlList = @($urls)
} | ConvertTo-Json

$apiUrl = "https://api.indexnow.org/indexnow"

try {
  Write-Output "[IndexNow] Submitting $($urls.Count) URLs to $apiUrl ..."
  $response = Invoke-RestMethod -Uri $apiUrl -Method Post -Body $body -ContentType "application/json" -ErrorAction Stop
  Write-Output "[IndexNow] Success! Response: $response"
} catch {
  $statusCode = $_.Exception.Response.StatusCode.value__
  if ($statusCode -eq 200 -or $null -eq $statusCode) {
    Write-Output "[IndexNow] Submitted (HTTP 200 - accepted)"
  } else {
    Write-Output "[IndexNow] HTTP $statusCode : $($_.Exception.Message)"
    # Try alternative endpoint
    try {
      Write-Output "[IndexNow] Retrying via Bing endpoint..."
      $bingUrl = "https://www.bing.com/indexnow"
      $response2 = Invoke-RestMethod -Uri $bingUrl -Method Post -Body $body -ContentType "application/json" -ErrorAction Stop
      Write-Output "[IndexNow] Bing submission success! $response2"
    } catch {
      Write-Output "[IndexNow] Bing also failed: $($_.Exception.Message)"
    }
  }
}

# Step 5: Also submit sitemap URL directly to Bing (alternative)
try {
  $sitemapSubmit = "https://www.bing.com/ping?sitemap=$SiteUrl/sitemap.xml"
  Invoke-RestMethod -Uri $sitemapSubmit -Method Get -ErrorAction Stop | Out-Null
  Write-Output "[IndexNow] Bing sitemap ping submitted"
} catch {
  Write-Output "[IndexNow] Bing sitemap ping failed (non-critical): $($_.Exception.Message)"
}

Write-Output "[IndexNow] Done! Key file deployed at /$key.txt"
