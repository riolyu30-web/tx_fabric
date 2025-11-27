# 千千纺织 - 优质面料独立站

基于 Next.js 14 构建的现代化面料电商网站，提供优质的面料展示和购物体验。

## 项目特点

- ✨ 现代化的 UI/UX 设计，参考 Blackbird Fabrics
- 🎨 完整的商品展示系统（列表、详情、筛选、排序）
- 🛒 购物车功能（Zustand 状态管理 + localStorage 持久化）
- 📱 响应式设计，完美适配移动端、平板和桌面
- 🚀 Next.js 14 App Router，性能优化
- 💅 Tailwind CSS + shadcn/ui 组件库
- 🔍 搜索和多维度筛选功能
- 🎯 SEO 优化

## 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **UI组件**: shadcn/ui
- **状态管理**: Zustand
- **图标**: Lucide React
- **图片优化**: Next.js Image
- **后端服务**: Supabase（可选）

## 项目结构

```
tx-fabric/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 全局布局
│   ├── page.tsx           # 首页
│   ├── products/          # 商品相关页面
│   ├── cart/              # 购物车页面
│   └── about/             # 关于我们页面
├── components/            # 组件
│   ├── layout/           # 布局组件
│   ├── product/          # 商品组件
│   ├── home/             # 首页组件
│   ├── cart/             # 购物车组件
│   └── ui/               # 基础 UI 组件
├── lib/                   # 工具库
│   ├── store/            # Zustand 状态管理
│   ├── utils.ts          # 工具函数
│   └── supabase.ts       # Supabase 客户端
├── data/                  # 模拟数据
│   ├── products.json     # 商品数据（40个商品）
│   ├── categories.json   # 分类数据
│   └── banners.json      # Banner 数据
└── types/                 # TypeScript 类型定义
    └── index.ts
```

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看网站。

### 3. 构建生产版本

```bash
npm run build
npm start
```

## 核心功能

### 首页
- Hero 轮播图（自动播放 + 手动控制）
- 分类快捷入口（8个分类）
- 精选商品展示
- 新品推荐
- 品牌介绍
- 促销商品

### 商品列表
- 商品网格展示（2/3/4列响应式布局）
- 左侧筛选器（分类、面料类型、成分、标签）
- 排序功能（最新、价格、名称）
- 移动端筛选抽屉
- 双图 hover 切换效果

### 商品详情
- 商品图片画廊（主图 + 缩略图）
- 详细规格信息
- 数量选择器（0.5米为单位）
- 加入购物车功能
- 同类商品推荐

### 购物车
- 购物车页面（完整的订单摘要）
- 侧边栏抽屉（快速查看和结算）
- 数量调整、删除商品
- 价格计算（含运费）
- localStorage 持久化

### 其他功能
- 大型下拉菜单（Mega Menu）
- 移动端导航抽屉
- 搜索功能
- 标签徽章（New、Sale、Organic等）
- 响应式布局

## 数据说明

项目使用 JSON 文件模拟数据：

- **商品数据** (`data/products.json`): 40个商品，包含各种面料类型
- **分类数据** (`data/categories.json`): 8个分类
- **Banner数据** (`data/banners.json`): 3个轮播图

您可以根据需要修改这些文件来自定义数据。

## 样式自定义

### 品牌颜色

在 `tailwind.config.ts` 中修改品牌颜色：

```typescript
colors: {
  brand: {
    brown: "#8B5A3C", // 主品牌色
  },
}
```

### 全局样式

在 `app/globals.css` 中修改全局样式变量。

## 部署

### Vercel（推荐）

1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. 自动部署

### 其他平台

项目支持所有支持 Next.js 的平台：
- Netlify
- AWS Amplify
- 自建服务器（需要 Node.js 18+）

## 扩展功能

### 集成 Supabase

1. 创建 Supabase 项目
2. 添加环境变量到 `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. 修改 `lib/supabase.ts` 中的配置

### 添加支付功能

可以集成：
- Stripe
- PayPal
- Square

### 添加用户认证

可以使用：
- NextAuth.js
- Supabase Auth
- Auth0

## 浏览器支持

- Chrome（最新版）
- Firefox（最新版）
- Safari（最新版）
- Edge（最新版）

## 许可证

MIT License

## 支持

如有问题，请联系：hello@qianqiantextile.com

---

**千千纺织** - 让创作从优质面料开始

