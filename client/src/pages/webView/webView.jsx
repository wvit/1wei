import Taro, { Component } from '@tarojs/taro'
import { View, WebView } from '@tarojs/components'

export default class Webview extends Component {
  config = {
    navigationBarTitleText: '1wei.cc'
  }
  render() {
    return (
      <View className='pd-lr30'>
        <WebView src="https://1wei.cc"></WebView>
      </View>
    )
  }
}
