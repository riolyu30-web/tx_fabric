const fs = require('fs');
const path = require('path');

/**
 * 图片管理脚本
 * 功能：扫描本地图片目录，自动同步产品图片到 products.json、banner 图片到 banners.json 和新品图片到 new-product.json
 */

// 扫描本地图片并自动更新产品JSON
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
  console.log(`\n✓ 产品图片同步完成！`);
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

// 扫描本地banner图片并自动更新banners.json
function syncBannerImages() {
  const bannersFilePath = 'data/banners.json'; // banners.json 文件路径
  const imageDir = 'public/images/banners'; // banner图片目录
  
  // 读取现有banner数据
  if (!fs.existsSync(bannersFilePath)) {
    console.error('❌ 未找到 banners.json 文件！');
    return;
  }
  
  const bannersData = JSON.parse(fs.readFileSync(bannersFilePath, 'utf8'));
  
  // 检查图片目录是否存在，不存在则创建
  if (!fs.existsSync(imageDir)) {
    fs.mkdirSync(imageDir, { recursive: true });
    console.log(`✓ 已创建banner图片目录：${imageDir}`);
  }
  
  let updatedCount = 0;
  
  // 遍历每个banner
  bannersData.forEach(banner => {
    // 提取banner编号（如：banner-1 -> 1）
    const bannerNum = banner.id.replace('banner-', '');
    const imagePath = path.join(imageDir, `banner_${bannerNum}.jpg`);
    
    // 如果找到本地图片，更新banner数据
    if (fs.existsSync(imagePath)) {
      banner.image = `/images/banners/banner_${bannerNum}.jpg`;
      updatedCount++;
    }
  });
  
  // 保存更新后的数据
  fs.writeFileSync(bannersFilePath, JSON.stringify(bannersData, null, 2), 'utf8');
  console.log(`\n✓ Banner图片同步完成！`);
  console.log(`  - 总Banner数：${bannersData.length}`);
  console.log(`  - 已更新Banner：${updatedCount}`);
  console.log(`  - 未更新Banner：${bannersData.length - updatedCount}`);
  
  // 显示未找到图片的banner
  const bannersWithoutImages = bannersData.filter(b => {
    const bannerNum = b.id.replace('banner-', '');
    return !fs.existsSync(path.join(imageDir, `banner_${bannerNum}.jpg`));
  });
  
  if (bannersWithoutImages.length > 0) {
    console.log(`\n⚠ 以下Banner未找到本地图片：`);
    bannersWithoutImages.forEach(b => {
      const bannerNum = b.id.replace('banner-', '');
      console.log(`  - ${b.id} "${b.title}" (需要: banner_${bannerNum}.jpg)`);
    });
  }
}

// 扫描本地新品图片并自动更新new-product.json
function syncNewProductImages() {
  const newProductsFilePath = 'data/new-product.json'; // new-product.json 文件路径
  const imageDir = 'public/images/new-products'; // 新品图片目录
  
  // 读取现有新品数据
  if (!fs.existsSync(newProductsFilePath)) {
    console.error('❌ 未找到 new-product.json 文件！');
    return;
  }
  
  const newProductsData = JSON.parse(fs.readFileSync(newProductsFilePath, 'utf8'));
  
  // 检查图片目录是否存在，不存在则创建
  if (!fs.existsSync(imageDir)) {
    fs.mkdirSync(imageDir, { recursive: true });
    console.log(`✓ 已创建新品图片目录：${imageDir}`);
  }
  
  let updatedCount = 0;
  
  // 遍历每个新品
  newProductsData.forEach(newProduct => {
    const photos = [];
    
    // 查找该新品的所有图片（根据标题匹配）
    const titleKey = newProduct.title.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
    
    // 查找匹配的图片文件
    const files = fs.readdirSync(imageDir).filter(file => 
      /\.(jpg|jpeg|png)$/i.test(file)
    );
    
    // 按文件名排序，确保顺序一致
    files.sort();
    
    // 查找与新品相关的图片
    files.forEach(file => {
      // 检查文件名是否包含新品标题的关键词
      if (file.includes('new-product') || file.includes(titleKey)) {
        photos.push(`/images/new-products/${file}`);
      }
    });
    
    // 如果找到图片，更新新品数据
    if (photos.length > 0) {
      newProduct.photo = photos;
      updatedCount++;
    }
  });
  
  // 保存更新后的数据
  fs.writeFileSync(newProductsFilePath, JSON.stringify(newProductsData, null, 2), 'utf8');
  console.log(`\n✓ 新品图片同步完成！`);
  console.log(`  - 总新品数：${newProductsData.length}`);
  console.log(`  - 已更新新品：${updatedCount}`);
  console.log(`  - 未更新新品：${newProductsData.length - updatedCount}`);
  
  // 显示未找到图片的新品
  const productsWithoutImages = newProductsData.filter(p => p.photo.length === 0);
  
  if (productsWithoutImages.length > 0) {
    console.log(`\n⚠ 以下新品未找到图片：`);
    productsWithoutImages.forEach(p => {
      console.log(`  - "${p.title}"`);
    });
  }
}

