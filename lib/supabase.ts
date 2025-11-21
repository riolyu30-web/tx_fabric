import { createClient } from '@supabase/supabase-js'

// Supabase 配置（可选功能，用于后续扩展）
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// 创建 Supabase 客户端
export const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null

// 注意：当前为 demo 版本，暂不需要配置 Supabase
// 如需启用，请在 .env.local 文件中添加：
// NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
// NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

