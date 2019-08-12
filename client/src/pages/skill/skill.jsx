import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import Title from '../../components/title/title'
import { req } from '../../utils/utils'
import Echarts from '../../components/echarts/echarts'
import {
  workSkillOption, allSkill, learnSkill, otherSkill
} from '../../data/skill'
import './skill.css'

export default class Skill extends Component {
  render() {
    return (
      <View className="skill-wrap">
        <Title title='技能参数' fixed={false} backLeft='0' />
        <Echarts
          id="echarts1"
          className="echarts skill-echarts1"
          option={workSkillOption}
        ></Echarts>
        <Echarts
          id="echarts2"
          className="echarts skill-echarts2"
          option={allSkill}
        ></Echarts>
        <Echarts
          id="echarts3"
          className="echarts skill-echarts3"
          option={learnSkill}
        ></Echarts>
        <Echarts
          id="echarts4"
          className="echarts skill-echarts4"
          option={otherSkill}
        ></Echarts>
      </View>
    )
  }
}