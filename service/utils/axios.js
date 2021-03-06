const Axios = require('axios');
const cheerio = require('cheerio');
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
//   nickname: 'wuwei',
//   password: '19991024'
// }).then(res => {
//   return axios.get('/app/cloudMusic/record', {
//     headers: {
//       Authorization: `Bearer ${res.data.data}`
//     }
//   })
// }).then(res => {
//   console.log(res.data.data)
// })

axios.get(`/app/zhihu/hot`).then(res => {
  const dom = cheerio.load(res.data);
  console.log(dom.html())
})