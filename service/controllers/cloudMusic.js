const Axios = require('axios');
const Redis = require('koa-redis');
const jsonwebtoken = require('jsonwebtoken');
const statusCode = require('../configs/statusCode');
const { tokenKey, expiresIn } = require('../configs/tokenConfig');
const { cloudMusic: { baseURL, nickname } } = require('../configs/thirdPartyConfig');

const Store = new Redis().client;
const axios = Axios.create({
  baseURL,
  withCredentials: true
})

class CloudMusic {
  //用户第三方网易云登录 
  async login(ctx) {
    ctx.verifyParams({
      phone: { type: 'number', required: true },
      password: { type: 'string', required: true }
    });
    const { phone, password } = ctx.request.body;
    const res = await axios.get(`/login/cellphone?phone=${phone}&password=${password}`);
    const uid = res.data.account.id;
    Store.hmset(
      `cloudMusic:${uid}`,
      'uid', uid,
      'cookie', res.headers['set-cookie']
    );
    Store.expire(`cloudMusic:${uid}`, expiresIn);
    ctx.body = {
      code: statusCode.success,
      data: res.data,
      msg: `云音乐登录成功`
    }
  }
  //获取用户听歌记录
  async record(ctx) {
    ctx.verifyParams({
      uid: { type: 'number', required: true },
      type: { type: 'number', required: true },
    });
    const { type, uid } = ctx.request.query;
    const resData = {
      code: statusCode.success,
      msg: '获取成功'
    }
    const cookie = await Store.hget(`cloudMusic:${uid}`, 'cookie');
    const res = await axios.get(`/user/record?uid=${uid}&type=${type}`, {
      headers: { cookie }
    });
    resData.data = res.data;
    ctx.body = resData;
  }
  // 获取wv的听歌记录
  async wvRecord(ctx) {
    ctx.verifyParams({
      type: { type: 'string', required: true },
    });
    const { type } = ctx.request.query;
    const resData = {
      code: statusCode.paramsErr,
      msg: '参数值错误'
    }
    if (type === 'weekData' || 'allData') {
      let _id = null;
      if (type === 'weekData') {
        try {
          const token = ctx.headers.authorization.split(' ')[1];
          _id = await jsonwebtoken.verify(token, tokenKey)._id;
        } catch (e) {
          resData.code = statusCode.signInErr;
          resData.data = [];
          resData.msg = '获取最近记录，需要登录1wei';
        }
      }
      if ((type === 'allData') || _id) {
        resData.code = statusCode.success;
        resData.data = JSON.parse(await Store.hget(`cloudMusic:${nickname}`, type));
        resData.msg = '获取成功';
      }
    }
    ctx.body = resData;
  }
  // 获取歌曲详情
  async musicData(ctx) {
    ctx.verifyParams({
      ids: { type: 'string', required: true },
    });
    const resData = {
      code: statusCode.success
    }
    const { ids } = ctx.request.query;
    const { data } = await axios.get(`/song/detail?ids=${ids}`);
    resData.data = data;
    ctx.body = resData;
  }
}

module.exports = new CloudMusic();