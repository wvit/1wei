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

//上传
router.post("/file/upload", file.single('file'), upload);

module.exports = router;