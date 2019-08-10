import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import Title from '../../components/title/title'
import { AtDivider } from 'taro-ui'
import { req } from '../../utils/utils'
import './introduce.css'

export default class Introduce extends Component {
  render() {
    return (
      <View className="introduce-wrap">
        <Title title='应用介绍' />
        <View className="introduce-text-wrap">
          <Text className="text">
            “1wei”是一个个人应用，目的是记录个人生活/学习和新技术的试验场。
            应用可在两个平台运行，微信小程序/qq小程序（搜索“1wei”）和web平台（https://1wei.cc）。
          </Text>
          <AtDivider content='分割' fontColor='#3296e6' lineColor='#3296e6' />
          <Text className="text">
            开发者：wv （开发） ， levin （运维）;
          </Text>
          <AtDivider content='分割' fontColor='#3296e6' lineColor='#3296e6' />
          <Text className="text">
            前端：前台 - Taro (taro-ui) ， 后台 - Vue (element-ui);
          </Text>
          <AtDivider content='分割' fontColor='#3296e6' lineColor='#3296e6' />
          <Text className="text">
            后端：框架 - koa2 ， 数据库 - mongoDB，redis;
          </Text>
          <AtDivider content='分割' fontColor='#3296e6' lineColor='#3296e6' />
          <Text className="text">
            关键词(技术栈/重要的包)：
            nodejs , ES6 , vue , react , taro , taro-ui , element-ui , jwt , mongoDB (mongoose) , redis , axios , koa2 , redux , vuex , pm2 , 小程序 ;
          </Text>
        </View>
      </View>
    )
  }
}