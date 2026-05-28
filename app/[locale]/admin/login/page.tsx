// 声明为客户端组件
"use client";

// 导入 React 的 useState 钩子
import React, { useState } from 'react';
// 导入 Next.js 的 useRouter 钩子用于跳转
import { useRouter } from 'next/navigation';

// 导出默认的登录页面组件
export default function LoginPage() {
  // 初始化 router 对象
  const router = useRouter();
  // 定义 username 状态
  const [username, setUsername] = useState('');
  // 定义 password 状态
  const [password, setPassword] = useState('');
  // 定义 error 状态用于显示错误信息
  const [error, setError] = useState('');

  // 定义处理登录提交的异步函数
  const handleLogin = async (e: React.FormEvent) => {
    // 阻止表单的默认提交行为
    e.preventDefault();
    // 清除之前的错误信息
    setError('');

    // 发起登录 POST 请求
    const res = await fetch('/api/auth/login', {
      // 指定请求方法为 POST
      method: 'POST',
      // 设置请求头为 JSON 格式
      headers: { 'Content-Type': 'application/json' },
      // 将用户名和密码转为 JSON 字符串作为请求体
      body: JSON.stringify({ username, password })
    // 结束 fetch 调用
    });

    // 如果请求成功
    if (res.ok) {
      // 跳转到后台管理页面，默认进入英文管理页
      router.push('/en/admin');
      // 刷新路由以应用服务器端 Cookie 状态
      router.refresh();
    // 如果请求失败
    } else {
      // 设置错误提示信息
      setError('账号或密码错误');
    // 结束 if-else 判断
    }
  // 结束 handleLogin 函数
  };

  // 返回登录界面的 JSX 结构
  return (
    // 外层容器，使用 flex 居中
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {/* 登录卡片容器 */}
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        {/* 标题 */}
        <h1 className="text-2xl font-bold mb-6 text-center">后台登录</h1>
        {/* 如果有错误信息则显示 */}
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        {/* 登录表单 */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          {/* 用户名输入框 */}
          <input
            // 文本类型
            type="text"
            // 占位符
            placeholder="用户名"
            // 绑定值
            value={username}
            // 监听输入变化
            onChange={(e) => setUsername(e.target.value)}
            // 样式类名
            className="border p-2 rounded focus:outline-none focus:ring-1 focus:ring-black"
          // 结束 input 标签
          />
          {/* 密码输入框 */}
          <input
            // 密码类型
            type="password"
            // 占位符
            placeholder="密码"
            // 绑定值
            value={password}
            // 监听输入变化
            onChange={(e) => setPassword(e.target.value)}
            // 样式类名
            className="border p-2 rounded focus:outline-none focus:ring-1 focus:ring-black"
          // 结束 input 标签
          />
          {/* 提交按钮 */}
          <button type="submit" className="bg-black text-white p-2 rounded hover:bg-gray-800 transition-colors">
            {/* 按钮文本 */}
            登录
          {/* 结束 button 标签 */}
          </button>
        {/* 结束 form 标签 */}
        </form>
      {/* 结束卡片容器 */}
      </div>
    {/* 结束外层容器 */}
    </div>
  // 结束 return 语句
  );
// 结束 LoginPage 组件
}
