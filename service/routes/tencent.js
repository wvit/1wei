const Router = require("koa-router");
const { tencentSignIn } = require('../controllers/tencent');

const router = new Router({
  prefix: '/app/tencent'
});

//用户微信登录请求
router.post("/wxSignIn", async ctx => await tencentSignIn(ctx, 'wx'));

//用户qq登录请求
router.post("/qqSignIn", async ctx => await tencentSignIn(ctx, 'qq'));

module.exports = router;