import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtInput, AtButton } from 'taro-ui'
import './user.css'

export default class User extends Component {
  config = {
    navigationBarTitleText: '用户中心'
  }
  constructor(props) {
    super(props);
    this.state = {
      reqLoading: true,//请求加载icon
      signUp: {
        nickname: '',//昵称
        password: '',//密码
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
    console.log(this.state.signUp)
  }
  render() {
    const { reqLoading, signUp: { nickname, password } } = this.state;
    return (
      <View className='user'>
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
        <AtButton loading={reqLoading} type='primary' className="signUp-btn">注册</AtButton>
      </View>
    )
  }
}
