const Router = require("koa-router");
const { signIn } = require('../controllers/wechat');

const router = new Router({
  prefix: '/app/wechat'
});

//用户微信登录请求
router.post("/signIn", signIn);

module.exports = router;