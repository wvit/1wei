const jsonwebtoken = require('jsonwebtoken');
const Redis = require('koa-redis');
const nodeMailer = require('nodemailer');
const Users = require('../models/users');
const utils = require('../utils/util');
const statusCode = require('../configs/statusCode');
const serverConfig = require('../configs/serverConfig');
const { tokenKey } = require('../configs/secretKey');

const Store = new Redis().client;

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
      },
      code: {
        type: 'string',
        required: true
      }
    });
    const reqData = ctx.request.body;
    const { nickname, password, code } = reqData;
    const resData = {
      code: statusCode.success,
      msg: '注册成功，正在跳转...',
    };
    const queryUser = await Users.findOne({ nickname });
    const saveCode = await Store.hget(`nodeMail:${nickname}`, 'code');
    const saveExpire = await Store.hget(`nodeMail:${nickname}`, 'expire');
    if (queryUser) {
      resData.code = statusCode.exist;
      resData.msg = '昵称已存在';
    } else if (saveCode !== code) {
      resData.code = statusCode.error;
      resData.msg = '验证码错误';
    } else if (Date.now() > saveExpire) {
      resData.code = statusCode.past;
      resData.msg = '验证码已过期';
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
      const { _id, nickname } = queryUser;
      const token = jsonwebtoken.sign({ _id, nickname }, tokenKey, {
        expiresIn: '7d'
      });
      resData.data = token;
    }
    ctx.body = resData;
  }
  //发送验证码
  async sendCode(ctx) {
    ctx.verifyParams({
      nickname: {
        type: 'string',
        required: true
      },
      email: {
        type: 'string',
        required: true
      }
    });
    const { nickname, email } = ctx.request.body;
    const saveExpire = await Store.hget(`nodeMail:${nickname}`, 'expire');
    const queryUser = await Users.findOne({ nickname });
    const resData = {
      code: statusCode.success,
      msg: '验证码已发送',
    };
    if (queryUser) {
      resData.code = statusCode.exist;
      resData.msg = '昵称已存在';
    } else if (saveExpire && Date.now() < saveExpire) {
      resData.code = statusCode.frequently;
      resData.msg = '请不要频繁获取验证码';
    } else {
      const { host, port, user, pass, code, expire, deleteTime } = serverConfig.smtp;
      const mailCode = code();
      const mailExpire = expire();
      const mailOption = {
        from: `1wei邮箱认证 <${user}>`,
        to: email,
        subject: '1wei账号注册验证码',
        html: `您的验证码是 ${mailCode} ,请在3分钟内使用`
      };
      const transporter = nodeMailer.createTransport({
        host,
        port,
        secure: false,
        auth: {
          user,
          pass
        }
      });
      await transporter.sendMail(mailOption, err => {
        if (err) {
          resData.code = statusCode.error;
          resData.msg = '验证码发送失败';
        } else {
          Store.hmset(
            `nodeMail:${nickname}`,
            'code', mailCode,
            'expire', mailExpire,
            'email', email
          );
          Store.expire(`nodeMail:${nickname}`, deleteTime);
        }
      });
    };
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