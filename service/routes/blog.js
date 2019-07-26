const Router = require("koa-router");
const { add, list } = require('../controllers/blog');

const router = new Router();

//后台添加博客
router.post("/admin/blog/add", add);

//后台获取博客
router.get("/admin/blog/add", list);

//前端获取博客
router.get("/app/blog/list", list);

module.exports = router;