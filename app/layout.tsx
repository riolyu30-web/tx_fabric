import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// 加载 Inter 字体
const inter = Inter({ subsets: ["latin"] });

// 网站元数据
export const metadata: Metadata = {
  title: "千千纺织 - 优质面料独立站",
  description: "探索高品质面料，棉、麻、丝、毛等多种材质，为您的创作提供最佳选择",
  keywords: "面料, 布料, 棉布, 亚麻, 丝绸, 羊毛, 缝纫, 手工",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

