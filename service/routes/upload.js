const Router = require("koa-router");
const { upload } = require('../controllers/upload');
const multer = require('koa-multer');

const router = new Router();
const storage = multer.diskStorage({
  //文件保存路径
  destination(req, file, cb) {
    cb(null, 'statics/uploadFiles/')
  },
  //修改文件名称
  filename(req, file, cb) {
    cb(null, file.originalname);
  }
})
const file = multer({ storage });

//后台文件上传
router.post("/admin/upload", file.single('file'), upload);

//前台文件上传
router.post("/app/upload", file.single('file'), upload);

module.exports = router;