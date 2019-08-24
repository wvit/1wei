const Axios = require('axios');
const TencentUsers = require('../models/tencentUsers');
const statusCode = require('../configs/statusCode');
const WXBizDataCrypt = require('../utils/WXBizDataCrypt');
const { getDate } = require('../utils/util');
const { wechat, qq } = require('../configs/thirdPartyConfig');

const wxAxios = Axios.create({
  baseURL: 'https://api.weixin.qq.com'
})
const qqAxios = Axios.create({
  baseURL: 'https://api.q.qq.com'
})

//腾讯接口
class Tencent {
  // 腾讯产品的登录
  async tencentSignIn (ctx, type) {
    ctx.verifyParams({
      js_code: { type: 'string', required: true },
      encryptedData: { type: 'string', required: true },
      iv: { type: 'string', required: true }
    });
    const { js_code, encryptedData, iv } = ctx.request.body;
    const { appid, secret } = type === 'qq' ? qq : wechat;
    let data = {};
    if (type === 'qq') {
      const { data: { openid, session_key } } = await qqAxios.get(`/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${js_code}&grant_type=authorization_code`);
      const { data: { access_token } } = await qqAxios.get(`/api/getToken?grant_type=client_credential&appid=${appid}&secret=${secret}`);
      data = { openid, session_key, access_token };
    } else if (type === 'wx') {
      const { data: { openid, session_key } } = await wxAxios.get(`/sns/jscode2session?appid=${appid}&secret=${secret}&grant_type=authorization_code&js_code=${js_code}`);
      const { data: { access_token } } = await wxAxios.get(`/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`);
      data = { openid, session_key, access_token };
    }
    const pc = new WXBizDataCrypt(appid, data.session_key);
    const userInfo = pc.decryptData(encryptedData, iv);
    userInfo.type = type;
    userInfo.addTime = getDate(Date.now(), true);
    new TencentUsers(userInfo).save();
    ctx.body = {
      code: statusCode.success,
      msg: `${type}登录成功`
    };
  }
}

module.exports = new Tencent();