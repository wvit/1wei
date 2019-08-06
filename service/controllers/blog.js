const Blogs = require('../models/blogs');
const statusCode = require('../configs/statusCode');
const { getDate } = require('../utils/util');

class Blog {
  //添加博客
  async add(ctx) {
    ctx.verifyParams({
      title: { type: 'string', required: true },
      content: { type: 'string', required: true },
      type: { type: 'number', required: true },
      tags: { type: 'array', required: true },
      intro: { type: 'string', required: true }
    });
    const reqData = ctx.request.body;
    const resData = {
      code: statusCode.success,
      msg: '添加成功',
    }
    reqData.addTime = getDate(Date.now(), true);
    reqData.pageView = 0;
    resData.data = await new Blogs(reqData).save();
    ctx.body = resData;
  }
  //获取博客列表
  async list(ctx) {
    ctx.verifyParams({
      pageSize: { type: 'string', required: true },
      page: { type: 'string', required: true }
    });
    const { pageSize, page, key = '', type } = ctx.request.query;
    let tags = ctx.request.query.tags;
    tags = tags ? JSON.parse(tags) : [];
    const queryRule = {
      isShow: true,
      $or: [{
        title: {
          $regex: new RegExp(key, 'i')
        }
      }],
      type: type || { '$ne': '' },
      tags: (() => {
        return type === '1' && tags.length > 0 ? { '$all': tags } : { '$ne': '' }
      })()
    };
    const resData = {
      code: statusCode.success,
      data: {}
    };
    resData.data.count = await Blogs.countDocuments(queryRule);
    resData.data.list = await Blogs.find(queryRule)
      .skip((Number(page) - 1) * 10)
      .limit(Number(pageSize))
      .sort({ 'addTime': -1 });
    ctx.body = resData;
  }
  // 删除博客
  async del(ctx) {
    const _id = ctx.params._id;
    const resData = {
      code: statusCode.success,
      msg: '删除成功',
    };
    resData.data = await Blogs.updateOne({ _id }, { isShow: false });
    ctx.body = resData;
  }
  // 修改博客
  async edit(ctx) {
    ctx.verifyParams({
      _id: { type: 'string', required: true },
      title: { type: 'string', required: true },
      content: { type: 'string', required: true },
      type: { type: 'number', required: true },
      tags: { type: 'array', required: true },
      intro: { type: 'string', required: true }
    })
    const reqData = ctx.request.body;
    const resData = {
      code: statusCode.success,
      msg: '修改成功',
    };
    resData.data = await Blogs.updateOne({ _id: reqData._id }, reqData);
    ctx.body = resData;
  }
  // 博客详情
  async detail(ctx) {
    const _id = ctx.params._id;
    const resData = {
      code: statusCode.success
    };
    resData.data = await Blogs.findOne({ _id });
    Blogs.updateOne({ _id }, { pageView: resData.data.pageView + 1 });
    ctx.body = resData;
  }
}

module.exports = new Blog();