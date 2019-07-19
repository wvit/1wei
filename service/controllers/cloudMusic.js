const Axios = require('axios');
const Redis = require('koa-redis');
const statusCode = require('../configs/statusCode');
const jsonwebtoken = require('jsonwebtoken');
const { tokenKey, expiresIn } = require('../configs/tokenConfig');

const Store = new Redis().client;
const axios = Axios.create({
  baseURL: 'http://127.0.0.1:3000',
  withCredentials: true
})

class CloudMusic {
  //网易云登录
  async login(ctx) {
    try {
      const _id = ctx.state.user._id;
      const res = await axios.get(`/login/cellphone?phone=13890774972&password=wuwei19991024`);
      Store.hmset(
        `cloudMusic:${_id}`,
        'uid', res.data.account.id,
        'cookie', res.headers['set-cookie']
      );
      Store.expire(`cloudMusic:${_id}`, expiresIn);
      ctx.body = {
        code: statusCode.success,
        msg: `云音乐登录成功`
      }
    } catch (err) {
      ctx.body = {
        code: statusCode.error,
        msg: err.response.data.msg
      }
    }
  }
  //获取听歌记录
  async record(ctx) {
    const { type = 0 } = ctx.request.query;
    const resData = {
      code: statusCode.success
    }
    try {
      const token = ctx.headers.authorization.split(' ')[1];
      const _id = await jsonwebtoken.verify(token, tokenKey)._id;
      const uid = await Store.hget(`cloudMusic:${_id}`, 'uid');
      const cookie = await Store.hget(`cloudMusic:${_id}`, 'cookie');
      const res = await axios.get(`/user/record?uid=${uid}&type=${type}`, { headers: { cookie } });
      resData.data = res.data;
    } catch (err) {
      const res = await axios.get(`/user/record?uid=303276336&type=${type}`);
      resData.data = res.data;
    }
    ctx.body = resData;
  }
}

module.exports = new CloudMusic();