const Router = require("koa-router");
const { upload } = require('../controllers/upload');
const multer = require('koa-multer');
const whileList = require('../middleware/whiteList');
const { tokenKey } = require('../configs/tokenConfig');
const jwt = require('koa-jwt');

const router = new Router();

const auth = jwt({
  secret: tokenKey
});
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
router.post("/app/upload", auth, whileList(['wv']), file.single('file'), upload);

module.exports = router;