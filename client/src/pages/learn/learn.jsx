import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import TabBer from '../../components/tabBer/tabBer'
import Title from '../../components/title/title'

export default class Learn extends Component {

  config = {
    navigationStyle: 'custom',
  }

  render() {
    return (
      <View className='pd-lr30'>
        <Title title='学习日志' />
        <TabBer current={1} />
      </View>
    )
  }
}
