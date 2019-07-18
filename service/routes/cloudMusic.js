const Router = require('koa-router');
const { login, record } = require('../controllers/cloudMusic');
const { tokenKey } = require('../configs/tokenConfig');
const jwt = require('koa-jwt');

const auth = jwt({
  secret: tokenKey
});
const router = new Router({
  prefix: '/app/cloudMusic'
});

//网易云音乐登录
router.post('/login', auth, login);

//获取听歌记录
router.get('/record', record);

module.exports = router;