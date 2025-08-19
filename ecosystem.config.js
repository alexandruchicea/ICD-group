module.exports = {
  apps: [
    {
      name: "icd-client",
      cwd: "./client",
      script: "npm",
      args: "run serve:ssr:client",
      instances: 1,
      autorestart: true,
      watch: false,
      restart_delay: 3000,
      min_uptime: "30s",
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: 4000,
        SERVE_STATIC: true,
      },
      env_development: {
        NODE_ENV: "development",
        PORT: 4000,
        SERVE_STATIC: true,
      },
      log_file: "./logs/client-combined.log",
      out_file: "./logs/client-out.log",
      error_file: "./logs/client-error.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
    },
    {
      name: "icd-server",
      cwd: "./server/dist",
      script: "server.js",
      instances: 1,
      autorestart: true,
      watch: false,
      restart_delay: 3000,
      min_uptime: "30s",
      max_memory_restart: "3G",
      env: {
        NODE_ENV: "production",
        PORT: 5000,
      },
      env_development: {
        NODE_ENV: "development",
        PORT: 5000,
      },
      log_file: "./logs/server-combined.log",
      out_file: "./logs/server-out.log",
      error_file: "./logs/server-error.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
    }
  ],
};
