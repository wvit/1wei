const { Schema, model } = require('mongoose');

const zhihuCollection = new Schema({
  title: String, //标题
  id: Number, //收藏id
  count: Number //问题数量
});

module.exports = model('zhihuCollection', zhihuCollection)