const Axios = require('axios');
const zhihu = require('zhihu');
const statusCode = require('../configs/statusCode');
const { zhihu: { baseURL, cookie, userName } } = require('../configs/thirdPartyConfig');

const axios = Axios.create({
  baseURL,
  withCredentials: true
})

class Zhihu {
  // 知乎热门话题
  async hot(ctx) {
    try {
      const res = await axios.get(`/api/v3/feed/topstory/hot-lists/total?limit=50&desktop=true`, {
        headers: { cookie }
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
  // 收藏
  async collections(ctx) {
    const { data } = await axios.get(`/api/v4/members/${userName}/favlists?offset=0&limit=100`);
    ctx.body = {
      code: statusCode.success,
      data: data
    }
  }

}

module.exports = new Zhihu();