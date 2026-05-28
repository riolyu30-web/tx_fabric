"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ChatWidget from "@/components/chat/ChatWidget";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  // 获取当前路由路径
  const pathname = usePathname();
  
  // 判断是否为后台管理页面（路径包含 /admin）
  const isAdminPage = pathname.includes('/admin');

  // 如果是后台页面，只渲染子内容，不渲染头部、尾部和客服挂件
  if (isAdminPage) {
    return <>{children}</>;
  }

  // 否则，渲染完整的前台布局
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
