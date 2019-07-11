import { Component } from '@tarojs/taro'
import { View, Navigator } from '@tarojs/components'
import { AtInput, AtButton } from 'taro-ui'
import './signUp.css'

export default class signUp extends Component {
  config = {
    navigationBarTitleText: '注册'
  }
  constructor(props) {
    super(props);
    this.state = {
      reqLoading: true,//请求加载icon
      signUp: {
        nickname: '',//昵称
        password: '',//密码
        email: '',//邮箱
      }
    }
  }
  //输入改变
  inputChange(key, value) {
    const signUp = this.state.signUp;
    signUp[key] = value;
    this.setState({
      signUp
    });
  }
  render() {
    const { reqLoading, signUp: { nickname, password } } = this.state;
    return (
      <View className='pd-lr30'>
        <AtInput
          clear={true}
          type='text'
          placeholder='请输入昵称/邮箱'
          value={nickname}
          onChange={this.inputChange.bind(this, 'nickname')}
        />
        <AtInput
          clear={true}
          type='password'
          placeholder='请输入密码'
          value={password}
          onChange={this.inputChange.bind(this, 'password')}
        />
        <View className="go-signIn">
          <Navigator url="../signIn/signIn">已有账号，去登录~</Navigator>
        </View>
        <AtButton loading={reqLoading} type='primary' className="mt30">注册</AtButton>
      </View>
    )
  }
}
