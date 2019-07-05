const Users = require('../models/users');
const utils = require('../utils/util');
const statusCode = require('../configs/statusCode');

class User {
  //注册
  async signUp(ctx) {
    ctx.verifyParams({
      nickname: {
        type: 'string',
        required: true
      },
      password: {
        type: 'string',
        required: true
      },
      email: {
        type: 'string',
        required: true
      }
    });
    const reqData = ctx.request.body;
    const {
      nickname,
      password
    } = reqData;
    const resData = {
      code: statusCode.success,
      msg: '注册成功',
    };
    const queryUser = await Users.findOne({
      nickname
    });
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
  async signIn(ctx) {
    ctx.verifyParams({
      nickname: {
        type: 'string',
        required: true
      },
      password: {
        type: 'string',
        required: true
      }
    });
    const reqData = ctx.request.body;
    const {
      nickname,
      password
    } = reqData;
    const queryUser = await Users.findOne({
      nickname
    }).select('+password');
    const resData = {
      code: statusCode.success,
      msg: '登录成功，正在跳转...'
    };
    if (!queryUser) {
      resData.code = 2;
      resData.msg = '用户不存在';
    } else if (queryUser.password !== utils.cryptoEncode(password)) {
      resData.code = -1;
      resData.msg = '密码错误';
    } else {
      resData.data = queryUser._id;
    }
    ctx.body = resData;
  }
}

module.exports = new User()