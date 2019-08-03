const interfaces = require('os').networkInterfaces();

const production = process.env.NODE_ENV === 'production' ? true : false;

module.exports = {
  dbs: 'mongodb://localhost/1weiDB',
  production,
  server: {
    //启动服务地址
    get host() {
      let ip = '';
      for (let devName in interfaces) {
        interfaces[devName].forEach(item => {
          if (item.family === 'IPv4' && item.address !== '127.0.0.1') {
            ip = item.address;
          }
        })
      }
      return production ? '1wei.cc' : ip;
    },
    //端口
    get port() {
      return 1999
    },
    //远程地址
    get address() {
      return `${production ? 'https' : 'http'}://${this.host}:${this.port}`
    }
  },
  //qq邮箱配置
  smtp: {
    get host() {
      return 'smtp.qq.com'
    },
    get port() {
      return 587
    },
    get user() {
      return '941765361@qq.com'
    },
    get pass() {
      return 'rdpouyhapiejbfej'
    },
    get code() {
      return () => Math.random().toString().slice(3, 9)

    },
    get expire() {
      return () => Date.now() + 1000 * 60 * 3
    },
    get deleteTime() {
      return 60 * 60 * 2
    }
  }
}
