const Axios = require('axios');
const {
    address
} = require('../config/serverConfig').server;

const axios = Axios.create({
    baseURL: 'http://127.0.0.1:3000',
    withCredentials: true,
    headers: {
        Authorization: '03835a5448b4f71f079f1e2c53f1ff17'
    }
})

axios.get(`/login/cellphone?phone=13890774972&password=wuwei19991024`).then(res => {
    return axios.get(`/user/record?uid=${res.data.account.id}&type=0`, {
        headers: {
            Cookie: res.headers['set-cookie']
        }
    })
}).then(res => {
    console.log(res.data)
})

// axios.get(`/login/cellphone?phone=13890774972&password=wuwei19991024`).then(res => {
//     console.log(res.headers['set-cookie'])
// })