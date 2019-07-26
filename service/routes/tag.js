const Router = require("koa-router");
const { add, del, list } = require('../controllers/tag');

const router = new Router({
  prefix: '/admin/tag'
});

//添加标签
router.post("/add", add);

//删除标签
router.delete("/delete", del);

//获取标签列表
router.get("/list", list);

module.exports = router;