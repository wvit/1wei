const fs = require('fs');

//引入定时任务
module.exports = () => {
  fs.readdirSync(__dirname).forEach(file => {
    if (file === 'index.js') return;
    require(`./${file}`);
  })
}