import { Component } from '@tarojs/taro'
import { View, Text, Navigator } from '@tarojs/components'
import { AtInput, AtButton } from 'taro-ui'
import { judgeNull, judgeEmail, req, showToast } from '../../utils/utils'
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
      timerBtnOnOff: true,//发送按钮是否可点击
      timerBtnText: '获取验证码',//验证码按钮文字
      signUp: {
        nickname: '',//昵称
        password: '',//密码
        email: '',//邮箱
        code: '',//验证码
      }
    }
  }
  render () {
    const {
      reqLoading, inputType, timerBtnText, timerBtnOnOff,
      signUp: { nickname, password, email, code }
    } = this.state
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
        <AtInput
          clear
          type='text'
          placeholder='请输入您的邮箱'
          value={email}
          onChange={this.inputChange.bind(this, 'email')}
        />
        <View className="clearfix">
          <AtInput
            clear
            type='number'
            placeholder='请输入验证码'
            value={code}
            onChange={this.inputChange.bind(this, 'code')}
            maxLength={6}
            className='code-input'
          />
          <AtButton
            type={timerBtnOnOff ? 'primary' : 'secondary'}
            className="send-code-btn"
            onClick={this.sendCode.bind(this)}
          >
            {timerBtnText}
          </AtButton>
        </View>
        <View className="go-signIn">
          <Navigator url="../signIn/signIn">已有账号，去登录~</Navigator>
        </View>
        <AtButton loading={reqLoading} type='primary' className="mt30" onClick={this.signUp.bind(this)}>注册</AtButton>
      </View>
    )
  }
  //输入改变
  inputChange (key, value) {
    const signUp = this.state.signUp;
    signUp[key] = value;
    this.setState({
      signUp
    })
  }
  //查看密码
  watchPassword (inputType) {
    this.setState({
      inputType: inputType === 'text' ? 'password' : 'text'
    })
  }
  //发送验证码
  sendCode () {
    if (!this.state.timerBtnOnOff) return
    this.verify().then(result => {
      if (!result) return
      req.post('/app/user/sendCode', this.state.signUp).then(res => {
        showToast({ title: res.data.msg })
        if (res.data.code !== 0) return
        let time = 180
        this.setState({
          timerBtnOnOff: false,
          timerBtnText: `${time}s 后重试`
        })
        clearInterval(this.timer)
        this.timer = setInterval(() => {
          time--
          this.setState({
            timerBtnText: `${time}s 后重试`
          })
          if (time > -1) return
          this.setState({
            timerBtnText: '获取验证码',
            timerBtnOnOff: true
          })
          clearInterval(this.timer)
        }, 1000)
      })
    })
  }
  //注册账号
  signUp () {
    this.verify().then(result => {
      if (!result) return;
      if (this.state.signUp.code.length < 6) {
        showToast({ title: '请检查验证码' })
      } else {
        this.setState({ reqLoading: true })
        req.post('/app/user/signUp', this.state.signUp).then(res => {
          showToast({
            title: res.data.msg,
            data: { code: res.data.code }
          })
            .then(data => {
              this.setState({ reqLoading: false })
              if (data.code !== 0) return
              const { nickname, password } = this.state.signUp
              Taro.setStorageSync('signInData', { nickname, password })
              Taro.navigateTo({ url: '/pages/signIn/signIn' })
            })
        })
      }
    })
  }
  //验证数据
  verify () {
    return new Promise(resolve => {
      const { nickname, password, email } = this.state.signUp
      if (!judgeNull(nickname)) {
        showToast({ title: '请输入昵称' })
      } else if (!judgeNull(password)) {
        showToast({ title: '请输入密码' })
      } else if (!judgeEmail(email)) {
        showToast({ title: '邮箱地址不正确' })
      } else {
        resolve(true)
      }
    })
  }
}