// 同时同步产品、banner和新品图片
function syncAllImages() {
  console.log('🔄 开始同步所有图片...\n');
  
  // 同步产品图片
  syncProductImages();
  
  console.log('\n' + '='.repeat(50) + '\n');
  
  // 同步banner图片
  syncBannerImages();
  
  console.log('\n' + '='.repeat(50) + '\n');
  
  // 同步新品图片
  syncNewProductImages();
  
  console.log('\n✅ 所有图片同步完成！');
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

// 列出所有banner图片使用情况
function listBannerStatus() {
  const bannersFilePath = 'data/banners.json'; // banners.json 文件路径
  const imageDir = 'public/images/banners'; // banner图片目录
  
  const bannersData = JSON.parse(fs.readFileSync(bannersFilePath, 'utf8'));
  
  console.log('\n🎯 Banner图片使用情况：\n');
  console.log('Banner ID | 标题 | 本地图片 | 图片路径');
  console.log('---------|------|---------|----------');
  
  bannersData.forEach(banner => {
    const bannerNum = banner.id.replace('banner-', '');
    const hasLocalImage = fs.existsSync(path.join(imageDir, `banner_${bannerNum}.jpg`));
    const status = hasLocalImage ? '✓' : '✗';
    console.log(`${banner.id.padEnd(9)} | ${banner.title.padEnd(20)} | ${status} | ${banner.image}`);
  });
}

// 命令行参数处理
const args = process.argv.slice(2);
const command = args[0];

if (command === 'sync') {
  // 同步所有本地图片到JSON文件
  syncAllImages();
} else if (command === 'sync-products') {
  // 只同步产品图片
  syncProductImages();
} else if (command === 'sync-banners') {
  // 只同步banner图片
  syncBannerImages();
} else if (command === 'sync-new-products') {
  // 只同步新品图片
  syncNewProductImages();
} else if (command === 'list') {
  // 列出产品图片使用情况
  listImageStatus();
} else if (command === 'list-banners') {
  // 列出banner图片使用情况
  listBannerStatus();
} else {
  // 显示帮助信息
  console.log('📸 产品、Banner和新品图片管理工具\n');
  console.log('用法：');
  console.log('  node scripts/manage-images.js sync               # 同步所有本地图片到JSON文件');
  console.log('  node scripts/manage-images.js sync-products      # 只同步产品图片到products.json');
  console.log('  node scripts/manage-images.js sync-banners       # 只同步banner图片到banners.json');
  console.log('  node scripts/manage-images.js sync-new-products  # 只同步新品图片到new-product.json');
  console.log('  node scripts/manage-images.js list               # 列出产品图片使用情况');
  console.log('  node scripts/manage-images.js list-banners       # 列出banner图片使用情况');
  console.log('\n产品图片命名规范：');
  console.log('  - 格式：产品编号_图片序号.jpg');
  console.log('  - 示例：801_1.jpg, 801_2.jpg, 802_1.jpg');
  console.log('  - 位置：public/images/products/');
  console.log('\nBanner图片命名规范：');
  console.log('  - 格式：banner_序号.jpg');
  console.log('  - 示例：banner_1.jpg, banner_2.jpg, banner_3.jpg');
  console.log('  - 位置：public/images/banners/');
  console.log('\n新品图片命名规范：');
  console.log('  - 格式：new-product-序号.jpg 或 organic-cotton-序号.jpg 等');
  console.log('  - 示例：new-product-1.jpg, organic-cotton-1.jpg');
  console.log('  - 位置：public/images/new-products/');
}