const Router = require("koa-router");
const {
  signIn,
  signUp
} = require('../controllers/user');

const router = new Router({
  prefix: '/app/user'
});

//用户注册请求
router.post("/signUp", signUp);

//用户登录请求
router.post("/signIn", signIn);

module.exports = router;