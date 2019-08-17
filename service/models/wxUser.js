const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const wxUser = new Schema({
  addTime: String,
  openId: String,
  nickName: String,
  gender: Number,
  language: String,
  city: String,
  province: String,
  country: String,
  avatarUrl: String,
  watermark: Object
});

module.exports = model('wxUser', wxUser);