// 图片处理脚本 - 将图片调整为1600x600px，按宽缩放并裁剪中间内容
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// 配置参数
const sourceDir = path.join(__dirname, 'public/images/about');
const outputDir = path.join(__dirname, 'public/images/aboutus');
const targetWidth = 1600;
const targetHeight = 600;

// 确保输出目录存在
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 获取源目录中的所有jpg文件
const files = fs.readdirSync(sourceDir).filter(file => 
  file.toLowerCase().endsWith('.jpg')
);

console.log(`找到 ${files.length} 个JPG文件需要处理`);

// 处理每个文件
async function processImages() {
  for (const file of files) {
    const inputPath = path.join(sourceDir, file);
    const outputPath = path.join(outputDir, file);
    
    try {
      console.log(`正在处理: ${file}`);
      
      // 获取原始图片信息
      const metadata = await sharp(inputPath).metadata();
      console.log(`  原始尺寸: ${metadata.width}x${metadata.height}`);
      
      // 计算缩放比例 - 按宽度缩放
      const scaleFactor = targetWidth / metadata.width;
      const scaledHeight = Math.round(metadata.height * scaleFactor);
      
      console.log(`  缩放后尺寸: ${targetWidth}x${scaledHeight}`);
      
      // 如果缩放后的高度小于目标高度，需要按高度缩放
      if (scaledHeight < targetHeight) {
        const heightScaleFactor = targetHeight / metadata.height;
        const scaledWidth = Math.round(metadata.width * heightScaleFactor);
        
        console.log(`  调整缩放策略，按高度缩放: ${scaledWidth}x${targetHeight}`);
        
        // 按高度缩放并裁剪中间部分
        await sharp(inputPath)
          .resize(scaledWidth, targetHeight, { 
            position: 'center',
            fit: 'cover'
          })
          .extract({ 
            left: Math.floor((scaledWidth - targetWidth) / 2), 
            top: 0, 
            width: targetWidth, 
            height: targetHeight 
          })
          .toFile(outputPath);
      } else {
        // 按宽度缩放并裁剪中间部分
        await sharp(inputPath)
          .resize(targetWidth, scaledHeight, { 
            position: 'center',
            fit: 'cover'
          })
          .extract({ 
            left: 0, 
            top: Math.floor((scaledHeight - targetHeight) / 2), 
            width: targetWidth, 
            height: targetHeight 
          })
          .toFile(outputPath);
      }
      
      // 验证输出图片
      const outputMetadata = await sharp(outputPath).metadata();
      console.log(`  输出尺寸: ${outputMetadata.width}x${outputMetadata.height}`);
      console.log(`  已保存到: ${outputPath}`);
      console.log('  处理完成 ✓');
      
    } catch (error) {
      console.error(`  处理 ${file} 时出错:`, error.message);
    }
  }
  
  console.log('所有图片处理完成!');
}

// 检查是否安装了sharp
try {
  require.resolve('sharp');
  processImages();
} catch (e) {
  console.error('错误: 需要安装sharp库来处理图片');
  console.log('请运行: npm install sharp');
  process.exit(1);
}