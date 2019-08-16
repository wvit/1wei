const { Schema, model } = require('mongoose');

const life = new Schema({
  content: String, //内容
  addTime: String, //发布时间
  imgs: Array, // 图片
  isShow: {
    type: Boolean,
    default: true, //是否显示
    select: false
  },
  pageView: Number //浏览量
});

module.exports = model('life', life)