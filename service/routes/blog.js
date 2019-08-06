const Router = require("koa-router");
const { add, list, del, edit, detail } = require('../controllers/blog');

const router = new Router();

//后台添加博客
router.post("/admin/blog/add", add);

//后台删除博客
router.delete("/admin/blog/delete/:_id", del);

//后台修改博客
router.put("/admin/blog/edit", edit);

//后台获取博客
router.get("/admin/blog/list", list);

//前端获取博客
router.get("/app/blog/list", list);

//前端获取博客详情
router.get("/app/blog/detail/:_id", detail);

module.exports = router;