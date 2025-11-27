# 数据管理总览

本文档汇总了项目中所有数据管理相关的工具和方案。

## 📦 管理方案列表

### 1. 产品数据同步
**用途：** 从 CSV 文件同步产品价格和信息到网站数据

**命令：**
```bash
# 预览变更
node scripts/sync-products.js --dry-run

# 执行同步
node scripts/sync-products.js
```

**文档：**
- 📖 [产品数据同步指南](./docs/产品数据同步指南.md)（详细文档）
- 📄 [产品数据同步-快速参考](./产品数据同步-快速参考.md)（快速查阅）

---

### 2. 产品图片管理
**用途：** 管理产品图片，同步本地图片到 products.json

**命令：**
```bash
# 查看产品图片使用情况
node scripts/manage-images.js list

# 同步本地图片到数据文件
node scripts/manage-images.js sync

# 批量更新图片链接为本地路径
node scripts/batch-update-images.js
```

**文档：**
- 📖 [图片管理指南](./docs/图片管理指南.md)

---

### 3. 价格配置
**用途：** 修改利润率、人工费等价格参数

**配置文件：** `lib/config/pricing.ts`

**可配置项：**
- `DEFAULT_PROFIT_MARGIN`：默认利润率（10% = 0.1）
- `DEFAULT_SAMPLE_LABOR_FEE`：版布价人工费（默认2元）
- `STANDARD_HC`：足米基准空差值（默认100）

**文档：**
- 📖 [价格计算说明](./docs/价格计算说明.md)

---

## 🎯 常见操作场景

### 场景1：调整产品价格

1. 打开 `产品数据表.csv`
2. 修改对应产品的价格列
3. 运行预览：`node scripts/sync-products.js --dry-run`
4. 确认无误后运行：`node scripts/sync-products.js`
5. 刷新网站查看更新

### 场景2：新增产品

1. 在 `产品数据表.csv` 末尾添加新产品信息
2. 运行同步脚本：`node scripts/sync-products.js`
3. 上传产品图片到 `public/images/products/编号_1.jpg`
4. 运行图片同步：`node scripts/manage-images.js sync`
5. 访问网站查看新产品

### 场景3：批量调整利润率

1. 打开 `lib/config/pricing.ts`
2. 修改 `DEFAULT_PROFIT_MARGIN` 值（如：0.15 = 15%）
3. 保存文件
4. 刷新网站，所有价格自动重新计算

### 场景4：更换产品图片

1. 准备新图片，命名为 `编号_序号.jpg`（如：`801_1.jpg`）
2. 放入 `public/images/products/` 目录
3. 运行：`node scripts/manage-images.js sync`
4. 刷新网站查看新图片

---

## 📂 数据文件结构

```
tx-fabric/
├── 产品数据表.csv                    # 产品主数据源（CSV格式）
├── data/
│   ├── products.json                # 产品数据（网站使用）
│   ├── categories.json              # 分类数据
│   └── banners.json                 # 轮播图数据
├── public/images/products/          # 产品图片目录
│   ├── 801_1.jpg
│   ├── 802_1.jpg
│   └── ...
├── lib/config/pricing.ts            # 价格配置
└── scripts/                         # 管理脚本
    ├── sync-products.js             # 产品数据同步
    ├── manage-images.js             # 图片管理
    └── batch-update-images.js       # 批量更新图片
```

---

## 🔄 数据流向

```
产品数据表.csv
      ↓ (sync-products.js)
data/products.json ←→ 网站显示
      ↑ (manage-images.js)
public/images/products/

lib/config/pricing.ts → 价格计算 → 网站显示
```

---

## 📊 产品数据字段说明

### CSV 文件字段（产品数据表.csv）

| 字段 | 说明 | 示例 | 备注 |
|------|------|------|------|
| 编号 | 产品编号 | 801# | 必填，唯一标识 |
| 品名名称 | 产品名称 | 涤天丝 | 必填 |
| 幅宽(cm) | 布料宽度 | 150 | 单位：厘米 |
| 克重(g) | 平方米克重 | 55 | 单位：克/平方米 |
| 成份 | 面料成分 | 90%天丝、10%涤 | 格式：百分比%材料 |
| 白色(元) | 白色成本价 | 4.1 | 成本价，非显示价 |
| 彩色(元) | 彩色成本价 | 4.4 | 成本价，非显示价 |
| 空差 | 空差值 | 91 | 用于足米价计算 |
| 版布价 | 版布成本价 | 7 | 成本价，非显示价 |

