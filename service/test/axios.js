const Axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const {
  address
} = require('../configs/serverConfig').server;

const axios = Axios.create({
  baseURL: address,
  withCredentials: true
})

// axios.get(`/login/cellphone?phone=13890774972&password=wuwei19991024`).then(res => {
//     return axios.get(`/user/record?uid=${res.data.account.id}&type=0`, {
//         headers: {
//             Cookie: res.headers['set-cookie']
//         }
//     })
// }).then(res => {
//     console.log(res.data)
// })


// axios.post(`/app/user/signIn`, {
//   nickname: 'wv',
//   password: '19991024'
// }).then(res => {
//   return axios.post('/app/life/add',
//     { content: 'hello 123', imgs: [] },
//     {
//       headers: {
//         Authorization: `Bearer ${res.data.data}`
//       }
//     })
// }).then(res => {
//   console.log(res.data)
// })

// axios.post(
//   '/app/life/add', { content: 'hello', imgs: [] }
// ).then(res => {
//   console.log(res.data)
// })


// Axios.get('https://1wei.cc:1999/admin/getBlogs?pageSize=10&key=&page=1').then(res => {
//   res.data.data.list.forEach(item => {
//     axios.post('/admin/blog/add', {
//       title: item.title,
//       tags: item.tags,
//       type: item.model,
//       content: item.content
//     }).then(res => {
//       console.log(res.data.msg)
//     })
//   })
// })

Axios.get('https://s.weibo.com/top/summary?cate=realtimehot').then(res => {
  const $ = cheerio.load(res.data);
  const hotList = $('.list_a li');
  for (let i = 0; i < hotList.length; i++) {
    const href = `https://s.weibo.com${$('a', hotList[i]).attr('href')}`;
    const keywrod = $('span', hotList[i])['0'].children[0].data;
    const hot = $('em', hotList[i]).text();
    const weiboHot = { href, keywrod, hot };
    console.log(weiboHot);
  }
})
