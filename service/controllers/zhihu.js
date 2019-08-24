const Redis = require('koa-redis');
const statusCode = require('../configs/statusCode');
const ZhihuCollections = require('../models/zhihuCollections');
const ZhihuCollectionAnswer = require('../models/zhihuCollectionAnswers');

const Store = new Redis().client;

class Zhihu {
  // 知乎热门话题
  async hot(ctx) {
    const data = await Store.hget(`zhihu:hot`, 'data');
    ctx.body = {
      code: statusCode.error,
      data
    }
  }

  // 收藏
  async collections(ctx) {
    const data = await ZhihuCollections.find();
    ctx.body = {
      code: statusCode.success,
      data
    }
  }

  // 收藏夹的回答
  async collectionAnswers(ctx) {
    ctx.verifyParams({
      id: { type: 'string', required: true },
      page: { type: 'string', required: true },
      pageSize: { type: 'string', required: true }
    });

    const { pageSize, page, id } = ctx.request.query;
    const queryRule = { id };
    const resData = {
      code: statusCode.success,
      data: {}
    };

    resData.data.count = await ZhihuCollectionAnswer.countDocuments(queryRule);
    resData.data.list = await ZhihuCollectionAnswer
      .find(queryRule)
      .skip((Number(page) - 1) * 10)
      .limit(Number(pageSize));
    ctx.body = resData;
  }
}

module.exports = new Zhihu();