const Koa = require('koa');
const https = require('https');
const path = require('path');
const fs = require('fs');
const cors = require('koa2-cors');
const static = require('koa-static');
const bodyParser = require('koa-bodyparser');
const parameter = require('koa-parameter');
const mongoose = require('mongoose');
const sslify = require('koa-sslify').default;
const routing = require('./routes/index');
const statusCode = require('./configs/statusCode');
const {
  dbs,
  server,
  production
} = require('./configs/serverConfig');

const app = new Koa();
const httpsConfig = {
  key: fs.readFileSync(path.join(__dirname, './ssl/1wei.cc.key')),
  cert: fs.readFileSync(path.join(__dirname, './ssl/1wei.cc.pem'))
};

mongoose.connect(dbs, {
  useNewUrlParser: true,
  useCreateIndex: true
}, err => {
  const msg = err ? '数据库发生错误' : '数据库链接成功';
  console.log(msg, dbs)
});

app.use((ctx, next) => {
  return next().catch(err => {
    if (err.status === 401) {
      ctx.status = 200;
      ctx.body = {
        code: statusCode.authErr,
        msg: '授权认证失败'
      };
    }
  });
});
app.use(cors());
app.use(bodyParser());
app.use(parameter(app));
app.use(static(path.join(__dirname, './statics')));
routing(app);

if (production) {
  app.use(sslify());
  https.createServer(httpsConfig, app.callback()).listen(server.port, () => {
    console.log('https服务已启动', `${server.address}`)
  });
} else {
  app.listen(server.port, server.host, () => {
    console.log('服务已启动', `${server.address}`)
  });
}