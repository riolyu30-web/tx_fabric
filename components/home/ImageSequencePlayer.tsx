"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface ImageSequencePlayerProps { // 定义组件属性接口
  images: string[] // 图片路径数组
  interval?: number // 切换间隔时间（毫秒）
  title?: string // 标题文本
  initialDelay?: number // 初始延迟时间，用于错开动画
} // 接口定义结束

export default function ImageSequencePlayer({ images, interval = 1000, title, initialDelay = 0 }: ImageSequencePlayerProps) { // 导出组件并解构属性，默认间隔1000ms，默认延迟0ms
  const [currentIndex, setCurrentIndex] = useState(0) // 状态：当前显示的图片索引，初始为0

  useEffect(() => { // 使用副作用钩子处理定时器
    if (!images || images.length === 0) return // 如果没有图片或图片数组为空，则直接返回不执行

    let timer: ReturnType<typeof setInterval> // 声明间隔定时器变量
    let delayTimer: ReturnType<typeof setTimeout> // 声明延迟定时器变量

    const startInterval = () => { // 定义启动间隔定时器的函数
      timer = setInterval(() => { // 设置间隔定时器
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length) // 更新索引为下一张图片的索引（循环）
      }, interval) // 间隔时间为传入的 interval
    } // 启动间隔定时器函数结束

    if (initialDelay > 0) { // 如果设置了初始延迟时间大于0
      delayTimer = setTimeout(() => { // 设置延迟定时器
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length) // 延迟结束后，先切换一次图片
        startInterval() // 然后启动间隔定时器
      }, initialDelay) // 延迟时间为传入的 initialDelay
    } else { // 如果没有设置初始延迟时间或延迟为0
      startInterval() // 直接启动间隔定时器
    } // 延迟判断结束

    return () => { // 返回清理函数
      if (delayTimer) clearTimeout(delayTimer) // 如果有延迟定时器，则清除
      if (timer) clearInterval(timer) // 如果有间隔定时器，则清除
    } // 清理函数结束
  }, [images, interval, initialDelay]) // 依赖项：图片数组、间隔时间、初始延迟时间

  if (!images || images.length === 0) {
    return <div className="w-full aspect-square bg-gray-100 flex items-center justify-center rounded-lg text-gray-400">暂无图片</div>
  }

  return (
    <div className="flex flex-col gap-4">
      {title && <h3 className="text-xl font-semibold text-center text-gray-800">{title}</h3>}
      <div className="relative w-full aspect-square rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-gray-100">
        {images.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt={`Factory view ${index + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className={`object-cover ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            priority={true}
            unoptimized={true}
          />
        ))}
      </div>
    </div>
  )
}
