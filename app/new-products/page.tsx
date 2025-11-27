import { Metadata } from "next"
import NewProductsClient from "./client"

// 页面元数据
export const metadata: Metadata = {
  title: "新品上线 - 千千纺织",
  description: "展示所有最新上架的产品信息",
}

// 新品上线页面组件
export default function NewProductsPage() {
  return <NewProductsClient />
}