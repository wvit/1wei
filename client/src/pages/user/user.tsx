import Taro, { Component } from '@tarojs/taro'
import { View, Navigator, Image } from '@tarojs/components'
import { req } from '../../utils/utils'
import { AtButton, AtIcon } from 'taro-ui'
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
    const { tencentUserInfo: { avatarUrl, nickName, gender }, userInfo: { nickname } } = this.state;
    return (
      <View className='pd-lr30'>
        <Title title='用户中心' back={false} />
        {
          (nickName || nickname) && <View className="tencentUserInfo clearfix">
            {
              avatarUrl && <Image src={avatarUrl} className="avatarUrl" mode="widthFix" />
            }
            <View className={`nickName icon icon${gender && '-'}${gender === 1 ? 'nan' : 'nv'}`}>
              {gender ? '' : '用户 ：'}   {nickname || nickName}
            </View>
          </View>
        }
        {
          !nickname && <AtButton
            type='primary'
            className='mt30'
            onClick={() => Taro.navigateTo({ url: '/pages/signIn/signIn' })}
          >
            您还未登录1wei，去登录吧 ~
        </AtButton>
        }
        <View className="nav-list">
          {
            TARO_ENV === 'h5' && (
              <Navigator url='/pages/publishLife/publishLife' className="nav-item icon icon-java clearfix">
                发布生活记录
              <AtIcon value='chevron-right'></AtIcon>
              </Navigator>)
          }
        </View>
        <TabBer current={3} />
      </View>
    )
  }
  //组件挂载完毕
  componentDidMount() {
    req.get(`/app/user/info`).then(res => {
      if (res.data.code) return;
      const userInfo = res.data.data;
      Taro.setStorageSync('userInfo', userInfo);
      this.setState({ userInfo });
    })
  }
}
