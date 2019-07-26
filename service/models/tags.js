const { Schema, tag } = require('mongoose');

const tag = new Schema({
  tag: String, //标签名
});

module.exports = model('tag', tag);