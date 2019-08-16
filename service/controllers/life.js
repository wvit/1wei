const Lifes = require('../models/lifes');
const statusCode = require('../configs/statusCode');
const { getDate } = require('../utils/util');

class Life {
  //添加生活
  async add(ctx) {
    ctx.verifyParams({
      content: { type: 'string', required: true },
      imgs: { type: 'array', required: true },
    });
    const reqData = ctx.request.body;
    const resData = {
      code: statusCode.success,
      msg: '发布成功',
    }
    reqData.addTime = getDate(Date.now(), true);
    reqData.pageView = 0;
    resData.data = await new Lifes(reqData).save();
    ctx.body = resData;
  }
  //获取生活列表
  async list(ctx) {
    ctx.verifyParams({
      pageSize: { type: 'string', required: true },
      page: { type: 'string', required: true }
    });
    const { pageSize, page, key = '' } = ctx.request.query;
    const queryRule = {
      isShow: true,
      $or: [{
        title: {
          $regex: new RegExp(key, 'i')
        }
      }]
    };
    const resData = {
      code: statusCode.success,
      data: {}
    };
    resData.data.count = await Lifes.countDocuments(queryRule);
    resData.data.list = await Lifes.find(queryRule)
      .skip((Number(page) - 1) * 10)
      .limit(Number(pageSize))
      .sort({ 'addTime': -1 });
    ctx.body = resData;
  }
  // 删除生活
  async del(ctx) {
    const _id = ctx.params._id;
    const resData = {
      code: statusCode.success,
      msg: '删除成功',
    };
    resData.data = await Lifes.updateOne({ _id }, { isShow: false });
    ctx.body = resData;
  }
  // 修改生活
  async edit(ctx) {
    ctx.verifyParams({
      _id: { type: 'string', required: true },
      content: { type: 'string', required: true },
      imgs: { type: 'array', required: true }
    })
    const reqData = ctx.request.body;
    const resData = {
      code: statusCode.success,
      msg: '修改成功',
    };
    resData.data = await Lifes.updateOne({ _id: reqData._id }, reqData);
    ctx.body = resData;
  }
}

module.exports = new Life();