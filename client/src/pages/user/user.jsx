import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { req } from '../../utils/utils'
import { AtButton } from 'taro-ui'
import TabBer from '../../components/tabBer/tabBer'
import './user.css'

export default class User extends Component {
  config = {
    navigationBarTitleText: '用户中心'
  }
  render() {
    return (
      <View className='pd-lr30'>
        <AtButton
          type='primary'
          className='mt30'
          onClick={() => Taro.navigateTo({ url: '/pages/signInType/signInType' })}
        >
          您还未登录，去登录吧 ~
        </AtButton>
        <TabBer current={3} />
      </View>
    )
  }
  //组件显示
  componentDidShow() {
    req.get(`/app/user/info`).then(res => {
      console.log(res.data)
    })
  }
}
