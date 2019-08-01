const statusCode = {
  success: 0, //成功
  exist: 1000, //已存在
  error: 1001, //错误
  past: 1002, //过期
  frequently: 1003, //频繁
  authErr: 401, //授权失败
  verifyParamsErr: 422,// 验证参数失败
}

module.exports = statusCode;