# GitHub Desktop 同步教程

## 做什么
把 10 个新工具从你的电脑同步到 GitHub 服务器，然后 CI/CD 会自动部署到网站。

## 步骤（共 4 步，2 分钟）

---

### 第 1 步：打开 GitHub Desktop
双击桌面上的 GitHub Desktop 图标。

### 第 2 步：选择仓库
在左上角找 `Current Repository` 下拉菜单，选择 `经营管理`。

### 第 3 步：Push 到 GitHub

**方法一（推荐）：**
看顶部中间有个按钮，原本显示 `Fetch origin`。点一下它，它会检查是否有新的提交可以推送。
如果有待推送的内容，按钮会变成 `Push origin`（带数字），再点一下。

**方法二：**
看底部左下方，有个 `1 unpublished commit`（或类似字样）。
点它旁边的 `Push origin` 按钮。

### 第 4 步：验证
等进度条跑完。几秒到几十秒。

---

## 完成后会发生什么
1. 你的 GitHub 仓库会收到这个 commit
2. GitHub Actions（CI/CD）会自动触发
3. 大约 5-10 分钟后，10 个新工具就会出现在：
   `https://agentpro.pages.dev/tools/`

## 可选：确认 CI/CD 正在运行
如果你有梯子，可以打开浏览器访问：
`https://github.com/maggie19850205-ctrl/usdt-verifier/actions`
应该能看到一个黄色圆点（正在运行），跑完后变成绿色对勾。

## 遇到问题？
如果按钮是灰色的或提示 `No local changes`，说明 commit 可能没有在我的环境成功保存。
告诉我按钮上写了什么字就行。
