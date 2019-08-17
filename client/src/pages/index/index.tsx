import Taro, { Component } from '@tarojs/taro'
import { View, Text, Navigator } from '@tarojs/components'
import TabBer from '../../components/tabBer/tabBer'
import Title from '../../components/title/title'
import { req } from '../../utils/utils'
import { AtDrawer, AtIcon, AtButton } from 'taro-ui'
import './index.css'

const TARO_ENV: string = process.env.TARO_ENV;
let reqOnOff = true; //是否允许请求
let questionList = []; // 热门列表

export default class Index extends Component {
  config = {
    // navigationBarTitleText: '1wei',
  }
  constructor(props) {
    super(props);
  }
  state = {
    menuOnOff: false,// 侧边栏开关
    questionList,// 热门列表
    statusBarHeight: Taro.getSystemInfoSync().statusBarHeight,// 标题栏高
    wxUserInfo: Taro.getStorageSync('wxUserInfo')// 微信用户数据
  }
  render() {
    const {
      menuOnOff, questionList, statusBarHeight, wxUserInfo
    } = this.state;
    return (
      <View className='index-wrap'>
        <Title title='知乎热门' back={false}>
          <AtIcon value='menu' color='#409eff' onClick={this.menuShowHide.bind(this)}></AtIcon>
        </Title>
        <AtDrawer
          show={menuOnOff}
          onClose={this.menuShowHide.bind(this)}
          mask
        >
          <View style={`height:${statusBarHeight}px`}></View>
          <View className="menu-list">
            <View className="menu-item icon icon-zhihu clearfix">
              他的知乎
               <AtIcon value='chevron-right'></AtIcon>
            </View>
            <View className="menu-item icon icon-music clearfix">
              他的网易云
              <AtIcon value='chevron-right'></AtIcon>
            </View>
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
        {TARO_ENV !== 'h5' && !wxUserInfo && (
          <View className="shadow">
            <View className="shadow-wrap">
              <View className="shadow-hint">
                您还未微信登录，登录后有更好的浏览体验
              </View>
              <AtButton
                type='primary'
                lang='zh_CN'
                openType='getUserInfo'
                onGetUserInfo={ev => this.saveUserInfo(ev.detail)}
              >
                微信登录
              </AtButton>
            </View>
          </View>
        )}
        <View className='zhihu'>
          {
            questionList.map((item: any, index: number) => {
              return (
                <Navigator className='zhihu-hot-item clearfix' key={index} target='miniProgram' app-id='wxeb39b10e39bf6b54'>
                  <View className='heat'>
                    <View className='number' style={`background:${index < 3 ? 'red' : '#6190e8'}`}>{index + 1}</View>
                    {item.detail_text}
                  </View>
                  <Text className='text' style={`width:${item.children[0].thumbnail ? '68%' : '100%'}`}>
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
    Taro.getSetting().then(res => {
      if (res.authSetting['scope.userInfo'] && !this.state.wxUserInfo) {
        return Taro.getUserInfo({ lang: 'zh_CN' });
      }
      return new Promise(resolve => { resolve() });
    }).then(res => {
      if (res) this.saveUserInfo(res);
    })
    if (!reqOnOff) return;
    req.get(`/app/zhihu/hot`).then(res => {
      if (res.data.code) return;
      questionList = res.data.data.data
      this.setState({ questionList });
      reqOnOff = false;
    })
  }
  //菜单显示隐藏
  menuShowHide() {
    const menuOnOff = !this.state.menuOnOff;
    this.setState({ menuOnOff });
  }
  // 保存用户数据
  saveUserInfo(data) {
    const { userInfo, encryptedData, iv } = data;
    Taro.setStorageSync('wxUserInfo', userInfo);
    this.setState({
      wxUserInfo: userInfo
    })
    Taro.login().then(res => {
      return req.post('/app/wechat/signIn', { js_code: res.code, encryptedData, iv })
    });
  }
}
