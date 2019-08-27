const fs = require('fs');
const mongoose = require('mongoose');
const { dbs } = require('../configs/serverConfig');

mongoose.connect(dbs, {
  useNewUrlParser: true,
  useCreateIndex: true
});

//引入文件触发事件
fs.readdirSync(__dirname).forEach(file => {
  if (file === 'index.js') return;
  require(`./${file}`);
})