import Taro, { Component } from '@tarojs/taro'
import { View, CoverView } from '@tarojs/components'
import Title from '../../components/title/title'
import Echarts from '../../components/echarts/echarts'
import {
  workSkillOption, allSkill, learnSkill, otherSkill
} from '../../data/skill'
import './skill.css'

const TARO_ENV = process.env.TARO_ENV;

export default class Skill extends Component {
  state = {
    skillIndex: 0 //展示的图标index
  }
  render() {
    return (
      <View className="skill-wrap">
        <Title title='技能参数' />
        <CoverView className="btns">
          <CoverView
            onClick={this.skillChange.bind(this, -1)}
            className="prev "
          >
            ▲
          </CoverView>
          <CoverView
            onClick={this.skillChange.bind(this, 1)}
            className="next"
          >
            ▼
          </CoverView>
        </CoverView>
        <View className="skill-list-wrap">
          <View className="echarts-item">
            <Echarts
              id="echarts1"
              className="echarts skill-echarts1"
              option={workSkillOption}
            ></Echarts>
          </View>
          <View className="echarts-item">
            <Echarts
              id="echarts2"
              className="echarts skill-echarts2"
              option={allSkill}
            ></Echarts>
          </View>
          <View className="echarts-item">
            <Echarts
              id="echarts3"
              className="echarts skill-echarts3"
              option={learnSkill}
            ></Echarts>
          </View>
          <View className="echarts-item">
            <Echarts
              id="echarts4"
              className="echarts skill-echarts4"
              option={otherSkill}
            ></Echarts>
          </View>
        </View>
      </View>
    )
  }
  // 初始化
  componentDidMount() { }
  // 切换技能
  skillChange(num) {
    const { screenHeight } = Taro.getSystemInfoSync();
    let { skillIndex } = this.state;
    if (num < 0) {
      skillIndex = skillIndex < 1 ? 3 : skillIndex + num;
    }
    if (num > 0) {
      skillIndex = skillIndex > 2 ? 0 : skillIndex + num;
    }
    this.setState({
      skillIndex
    }, () => {
      Taro.pageScrollTo({
        scrollTop: skillIndex * screenHeight,
        duration: 150
      });
    });
  }
}