### JSON 数据字段（data/products.json）

| 字段 | 类型 | 说明 | 来源 |
|------|------|------|------|
| id | string | 产品ID | 自动生成 |
| productNo | string | 产品编号 | CSV同步 |
| name | string | 产品名称 | CSV同步 |
| whitePrice | number | 白色成本价 | CSV同步 |
| colorPrice | number | 彩色成本价 | CSV同步 |
| samplePrice | number | 版布成本价 | CSV同步 |
| hc | number | 空差 | CSV同步 |
| width | number | 幅宽 | CSV同步 |
| weight | number | 克重 | CSV同步 |
| content | array | 成分数组 | CSV解析 |
| images | array | 图片数组 | 图片管理脚本 |
| category | string | 分类ID | 根据编号自动分类 |
| inStock | boolean | 库存状态 | 手动管理 |
| featured | boolean | 是否精选 | 手动管理 |
| tags | array | 标签数组 | 手动管理 |

---

## ⚠️ 重要提示

### 数据备份
- 所有同步操作都会自动备份原数据文件（`.backup` 后缀）
- 建议定期手动备份整个 `data/` 目录
- 可使用 Git 版本控制管理数据变更历史

### CSV 文件注意事项
- **编码：** 使用 UTF-8 编码保存
- **格式：** Excel 保存时选择 "UTF-8 CSV"
- **编号：** 产品编号必须唯一，格式为 `xxx#`
- **价格：** 不要包含货币符号（¥、元）
- **小数点：** 使用 `.` 而不是 `,`

### 价格说明
- CSV 中存储的是**成本价**
- 网站显示的是**计算后的显示价**
- 显示价 = 成本价 × (100 / 空差) × (1 + 利润率)
- 版布价 = 版布成本价 + 人工费

---

## 🔧 故障排查

### 问题：同步后价格没有变化
**解决方法：**
1. 检查 CSV 文件是否保存
2. 确认运行的是 `node scripts/sync-products.js`（不是 `--dry-run`）
3. 清除浏览器缓存后刷新页面
4. 检查 `data/products.json.backup` 确认是否成功更新

### 问题：新产品不显示
**可能原因：**
1. 产品编号格式不正确（必须是 `xxx#`）
2. 缺少产品图片
3. 分类ID不匹配

**解决方法：**
1. 检查产品编号格式
2. 上传对应的产品图片
3. 运行 `node scripts/manage-images.js sync`

### 问题：图片不显示
**解决方法：**
1. 确认图片文件名格式：`编号_序号.jpg`（如：`801_1.jpg`）
2. 确认图片在 `public/images/products/` 目录
3. 运行 `node scripts/manage-images.js sync` 同步图片路径
4. 清除浏览器缓存

---

## 📚 相关文档索引

- 📖 [产品数据同步指南](./docs/产品数据同步指南.md) - CSV数据同步详细说明
- 📖 [图片管理指南](./docs/图片管理指南.md) - 图片上传和管理方法
- 📖 [价格计算说明](./docs/价格计算说明.md) - 价格计算公式和配置
- 📖 [前端优化](./docs/前端优化.md) - 功能需求和实现状态
- 📄 [产品数据同步-快速参考](./产品数据同步-快速参考.md) - 快速操作指南

---

## 💡 技巧和最佳实践

### 1. 使用预览模式
执行同步前先运行 `--dry-run` 查看变更，避免误操作：
```bash
node scripts/sync-products.js --dry-run
```

### 2. 批量操作建议
- 在 Excel 中使用公式批量调整价格
- 使用 Excel 的筛选功能快速定位产品
- 完成后一次性同步所有变更

### 3. 定期备份
```bash
# 备份数据目录
cp -r data/ data-backup-$(date +%Y%m%d)/

# 或使用 Git
git add data/
git commit -m "数据更新：调整价格/新增产品"
```

### 4. 图片优化
- 建议图片尺寸：800x800 像素
- 建议图片格式：JPEG（质量80-90%）
- 建议文件大小：< 200KB

---

**最后更新：** 2025-11-13

