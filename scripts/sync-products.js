/**
 * 产品数据同步脚本
 * 从 产品数据表.csv 同步数据到 data/products.json
 * 
 * 使用方法：
 *   node scripts/sync-products.js         # 同步所有产品
 *   node scripts/sync-products.js --dry-run  # 预览模式（不实际写入）
 */

const fs = require('fs');
const path = require('path');

// 文件路径配置
const CSV_FILE = path.join(__dirname, '../产品数据表.csv');
const PRODUCTS_JSON = path.join(__dirname, '../data/products.json');
const CATEGORIES_JSON = path.join(__dirname, '../data/categories.json');

// 命令行参数
const isDryRun = process.argv.includes('--dry-run');

// 读取 CSV 文件
function readCSV(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n').filter(line => line.trim());
  
  // 跳过表头
  const dataLines = lines.slice(1);
  
  return dataLines.map(line => {
    // 使用正则表达式分割，处理可能包含逗号的字段
    const values = line.split(',').map(v => v.trim());
    
    return {
      productNo: values[0],
      name: values[1],
      width: parseFloat(values[2]) || 150,
      weight: parseFloat(values[3]) || 0,
      content: values[4],
      whitePrice: values[5],
      colorPrice: values[6],
      hc: parseFloat(values[7]) || 91,
      samplePrice: parseFloat(values[8]) || 0
    };
  });
}

// 解析成分字符串为数组
function parseContent(contentStr) {
  // 例如: "90%天丝、10%涤" -> [{ name: "天丝", percentage: 90 }, { name: "涤", percentage: 10 }]
  const parts = contentStr.split(/[、,]/);
  return parts.map(part => {
    const match = part.match(/(\d+)%(.+)/);
    if (match) {
      return {
        name: match[2].trim(),
        percentage: parseInt(match[1])
      };
    }
    return null;
  }).filter(Boolean);
}

// 解析价格（处理"日/夜4.1"这样的格式）
function parsePrice(priceStr) {
  if (!priceStr) return 0;
  // 提取数字部分，例如 "日/夜4.1" -> 4.1, "彩4.4" -> 4.4
  const match = priceStr.match(/[\d.]+/);
  return match ? parseFloat(match[0]) : 0;
}

// 根据产品编号确定分类
function getCategoryByProductNo(productNo) {
  const num = parseInt(productNo.replace('#', ''));
  
  if (num >= 801 && num <= 899) {
    return 'tencel'; // 天丝系列
  } else if (num >= 601 && num <= 699) {
    return 'embroidery-base'; // 绣花底布系列
  } else if (num >= 901 && num <= 999) {
    return 'cotton'; // 棉布系列
  }
  
  return 'tencel'; // 默认归类为天丝
}

// 生成产品 slug（用于 URL）
function generateSlug(productNo, name) {
  // 去除 # 号，转换为小写
  return `${productNo.replace('#', '')}-${name}`.toLowerCase();
}

// 将 CSV 行转换为产品对象
function csvRowToProduct(row, existingProduct = null) {
  const whitePrice = parsePrice(row.whitePrice);
  const colorPrice = parsePrice(row.colorPrice);
  
  return {
    id: existingProduct?.id || `prod-${row.productNo.replace('#', '')}`,
    productNo: row.productNo,
    name: row.name,
    slug: existingProduct?.slug || generateSlug(row.productNo, row.name),
    category: existingProduct?.category || getCategoryByProductNo(row.productNo),
    price: whitePrice || colorPrice || 0, // 基础价格取白色价格或彩色价格
    whitePrice: whitePrice,
    colorPrice: colorPrice,
    samplePrice: row.samplePrice,
    hc: row.hc,
    width: row.width,
    weight: row.weight,
    content: parseContent(row.content),
    description: existingProduct?.description || `${row.name}，成分：${row.content}`,
    images: existingProduct?.images || [`/images/products/${row.productNo.replace('#', '')}_1.jpg`],
    inStock: existingProduct?.inStock !== undefined ? existingProduct.inStock : true,
    featured: existingProduct?.featured || false,
    tags: existingProduct?.tags || []
  };
}

