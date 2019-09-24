const jsonwebtoken = require('jsonwebtoken');
const Axios = require('axios');
const TencentUsers = require('../models/tencentUsers');
const statusCode = require('../configs/statusCode');
const WXBizDataCrypt = require('../utils/WXBizDataCrypt');
const { getDate } = require('../utils/util');
const { wechat, qq } = require('../configs/thirdPartyConfig');
const { tokenKey, expiresIn } = require('../configs/tokenConfig');

const wxAxios = Axios.create({
  baseURL: 'https://api.weixin.qq.com'
})
const qqAxios = Axios.create({
  baseURL: 'https://api.q.qq.com'
})
const getReqData = (type, js_code) => {
  const { appid, secret } = type === 'qq' ? qq : wechat;
  const req = type === 'qq' ? qqAxios : wxAxios;
  return {
    appid,
    secret,
    getOpenid() {
      return req.get(`/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${js_code}&grant_type=authorization_code`)
    },
    getAccessToken() {
      // const { data: { access_token } } = await getAccessToken();
      return req.get(`${type === qq ? '/api/getToken' : '/cgi-bin/token'}?grant_type=client_credential&appid=${appid}&secret=${secret}`)
    }
  }
}

//腾讯
class Tencent {
  // 腾讯产品的登录
  async tencentSignIn(ctx, type) {
    ctx.verifyParams({
      js_code: { type: 'string', required: true },
      encryptedData: { type: 'string', required: true },
      iv: { type: 'string', required: true }
    });
    const { js_code, encryptedData, iv } = ctx.request.body;
    const { appid, getOpenid } = getReqData(type, js_code);
    const { data: { openid, session_key } } = await getOpenid();
    const pc = new WXBizDataCrypt(appid, session_key);
    const userInfo = pc.decryptData(encryptedData, iv);
    const token = jsonwebtoken.sign({ _id: openid }, tokenKey, { expiresIn });

    userInfo.type = type;
    userInfo.addTime = getDate(Date.now(), true);
    new TencentUsers(userInfo).save();
    ctx.body = {
      code: statusCode.success,
      token,
      msg: `${type}登录成功`
    };
  }
}

module.exports = new Tencent();