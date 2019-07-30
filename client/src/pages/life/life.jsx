import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import TabBer from '../../components/tabBer/tabBer'
import Title from '../../components/title/title'

export default class Life extends Component {

  config = {
    navigationStyle: 'custom',
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View className='pd-lr30'>
        <Title title='生活记录' />
        <TabBer current={2} />
      </View>
    )
  }
}
