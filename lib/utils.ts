import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// 合并 Tailwind CSS 类名的工具函数
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

import zhPrice from "@/data/locales/zh/price.json"
import enPrice from "@/data/locales/en/price.json"

export function getPriceConfig(locale: string) {
  if (locale === 'zh') return zhPrice;
  // 默认返回英文配置（包括 vi 和其他语言）
  return enPrice;
}

// 格式化价格（根据当前语言环境和汇率）
export function formatPrice(price: number, locale: string = 'zh'): string {
  const config = getPriceConfig(locale);
  const convertedPrice = price * config.exchangeRate;
  return `${config.currencySymbol}${convertedPrice.toFixed(2)}`;
}

// 生成商品 slug
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

// 获取用于显示的有效图片（排除 index 和 part 前缀）
export function getDisplayImages(images: string[] = []): string[] {
  return images.filter(img => {
    const filename = img.split('/').pop() || '';
    return !filename.startsWith('index') && !filename.startsWith('part');
  });
}

// 获取第一张用于显示的有效图片
export function getPrimaryImage(images: string[] = []): string {
  const displayImages = getDisplayImages(images);
  return displayImages.length > 0 ? displayImages[0] : (images[0] || "/placeholder.png");
}

// 获取详情图（仅包含 part 前缀）
export function getDetailImages(images: string[] = []): string[] {
  return images.filter(img => {
    const filename = img.split('/').pop() || '';
    return filename.startsWith('part');
  });
}

