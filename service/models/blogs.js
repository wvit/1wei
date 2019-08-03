const { Schema, model } = require('mongoose');

const blog = new Schema({
  title: String, //标题
  content: String, //内容
  addTime: String, //发布时间
  type: Number, //类型 1工作 2生活
  tags: Array, //标签
  isShow: {
    type: Boolean,
    default: true, //是否显示
    select: false
  },
  pageView: Number //浏览量
});

module.exports = model('blog', blog)