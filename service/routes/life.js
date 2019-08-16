const Router = require("koa-router");
const { add, list, del, edit } = require('../controllers/life');
const whileList= require('../middleware/whiteList');

const router = new Router();

//后台删除生活
router.delete("/admin/life/delete/:_id", del);

//后台修改生活
router.put("/admin/life/edit", edit);

//后台获取生活
router.get("/admin/life/list", list);

//前台添加生活
router.post("/app/life/add", add);

//前台获取生活
router.get("/app/life/list", list);

module.exports = router;