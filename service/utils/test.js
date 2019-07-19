const Axios = require('axios');

const axios = Axios.create({
  baseURL: 'https://www.zhihu.com',
  withCredentials: true
})

axios.get(`/api/v3/feed/topstory/hot-lists/total?limit=50&desktop=true`, {
  headers: {
    'cookie': '_zap=6a83c494-10c9-4c60-857b-f72df8a2eb04; _xsrf=91rSILnEpo31ZA2fE6iS26RX9373vydo; d_c0="AGCuZr2ynw-PTvz6UGynPCcVz4uIUO98bEA=|1561195202"; q_c1=6ed7d04fb6d04bc1b6407a0e7e1cae60|1561195555000|1561195555000; __gads=ID=0cdee959de7eccd8:T=1561195772:S=ALNI_MZWuzPgtxY_ydP86Lu3SjVP0A-VwA; __utmv=51854390.100--|2=registration_date=20161006=1^3=entry_date=20161006=1; __utma=51854390.857395358.1561198799.1561198799.1561201226.2; __utmz=51854390.1561201226.2.2.utmcsr=zhihu.com|utmccn=(referral)|utmcmd=referral|utmcct=/people/wuwei-62-35/collections; capsion_ticket="2|1:0|10:1563526454|14:capsion_ticket|44:YWI5MTkxN2RkNDcxNDJiOGIyMmM4M2Q4NzQ0N2I1Yzg=|4632b2a77119219eefb36e37251606ae8540c28aa82f60a10afcba173e2b84ef"; z_c0="2|1:0|10:1563526456|4:z_c0|92:Mi4xTUhhSkF3QUFBQUFBWUs1bXZiS2ZEeVlBQUFCZ0FsVk5PTk1lWGdBSnJtWWtiOTBBVVg4cGVHTFc3VnZzYTdxWDNR|aafc18f384b5b2002a8be5c27196f8c6a9bf38bf82a35e9a8f4d666f67125a40"; _ga=GA1.2.857395358.1561198799; _gid=GA1.2.1778587938.1563527886; tst=h; tgw_l7_route=a37704a413efa26cf3f23813004f1a3b; tshl='
  }
}).then(res => {
  console.log(res.data)
})