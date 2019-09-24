import Taro, { Component } from '@tarojs/taro'
import { View, Text, Navigator } from '@tarojs/components'
import TabBer from '../../components/tabBer/tabBer'
import Title from '../../components/title/title'
import { req } from '../../utils/utils'
import { AtDrawer, AtIcon } from 'taro-ui'
import './index.css'

const TARO_ENV: string = process.env.TARO_ENV;
let reqOnOff = true; //是否允许请求
let questionList = []; // 热门列表

export default class Index extends Component {
  static config = {
    // navigationBarTitleText: '1wei',
  }
  constructor(props) {
    super(props);
  }
  state = {
    menuOnOff: false,// 侧边栏开关
    questionList,// 热门列表
    statusBarHeight: Taro.getSystemInfoSync().statusBarHeight// 标题栏高
  }
  render() {
    const { menuOnOff, questionList, statusBarHeight } = this.state;
    return (
      <View className='index-wrap'>
        <Title title='知乎热门' back={false}>
          <View className='menu at-icon at-icon-menu' onClick={this.menuShowHide.bind(this)}></View>
        </Title>
        <AtDrawer
          show={menuOnOff}
          onClose={this.menuShowHide.bind(this)}
          mask
        >
          <View style={`height:${statusBarHeight}px`}></View>
          <View className="menu-list">
            <Navigator url='/pages/zhihu/zhihu' className="menu-item icon icon-zhihu clearfix">
              他的知乎
               <AtIcon value='chevron-right'></AtIcon>
            </Navigator>
            <Navigator url='/pages/cloudMusic/cloudMusic' className="menu-item icon icon-music clearfix">
              他的网易云
              <AtIcon value='chevron-right'></AtIcon>
            </Navigator>
            <Navigator url='/pages/skill/skill' className="menu-item icon icon-tubiao clearfix">
              他的技能
              <AtIcon value='chevron-right'></AtIcon>
            </Navigator>
            <Navigator url='/pages/introduce/introduce' className="menu-item icon icon-jieshao clearfix">
              应用介绍
              <AtIcon value='chevron-right'></AtIcon>
            </Navigator>
            <Navigator url='/pages/contact/contact' className="menu-item icon icon-email clearfix">
              撩他
              <AtIcon value='chevron-right'></AtIcon>
            </Navigator>
          </View>
        </AtDrawer>
        <View className='zhihu'>
          {
            questionList.map((item: any, index: number) => {
              return (
                <Navigator
                  className='zhihu-hot-item clearfix'
                  key={Math.random()}
                  target='miniProgram'
                  app-id='wxeb39b10e39bf6b54'
                >
                  <View className='heat'>
                    <View className='number' style={`background:${index < 3 ? 'red' : '#6190e8'}`}>{index + 1}</View>
                    {item.detail_text}
                  </View>
                  <Text
                    className='text'
                    style={`width:${item.children[0].thumbnail ? '68%' : '100%'}`}
                    onClick={this.toZhihu.bind(this)}
                  >
                    {item.target.title}
                  </Text>
                  {
                    item.children[0].thumbnail ?
                      <View className='image' style={`background:url(${item.children[0].thumbnail}) no-repeat 50% 50%/100%;`}>
                      </View> : ''
                  }
                </Navigator>
              )
            })
          }
        </View>
        <TabBer current={0} />
      </View>
    )
  }
  //组件挂载完毕
  componentWillMount() {
    if (!reqOnOff) return;
    this.getUserInfo();
    if (TARO_ENV === 'h5') return;
    const updateManager = Taro.getUpdateManager();
    updateManager.onCheckForUpdate(res => {
      if (res.hasUpdate) updateManager.applyUpdate();
    })
    Taro.checkSession()
      .then(() => this.getTencentUserInfo())
      .catch(() => this.getTencentUserInfo());
  }
  // 获取腾讯用户信息
  getTencentUserInfo() {
    Taro.login();
    Taro.getSetting()
      .then(res => {
        if (res.authSetting['scope.userInfo']) {
          return Taro.getUserInfo({ lang: 'zh_CN' });
        }
        return new Promise(resolve => { resolve() });
      }).then(res => {
        if (res) this.saveUserInfo(res);
      })
  }
  // 获取用户和知乎热门数据
  getUserInfo() {
    req.get(`/app/user/info`).then(res => {
      if (res.data.code) {
        Taro.removeStorageSync('userInfo');
      } else {
        Taro.setStorageSync('userInfo', res.data.data);
      };
    });
    req.get(`/app/zhihu/hot`).then(res => {
      if (res.data.code) return;
      questionList = res.data.data.data;
      this.setState({ questionList });
      reqOnOff = false;
    });
  }
  //菜单显示隐藏
  menuShowHide() {
    const menuOnOff = !this.state.menuOnOff;
    this.setState({ menuOnOff });
  }
  // 保存用户数据
  saveUserInfo(data) {
    const { userInfo, encryptedData, iv } = data;
    const url = TARO_ENV === 'weapp' ? 'wxSignIn' : 'qqSignIn';
    if (!userInfo) return;
    Taro.setStorageSync('tencentUserInfo', userInfo);
    Taro.login().then(res => {
      return req.post(`/app/tencent/${url}`, { js_code: res.code, encryptedData, iv });
    });
  }
  // 去知乎
  toZhihu() {
    if (TARO_ENV === 'h5') window.open('https://www.zhihu.com/hot');
  }
}
