import Taro, { Component } from '@tarojs/taro'
import { View, Text, Navigator, Image, Button } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import { req } from '../../utils/utils'
import TabBer from '../../components/tabBer/tabBer'
import Title from '../../components/title/title'
import './user.css'

const TARO_ENV: string = process.env.TARO_ENV;

export default class User extends Component {
  state = {
    tencentUserInfo: {}, //微信用户信息
    userInfo: {} //1wei用户信息
  }
  render() {
    const {
      tencentUserInfo: { avatarUrl, nickName, gender },
      userInfo: { nickname }
    }: any = this.state;
    const login: boolean = !!(nickname || nickName);

    return (
      <View className='pd-lr30'>
        <Title title='用户中心' back={false} />
        {
          login && <View className="tencentUserInfo clearfix">
            {
              avatarUrl && <Image src={avatarUrl} className="avatarUrl" mode="widthFix" />
            }
            <View className={`nickName icon icon${gender && '-'}${gender === 1 ? 'nan' : 'nv'}`}>
              {gender ? '' : '用户 ：'}   {nickname || nickName}
            </View>
          </View>
        }
        {
          !login &&
          <View>
            {
              TARO_ENV !== 'h5' && <Button
                type='primary'
                lang='zh_CN'
                openType='getUserInfo'
                onGetUserInfo={ev => this.saveUserInfo(ev.detail)}
              >
                {TARO_ENV === 'qq' ? 'qq' : '微信'}登录
            </Button>
            }
            <AtButton
              type='primary'
              className='mt30'
              onClick={() => Taro.navigateTo({ url: '/pages/signIn/signIn' })}
            >
              登录1wei
            </AtButton>
          </View>
        }
        <View className="nav-list clearfix">
          <View className="nav-item icon icon-reset ml-0" onClick={this.logOut.bind(this)}>
            <Text className="nav-text" >退出登录</Text>
          </View>
          {
            TARO_ENV === 'h5' && (
              <Navigator url='/pages/publishLife/publishLife' className="nav-item icon icon-java">
                <Text className="nav-text">发布生活</Text>
              </Navigator>)
          }
        </View>
        <TabBer current={2} />
      </View>
    )
  }
  //组件挂载完毕
  componentDidMount() {
    this.setState({
      userInfo: Taro.getStorageSync('userInfo') || {},
      tencentUserInfo: Taro.getStorageSync('tencentUserInfo') || {}
    });
  }
  // 登出
  logOut() {
    Taro.showModal({
      title: '提示',
      content: '是否确认退出登录并清除缓存'
    }).then(data => {
      if (data.confirm) {
        this.setState({
          userInfo: {},
          tencentUserInfo: {}
        });
        Taro.removeStorageSync('userInfo');
        Taro.removeStorageSync('tencentUserInfo');
        Taro.removeStorageSync('jwt');
      }
    })
  }
  // 保存用户数据
  saveUserInfo(data) {
    const { userInfo, encryptedData, iv } = data;
    const url = TARO_ENV === 'weapp' ? 'wxSignIn' : 'qqSignIn';
    if (!userInfo) return;
    Taro.setStorageSync('tencentUserInfo', userInfo);
    this.setState({
      tencentUserInfo: userInfo
    });
    Taro.login().then(res => {
      return req.post(`/app/tencent/${url}`, { js_code: res.code, encryptedData, iv });
    });
  }
}
