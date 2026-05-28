// 导入 Next.js 的响应对象
import { NextResponse } from 'next/server';
// 导入 fs 模块的 promise API
import fs from 'fs/promises';
// 导入 path 模块处理路径
import path from 'path';

// 定义数据文件的存储路径，指向项目根目录下的 data/leads.json
const dataFilePath = path.join(process.cwd(), 'data', 'leads.json');

// 定义辅助函数，确保数据目录和文件存在
async function ensureDataFile() {
  // 尝试执行以下代码块
  try {
    // 获取 data 目录的路径
    const dirPath = path.join(process.cwd(), 'data');
    // 异步创建目录，如果已存在则忽略
    await fs.mkdir(dirPath, { recursive: true });
    // 尝试访问 leads.json 文件
    await fs.access(dataFilePath);
  // 如果文件不存在则捕获异常
  } catch (error) {
    // 创建一个包含空数组的 JSON 文件
    await fs.writeFile(dataFilePath, '[]');
  // 结束 try-catch 块
  }
// 结束 ensureDataFile 函数
}

// 导出 POST 方法处理函数，用于接收新的留资
export async function POST(request: Request) {
  // 确保数据文件存在
  await ensureDataFile();
  // 解析请求体中的 JSON 数据
  const data = await request.json();
  // 读取当前的留资数据文件
  const fileContent = await fs.readFile(dataFilePath, 'utf-8');
  // 将读取的字符串解析为数组
  const leads = JSON.parse(fileContent);
  // 为新数据添加唯一 ID 和创建时间戳
  const newLead = { ...data, id: Date.now(), createdAt: new Date().toISOString() };
  // 将新数据追加到数组末尾，默认未沟通
  leads.push({ ...newLead, contacted: false });
  // 将更新后的数组转为格式化的 JSON 字符串并写入文件
  await fs.writeFile(dataFilePath, JSON.stringify(leads, null, 2));
  // 返回成功的 JSON 响应
  return NextResponse.json({ success: true, lead: newLead });
// 结束 POST 函数
}

// 导出 GET 方法处理函数，用于后台获取留资列表
export async function GET() {
  // 确保数据文件存在
  await ensureDataFile();
  // 读取留资数据文件
  const fileContent = await fs.readFile(dataFilePath, 'utf-8');
  // 将字符串解析为 JSON 对象（数组）
  const leads = JSON.parse(fileContent);
  // 将数组按创建时间倒序排列（最新的在前面）
  leads.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  // 返回包含留资列表的 JSON 响应
  return NextResponse.json({ leads });
// 结束 GET 函数
}

// 导出 PATCH 方法处理函数，用于更新留资数据的状态（例如是否已沟通）
export async function PATCH(request: Request) {
  // 确保数据文件存在
  await ensureDataFile();
  // 解析请求体中的 JSON 数据，包含 id 和要更新的字段
  const { id, contacted } = await request.json();
  
  // 读取当前的留资数据文件
  const fileContent = await fs.readFile(dataFilePath, 'utf-8');
  // 将字符串解析为数组
  let leads = JSON.parse(fileContent);
  
  // 查找对应 ID 的数据索引
  const leadIndex = leads.findIndex((lead: any) => lead.id === id);
  
  // 如果找到了数据
  if (leadIndex !== -1) {
    // 更新其 contacted 状态
    leads[leadIndex].contacted = contacted;
    // 将更新后的数组写入文件
    await fs.writeFile(dataFilePath, JSON.stringify(leads, null, 2));
    // 返回成功响应
    return NextResponse.json({ success: true, lead: leads[leadIndex] });
  // 如果没找到
  } else {
    // 返回 404 错误
    return NextResponse.json({ success: false, message: '数据未找到' }, { status: 404 });
  // 结束 if-else 判断
  }
// 结束 PATCH 函数
}
