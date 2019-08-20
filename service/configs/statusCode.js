const statusCode = {
  success: 0, //成功
  signInErr: 401, //未登录授权失败
  verifyParamsErr: 422,// 验证参数失败
  exist: 1000, //已存在
  error: 1001, //错误
  past: 1002, //过期
  frequently: 1003, //频繁
  authErr: 1004, //权限认证授权失败
  paramsErr: 1005 //参数值错误
}

module.exports = statusCode;