import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import { showToast } from '../../utils/utils'
import './signInType.css'

export default class SignInType extends Component {
  render () {
    return (
      <View className="pd-lr30">
        <AtButton type='primary' className="wechat-signIn mt30" onClick={this.wechatSignIn}>微信登录</AtButton>
        <AtButton
          type='primary'
          className="normal-signIn mt30"
          onClick={() => Taro.navigateTo({ url: '/pages/signIn/signIn' })}>
          账号密码登录
        </AtButton>
        <AtButton
          type='primary'
          className="signUp mt30"
          onClick={() => Taro.navigateTo({ url: '/pages/signUp/signUp' })}
        >
          注册账号
        </AtButton>
      </View>
    )
  }
  //微信登录
  wechatSignIn () {
    showToast({ title: '未添加...' });
  }
}
