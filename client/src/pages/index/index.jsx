import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { TabBer } from '../../components/tabBer/tabBer'
import './index.css'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '首页'
  }
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <View className='pd-lr30'>
        我是首页
        <TabBer current={0} />
      </View>
    )
  }
}
