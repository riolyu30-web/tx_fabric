// 声明此文件为客户端渲染组件
"use client";

// 从 react 导入所需的 Hooks
import React, { useState, useEffect, useRef } from 'react';
// 从 lucide-react 导入图标组件
import { MessageCircle, X, Check, HeartHandshake, CheckCircle2 } from 'lucide-react';
// 导入多语言 Hook
import { useTranslations } from 'next-intl';

// 导出 ChatWidget 默认组件
export default function ChatWidget() {
  // 初始化多语言翻译函数
  const t = useTranslations('ChatWidget');

  // 定义 isOpen 状态，控制窗口打开
  const [isOpen, setIsOpen] = useState(false);
  
  // 定义 isSubmitted 状态，判断是否已提交留资
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // 定义 formData 状态，保存收集的信息（国家和联系方式均为选填）
  const [formData, setFormData] = useState({ country: '', contact: '' });
  
  // 创建一个 ref 用于存储自动关闭的定时器
  const autoCloseTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 定义一个函数来重置/启动自动关闭定时器
  const resetAutoCloseTimer = () => {
    // 如果存在旧的定时器，先清除
    if (autoCloseTimerRef.current) {
      clearTimeout(autoCloseTimerRef.current);
    }
    // 如果窗口是打开的，并且表单还没有提交
    if (isOpen && !isSubmitted) {
      // 设置 10 秒后自动关闭窗口
      autoCloseTimerRef.current = setTimeout(() => {
        setIsOpen(false);
      }, 10000); // 10000 毫秒 = 10 秒
    }
  };

  // 监听窗口打开状态，如果打开则启动定时器
  useEffect(() => {
    if (isOpen) {
      resetAutoCloseTimer();
    } else {
      // 如果窗口关闭，清除定时器
      if (autoCloseTimerRef.current) {
        clearTimeout(autoCloseTimerRef.current);
      }
    }
    
    // 组件卸载时清理定时器
    return () => {
      if (autoCloseTimerRef.current) {
        clearTimeout(autoCloseTimerRef.current);
      }
    };
  }, [isOpen, isSubmitted]);

  // 延迟 3 秒自动弹出窗口
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // 处理表单提交的函数
  const handleSubmit = (e: React.FormEvent) => {
    // 阻止表单默认刷新行为
    e.preventDefault();
    
    // 如果没有提交过，则进行提交
    if (!isSubmitted) {
      // 设置为已提交状态
      setIsSubmitted(true);
      
      // 打印留资信息（开发调试用）
      console.log('留资信息收集完成，准备提交:', formData);
      
      // 异步向后台 API 发送 POST 请求
      fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // 发送数据，为了兼容后端的 API 结构，补充一个空的 quantity 字段
        body: JSON.stringify({ ...formData, quantity: '' })
      }).catch(err => console.error('提交失败:', err));
    }
  };

  // 返回组件的 JSX 结构
  return (
    // 外层容器，固定在页面右下角
    <div className="fixed bottom-6 right-6 z-50">
      
      {/* 当窗口打开时渲染以下内容 */}
      {isOpen && (
        // 弹出窗口的主体容器，设置宽高、阴影及动画
        <div className="bg-white w-80 sm:w-96 shadow-2xl rounded-2xl overflow-hidden flex flex-col border border-gray-200 mb-4 animate-in slide-in-from-bottom-5 duration-300">
          
          {/* 窗口的头部区域 */}
          <div className="bg-primary text-primary-foreground px-4 py-3 flex justify-between items-center">
            {/* 显示标题，使用多语言 */}
            <span className="font-semibold text-sm flex items-center gap-2">
              {t('title')}
            </span>
            {/* 关闭按钮，点击时设置 isOpen 为 false */}
            <button onClick={() => setIsOpen(false)} className="hover:text-primary-foreground/80 transition-colors">
              {/* 渲染 X 图标 */}
              <X size={18} />
            {/* 结束按钮标签 */}
            </button>
          {/* 结束头部容器 */}
          </div>

          {/* 内容区域 */}
          <div className="p-6 bg-gray-50 flex flex-col">
            {/* 如果未提交，显示表单 */}
            {!isSubmitted ? (
              <>
                {/* 欢迎图标和文案 */}
                <div className="mb-6 text-center">
                  {/* 友好的握手图标 */}
                  <HeartHandshake className="text-primary mx-auto mb-3" size={40} />
                  {/* 欢迎大标题 */}
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{t('welcomeTitle')}</h3>
                  {/* 欢迎描述说明 */}
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {t('welcomeDesc')}
                  </p>
                {/* 结束欢迎区域 */}
                </div>

                {/* 留资表单 */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {/* 国家/地区输入组 */}
                  <div className="flex flex-col gap-1.5">
                    {/* 标签 */}
                    <label className="text-xs font-semibold text-gray-700">{t('countryLabel')}</label>
                    {/* 输入框 */}
                    <input
                      type="text"
                      className="px-3 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all"
                      placeholder={t('countryPlaceholder')}
                      value={formData.country}
                      onChange={(e) => {
                        setFormData({ ...formData, country: e.target.value });
                        resetAutoCloseTimer();
                      }}
                      onFocus={resetAutoCloseTimer}
                    />
                  {/* 结束输入组 */}
                  </div>

                  {/* 联系方式输入组 */}
                  <div className="flex flex-col gap-1.5">
                    {/* 标签 */}
                    <label className="text-xs font-semibold text-gray-700">{t('contactLabel')}</label>
                    {/* 输入框 */}
                    <input
                      type="text"
                      className="px-3 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all"
                      placeholder={t('contactPlaceholder')}
                      value={formData.contact}
                      onChange={(e) => {
                        setFormData({ ...formData, contact: e.target.value });
                        resetAutoCloseTimer();
                      }}
                      onFocus={resetAutoCloseTimer}
                    />
                  {/* 结束输入组 */}
                  </div>

                  {/* 提交按钮 */}
                  <button
                    type="submit"
                    className="mt-2 w-full py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
                  >
                    {t('submitBtn')}
                  </button>
                {/* 结束表单 */}
                </form>
              </>
            ) : (
              // 如果已提交，显示成功状态
              <div className="py-8 text-center flex flex-col items-center justify-center animate-in fade-in duration-500">
                {/* 成功打勾图标 */}
                <CheckCircle2 className="text-primary mb-4" size={56} />
                {/* 成功大标题 */}
                <h3 className="text-xl font-bold text-gray-800 mb-2">{t('submittedTitle')}</h3>
                {/* 成功描述说明 */}
                <p className="text-sm text-gray-500 leading-relaxed">
                  {t('submittedDesc')}
                </p>
              {/* 结束成功状态容器 */}
              </div>
            )}
          {/* 结束内容区域 */}
          </div>
        {/* 结束弹出窗口主体容器 */}
        </div>
      )}

      {/* 当窗口关闭时渲染悬浮按钮 */}
      {!isOpen && (
        /* 悬浮按钮，点击时打开窗口 */
        <button
          onClick={() => setIsOpen(true)}
          // 动态设置悬浮按钮样式：改为药丸形状 (pill shape) 并增加左右内边距
          className={`bg-primary hover:bg-primary/90 text-primary-foreground py-3 px-5 rounded-full shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-2 ${!isSubmitted ? 'animate-bounce' : ''}`}
        >
          {/* 根据提交状态渲染不同的图标：已提交渲染打勾，否则渲染气泡 */}
          {isSubmitted ? <Check size={20} /> : <MessageCircle size={20} />}
          {/* 渲染旁边的引导文字 */}
          <span className="font-medium text-sm whitespace-nowrap">{t('floatingText')}</span>
        {/* 结束 button 标签 */}
        </button>
      )}
      
    {/* 结束外层容器 */}
    </div>
  // 结束 return 语句
  );
// 结束 ChatWidget 组件
}