// 主同步函数
function syncProducts() {
  console.log('📊 开始同步产品数据...\n');
  
  // 1. 读取 CSV 数据
  console.log('📖 读取 CSV 文件:', CSV_FILE);
  const csvData = readCSV(CSV_FILE);
  console.log(`✅ 读取到 ${csvData.length} 条产品数据\n`);
  
  // 2. 读取现有产品数据
  console.log('📖 读取现有产品数据:', PRODUCTS_JSON);
  const existingProducts = JSON.parse(fs.readFileSync(PRODUCTS_JSON, 'utf-8'));
  console.log(`✅ 现有 ${existingProducts.length} 个产品\n`);
  
  // 3. 创建产品编号索引
  const existingProductsMap = new Map();
  existingProducts.forEach(product => {
    existingProductsMap.set(product.productNo, product);
  });
  
  // 4. 同步数据
  const updates = [];
  const additions = [];
  const unchanged = [];
  
  csvData.forEach(row => {
    const existingProduct = existingProductsMap.get(row.productNo);
    const newProduct = csvRowToProduct(row, existingProduct);
    
    if (existingProduct) {
      // 检查是否有变化
      const hasChanges = 
        existingProduct.name !== newProduct.name ||
        existingProduct.whitePrice !== newProduct.whitePrice ||
        existingProduct.colorPrice !== newProduct.colorPrice ||
        existingProduct.samplePrice !== newProduct.samplePrice ||
        existingProduct.hc !== newProduct.hc ||
        existingProduct.width !== newProduct.width ||
        existingProduct.weight !== newProduct.weight ||
        JSON.stringify(existingProduct.content) !== JSON.stringify(newProduct.content);
      
      if (hasChanges) {
        updates.push({ productNo: row.productNo, old: existingProduct, new: newProduct });
      } else {
        unchanged.push(row.productNo);
      }
    } else {
      additions.push({ productNo: row.productNo, product: newProduct });
    }
  });
  
  // 5. 显示变更摘要
  console.log('📋 变更摘要：');
  console.log(`  ✅ 新增产品: ${additions.length} 个`);
  console.log(`  🔄 更新产品: ${updates.length} 个`);
  console.log(`  ⏸️  无变化: ${unchanged.length} 个\n`);
  
  // 6. 显示详细变更
  if (additions.length > 0) {
    console.log('➕ 新增产品：');
    additions.forEach(({ productNo, product }) => {
      console.log(`  ${productNo} - ${product.name}`);
    });
    console.log('');
  }
  
  if (updates.length > 0) {
    console.log('🔄 更新产品：');
    updates.forEach(({ productNo, old, new: newProduct }) => {
      console.log(`  ${productNo} - ${newProduct.name}`);
      if (old.whitePrice !== newProduct.whitePrice) {
        console.log(`    白色价: ¥${old.whitePrice} → ¥${newProduct.whitePrice}`);
      }
      if (old.colorPrice !== newProduct.colorPrice) {
        console.log(`    彩色价: ¥${old.colorPrice} → ¥${newProduct.colorPrice}`);
      }
      if (old.samplePrice !== newProduct.samplePrice) {
        console.log(`    版布价: ¥${old.samplePrice} → ¥${newProduct.samplePrice}`);
      }
      if (old.hc !== newProduct.hc) {
        console.log(`    空差: ${old.hc} → ${newProduct.hc}`);
      }
    });
    console.log('');
  }
  
  // 7. 生成新的产品列表
  const newProductsList = existingProducts.map(product => {
    const update = updates.find(u => u.old.id === product.id);
    return update ? update.new : product;
  });
  
  // 添加新产品
  additions.forEach(({ product }) => {
    newProductsList.push(product);
  });
  
  // 8. 保存或预览
  if (isDryRun) {
    console.log('🔍 预览模式：不会实际写入文件');
    console.log('💡 如需实际同步，请运行: node scripts/sync-products.js\n');
  } else {
    // 备份原文件
    const backupFile = PRODUCTS_JSON + '.backup';
    fs.copyFileSync(PRODUCTS_JSON, backupFile);
    console.log(`💾 已备份原文件至: ${backupFile}`);
    
    // 写入新数据
    fs.writeFileSync(
      PRODUCTS_JSON,
      JSON.stringify(newProductsList, null, 2),
      'utf-8'
    );
    console.log(`✅ 已更新产品数据文件: ${PRODUCTS_JSON}`);
    console.log(`📦 新产品总数: ${newProductsList.length}\n`);
  }
  
  // 9. 统计信息
  console.log('📊 分类统计：');
  const categoryStats = {};
  newProductsList.forEach(product => {
    categoryStats[product.category] = (categoryStats[product.category] || 0) + 1;
  });
  Object.entries(categoryStats).forEach(([category, count]) => {
    console.log(`  ${category}: ${count} 个产品`);
  });
  
  console.log('\n✨ 同步完成！');
}

// 执行同步
try {
  syncProducts();
} catch (error) {
  console.error('❌ 同步失败:', error.message);
  console.error(error.stack);
  process.exit(1);
}

