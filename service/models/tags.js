const { Schema, tag } = require('mongoose');

const tag = new Schema({
  name: String, //标签名
});

module.exports = model('tag', tag);