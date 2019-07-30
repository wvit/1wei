const Tags = require('../models/blogs');
const statusCode = require('../configs/statusCode');

class Tag {
  //添加标签
  async add (ctx) {
    ctx.verifyParams({
      nickname: {
        type: 'string',
        required: true
      }
    });
  }
  //标签列表
  async list (ctx) {

  }
  //删除标签
  async del (ctx) {

  }
}

module.exports = new Tag();