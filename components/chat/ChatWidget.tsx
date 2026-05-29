// 声明此文件为客户端渲染组件
"use client";

// 从 react 导入所需的 Hooks
import React, { useState, useEffect, useRef } from 'react';
// 从 lucide-react 导入图标组件，新增 Check 图标
import { MessageCircle, X, Send, Check } from 'lucide-react';
// 导入多语言 Hook
import { useTranslations } from 'next-intl';

// 定义 Message 类型
type Message = {
  // 消息的唯一 ID
  id: number;
  // 消息发送者角色（机器人或用户）
  role: 'bot' | 'user';
  // 消息的文本内容
  content: string;
// 结束 Message 类型定义
};

// 导出 ChatWidget 默认组件
export default function ChatWidget() {
  // 初始化多语言翻译函数
  const t = useTranslations('ChatWidget');

  // 定义 isOpen 状态，控制窗口打开
  const [isOpen, setIsOpen] = useState(false);
  
  // 定义 input 状态，绑定输入框
  const [input, setInput] = useState('');
  
  // 定义 step 状态，控制对话步骤
  const [step, setStep] = useState(1);
  
  // 定义 formData 状态，保存收集的信息
  const [formData, setFormData] = useState({ country: '', quantity: '', contact: '' });
  
  // 定义 messages 状态，初始化第一条消息
  const [messages, setMessages] = useState<Message[]>([
    // 初始化机器人的欢迎语，使用多语言
    { id: 1, role: 'bot', content: t('welcome') }
  // 结束 messages 初始化
  ]);
  
  // 创建用于自动滚动到底部的引用
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // 创建一个 ref 用于存储自动关闭的定时器
  const autoCloseTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 定义一个函数来重置/启动自动关闭定时器
  const resetAutoCloseTimer = () => {
    // 如果存在旧的定时器，先清除
    if (autoCloseTimerRef.current) {
      clearTimeout(autoCloseTimerRef.current);
    }
    // 如果窗口是打开的，并且对话还没有结束
    if (isOpen && step < 4) {
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
  }, [isOpen, step]);

  // 使用 useEffect 处理延迟弹出逻辑
  useEffect(() => {
    // 设置 3 秒的定时器
    const timer = setTimeout(() => {
      // 3 秒后打开聊天窗口
      setIsOpen(true);
    // 延迟时间 3000 毫秒
    }, 3000);
    // 清理定时器，防止内存泄漏
    return () => clearTimeout(timer);
  // 依赖数组为空，仅挂载时执行
  }, []);

  // 使用 useEffect 处理滚动到底部逻辑
  useEffect(() => {
    // 尝试平滑滚动到 messagesEndRef 所在位置
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  // 当 messages 或 isOpen 改变时触发
  }, [messages, isOpen]);

  // 定义发送消息的处理函数
  const handleSend = () => {
    // 如果输入为空，则直接返回
    if (!input.trim()) return;

    // 构建用户的消息对象
    const userMsg: Message = { id: Date.now(), role: 'user', content: input };
    
    // 将用户消息添加到列表中
    setMessages(prev => [...prev, userMsg]);
    
    // 清空输入框内容
    setInput('');

    // 设置 800 毫秒的延迟，模拟机器人思考
    setTimeout(() => {
      // 初始化下一条消息的内容
      let nextMsg = '';
      
      // 判断当前是否是第 1 步
      if (step === 1) {
        // 保存用户输入的国家信息
        setFormData(prev => ({ ...prev, country: userMsg.content }));
        // 设置第 2 步的话术，使用多语言
        nextMsg = t('askQuantity');
        // 将步骤推进到 2
        setStep(2);
      // 判断当前是否是第 2 步
      } else if (step === 2) {
        // 保存用户输入的数量信息
        setFormData(prev => ({ ...prev, quantity: userMsg.content }));
        // 设置第 3 步的话术，使用多语言
        nextMsg = t('askContact');
        // 将步骤推进到 3
        setStep(3);
      // 判断当前是否是第 3 步
      } else if (step === 3) {
        // 保存用户输入的联系方式
        setFormData(prev => ({ ...prev, contact: userMsg.content }));
        // 设置结束语，使用多语言
        nextMsg = t('thankYou');
        // 将步骤推进到 4，表示结束
        setStep(4);
        
        // 组装完整的留资数据对象
        const finalData = { ...formData, contact: userMsg.content };
        // 打印留资信息（开发调试用）
        console.log('留资信息收集完成，准备提交:', finalData);
        
        // 异步向后台 API 发送 POST 请求
        fetch('/api/leads', {
          // 指定请求方法为 POST
          method: 'POST',
          // 设置请求头表明发送 JSON 数据
          headers: { 'Content-Type': 'application/json' },
          // 将最终数据转为字符串作为请求体
          body: JSON.stringify(finalData)
        // 结束 fetch 请求并捕获异常
        }).catch(err => console.error('提交失败:', err));
        
      // 如果是其他步骤
      } else {
        // 设置默认闲聊回复，使用多语言
        nextMsg = t('defaultReply');
      // 结束 if 判断
      }

      // 将机器人的回复添加到消息列表中
      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'bot', content: nextMsg }]);
    // 延迟 800 毫秒
    }, 800);
  // 结束 handleSend 函数
  };

  // 定义键盘按下事件的处理函数
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // 如果按下的键是 Enter
    if (e.key === 'Enter') {
      // 调用发送消息函数
      handleSend();
    // 结束 if 判断
    }
  // 结束 handleKeyDown 函数
  };

  // 返回组件的 JSX 结构
  return (
    // 外层容器，固定在页面右下角
    <div className="fixed bottom-6 right-6 z-50">
      
      {/* 当窗口打开时渲染以下内容 */}
      {isOpen && (
        // 聊天窗口的主体容器，设置宽高、阴影及动画
        <div className="bg-white w-80 sm:w-96 shadow-2xl rounded-2xl overflow-hidden flex flex-col border border-gray-200 mb-4 animate-in slide-in-from-bottom-5 duration-300">
          
          {/* 聊天窗口的头部区域 */}
          <div className="bg-primary text-primary-foreground px-4 py-3 flex justify-between items-center">
            {/* 显示客服中心的标题，使用多语言 */}
            <span className="font-semibold text-sm">{t('title')}</span>
            {/* 关闭按钮，点击时设置 isOpen 为 false */}
            <button onClick={() => setIsOpen(false)} className="hover:text-primary-foreground/80 transition-colors">
              {/* 渲染 X 图标 */}
              <X size={18} />
            {/* 结束按钮标签 */}
            </button>
          {/* 结束头部容器 */}
          </div>

          {/* 聊天消息流区域，支持滚动 */}
          <div className="h-80 overflow-y-auto p-4 flex flex-col gap-3 bg-gray-50 text-sm">
            {/* 遍历消息列表 */}
            {messages.map((msg) => (
              /* 每条消息的容器 */
              <div
                key={msg.id}
                className={`max-w-[85%] p-3 rounded-xl ${
                  msg.role === 'bot'
                    ? 'bg-white text-gray-800 self-start border border-gray-100 rounded-tl-none shadow-sm'
                    : 'bg-primary text-primary-foreground self-end rounded-tr-none shadow-sm'
                }`}
              >
                {/* 渲染消息内容 */}
                {msg.content}
              {/* 结束消息容器 */}
              </div>
            ))}
            {/* 渲染用于滚动的空白锚点元素 */}
            <div ref={messagesEndRef} />
          {/* 结束消息流容器 */}
          </div>

          {/* 输入框和发送按钮区域 */}
          <div className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
            {/* 文本输入框 */}
            <input
              type="text"
              className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-sm transition-all"
              // 动态显示占位符，使用多语言
              placeholder={step === 4 ? t('placeholderEnded') : t('placeholderActive')}
              value={input}
              // 当输入变化时更新状态，并重置自动关闭定时器
              onChange={(e) => {
                setInput(e.target.value);
                resetAutoCloseTimer();
              }}
              onKeyDown={handleKeyDown}
              // 当输入框获取焦点时，也重置定时器
              onFocus={() => resetAutoCloseTimer()}
              disabled={step === 4}
            />
            {/* 发送按钮 */}
            <button
              onClick={handleSend}
              disabled={step === 4 || !input.trim()}
              className="p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {/* 渲染发送图标 */}
              <Send size={16} />
            {/* 结束 button 标签 */}
            </button>
          {/* 结束输入区域容器 */}
          </div>
        {/* 结束聊天窗口主体容器 */}
        </div>
      )}

      {/* 当窗口关闭时渲染悬浮按钮 */}
      {!isOpen && (
        /* 悬浮按钮，点击时打开窗口 */
        <button
          onClick={() => setIsOpen(true)}
          // 动态设置悬浮按钮样式：如果对话未结束则添加弹跳动画，否则移除
          className={`bg-primary hover:bg-primary/90 text-primary-foreground p-4 rounded-full shadow-xl transition-all hover:scale-105 flex items-center justify-center ${step !== 4 ? 'animate-bounce' : ''}`}
        >
          {/* 根据对话步骤渲染不同的图标：结束渲染打勾，否则渲染气泡 */}
          {step === 4 ? <Check size={24} /> : <MessageCircle size={24} />}
        {/* 结束 button 标签 */}
        </button>
      )}
      
    {/* 结束外层容器 */}
    </div>
  // 结束 return 语句
  );
// 结束 ChatWidget 组件
}