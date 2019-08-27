const Router = require("koa-router");
const Axios = require("axios");
const ReqLogs = require('../models/reqLogs');
const { getDate } = require("../utils/util");
const { amap: { baseURL, key } } = require('../configs/thirdPartyConfig');

const router = new Router();
const axios = Axios.create({
  baseURL,
  withCredentials: true
})

//请求过滤
router.all('*', async (ctx, next) => {
  const { req: { headers, connection }, request: { header, url } } = ctx;
  const userAgent = header['user-agent'];
  const referer = header['referer'];
  const reqDate = getDate(Date.now(), true);
  // 判断是否有反向代理 IP和 connection 的远程 IP
  let ip = headers['x-forwarded-for'] || connection.remoteAddress;
  ip = ip.split(':')[ip.split(':').length - 1];
  const { data: { city } } = await axios.get(`/v3/ip?key=${key}&ip=${ip}`);
  new ReqLogs({ ip, url, city, userAgent, referer, reqDate }).save();
  await next();
});


module.exports = router;