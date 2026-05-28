// 导入 Next.js 的响应对象
import { NextResponse } from 'next/server';

// 导出 POST 方法处理登录请求
export async function POST(request: Request) {
  // 解析请求体获取用户名和密码
  const { username, password } = await request.json();
  
  // 验证账号密码（这里简单硬编码为 admin / admin123）
  if (username === 'admin' && password === 'admin123') {
    // 创建成功的响应对象
    const response = NextResponse.json({ success: true });
    // 在响应头中设置 HttpOnly 的认证 Cookie
    response.cookies.set('admin_token', 'authenticated', { httpOnly: true, path: '/' });
    // 返回响应
    return response;
  // 结束 if 判断
  }
  
  // 如果密码错误，返回 401 未授权响应
  return NextResponse.json({ success: false, message: '账号或密码错误' }, { status: 401 });
// 结束 POST 函数
}
