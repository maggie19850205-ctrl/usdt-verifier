# GitHub 仓库创建教程：geo-readiness-checker

## 需要推送的本地文件位置

```
D:\github-20260612\经营管理\output\github-geo-checker\
  ├── README.md
  └── geo-checker.py
```

## 第一步：在 GitHub 网页上创建空仓库

1. 打开浏览器 → https://github.com/login
2. 登录账号：`maggie19850205-ctrl`
3. 登录后，点击右上角你的头像旁边的 "+" 号 → 选择 **"New repository"**
4. 填写以下内容：

   | 字段 | 填写内容 |
   |------|---------|
   | Repository name | `geo-readiness-checker` |
   | Description | `GEO Readiness Checker - Test if your content is optimized for Perplexity, ChatGPT Search, Gemini` |
   | Public / Private | 选 **Public** |
   | Add a README file | **不要勾选** |
   | Add .gitignore | **不要勾选** |
   | Choose a license | **不要勾选** |

5. 点击页面底部的绿色按钮 **"Create repository"**

## 第二步：推送文件（两种方式选一种）

### 方式 A：GitHub Desktop（推荐，不需要翻墙）

1. 下载安装 https://desktop.github.com/
2. 安装完成后打开 GitHub Desktop
3. 登录你的 GitHub 账号（File → Options → Accounts → Sign in）
4. 点击 **File → Clone repository**
5. 在 GitHub.com 标签下找到 `maggie19850205-ctrl/geo-readiness-checker`
6. Local path 选择：`D:\github-20260612\geo-readiness-checker`
7. 点击 **Clone**
8. 打开文件资源管理器，把以下文件**复制粘贴**到刚克隆的 `D:\github-20260612\geo-readiness-checker\` 文件夹：

   ```
   复制来源：D:\github-20260612\经营管理\output\github-geo-checker\
   复制这两个文件：
     ├── README.md
     └── geo-checker.py
   ```

9. 回到 GitHub Desktop，你会看到 Changes 标签页里有新增的文件
10. 在左下角写 commit 信息：`Initial commit: GEO Readiness Checker tool`
11. 点击蓝色按钮 **"Commit to main"**
12. 点击顶部的 **"Push origin"**（推送按钮）

### 方式 B：命令行（需要 VPN 翻墙）

```
# 克隆空仓库到本地
git clone https://github.com/maggie19850205-ctrl/geo-readiness-checker.git C:\github\geo-readiness-checker

# 进入仓库目录
cd C:\github\geo-readiness-checker

# 把文件复制过来
copy "D:\github-20260612\经营管理\output\github-geo-checker\README.md" .
copy "D:\github-20260612\经营管理\output\github-geo-checker\geo-checker.py" .

# 提交并推送
git add .
git commit -m "Initial commit: GEO Readiness Checker tool"
git push origin main
```

## 第三步：验证

推送成功后，浏览器访问：
```
https://github.com/maggie19850205-ctrl/geo-readiness-checker
```

你应该能看到：
- README.md 文件内容呈现在仓库主页
- geo-checker.py 文件

## 另一个仓库：usdt-verifier

同样的步骤再操作一次，文件来源不同：

### 创建第二个仓库
1. New repository 名称填：`usdt-verifier`
2. 其他设置同上（Public，不勾选任何选项）

### 推送的文件来源
```
复制来源：D:\github-20260612\经营管理\output\github-usdt-verifier\
复制这两个文件：
  ├── README.md
  └── verify-usdt.sh
```

### 推送后用 GitHub Pages 部署
usdt-verifier 仓库创建好后，还可以直接当 GitHub Pages 用：

1. 进入 `usdt-verifier` 仓库 → Settings → Pages
2. Source 选 "Deploy from a branch"
3. Branch 选 `main`，文件夹选 `/ (root)`
4. 点击 Save
5. 等 2 分钟后访问：`https://maggie19850205-ctrl.github.io/usdt-verifier/`
