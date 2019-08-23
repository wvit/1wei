const Router = require('koa-router');
const { hot, collections } = require('../controllers/zhihu');

const router = new Router({
  prefix: '/app/zhihu'
});

//知乎热门话题
router.get('/hot', hot);

//wv的收藏
router.get('/collections', collections);

module.exports = router;