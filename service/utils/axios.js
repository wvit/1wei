const Axios = require('axios');
const {
    address
} = require('../configs/serverConfig').server;

const axios = Axios.create({
    baseURL: address,
    withCredentials: true,
    headers: {
        Authorization: '03835a5448b4f71f079f1e2c53f1ff17'
    }
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

// axios.post(`/app/user/signUp`, {nickname:'wuwei5',password:'123456',email:'asdadasd'}).then(res => {
//     console.log(res.data)
// })

axios.post(`/app/user/signIn`, {
    nickname: 'wuwei5',
    password: '123456'
}).then(res => {
    return axios.get('/app/user/info', {
        headers: {
            Authorization: `Bearer ${res.data.data}`
        }
    });
}).then(res => {
    console.log(res.data)
})