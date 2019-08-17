
const Axios = require('axios');
const WxUsers = require('../models/wxUser');
const statusCode = require('../configs/statusCode');
const WXBizDataCrypt = require('../utils/WXBizDataCrypt');
const { getDate } = require('../utils/util');
const { wechat } = require('../configs/thirdPartyConfig');

const axios = Axios.create({
  baseURL: 'https://api.weixin.qq.com',
  withCredentials: true
})

//微信
class Wechat {
  //登录
  async signIn(ctx) {
    ctx.verifyParams({
      js_code: {
        type: 'string',
        required: true
      }
    });
    const { js_code, encryptedData, iv } = ctx.request.body;
    const { appid, secret } = wechat;
    const { data: { openid, session_key } } = await axios.get(`/sns/jscode2session?appid=${appid}&secret=${wechat.secret}&grant_type=authorization_code&js_code=${js_code}`);
    const { data: { access_token } } = await axios.get(`/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`);
    const pc = new WXBizDataCrypt(appid, session_key);
    const userInfo = pc.decryptData(encryptedData, iv);
    userInfo.addTime = getDate(Date.now(), true);
    new WxUsers(userInfo).save();
    ctx.body = {
      code: statusCode.success,
      msg: '微信登录成功'
    };
  }
}

module.exports = new Wechat()