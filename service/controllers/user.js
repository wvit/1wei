const Users = require('../models/users');
const utils = require('../utils/util');
const statusCode = require('../configs/statusCode');

class User {
  //注册
  async signUp(ctx) {
    const reqData = ctx.request.body;
    const resData = {
      code: statusCode.success,
      msg: '注册成功',
    }
    const {
      nickname,
      password
    } = reqData;
    const queryUser = await AdminUser.findOne({
      nickname
    })
    if (queryUser) {
      resData.code = statusCode.exist;
      resData.msg = '昵称已存在';
    } else {
      reqData.password = utils.cryptoEncode(password);
      resData.data = await new Users(reqData).save();
    }
    ctx.body = resData;
  }
  //登录
  signIn(ctx) {

  }
}

module.exports = new User()