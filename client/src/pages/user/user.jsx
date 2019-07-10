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
      <View className='user'>
        <AtButton type='primary' className="go-signIn" onClick={this.goSignIn}>您还未登录，去登录吧 ~</AtButton>
      </View>
    )
  }
  //去登录
  goSignIn() {
    Taro.navigateTo({
      url: '/pages/signIn/signIn'
    })
  }
}
