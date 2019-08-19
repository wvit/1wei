import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import Title from '../../components/title/title'
import { req } from '../../utils/utils'
import Echarts from '../../components/echarts/echarts'
import {
  workSkillOption, allSkill, learnSkill, otherSkill
} from '../../data/skill'
import './skill.css'

const TARO_ENV = process.env.TARO_ENV;

export default class Skill extends Component {
  render() {
    return (
      <View className="skill-wrap">
        <Title title='技能参数' fixed={false} backLeft='0' />
        {
          TARO_ENV !== 'qq' && (
            <View>
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
        {
          TARO_ENV === 'qq' && (
            <View className="hint">
              非常抱歉，qq小程序使用不了ec-canvas,这个组件，所以查看不了这个页面，请使用微信小程序或浏览器查看,后续我将使用阿里系的F2来从做。
            </View>
          )
        }
      </View>
    )
  }
}