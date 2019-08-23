const Axios = require('axios');
const Redis = require('koa-redis');
const {
  cloudMusic: { baseURL, phone, password, uid, nickname }
} = require('../configs/thirdPartyConfig');

const Store = new Redis().client;
const axios = Axios.create({
  baseURL,
  withCredentials: true
})

class CloudMusic {
  constructor() {
    this.getCookie(24)
    this.getRecord(0.5);
  }
  //获取cookie
  async getCookie(h) {
    const time = 1000 * 60 * 60 * h;
    setInterval(async () => {
      const res = await axios.get(`/login/cellphone?phone=${phone}&password=${password}`);
      Store.hmset(
        `cloudMusic:${uid}`,
        'cookie', res.headers['set-cookie']
      );
    }, time);
  }
  // 定时获取听歌记录
  async getRecord(h) {
    const time = 1000 * 60 * 60 * h;
    setInterval(async () => {
      const cookie = await Store.hget(`cloudMusic:${uid}`, 'cookie');
      const { data: { weekData } } = await axios.get(`/user/record?uid=${uid}&type=1`, {
        headers: { cookie }
      });
      const { data: { allData } } = await axios.get(`/user/record?uid=${uid}&type=0`, {
        headers: { cookie }
      });
      Store.hmset(
        `cloudMusic:${nickname}`,
        'weekData', JSON.stringify(weekData),
        'allData', JSON.stringify(allData)
      );
    }, time)
  }
}

module.exports = new CloudMusic();
