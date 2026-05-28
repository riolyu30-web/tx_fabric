// 导入 cookies 以获取认证状态
import { cookies } from 'next/headers';
// 导入 redirect 以进行重定向
import { redirect } from 'next/navigation';
// 导入 fs 模块读取数据文件
import fs from 'fs/promises';
// 导入 path 模块
import path from 'path';
// 导入客户端表格组件
import LeadsTable from '@/components/admin/LeadsTable';

// 导出默认的管理后台页面组件 (服务端组件)
export default async function AdminPage() {
  // 等待获取 cookie 存储
  const cookieStore = await cookies();
  // 获取名为 admin_token 的 cookie
  const token = cookieStore.get('admin_token');

  // 如果没有登录凭证或者凭证不正确
  if (!token || token.value !== 'authenticated') {
    // 重定向到登录页面
    redirect('/en/admin/login');
  // 结束 if 判断
  }

  // 定义留资数据数组
  let leads: any[] = [];
  // 定义数据文件路径
  const dataFilePath = path.join(process.cwd(), 'data', 'leads.json');

  // 尝试读取数据文件
  try {
    // 异步读取文件内容
    const fileContent = await fs.readFile(dataFilePath, 'utf-8');
    // 将字符串解析为数组
    leads = JSON.parse(fileContent);
    // 按创建时间倒序排列
    leads.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  // 捕获可能的文件不存在异常
  } catch (error) {
    // 如果出错，维持空数组并在控制台记录
    console.error('无法读取留资数据:', error);
  // 结束 try-catch 块
  }

  // 返回管理后台界面的 JSX 结构
  return (
    // 页面主体容器
    <div className="min-h-screen bg-gray-50 p-8">
      {/* 内容区域最大宽度及居中 */}
      <div className="max-w-5xl mx-auto">
        {/* 头部标题区 */}
        <div className="flex justify-between items-center mb-8">
          {/* 页面大标题 */}
          <h1 className="text-3xl font-bold">留资管理后台</h1>
          {/* 数据统计标签 */}
          <span className="bg-primary text-white px-3 py-1 rounded-full text-sm">共 {leads.length} 条</span>
        {/* 结束头部区域 */}
        </div>
        
        {/* 渲染客户端表格组件，传入初始数据 */}
        <LeadsTable initialLeads={leads} />
        
      {/* 结束内容区域 */}
      </div>
    {/* 结束页面主体容器 */}
    </div>
  // 结束 return 语句
  );
// 结束 AdminPage 组件
}
