const fs = require('fs');

//注册路由
module.exports = app => {
  fs.readdirSync(__dirname).forEach(file => {
    if (file === 'index.js') return;
    const router = require(`./${file}`);
    app.use(router.routes()).use(router.allowedMethods());
  })
}