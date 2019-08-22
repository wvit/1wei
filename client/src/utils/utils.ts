import Taro from '@tarojs/taro'

// //判断字符串为空
const judgeNull = (string: string) => {
  for (let item of string.split('')) {
    if (item !== " ") return true
  }
}

//判断是否为电话号码
const judgePhoneNumber = (string: string) => {
  const phoneNumberReg = /^1(3|4|5|7|8)\d{9}$/
  if (phoneNumberReg.test(string)) return true
}

//判断是否为邮箱
const judgeEmail = (string: string) => {
  const emailReg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
  if (emailReg.test(string)) return true
}

//request请求
const req: any = {
  // post请求
  post(url: string, data: object = {}) {
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
  get(url: string) {
    Taro.showLoading({
      title: '加载中...'
    })
    setTimeout(Taro.hideLoading, 10000);
    return Taro.request({
      url: `${reqAddress}${url}`,
      header: {
        "Authorization": `Bearer ${Taro.getStorageSync('jwt') || ''}`
      },
      method: 'GET'
    }).then(res => {
      Taro.hideLoading()
      return new Promise(resolve => {
        resolve(res)
      })
    })

  }
}

//时间戳转日期
const getDate = (time: number, onOff?: boolean) => {
  function judge(key: string) {
    return date[key]() < 10 ? `0${date[key]()}` : date[key]()
  }
  const date: object = new Date(time)
  const month: number = Number(judge('getMonth')) + 1
  const transfromDate1: string = `${judge('getFullYear')}-${month < 10 ? `0${month}` : month}-${judge('getDate')}`
  const transfromDate2: string = `${transfromDate1} ${judge('getHours')}:${judge('getMinutes')}:${judge('getSeconds')}`
  return onOff ? transfromDate2 : transfromDate1
}

//提示信息
const showToast = ({
  title,
  icon = 'none',
  duration = 2000,
  data = {}
}: {
  title: string,
  icon?: string,
  duration?: number,
  data?: object
}) => {
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

// 上传文件
const uploadFiles = ({
  filesPath,
  name = 'file',
  url = '/app/upload',
  formData = {}
}: {
  filesPath: Array<object>,
  name?: string,
  url?: string,
  formData?: object
}) => {
  const files: Array<object> = [];
  return new Promise(resolve => {
    filesPath.forEach((item: any) => {
      Taro.uploadFile({
        url: `${reqAddress}${url}`,
        filePath: item.url,
        name,
        header: {
          "Authorization": `Bearer ${Taro.getStorageSync('jwt') || ''}`
        },
        formData
      }).then((res: any) => {
        files.push(JSON.parse(res.data).data);
        if (files.length === filesPath.length) resolve(files);
      })
    })
  })
}

// 全局变量
const map = new Map();

export {
  judgeNull,
  judgePhoneNumber,
  judgeEmail,
  map,
  req,
  getDate,
  showToast,
  uploadFiles
}

