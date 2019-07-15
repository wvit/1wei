import Taro, { Component } from '@tarojs/taro'
import { View, Navigator } from '@tarojs/components'
import { AtInput, AtButton } from 'taro-ui'
import './signIn.css'

export default class SignIn extends Component {
  config = {
    navigationBarTitleText: '登录'
  }
  constructor(props) {
    super(props)
    const { nickname = '', password = '' } = Taro.getStorageSync('signInData')
    this.state = {
      reqLoading: true,//请求加载icon
      signUp: {
        nickname,//昵称
        password,//密码
      }
    }
  }
  render() {
    const { reqLoading, signUp: { nickname, password } } = this.state;
    return (
      <View className='pd-lr30'>
        <AtInput
          clear
          type='text'
          placeholder='请输入昵称/邮箱'
          value={nickname}
          onChange={this.inputChange.bind(this, 'nickname')}
        />
        <AtInput
          clear
          type='password'
          placeholder='请输入密码'
          value={password}
          onChange={this.inputChange.bind(this, 'password')}
        />
        <View className="go-signUp">
          <Navigator url="../signUp/signUp">还没有账号，去注册 ~</Navigator>
        </View>
        <AtButton loading={reqLoading} type='primary' className="mt30">登录</AtButton>
      </View>
    )
  }
  //输入改变
  inputChange(key, value) {
    const signUp = this.state.signUp
    signUp[key] = value
    this.setState({
      signUp
    })
  }
}
