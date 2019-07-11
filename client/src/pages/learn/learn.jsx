import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

export default class Learn extends Component {

  config = {
    navigationBarTitleText: '学习日志'
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View className='pd-lr30'>
        <Text>你好，我是学习页面</Text>
      </View>
    )
  }
}
