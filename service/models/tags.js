const { Schema, model } = require('mongoose');

const tag = new Schema({
  //标签名
  name: {
    type: 'string',
    required: true
  },
});

module.exports = model('tag', tag);