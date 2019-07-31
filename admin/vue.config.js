const interfaces = require('os').networkInterfaces();
const production = false;
let ip = '';

//获取本机ip
for (let devName in interfaces) {
  interfaces[devName].forEach(item => {
    if (item.family === 'IPv4' && item.address !== '127.0.0.1') {
      ip = item.address;
    }
  })
}
const address = production ? 'https://1wei.cc:1999' : `http://${ip}:1999`;

module.exports = {
  baseUrl: './',
  devServer: {
    proxy: address
  }
};