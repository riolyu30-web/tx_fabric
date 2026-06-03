import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

// 获取新品数据API
export async function GET(request: Request) {
  try {
    // 解析查询参数获取语言环境，默认为 zh
    const { searchParams } = new URL(request.url)
    const locale = searchParams.get('locale') || 'zh'

    // 读取对应语言的新品数据文件
    const filePath = path.join(process.cwd(), "data", "locales", locale, "new-product.json")
    
    // 检查文件是否存在，如果不存在则使用默认语言 zh
    if (!fs.existsSync(filePath)) {
      const fallbackPath = path.join(process.cwd(), "data", "locales", "zh", "new-product.json")
      if (fs.existsSync(fallbackPath)) {
        const fileContent = fs.readFileSync(fallbackPath, "utf8")
        return NextResponse.json(JSON.parse(fileContent))
      }
      // 如果文件不存在，返回空数组
      return NextResponse.json([])
    }
    
    // 读取文件内容
    const fileContent = fs.readFileSync(filePath, "utf8")
    const data = JSON.parse(fileContent)
    
    // 返回数据
    return NextResponse.json(data)
  } catch (error) {
    console.error("读取新品数据失败:", error)
    return NextResponse.json(
      { error: "读取新品数据失败" },
      { status: 500 }
    )
  }
}