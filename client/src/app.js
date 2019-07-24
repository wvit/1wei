import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import store from './redux'
import Index from './pages/index/index'
import 'taro-ui/dist/style/components/input.scss'
import 'taro-ui/dist/style/components/button.scss'
import 'taro-ui/dist/style/components/loading.scss'
import "taro-ui/dist/style/components/icon.scss"
import "taro-ui/dist/style/components/tab-bar.scss"
import "taro-ui/dist/style/components/drawer.scss"
import "taro-ui/dist/style/components/badge.scss"
import './assets/iconfont/iconfont.css'
import './app.css'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {
  config = {
    pages: [
      'pages/index/index', //首页
      'pages/user/user', //用户
      'pages/signIn/signIn', //登录
      'pages/signUp/signUp', //注册
      'pages/signInType/signInType', //登录方式
      'pages/learn/learn', //学习
      'pages/life/life', //生活
      'pages/webView/webView'
    ],
    window: {
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '1wei',
      navigationBarTextStyle: 'black',
    },
    navigateToMiniProgramAppIdList: [
      "wxeb39b10e39bf6b54"
    ]
  }
  // 在 App 类中的 render ()函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store()}>
        < Index />
      </Provider>
    )
  }
}

Taro.render(< App />, document.getElementById('app'))
