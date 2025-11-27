import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

// 获取新品数据API
export async function GET() {
  try {
    // 读取新品数据文件
    const filePath = path.join(process.cwd(), "data", "new-product.json")
    
    // 检查文件是否存在
    if (!fs.existsSync(filePath)) {
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