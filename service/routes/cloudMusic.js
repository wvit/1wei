const Router = require('koa-router');
const { login, record, wvRecord, musicData } = require('../controllers/cloudMusic');

const router = new Router({
  prefix: '/app/cloudMusic'
});

//网易云音乐第三方登录
router.post('/login', login);

//获取用户听歌记录
router.get('/record', record);

//获取wv听歌记录
router.get('/wvRecord', wvRecord);

//获取歌曲详情
router.get('/musicData', musicData);

module.exports = router;