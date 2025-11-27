import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET() {
  try {
    // 定义关于我们图片目录路径
    const aboutImagesDir = path.join(process.cwd(), "public", "images", "about-us")
    
    // 检查目录是否存在
    if (!fs.existsSync(aboutImagesDir)) {
      return NextResponse.json({ images: [] })
    }
    
    // 读取目录中的所有文件
    const files = fs.readdirSync(aboutImagesDir)
    
    // 过滤出图片文件（jpg, jpeg, png, webp）
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|webp)$/i.test(file)
    )
    
    // 按文件名排序
    imageFiles.sort()
    
    // 构建完整的图片路径
    const images = imageFiles.map(file => `/images/about-us/${file}`)
    
    return NextResponse.json({ images })
  } catch (error) {
    console.error("获取关于我们图片失败:", error)
    return NextResponse.json(
      { error: "获取图片失败" },
      { status: 500 }
    )
  }
}