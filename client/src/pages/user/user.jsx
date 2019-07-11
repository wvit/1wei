import Taro, { Component } from '@tarojs/taro'
import { View, Navigator } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import './user.css'

export default class User extends Component {
  config = {
    navigationBarTitleText: '用户中心'
  }
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View className='pd-lr30'>
        <AtButton
          type='primary'
          className="go-signIn"
          onClick={() => Taro.navigateTo({ url: '/pages/signInType/signInType' })}
        >
          您还未登录，去登录吧 ~
        </AtButton>
      </View>
    )
  }
}
