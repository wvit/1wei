const mongoose = require('mongoose');

const {
  Schema,
  model
} = mongoose;

const userSchema = new Schema({
  __v: {
    type: Number,
    select: false,
  },
  //昵称
  nickname: {
    type: String,
    unique: true,
    required: true
  },
  //密码
  password: {
    type: String,
    required: true,
    select: false
  },
  //邮箱
  email: {
    type: String,
    required: true
  }
});

module.exports = model('User', userSchema);