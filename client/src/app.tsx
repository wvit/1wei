import Taro, { Component, Config } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import configStore from './redux'
import Index from './pages/index/index'
import 'taro-ui/dist/style/components/input.scss'
import 'taro-ui/dist/style/components/button.scss'
import 'taro-ui/dist/style/components/loading.scss'
import "taro-ui/dist/style/components/icon.scss"
import "taro-ui/dist/style/components/tab-bar.scss"
import "taro-ui/dist/style/components/drawer.scss"
import "taro-ui/dist/style/components/badge.scss"
import "taro-ui/dist/style/components/divider.scss"
import "taro-ui/dist/style/components/image-picker.scss";
import "taro-ui/dist/style/components/textarea.scss";
import './assets/iconfont/iconfont.css'
import './app.css'

const store = configStore();

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {
  config: Config = {
    pages: [
      'pages/index/index', //首页
      'pages/user/user', //用户
      'pages/publishLife/publishLife', //发布生活
      'pages/skill/skill', //技能页面
      'pages/introduce/introduce', //介绍
      'pages/signInType/signInType', //登录方式
      'pages/contact/contact', //联系
      'pages/learn/learn', //学习
      'pages/blogDetail/blogDetail', //博客详情
      'pages/signIn/signIn', //登录
      'pages/signUp/signUp', //注册
      'pages/life/life', //生活
      'pages/webView/webView'
    ],
    window: {
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '1wei',
      navigationBarTextStyle: 'black',
      navigationStyle: 'custom',
    },
    navigateToMiniProgramAppIdList: [
      "wxeb39b10e39bf6b54"
    ]
  }
  // 在 App 类中的 render ()函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        < Index />
      </Provider>
    )
  }
}

Taro.render(< App />, document.getElementById('app'))
