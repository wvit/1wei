const Router = require('koa-router');
const { hot, collections, collectionAnswers, answersDetail } = require('../controllers/zhihu');

const router = new Router({
  prefix: '/app/zhihu'
});

//知乎热门话题
router.get('/hot', hot);

//wv的收藏
router.get('/collections', collections);

//收藏的回答
router.get('/collectionAnswers', collectionAnswers);

//获取回答详情
router.get("/answersDetail/:id", answersDetail);

module.exports = router;