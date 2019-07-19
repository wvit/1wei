import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import TabBer from '../../components/tabBer/tabBer'

export default class Learn extends Component {

  config = {
    navigationBarTitleText: '学习日志'
  }

  render() {
    return (
      <View className='pd-lr30'>
        <Text>你好，我是学习页面</Text>
        <TabBer current={1} />
      </View>
    )
  }
}
