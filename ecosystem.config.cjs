module.exports = {
  apps: [
    {
      name: '01studio-me',
      script: 'pnpm',
      args: 'dev',
      cwd: '/root/01studio/me',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: '3002',
        HOSTNAME: '0.0.0.0'
      },
      error_file: '/root/01studio/me/logs/pm2-error.log',
      out_file: '/root/01studio/me/logs/pm2-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      autorestart: true,
      max_memory_restart: '1000M',
      watch: false,
      ignore_watch: ['node_modules', 'logs', '*.log', '.next']
    }
  ]
};

