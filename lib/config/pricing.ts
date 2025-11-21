/**
 * 价格配置
 * 利润率和人工费可在此修改
 */

// 默认利润率（10% = 0.1）
export const DEFAULT_PROFIT_MARGIN = 0.1;

// 足米对应的空差基准值
export const STANDARD_HC = 100;

// 版布价默认人工费（元）
export const DEFAULT_SAMPLE_LABOR_FEE = 2;

/**
 * 价格配置接口
 */
export interface PricingConfig {
  profitMargin: number; // 利润率（0.1 = 10%）
  standardHc: number; // 足米基准空差值
  sampleLaborFee: number; // 版布价人工费（元）
}

/**
 * 获取当前价格配置
 * 未来可以从后台API获取
 */
export function getPricingConfig(): PricingConfig {
  // TODO: 未来可以从环境变量或API获取配置
  return {
    profitMargin: DEFAULT_PROFIT_MARGIN,
    standardHc: STANDARD_HC,
    sampleLaborFee: DEFAULT_SAMPLE_LABOR_FEE,
  };
}

/**
 * 计算显示价格
 * 公式：成本价 × (足米/空差) × (1 + 利润率)
 * 
 * @param costPrice - 成本价
 * @param hc - 空差
 * @param profitMargin - 利润率（可选，默认使用配置中的利润率）
 * @returns 显示价格（保留2位小数）
 */
export function calculateDisplayPrice(
  costPrice: number,
  hc: number,
  profitMargin?: number
): number {
  const config = getPricingConfig();
  const margin = profitMargin !== undefined ? profitMargin : config.profitMargin;
  
  // 如果没有空差信息，直接使用成本价加利润率
  if (!hc || hc <= 0) {
    return Number((costPrice * (1 + margin)).toFixed(2));
  }
  
  // 计算足米价：成本价 × (100 / 空差)
  const fullMeterPrice = costPrice * (config.standardHc / hc);
  
  // 计算显示价格：足米价 × (1 + 利润率)
  const displayPrice = fullMeterPrice * (1 + margin);
  
  return Number(displayPrice.toFixed(2));
}

/**
 * 计算版布价显示价格
 * 公式：版布成本价 + 人工费
 * 
 * @param sampleCostPrice - 版布成本价
 * @param laborFee - 人工费（可选，默认使用配置中的人工费）
 * @returns 版布显示价格
 */
export function calculateSampleDisplayPrice(
  sampleCostPrice: number,
  laborFee?: number
): number {
  const config = getPricingConfig();
  const fee = laborFee !== undefined ? laborFee : config.sampleLaborFee;
  
  return Number((sampleCostPrice + fee).toFixed(2));
}

/**
 * 批量计算产品的显示价格
 * 
 * @param product - 产品对象
 * @returns 包含计算后价格的对象
 */
export interface DisplayPrices {
  whitePrice?: number; // 白色显示价格
  colorPrice?: number; // 彩色显示价格
  basePrice: number; // 基础显示价格（用于向后兼容）
  samplePrice?: number; // 版布显示价格（成本价+人工费）
}

export function calculateProductDisplayPrices(
  product: {
    whitePrice?: number;
    colorPrice?: number;
    price: number;
    hc?: number;
    samplePrice?: number;
  }
): DisplayPrices {
  const hc = product.hc || 0;
  
  const result: DisplayPrices = {
    basePrice: calculateDisplayPrice(product.price, hc),
  };
  
  // 如果有白色成本价，计算白色显示价格
  if (product.whitePrice) {
    result.whitePrice = calculateDisplayPrice(product.whitePrice, hc);
  }
  
  // 如果有彩色成本价，计算彩色显示价格
  if (product.colorPrice) {
    result.colorPrice = calculateDisplayPrice(product.colorPrice, hc);
  }
  
  // 如果有版布成本价，计算版布显示价格（成本价+人工费）
  if (product.samplePrice) {
    result.samplePrice = calculateSampleDisplayPrice(product.samplePrice);
  }
  
  return result;
}

