const { Schema, model } = require('mongoose');

const reqLog = new Schema({
  ip: String, //ip
  url: String,// 接口
  userAgent: String, //设备
  referer: String, //来源
  reqDate: String, //请求时间
  city: [String, Object, Array]//城市
});

module.exports = model('reqLog', reqLog);