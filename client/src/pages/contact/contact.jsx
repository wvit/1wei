import { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import Title from '../../components/title/title'
import './contact.css'

export default class Contact extends Component {
  render() {
    return (
      <View className="contact">
        <Title title='联系我' />
        <Text className="introduce-text">
          您好，如果博客中有错误或应用有bug，欢迎向我提出。当然，如果不嫌弃，技术交流也是非常欢迎的。
        </Text>
        <Text className="email google icon icon-google">
          1999wuwei@gmail.com
        </Text>
        <Text className="email qq icon icon-qq">
          1083926534@qq.com
        </Text>
      </View>
    )
  }
}