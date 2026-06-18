# 云端自动运行设置
# 运行前请先：打开 VPN（中国需要）

# 1. 创建 GitHub 仓库（只需一次）
#    - 打开 https://github.com/new
#    - 仓库名: automoney-store（或任意名称）
#    - 不要勾选任何初始化选项
#    - 点击 "Create repository"

# 2. 运行以下命令推送代码
$repo = "https://github.com/YOUR_USERNAME/automoney-store.git"
git remote add origin $repo
git push -u origin master

# 3. 创建 Cloudflare API Token
#    - 打开 https://dash.cloudflare.com/profile/api-tokens
#    - 点击 "Create Token" → "Create Custom Token"
#    - 权限: Account > Cloudflare Pages > Edit
#    - 创建后复制 token 值

# 4. 在 GitHub 仓库设置 Secret
#    - 打开 https://github.com/YOUR_USERNAME/automoney-store/settings/secrets/actions
#    - 点击 "New repository secret"
#    - Name: CLOUDFLARE_API_TOKEN
#    - Value: 粘贴第3步的 token

# 5. 启用 GitHub Actions
#    - 在 https://github.com/YOUR_USERNAME/automoney-store/actions
#    - 会看到 "Daily Auto-Run Pipeline"
#    - 点击 "Enable workflow"
#    - 点 "Run workflow" → "Run workflow" 手动测试一次

# 6. 验证
#    - Action 运行成功后，访问 https://automoney-store.pages.dev
#    - 应该看到更新后的内容

Write-Output "========================"
Write-Output "Setup complete!"
Write-Output "After step 2, run:"
Write-Output "  git push -u origin master"
Write-Output "========================"
