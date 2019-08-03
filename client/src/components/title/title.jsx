import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './title.css'

export default class Title extends Component {
  constructor(props) {
    super(props)
    this.state = {
      statusBarHeight: Taro.getSystemInfoSync().statusBarHeight// 标题栏高
    }
  }
  render() {
    const { statusBarHeight } = this.state
    const { title } = this.props
    return (
      <View>
        <View className="title-wrap">
          <View style={`height:${statusBarHeight}px;`}></View>
          <View className="clearfix title">
            {this.props.children}
            <Text className="title-text">{title}</Text>
          </View>
        </View>
        <View style={`height:${statusBarHeight}px`}></View>
        <View className="title-padding-box" ></View>
      </View>
    )
  }
}
