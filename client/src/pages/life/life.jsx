import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

export default class Life extends Component {

  config = {
    navigationBarTitleText: '生活记录'
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View className='pd-lr30'>
        <Text>你好，我是生活</Text>
      </View>
    )
  }
}
