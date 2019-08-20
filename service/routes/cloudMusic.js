const Router = require('koa-router');
const { login, record, wvRecord } = require('../controllers/cloudMusic');

const router = new Router({
  prefix: '/app/cloudMusic'
});

//网易云音乐第三方登录
router.post('/login', login);

//获取用户听歌记录
router.get('/record', record);

//获取wv听歌记录
router.get('/wvRecord', wvRecord);

module.exports = router;