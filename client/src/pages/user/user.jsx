import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

export default class User extends Component {
  
  config = {
    navigationBarTitleText: '用户中心'
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View className='index'>
        <Text>你好，我是用户中心</Text>
      </View>
    )
  }
}
