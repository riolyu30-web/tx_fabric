/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // 配置外部图片域名
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

module.exports = nextConfig

