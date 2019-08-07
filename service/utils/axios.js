const Axios = require('axios');
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

// Axios.get('https://1wei.cc:1999/ip').then(res => {
//   console.log(res.data)
// })
axios.get('/ip').then(res => {
  console.log(res.data)
})
