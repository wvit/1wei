const Tags = require('../models/tags');
const statusCode = require('../configs/statusCode');

class Tag {
  //添加标签
  async add(ctx) {
    ctx.verifyParams({
      name: {
        type: 'string',
        required: true
      }
    });
    const reqData = ctx.request.body;
    const resData = {
      code: statusCode.success,
      msg: '添加成功',
    };
    resData.data = await new Tags(reqData).save();
    ctx.body = resData;
  }
  //标签列表
  async list(ctx) {
    const resData = {
      code: statusCode.success,
      msg: '获取成功',
    };
    resData.data = await Tags.find();
    ctx.body = resData;
  }
  //删除标签
  async del(ctx) {
    const _id = ctx.params._id;
    const resData = {
      code: statusCode.success,
      msg: '删除成功',
    };
    resData.data = await Tags.deleteOne({ _id });
    ctx.body = resData;
  }
  //修改标签
  async edit(ctx) {
    ctx.verifyParams({
      _id: {
        type: 'string',
        required: true
      },
      name: {
        type: 'string',
        required: true
      },
    });
    const { _id, name } = ctx.request.body;
    const resData = {
      code: statusCode.success,
      msg: '修改成功',
    };
    resData.data = await Tags.updateOne({ _id }, { name });
    ctx.body = resData;
  }
}

module.exports = new Tag();