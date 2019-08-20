module.exports = {
  //网易云音乐
  cloudMusic: {
    get baseURL() {
      return `http://127.0.0.1:4000`
    },
    get nickname() {
      return 'Enterprise-wv'
    },
    get phone() {
      return 13890774972
    },
    get password() {
      return 'wuwei19991024'
    },
    get uid() {
      return 303276336
    }
  },
  //知乎
  zhihu: {
    get baseURL() {
      return `https://www.zhihu.com`
    },
    get userName() {
      return 'Enterprise'
    },
    cookie: `_zap=c6e1d641-d496-42bd-a404-cbfa99828e01; _xsrf=01eabaed-64d4-4ca3-9135-1b31d15f4b9a; d_c0="AJDib4Tvww-PToZp_enGM1bkR2e1qk-RhaI=|1563627054"; tshl=; q_c1=0eabc53320724ad7ab935ae84252da12|1563627198000|1563627198000; tgw_l7_route=f2979fdd289e2265b2f12e4f4a478330; capsion_ticket="2|1:0|10:1563691430|14:capsion_ticket|44:NjY2NGRiMDdiNTkzNDEyN2E0MmM5YzRmNDI3ODJiMTk=|7d2d23dc9c03f87f8bebefcfcbe480f76de61a2030413e507a4f9a8251881f1d"; z_c0="2|1:0|10:1563691434|4:z_c0|92:Mi4xTUhhSkF3QUFBQUFBa09KdmhPX0REeVlBQUFCZ0FsVk5xbGNoWGdBUmhYSHo4N3hQS3lIZXdBWGxsbkwwdzlqME9n|84810331900e9ce714938ca4e51ab5fe737beeeb935d753c01fa9520da2f7255"; tst=h`
  },
  //微信
  wechat: {
    get appid() {
      return 'wx6e179782a302b7c0'
    },
    get secret() {
      return '7e7de0a09c1c90e8ec9469552d32f210'
    }
  },
  qq: {
    get appid() {
      return '1109619105'
    },
    get secert() {
      return 'XC8r5XSCfkctzTGH'
    },
    get token() {
      return 'd4912febffa1b8a1704a9b3bd06fe091'
    }
  }
}