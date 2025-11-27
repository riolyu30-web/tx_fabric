// 图片处理脚本 - 使用命令行参数
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// 显示帮助信息
function showHelp() {
  console.log(`
图片处理工具 - 使用说明

用法:
  node scripts/process-images.js <源目录> <输出目录> [宽度] [高度] [质量]

参数:
  源目录    - 输入图片目录路径 (例如: public/images/about)
  输出目录  - 输出图片目录路径 (例如: public/images/aboutus)
  宽度      - 可选，目标图片宽度 (例如: 1600)
  高度      - 可选，目标图片高度 (例如: 600)
  质量      - 可选，图片质量 1-100 (默认: 80)

示例:
  # 只压缩图片，不调整尺寸
  node scripts/process-images.js public/images/about public/images/aboutus
  
  # 调整图片尺寸为 1600x600px
  node scripts/process-images.js public/images/about public/images/aboutus 1600 600
  
  # 调整尺寸并设置质量
  node scripts/process-images.js public/images/about public/images/aboutus 1600 600 90

快捷命令:
  npm run process-images -- public/images/about public/images/aboutus 1600 600
`);
}

// 处理单个图片 - 调整尺寸并裁剪
async function processImage(inputPath, outputPath, targetWidth, targetHeight, quality) {
  try {
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
        .jpeg({ quality }) // 设置JPEG质量
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
        .jpeg({ quality }) // 设置JPEG质量
        .toFile(outputPath);
    }
    
    // 验证输出图片
    const outputMetadata = await sharp(outputPath).metadata();
    console.log(`  输出尺寸: ${outputMetadata.width}x${outputMetadata.height}`);
    
    return true;
  } catch (error) {
    console.error(`  处理图片时出错:`, error.message);
    return false;
  }
}

// 主处理函数
async function processImages(sourceDir, outputDir, targetWidth, targetHeight, quality) {
  try {
    console.log(`=== 图片处理工具 ===`);
    console.log(`源目录: ${sourceDir}`);
    console.log(`输出目录: ${outputDir}`);
    if (targetWidth && targetHeight) {
      console.log(`目标尺寸: ${targetWidth}x${targetHeight}px`);
    }
    console.log(`图片质量: ${quality}\n`);
    
    // 检查源目录是否存在
    if (!fs.existsSync(sourceDir)) {
      console.error(`错误: 源目录不存在: ${sourceDir}`);
      process.exit(1);
    }
    
    // 确保输出目录存在
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
      console.log(`创建输出目录: ${outputDir}`);
    }
    
    // 获取源目录中的所有图片文件
    const files = fs.readdirSync(sourceDir).filter(file => 
      /\.(jpg|jpeg|png)$/i.test(file)
    );
    
    if (files.length === 0) {
      console.log(`源目录中没有找到图片文件`);
      return;
    }
    
    console.log(`找到 ${files.length} 个图片文件需要处理\n`);
    
    // 处理每个文件
    let successCount = 0;
    let failCount = 0;
    
    for (const file of files) {
      const inputPath = path.join(sourceDir, file);
      const outputPath = path.join(outputDir, file);
      
      console.log(`正在处理: ${file}`);
      
      try {
        // 如果需要调整尺寸
        if (targetWidth && targetHeight) {
          const success = await processImage(inputPath, outputPath, targetWidth, targetHeight, quality);
          if (!success) {
            failCount++;
            continue;
          }
        } else {
          // 只压缩图片，不调整尺寸
          const image = sharp(inputPath);
          const metadata = await image.metadata();
          console.log(`  原始尺寸: ${metadata.width}x${metadata.height}`);
          
          if (metadata.format === 'png') {
            await image.png({ quality }).toFile(outputPath);
          } else {
            await image.jpeg({ quality }).toFile(outputPath);
          }
          
          console.log(`  压缩完成，质量: ${quality}`);
        }
        
        console.log(`  文件大小: ${(fs.statSync(outputPath).size / 1024).toFixed(2)} KB`);
        console.log('  处理完成 ✓\n');
        successCount++;
      } catch (error) {
        console.error(`  处理 ${file} 时出错:`, error.message);
        failCount++;
      }
    }
    
    console.log(`处理完成! 成功: ${successCount}, 失败: ${failCount}`);
  } catch (error) {
    console.error('处理过程中出错:', error.message);
    process.exit(1);
  }
}

// 解析命令行参数
function parseArgs() {
  const args = process.argv.slice(2);
  
  // 显示帮助信息
  if (args.includes('--help') || args.includes('-h') || args.length < 2) {
    showHelp();
    process.exit(0);
  }
  
  const sourceDir = args[0];
  const outputDir = args[1];
  const targetWidth = args[2] ? parseInt(args[2]) : null;
  const targetHeight = args[3] ? parseInt(args[3]) : null;
  const quality = args[4] ? parseInt(args[4]) : 80;
  
  // 验证参数
  if (targetWidth && isNaN(targetWidth)) {
    console.error('错误: 宽度必须是数字');
    process.exit(1);
  }
  
  if (targetHeight && isNaN(targetHeight)) {
    console.error('错误: 高度必须是数字');
    process.exit(1);
  }
  
  if (isNaN(quality) || quality < 1 || quality > 100) {
    console.error('错误: 质量必须是1-100之间的数字');
    process.exit(1);
  }
  
  // 如果提供了宽度或高度，必须同时提供两者
  if ((targetWidth && !targetHeight) || (!targetWidth && targetHeight)) {
    console.error('错误: 调整尺寸时必须同时提供宽度和高度');
    process.exit(1);
  }
  
  return { sourceDir, outputDir, targetWidth, targetHeight, quality };
}

// 检查依赖并运行
try {
  require.resolve('sharp');
  
  // 解析命令行参数
  const { sourceDir, outputDir, targetWidth, targetHeight, quality } = parseArgs();
  
  // 开始处理图片
  processImages(sourceDir, outputDir, targetWidth, targetHeight, quality);
} catch (e) {
  console.error('错误: 需要安装sharp库来处理图片');
  console.log('请运行: npm install sharp');
  process.exit(1);
}