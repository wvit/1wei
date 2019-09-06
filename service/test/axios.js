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

// axios.post(`/app/user/signIn`, {
//   nickname: 'wv',
//   password: '19991024'
// }).then(res => {
//   return axios.get('/app/cloudMusic/wvRecord?type=weekData',
//     {
//       headers: {
//         Authorization: `Bearer ${res.data.data}`
//       }
//     })
// }).then(res => {
//   console.log(res.data)
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

// Axios.get('https://s.weibo.com/top/summary?cate=realtimehot').then(res => {
//   const $ = cheerio.load(res.data);
//   const hotList = $('.list_a li');
//   for (let i = 0; i < hotList.length; i++) {
//     const href = `https://s.weibo.com${$('a', hotList[i]).attr('href')}`;
//     const keywrod = $('span', hotList[i])['0'].children[0].data;
//     const hot = $('em', hotList[i]).text();
//     const weiboHot = { href, keywrod, hot };
//     console.log(weiboHot);
//   }
// })

// Axios.get('https://www.zhihu.com/collection/185826777').then(res => {
//   const $ = cheerio.load(res.data);
//   const answer = $('.zm-item');
//   for (let i = 0; i < answer.length; i++) {
//     const quesition = $('.zm-item-title a', answer[i]).text();
//     const answerLink = `https://www.zhihu.com${$('.zm-item-rich-text', answer[i]).attr('data-entry-url')}`;
//     const author = $('.zm-item-answer-author-info .author-link', answer[i]).text();
//     const star = $('.zm-item-vote-info .js-voteCount', answer[i]).text();
//     const summary = $('.zm-item-rich-text .summary', answer[i]).text();
//     const content = $('.zm-item-rich-text .content', answer[i]).text();
//     const date = $('.answer-date-link', answer[i]).text();
//     const comment = $('.zm-item-meta .toggle-comment', answer[i]).text();
//     const collection = { quesition, answerLink, author, star, summary, date, comment };
//     console.log(collection);
//   }
// })

// axios.get('/ip').then(res => {
//   console.log(res.data)
// })

// Axios.get('https://1wei.cc/app/life/list?page=1&pageSize=10').then(res => {
//   fs.writeFileSync('zhihu.html', res.data, () => {
//     console.log('完成')
//   });
// })

Axios.delete('https://1wei.cc:1999/admin/life/delete/5d61e47288617c3e10cee8d5').then(res => {
  console.log(res.data)
})