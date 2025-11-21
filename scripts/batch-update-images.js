const fs = require('fs');

/**
 * 批量更新产品图片链接
 * 功能：将所有产品的图片链接从外部URL更新为本地路径
 */

function batchUpdateProductImages() {
  const productsFilePath = 'data/products.json'; // products.json 文件路径
  
  // 读取产品数据
  const productsData = JSON.parse(fs.readFileSync(productsFilePath, 'utf8'));
  
  console.log('🔄 开始批量更新产品图片链接...\n');
  
  // 遍历每个产品
  productsData.forEach((product, index) => {
    // 提取产品编号（如：801# -> 801）
    const productNum = product.productNo.replace('#', '');
    
    // 设置默认图片路径（每个产品最多2张图片）
    product.images = [
      `/images/products/${productNum}_1.jpg`,
      `/images/products/${productNum}_2.jpg`
    ];
    
    console.log(`✓ 已更新：${product.productNo} ${product.name}`);
  });
  
  // 保存更新后的数据
  fs.writeFileSync(productsFilePath, JSON.stringify(productsData, null, 2), 'utf8');
  
  console.log(`\n✅ 批量更新完成！`);
  console.log(`   - 共更新 ${productsData.length} 个产品的图片链接`);
  console.log(`   - 图片格式：/images/products/产品编号_序号.jpg`);
  console.log(`\n📝 下一步：`);
  console.log(`   1. 准备产品图片（按命名规范：801_1.jpg, 801_2.jpg 等）`);
  console.log(`   2. 将图片放入 public/images/products/ 目录`);
  console.log(`   3. 运行 node scripts/manage-images.js sync 同步实际图片`);
}

// 执行批量更新
batchUpdateProductImages();

