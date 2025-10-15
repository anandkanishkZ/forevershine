module.exports = {
  apps: [
    {
      name: 'forevershine-backend',
      script: './dist/server.js',
      cwd: '/var/www/forevershine/backend',
      instances: 2,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 5000
      },
      error_file: '/var/log/forevershine/backend-error.log',
      out_file: '/var/log/forevershine/backend-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      autorestart: true,
      max_memory_restart: '1G',
      watch: false,
      max_restarts: 10,
      min_uptime: '10s',
      listen_timeout: 3000,
      kill_timeout: 5000
    },
    {
      name: 'forevershine-frontend',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/forevershine/frontend',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      error_file: '/var/log/forevershine/frontend-error.log',
      out_file: '/var/log/forevershine/frontend-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      autorestart: true,
      max_memory_restart: '1G',
      watch: false,
      max_restarts: 10,
      min_uptime: '10s'
    }
  ]
};
