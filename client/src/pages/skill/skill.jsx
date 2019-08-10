import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import Title from '../../components/title/title'
import { req } from '../../utils/utils'
import Echarts from '../../components/echarts/echarts'
import './skill.css'

//工作技能
const workSkillOption = {
  title: {
    text: '前端主要技能',
    subtext: '评分是根据最擅长相对的',
    textStyle: {
      fontSize: 16
    },
    y: '4%'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '0%',
    right: '1%',
    top: '25%',
    bottom: '0%',
    containLabel: true
  },
  xAxis: {},
  yAxis: {
    data: ['Vue', '微信小程序', 'ES6', 'Nodejs', 'React']
  },
  series: [
    {
      type: 'bar',
      itemStyle: {
        // color: mainColorStore.getState()
        color: 'red'
      },
      data: [3, 3, 3, 2, 1]
    }
  ]
}

export default class Skill extends Component {
  config = {
    usingComponents: {
      "ec-canvas": "../../components/ec-canvas/ec-canvas"
    }
  }
  render() {
    return (
      <View className="skill-wrap">
        <Title title='技能参数' />
        <Echarts
          echartsId="echarts1"
          className="echarts"
          option={workSkillOption}
        ></Echarts>
        <View className="skill-echarts2 echarts"></View>
        <View className="skill-echarts3 echarts"></View>
        <View className="skill-echarts4 echarts"></View>
      </View>
    )
  }
  // 组件挂载完毕
  componentDidMount() {

  }
}