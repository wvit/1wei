const statusCode = require('../configs/statusCode');

class Ip {
  //添加博客
  async ip(ctx) {
    const { req } = ctx;
    let ip = req.headers['x-forwarded-for'] || // 判断是否有反向代理 IP
      req.connection.remoteAddress // 判断 connection 的远程 IP
    ip = ip.split(':')[ip.split(':').length - 1];
    const resData = {
      code: statusCode.success,
      ip: [req.headers['x-forwarded-for'], req.headers['x-real-ip'], req.connection.remoteAddress],
    }
    ctx.body = resData;
  }
}

module.exports = new Ip();