"use client";

import React, { useState } from 'react';

// 定义留资数据类型
type Lead = {
  id: number;
  country: string;
  quantity: string;
  contact: string;
  createdAt: string;
  contacted?: boolean;
};

// 导出 LeadsTable 客户端组件
export default function LeadsTable({ initialLeads }: { initialLeads: Lead[] }) {
  // 定义 leads 状态来管理表格数据
  const [leads, setLeads] = useState<Lead[]>(initialLeads);

  // 处理 checkbox 状态改变的函数
  const handleContactedChange = async (id: number, currentStatus: boolean) => {
    // 乐观更新 UI：先在本地反转状态
    setLeads(prevLeads => 
      prevLeads.map(lead => 
        lead.id === id ? { ...lead, contacted: !currentStatus } : lead
      )
    );

    try {
      // 发起 PATCH 请求到 API
      const res = await fetch('/api/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, contacted: !currentStatus })
      });
      
      // 如果请求失败，可以在这里回滚状态，简单起见只打印错误
      if (!res.ok) {
        console.error('更新状态失败');
      }
    } catch (error) {
      console.error('请求出错', error);
    }
  // 结束处理函数
  };

  return (
    // 表格卡片容器
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
      {/* 表格元素 */}
      <table className="w-full text-left border-collapse">
        {/* 表头部分 */}
        <thead className="bg-gray-100 text-gray-600 text-sm">
          {/* 表头行 */}
          <tr>
            {/* 已沟通状态列头 */}
            <th className="p-4 border-b font-medium w-24">已沟通</th>
            {/* 提交时间列头 */}
            <th className="p-4 border-b font-medium">提交时间</th>
            {/* 国家地区列头 */}
            <th className="p-4 border-b font-medium">国家/地区</th>
            {/* 采购数量列头 */}
            <th className="p-4 border-b font-medium">采购数量</th>
            {/* 联系方式列头 */}
            <th className="p-4 border-b font-medium">联系方式</th>
          {/* 结束表头行 */}
          </tr>
        {/* 结束表头部分 */}
        </thead>
        {/* 表格主体部分 */}
        <tbody className="text-sm">
          {/* 如果没有数据 */}
          {leads.length === 0 ? (
            // 渲染空数据提示行
            <tr>
              {/* 占据所有列 */}
              <td colSpan={5} className="p-8 text-center text-gray-500">
                {/* 提示文本 */}
                暂无留资数据
              {/* 结束单元格 */}
              </td>
            {/* 结束行 */}
            </tr>
          // 如果有数据则遍历渲染
          ) : (
            leads.map((lead) => (
              // 渲染数据行，使用 id 作为 key，根据状态调整背景色
              <tr key={lead.id} className={`transition-colors ${lead.contacted ? 'bg-gray-50/50 opacity-70' : 'hover:bg-gray-50'}`}>
                {/* 渲染勾选框 */}
                <td className="p-4 border-b">
                  <input 
                    type="checkbox" 
                    checked={!!lead.contacted}
                    onChange={() => handleContactedChange(lead.id, !!lead.contacted)}
                    className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary cursor-pointer"
                  />
                </td>
                {/* 渲染格式化后的时间 */}
                <td className="p-4 border-b text-gray-500">{new Date(lead.createdAt).toLocaleString()}</td>
                {/* 渲染国家数据 */}
                <td className="p-4 border-b font-medium">{lead.country}</td>
                {/* 渲染数量数据 */}
                <td className="p-4 border-b">{lead.quantity}</td>
                {/* 渲染联系方式数据，未沟通时加粗显示 */}
                <td className={`p-4 border-b text-blue-600 ${!lead.contacted ? 'font-semibold' : ''}`}>{lead.contact}</td>
              {/* 结束数据行 */}
              </tr>
            ))
          )}
        {/* 结束表格主体部分 */}
        </tbody>
      {/* 结束表格元素 */}
      </table>
    {/* 结束表格卡片容器 */}
    </div>
  );
// 结束 LeadsTable 组件
}