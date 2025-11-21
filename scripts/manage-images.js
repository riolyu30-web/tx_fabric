const fs = require('fs');
const path = require('path');

/**
 * 图片管理脚本
 * 功能：扫描本地图片目录，自动同步产品图片到 products.json
 */

// 扫描本地图片并自动更新JSON
function syncProductImages() {
  const productsFilePath = 'data/products.json'; // products.json 文件路径
  const imageDir = 'public/images/products'; // 产品图片目录
  
  // 读取现有产品数据
  if (!fs.existsSync(productsFilePath)) {
    console.error('❌ 未找到 products.json 文件！');
    return;
  }
  
  const productsData = JSON.parse(fs.readFileSync(productsFilePath, 'utf8'));
  
  // 检查图片目录是否存在，不存在则创建
  if (!fs.existsSync(imageDir)) {
    fs.mkdirSync(imageDir, { recursive: true });
    console.log(`✓ 已创建图片目录：${imageDir}`);
  }
  
  let updatedCount = 0;
  
  // 遍历每个产品
  productsData.forEach(product => {
    // 提取产品编号（如：801# -> 801）
    const productNum = product.productNo.replace('#', '');
    const images = [];
    
    // 查找该产品的所有图片（最多5张）
    for (let i = 1; i <= 5; i++) {
      const imagePath = path.join(imageDir, `${productNum}_${i}.jpg`);
      if (fs.existsSync(imagePath)) {
        images.push(`/images/products/${productNum}_${i}.jpg`);
      }
    }
    
    // 如果找到图片，更新产品数据
    if (images.length > 0) {
      product.images = images;
      updatedCount++;
    }
  });
  
  // 保存更新后的数据
  fs.writeFileSync(productsFilePath, JSON.stringify(productsData, null, 2), 'utf8');
  console.log(`\n✓ 图片同步完成！`);
  console.log(`  - 总产品数：${productsData.length}`);
  console.log(`  - 已更新产品：${updatedCount}`);
  console.log(`  - 未更新产品：${productsData.length - updatedCount}`);
  
  // 显示未找到图片的产品
  const productsWithoutImages = productsData.filter(p => {
    const productNum = p.productNo.replace('#', '');
    return !fs.existsSync(path.join(imageDir, `${productNum}_1.jpg`));
  });
  
  if (productsWithoutImages.length > 0) {
    console.log(`\n⚠ 以下产品未找到图片：`);
    productsWithoutImages.forEach(p => {
      const productNum = p.productNo.replace('#', '');
      console.log(`  - ${p.productNo} ${p.name} (需要: ${productNum}_1.jpg)`);
    });
  }
}

// 列出所有产品图片使用情况
function listImageStatus() {
  const productsFilePath = 'data/products.json'; // products.json 文件路径
  const imageDir = 'public/images/products'; // 产品图片目录
  
  const productsData = JSON.parse(fs.readFileSync(productsFilePath, 'utf8'));
  
  console.log('\n📋 产品图片使用情况：\n');
  console.log('产品编号 | 产品名称 | 图片数量 | 图片路径');
  console.log('--------|---------|---------|----------');
  
  productsData.forEach(product => {
    const productNum = product.productNo.replace('#', '');
    const imageCount = product.images.length;
    const firstImage = product.images[0] || '无';
    console.log(`${product.productNo.padEnd(8)} | ${product.name.padEnd(20)} | ${imageCount}张 | ${firstImage}`);
  });
}

// 命令行参数处理
const args = process.argv.slice(2);
const command = args[0];

if (command === 'sync') {
  // 同步本地图片到 products.json
  syncProductImages();
} else if (command === 'list') {
  // 列出产品图片使用情况
  listImageStatus();
} else {
  // 显示帮助信息
  console.log('📸 产品图片管理工具\n');
  console.log('用法：');
  console.log('  node scripts/manage-images.js sync   # 同步本地图片到 products.json');
  console.log('  node scripts/manage-images.js list   # 列出产品图片使用情况');
  console.log('\n图片命名规范：');
  console.log('  - 格式：产品编号_图片序号.jpg');
  console.log('  - 示例：801_1.jpg, 801_2.jpg, 802_1.jpg');
  console.log('  - 位置：public/images/products/');
}

