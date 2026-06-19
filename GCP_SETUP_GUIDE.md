# 创建 Google Cloud 服务账号并启用 Indexing API

## 前置条件
- 一个 Google 账号（你已经有了，因为你有 GSC）

---

## 第 1 步：进入 Google Cloud Console

打开：https://console.cloud.google.com/

---

## 第 2 步：创建新项目

1. 点击顶部蓝色导航栏旁边的项目下拉菜单（可能在左边，显示 "My First Project" 或类似名称）
2. 点击 **"新建项目"**（New Project）
3. 项目名称填写：`auto-money-indexing`（随便填）
4. 位置不用管，点击 **"创建"**

---

## 第 3 步：启用 Indexing API

1. 左上角三横线菜单 → **"API 和服务"** → **"库"**（API & Services → Library）
2. 搜索框输入：**Indexing API**
3. 点击第一个结果 **"Indexing API"**
4. 点击 **"启用"**（Enable）
5. 等几秒钟，页面刷新后你会看到 "API 已启用"

---

## 第 4 步：创建服务账号并下载 JSON key

1. 左上角三横线菜单 → **"IAM 和管理"** → **"服务账号"**（IAM & Admin → Service Accounts）
2. 点击顶部 **"+ 创建服务账号"**（+ Create Service Account）
3. 填写：
   - **服务账号名称**：`indexing-submitter`
   - **服务账号 ID**：会自动生成
   - **说明**：随便填
4. 点击 **"创建并继续"**
5. 角色一栏：搜索 **"Indexing"** → 选择 **"Indexing Admin"**（如果没有，选 **"Owner"**）
6. 点击 **"继续"**
7. 第三页不用填，直接点击 **"完成"**
8. 回到服务账号列表，找到你刚创建的账号
9. 点击右侧操作列的 **三个点**（⋮）→ **"管理密钥"**（Manage Keys）
10. 点击 **"添加密钥"** → **"创建新密钥"**
11. 密钥类型选 **JSON**
12. 点击 **"创建"** —— 浏览器会自动下载一个 `.json` 文件
13. **把这个 json 文件保存好**，文件名类似 `auto-money-indexing-xxx.json`

---

## 第 5 步：把服务账号添加到 Google Search Console

1. 打开刚下载的 JSON 文件（用记事本或任何文本编辑器）
2. 找到这一行：`"client_email": "indexing-submitter@xxxxx.iam.gserviceaccount.com"`
3. 复制整个邮箱地址（全部复制）
4. 打开 Google Search Console：https://search.google.com/search-console/
5. 确保当前选中的是你的 `https://automoney-store.pages.dev` 属性
6. 左侧菜单 → **"设置"**（Settings）
7. 找到 **"用户和权限"**（Users and permissions）
8. 点击 **"添加用户"**（Add User）
9. 粘贴你刚才复制的邮箱地址
10. 权限级别选：**"所有者"（Owner）**—— 注意必须是 Owner，不是 Full User
11. 点击 **"添加"**

---

## 第 6 步：把 JSON 文件放到项目里

把下载的 `.json` 文件放到这个目录：

```
D:\github-20260612\经营管理\gsc-service-account.json
```

放好后告诉我一声，我立刻启动批量提交脚本，每天 200 个 URL，7 天内把全部 1538 个页面推送到 Google 优先爬取队列。

---

## 总计时间：约 5-10 分钟
