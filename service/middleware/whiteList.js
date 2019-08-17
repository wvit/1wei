const Users = require('../models/users');
const statusCode = require('../configs/statusCode');

module.exports = list => {
  return async (ctx, next) => {
    const queryUser = await Users.findOne({ _id: ctx.state.user._id });
    let auth = false;
    list.forEach(item => {
      if (queryUser.nickname === item) auth = true;
    })
    if (auth) {
      await next();
    } else {
      ctx.body = {
        code: statusCode.authErr,
        msg: '授权认证失败'
      };
    };
  };
}
