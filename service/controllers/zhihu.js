const Axios = require('axios');
const statusCode = require('../configs/statusCode');
const { zhihu: { baseURL, cookie } } = require('../configs/thirdPartyConfig');

const axios = Axios.create({
  baseURL,
  withCredentials: true
})

class Zhihu {
  //网易云登录
  async hot(ctx) {
    try {
      const res = await axios.get(`/api/v3/feed/topstory/hot-lists/total?limit=50&desktop=true`, {
        headers: {
          cookie
        }
      });
      ctx.body = {
        code: statusCode.success,
        data: res.data
      }
    } catch (err) {
      ctx.body = {
        code: statusCode.error,
        msg: '获取失败'
      }
    }
  }
}

module.exports = new Zhihu();