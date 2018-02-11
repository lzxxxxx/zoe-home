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
      script    : "/root/nova/app.js",//?
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
  // deploy : {
  //   // "production" is the environment name
  //   production : {
  //     user : 'root',
  //     host : '39.106.177.59',
  //     ref  : 'origin/master',
  //     repo : 'git@github.com:lzxxxxx/zoe-home.git',
  //     path : '放到服务器的某个目录，注意需要赋予读写权限777',
  //     ssh_options: "StrictHostKeyChecking=no",
  //     'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
  //   },
  // }
};
