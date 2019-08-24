const Axios = require('axios');
const Redis = require('koa-redis');
const cheerio = require('cheerio');
const {
  weibo: { baseURL }
} = require('../configs/thirdPartyConfig');

const Store = new Redis().client;
const axios = Axios.create({
  baseURL,
  withCredentials: true
})

class Weibo {
  constructor() {
    this.getHotKeywork(0.5);
  }
  //获取热搜关键字
  async getHotKeywork(h) {
    const time = 1000 * 60 * 60 * h;
    setInterval(async () => {
      axios.get('/top/summary?cate=realtimehot').then(res => {
        const $ = cheerio.load(res.data);
        const hotList = $('.list_a li');
        for (let i = 0; i < hotList.length; i++) {
          const href = `${baseURL}${$('a', hotList[i]).attr('href')}`;
          const keywrod = $('span', hotList[i])['0'].children[0].data;
          const hot = $('em', hotList[i]).text();
          const weiboHot = { href, keywrod, hot };
          Store.hmset(
            `weibo:hotKeywork`,
            'data', JSON.stringify(weiboHot)
          );
        }
      })
    }, time);
  }
}

module.exports = new Weibo();
