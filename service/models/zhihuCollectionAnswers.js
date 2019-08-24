const { Schema, model } = require('mongoose');

const zhihuCollectionAnswer = new Schema({
  id: Number, //所属收藏id
  quesition: String, //问题
  answerLink: String, //原回答链接
  author: String, //作者
  star: Number, //点赞
  summary: String, // 简介
  content: String,//内容
  date: String,//日期
  comment: String,//评论数
});

module.exports = model('zhihuCollectionAnswer', zhihuCollectionAnswer)