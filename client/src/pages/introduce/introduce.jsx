import Taro, { Component } from '@tarojs/taro'
import { View, Text, Navigator } from '@tarojs/components'
import Title from '../../components/title/title'
import { req } from '../../utils/utils'
import './introduce.css'

export default class Introduce extends Component {


  render() {
    return (
      <View>
        <Title title='介绍' />

      </View>
    )
  }
}