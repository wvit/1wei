import { Component } from '@tarojs/taro'
import { View, Text, Navigator } from '@tarojs/components'
import { AtInput, AtButton } from 'taro-ui'
import { judgeNull, judgeEmail, post, showToast } from '../../utils/utils'
import './signUp.css'

export default class signUp extends Component {
  config = {
    navigationBarTitleText: '注册'
  }
  constructor(props) {
    super(props)
    this.state = {
      reqLoading: false,//请求加载icon
      inputType: 'password',//密码输入框类型
      signUp: {
        nickname: '',//昵称
        password: '',//密码
        email: '',//邮箱
      }
    }
  }
  render() {
    const { reqLoading, inputType, signUp: { nickname, password, email } } = this.state
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
          type='text'
          placeholder='请输入您的邮箱'
          value={email}
          onChange={this.inputChange.bind(this, 'email')}
        />
        <AtInput
          type={inputType}
          placeholder='请输入密码'
          focus={inputType === 'text' ? true : false}
          value={password}
          onChange={this.inputChange.bind(this, 'password')}
          className="password-input"
        >
          <Text
            onClick={this.watchPassword.bind(this, inputType)}
            className={`icon password-btn ${inputType === 'text' ? 'icon-watch' : 'icon-biyan'}`}
          />
        </AtInput>
        <View className="go-signIn">
          <Navigator url="../signIn/signIn">已有账号，去登录~</Navigator>
        </View>
        <AtButton loading={reqLoading} type='primary' className="mt30" onClick={this.signUp.bind(this)}>注册</AtButton>
      </View>
    )
  }
  //输入改变
  inputChange(key, value) {
    const signUp = this.state.signUp;
    signUp[key] = value;
    this.setState({
      signUp
    })
  }
  //查看密码
  watchPassword(inputType) {
    this.setState({
      inputType: inputType === 'text' ? 'password' : 'text'
    })
  }
  //注册账号
  signUp() {
    const { nickname, password, email } = this.state.signUp
    if (!judgeNull(nickname)) {
      showToast({ title: '请输入昵称' })
    } else if (!judgeEmail(email)) {
      showToast({ title: '邮箱地址不正确' })
    } else if (!judgeNull(password)) {
      showToast({ title: '请输入密码' })
    }
  }
}
