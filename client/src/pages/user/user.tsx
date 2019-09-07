import Taro, { Component } from '@tarojs/taro'
import { View, Text, Navigator, Image } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import TabBer from '../../components/tabBer/tabBer'
import Title from '../../components/title/title'
import './user.css'

const TARO_ENV: string = process.env.TARO_ENV;

export default class User extends Component {
  state = {
    tencentUserInfo: Taro.getStorageSync('tencentUserInfo'), //微信用户信息
    userInfo: Taro.getStorageSync('userInfo') //1wei用户信息
  }
  render() {
    const {
      tencentUserInfo: { avatarUrl, nickName, gender },
      userInfo: { nickname }
    } = this.state;
    const login = !!nickname;
    return (
      <View className='pd-lr30'>
        <Title title='用户中心' back={false} />
        {
          (nickName || nickname) && <View className="tencentUserInfo clearfix">
            {
              avatarUrl && <Image src={avatarUrl} className="avatarUrl" mode="widthFix" />
            }
            <View className={`nickName icon icon${gender && '-'}${gender === 1 ? 'nan' : 'nv'}`}>
              {gender ? '' : '用户 ：'}   {login ? nickname : nickName}
            </View>
          </View>
        }
        {
          !login && <AtButton
            type='primary'
            className='mt30'
            onClick={() => Taro.navigateTo({ url: '/pages/signIn/signIn' })}
          >
            您还未登录1wei，去登录吧 ~
        </AtButton>
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
        <TabBer current={3} />
      </View>
    )
  }
  //组件挂载完毕
  componentDidMount() {
    this.setState({
      userInfo: Taro.getStorageSync('userInfo')
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
          userInfo: {}
        });
        Taro.removeStorageSync('userInfo');
        Taro.removeStorageSync('jwt');
      }
    })
  }
}
