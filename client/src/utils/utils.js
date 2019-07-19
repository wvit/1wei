import Taro from '@tarojs/taro'

module.exports = {
  //判断字符串为空
  judgeNull(string) {
    for (let item of string.split('')) {
      if (item !== " ") return true
    }
  },
  //判断是否为电话号码
  judgePhoneNumber(string) {
    const phoneNumberReg = /^1(3|4|5|7|8)\d{9}$/
    if (phoneNumberReg.test(string)) return true
  },
  //判断是否为邮箱
  judgeEmail(string) {
    const emailReg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
    if (emailReg.test(string)) return true
  },
  req: {
    // post请求
    post(url, data = {}) {
      return Taro.request({
        url: `${reqAddress}${url}`,
        data,
        header: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${Taro.getStorageSync('jwt') || ''}`
        },
        method: 'POST'
      })
    },
    //get请求
    get(url) {
      return Taro.request({
        url: `${reqAddress}${url}`,
        header: {
          "Authorization": `Bearer ${Taro.getStorageSync('jwt') || ''}`
        },
        method: 'GET'
      })
    }
  },
  //时间戳转日期
  getDate(time, onOff) {
    function judge(number) {
      return date[number]() < 10 ? `0${date[number]()}` : date[number]();
    }
    const date = new Date(time);
    const month = Number(judge('getMonth')) + 1;
    const transfromDate1 = `${judge('getFullYear')}-${month < 10 ? `0${month}` : month}-${judge('getDate')}`;
    const transfromDate2 = `${transfromDate1} ${judge('getHours')}:${judge('getMinutes')}:${judge('getSeconds')}`;
    return onOff ? transfromDate2 : transfromDate1;
  },
  //提示信息
  showToast({
    title,
    icon = 'none',
    duration = 2000,
    data = {}
  }) {
    Taro.showToast({
      title,
      icon,
      duration
    })
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(data)
      }, duration)
    })
  }
}

