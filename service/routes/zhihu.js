const Router = require('koa-router');
const { hot } = require('../controllers/zhihu');

const router = new Router({
  prefix: '/app/zhihu'
});

//知乎热门话题
router.get('/hot', hot);

module.exports = router;