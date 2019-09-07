import Taro, { Component } from '@tarojs/taro'
import { View, Navigator } from '@tarojs/components'
import { AtInput, AtButton } from 'taro-ui'
import { judgeNull, req, showToast } from '../../utils/utils'
import Title from '../../components/title/title'
import './signIn.css'

const { nickname = '', password = '' } = Taro.getStorageSync('signInData');

export default class SignIn extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    reqLoading: false,//请求加载icon
    signIn: {
      nickname,//昵称
      password,//密码
    }
  }
  render() {
    const { reqLoading, signIn: { nickname, password } }: any = this.state;
    return (
      <View className='pd-lr30'>
        <Title title='登录' />
        <AtInput
          clear
          type='text'
          placeholder='请输入昵称'
          value={nickname}
          name=''
          onChange={this.inputChange.bind(this, 'nickname')}
        />
        <AtInput
          clear
          type='password'
          placeholder='请输入密码'
          value={password}
          name=''
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
    const signIn = this.state.signIn;
    signIn[key] = value;
    this.setState({
      signIn
    });
  }
  //登录
  signIn() {
    const { nickname, password } = this.state.signIn;
    if (!judgeNull(nickname)) {
      showToast({ title: '请输入昵称' })
    } else if (!judgeNull(password)) {
      showToast({ title: '请输入密码' })
    } else {
      this.setState({ reqLoading: true });
      req.post('/app/user/signIn', this.state.signIn).then(res => {
        return showToast({
          title: res.data.msg,
          data: res.data
        });
      }).then(data => {
        if (!data.code) {
          Taro.setStorageSync('jwt', data.data);
          Taro.setStorageSync('signInData', { nickname, password });
          return req.get(`/app/user/info`);
        }
      }).then(res => {
        if (!res) return;
        const { code, data } = res.data;
        if (code) return;
        this.setState({ reqLoading: false });
        Taro.setStorageSync('userInfo', data);
        Taro.navigateTo({ url: '/pages/user/user' });
      });
    }
  }
}
