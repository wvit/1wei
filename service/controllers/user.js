const Users = require('../models/users');
const utils = require('../utils/util');
const jsonwebtoken = require('jsonwebtoken');
const statusCode = require('../configs/statusCode');
const {
  tokenKey
} = require('../configs/secretKey');

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
    ctx.request.body.password = utils.cryptoEncode(ctx.request.body.password);
    const queryUser = await Users.findOne(ctx.request.body);
    const resData = {
      code: statusCode.success,
      msg: '登录成功，正在跳转...'
    };
    if (!queryUser) {
      resData.code = statusCode.error;
      resData.msg = '用户名或密码错误';
    } else {
      const {
        _id,
        nickname
      } = queryUser;
      const token = jsonwebtoken.sign({
        _id,
        nickname
      }, tokenKey, {
        expiresIn: '7d'
      });
      resData.data = token;
    }
    ctx.body = resData;
  }

  //获取用户信息
  async getUserInfo(ctx) {
    ctx.body = {
      code: 0,
      msg: ctx.state
    }
  }
}

module.exports = new User()