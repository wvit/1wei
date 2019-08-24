const Router = require('koa-router');
const { hot, collections, collectionAnswers } = require('../controllers/zhihu');

const router = new Router({
  prefix: '/app/zhihu'
});

//知乎热门话题
router.get('/hot', hot);

//wv的收藏
router.get('/collections', collections);

//收藏的回答
router.get('/collectionAnswers', collectionAnswers);

module.exports = router;