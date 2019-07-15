const Router = require("koa-router");
const { signIn, signUp, sendCode, getUserInfo } = require('../controllers/user');
const { tokenKey } = require('../configs/secretKey');
const jwt = require('koa-jwt');

const router = new Router({
  prefix: '/app/user'
});
const auth = jwt({
  secret: tokenKey
});

//发送邮箱验证码
router.post("/sendCode", sendCode);

//用户注册请求
router.post("/signUp", signUp);

//用户登录请求
router.post("/signIn", signIn);

//获取用户信息
router.get("/info", auth, getUserInfo);

module.exports = router;