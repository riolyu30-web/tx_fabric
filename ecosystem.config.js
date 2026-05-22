module.exports = {
  apps: [{
    name: 'tx_fabric',
    script: 'node_modules/next/dist/bin/next', // 推荐：直接指向 Next.js 运行文件
    args: 'start',
    cwd: '/var/www/tx_fabric',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 9090  // 修改为9090端口
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
};