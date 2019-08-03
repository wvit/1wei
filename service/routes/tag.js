const Router = require("koa-router");
const { add, del, edit, list } = require('../controllers/tag');

const router = new Router();

// 添加标签
router.post("/admin/tag/add", add);

// 删除标签
router.delete("/admin/tag/delete/:_id", del);

// 修改标签
router.put("/admin/tag/edit", edit);

// 后台获取标签列表
router.get("/admin/tag/list", list);

// 前端获取标签列表
router.get("/app/tag/list", list);

module.exports = router;