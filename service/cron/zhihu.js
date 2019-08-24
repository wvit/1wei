const Axios = require('axios');
const Redis = require('koa-redis');
const cheerio = require('cheerio');
const { zhihu: { baseURL, cookie, userName } } = require('../configs/thirdPartyConfig');
const ZhihuCollectionAnswers = require('../models/zhihuCollectionAnswers');
const ZhihuCollections = require('../models/zhihuCollections');

const axios = Axios.create({
  baseURL,
  withCredentials: true
})
const Store = new Redis().client;

// 知乎定时任务
class Zhihu {
  constructor() {
    this.getCollections(24);
    this.getHot(0.5);
  }

  //获取知乎热门
  async getHot(h) {
    const time = 1000 * 60 * 60 * h;
    setInterval(async () => {
      const res = await axios.get(`/api/v3/feed/topstory/hot-lists/total?limit=50&desktop=true`, {
        headers: { cookie }
      });
      Store.hmset(
        `zhihu:hot`,
        'data', JSON.stringify(res.data)
      );
    }, time);
  }

  // 定时获取wv的知乎收藏
  async getCollections(h) {
    const time = 1000 * 60 * 60 * h;

    setInterval(async () => {
      const { data: { data } } = await axios.get(`/api/v4/members/${userName}/favlists?offset=0&limit=50`);
      const collections = [];

      await ZhihuCollectionAnswers.deleteMany();
      await ZhihuCollections.deleteMany();

      data.forEach(item => {
        collections.push({
          id: item.id,
          title: item.title,
          count: 0
        })
      });

      collections.forEach(async item => {
        const collectionItem = await axios.get(`/collection/${item.id}`);
        const pageHtml = cheerio.load(collectionItem.data);
        const pages = pageHtml('.zm-invite-pager a');
        const pageCount = Number(pageHtml(pages[pages.length - 2]).text());
        for (let i = 1; i <= pageCount; i++) {
          const collectionPage = await axios.get(`/collection/${item.id}?page=${i}`);
          const $ = cheerio.load(collectionPage.data);
          const answer = $('.zm-item');
          for (let j = 0; j < answer.length; j++) {
            const quesition = $('.zm-item-title a', answer[j]).text();
            const answerLink = `https://www.zhihu.com${$('.zm-item-rich-text', answer[j]).attr('data-entry-url')}`;
            const author = $('.zm-item-answer-author-info .author-link', answer[j]).text();
            const star = $('.zm-item-vote-info .js-voteCount', answer[j]).text();
            const summary = $('.zm-item-rich-text .summary', answer[j]).text();
            const content = $('.zm-item-rich-text .content', answer[j]).text();
            const date = $('.answer-date-link', answer[j]).text();
            const comment = $('.zm-item-meta .toggle-comment', answer[j]).text();
            const answerData = { id: item.id, quesition, answerLink, author, star, summary, content, date, comment };
            item.count++;
            new ZhihuCollectionAnswers(answerData).save();
          };
        };
        new ZhihuCollections(item).save();
        console.log(item.title, item.count, 'done')
      })
    }, time);

  }
}

module.exports = new Zhihu();
