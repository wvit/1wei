import Taro, {
  Component,
  redirectTo
} from '@tarojs/taro'
import Index from './pages/index/index'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {
  config = {
    pages: [
      'pages/index/index',
      'pages/learn/learn',
      'pages/life/life',
      'pages/user/user'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: '#333',
      selectedColor: '#409eff',
      list: [{
          pagePath: 'pages/index/index',
          text: '首页',
          iconPath: './assets/imgs/index.png',
          selectedIconPath: './assets/imgs/indexOn.png'
        },
        {
          pagePath: 'pages/learn/learn',
          text: '学习',
          iconPath: './assets/imgs/learn.png',
          selectedIconPath: './assets/imgs/learnOn.png'
        }, {
          pagePath: 'pages/life/life',
          text: '生活',
          iconPath: './assets/imgs/life.png',
          selectedIconPath: './assets/imgs/lifeOn.png'
        }, {
          pagePath: 'pages/user/user',
          text: '用户',
          iconPath: './assets/imgs/user.png',
          selectedIconPath: './assets/imgs/userOn.png'
        }
      ]
    }
  }

  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return ( < Index / > )
  }
}

Taro.render( < App / > , document.getElementById('app'))
