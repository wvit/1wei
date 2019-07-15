import Taro, { Component } from '@tarojs/taro'
import { View, Navigator } from '@tarojs/components'
import { AtInput, AtButton } from 'taro-ui'
import { judgeNull, post, showToast } from '../../utils/utils'
import './signIn.css'

export default class SignIn extends Component {
  config = {
    navigationBarTitleText: '登录'
  }
  constructor(props) {
    super(props)
    const { nickname = '', password = '' } = Taro.getStorageSync('signInData')
    this.state = {
      reqLoading: false,//请求加载icon
      signIn: {
        nickname,//昵称
        password,//密码
      }
    }
  }
  render() {
    const { reqLoading, signIn: { nickname, password } } = this.state;
    return (
      <View className='pd-lr30'>
        <AtInput
          clear
          type='text'
          placeholder='请输入昵称'
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
        <View className="go-signIn">
          <Navigator url="../signUp/signUp">还没有账号，去注册 ~</Navigator>
        </View>
        <AtButton
          loading={reqLoading}
          type='primary'
          className="mt30"
          onClick={this.signIn.bind(this)}
        >
          登录
        </AtButton>
      </View>
    )
  }
  //输入改变
  inputChange(key, value) {
    const signIn = this.state.signIn
    signIn[key] = value
    this.setState({
      signIn
    })
  }
  //登录
  signIn() {
    const { nickname, password } = this.state.signIn;
    if (!judgeNull(nickname)) {
      showToast({ title: '请输入昵称' })
    } else if (!judgeNull(password)) {
      showToast({ title: '请输入密码' })
    } else {
      this.setState({ reqLoading: true })
      post('/app/user/signIn', this.state.signIn).then(res => {
        showToast({
          title: res.data.msg,
          data: { code: res.data.code }
        })
          .then(data => {
            this.setState({ reqLoading: false })
            if (data.code !== 0) return
            Taro.setStorageSync('signInData', { nickname, password })
            Taro.setStorageSync('jwt', res.data.data)
            Taro.switchTab({ url: '/pages/user/user' })
          })
      })
    }
  }
}
