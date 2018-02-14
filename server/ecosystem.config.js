module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    // {
    //   name      : 'API',
    //   script    : 'app.js',
    //   env: {
    //     COMMON_VARIABLE: 'true'
    //   },
    //   env_production : {
    //     NODE_ENV: 'production'
    //   }
    // },

    // Second application
    {
      name      : 'WEB',
      script    : 'index.js',
      max_memory_restart: "300M",
      instances  : 4,
      exec_mode  : "cluster",
      watch: true,
      env: {
        NODE_ENV: "production"
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    // "production" is the environment name
    production : {
      user : 'root',
      host : '39.106.177.59',
      ref  : 'origin/master',
      repo : 'git@github.com:lzxxxxx/zoe-home.git',
      path : '/usr/local/src',
      ssh_options: "StrictHostKeyChecking=no",
      'post-deploy' : 'cd server && npm install && pm2 reload ecosystem.config.js --env production'
    },
  }
};
