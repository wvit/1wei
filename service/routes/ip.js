const Router = require("koa-router");
const { ip } = require('../controllers/ip');

const router = new Router();

//获取ip
router.get("/ip", ip);

module.exports = router;