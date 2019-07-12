import Taro from '@tarojs/taro'
const address = 'http://10.100.115.157:1999'

//判断字符串为空
function judgeNull(string) {
  for (let item of string.split('')) {
    if (item !== " ") {
      return true;
    }
  }
}

//判断是否为电话号码
function judgePhoneNumber(string) {
  const phoneNumberReg = /^1(3|4|5|7|8)\d{9}$/;
  if (phoneNumberReg.test(string)) {
    return true;
  }
}

//判断是否为邮箱
function judgeEmail(string) {
  const emailReg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
  if (emailReg.test(string)) {
    return true;
  }
}

// post请求
function post(url, data) {
  return Taro.request({
    url: `${address}${url}`,
    data,
    header: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": `Bearer ${wx.getStorageSync('token')}`
    },
    method: 'POST'
  })
}

//get请求
function get(url) {
  Taro.request({
    url: `${address}${url}`,
    header: {
      "Authorization": `Bearer ${wx.getStorageSync('token')}`
    },
    method: 'GET'
  })
}

//时间戳转日期
function getDate(time, onOff) {
  function judge(number) {
    return date[number]() < 10 ? `0${date[number]()}` : date[number]();
  }
  const date = new Date(time);
  const month = Number(judge('getMonth')) + 1;
  const transfromDate1 = `${judge('getFullYear')}-${month < 10 ? `0${month}` : month}-${judge('getDate')}`;
  const transfromDate2 = `${transfromDate1} ${judge('getHours')}:${judge('getMinutes')}:${judge('getSeconds')}`;
  return onOff ? transfromDate2 : transfromDate1;
}

//提示信息
function showToast({
  title,
  icon = 'none',
  duration = 2000
}) {
  return Taro.showToast({
    title,
    icon,
    duration
  })
}

export {
  judgeNull,
  judgePhoneNumber,
  judgeEmail,
  post,
  get,
  getDate,
  showToast
}
