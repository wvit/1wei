import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtInput } from 'taro-ui'
// @import "~taro-ui/dist/style/components/input.scss";
import "taro-ui/dist/style/components/input.scss";

export default class User extends Component {
  config = {
    navigationBarTitleText: '用户中心'
  }
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }
  handleChange(value) {
    this.setState({
      value
    })
    // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
    return value
  }
  render() {
    return (
      <View className='index'>
        <AtInput
          name='value1'
          title='文本'
          type='text'
          placeholder='单行文本'
          value={this.state.value1}
          onChange={this.handleChange.bind(this)}
        />
      </View>
    )
  }
}
