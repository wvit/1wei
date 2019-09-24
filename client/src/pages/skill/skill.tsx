import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import Title from '../../components/title/title'
import Echarts from '../../components/echarts/echarts'
import {
  workSkillOption, allSkill, learnSkill, otherSkill
} from '../../data/skill'
import './skill.css'

const skillData = [workSkillOption, allSkill, learnSkill, otherSkill];
let changeOnOff = true;

export default class Skill extends Component {
  config = {
    disableScroll: true
  }

  state = {
    skillIndex: 0 //展示的图表index
  }

  render() {
    const { skillIndex } = this.state;

    return (
      <View className="skill-wrap">
        <Title title='技能参数' />
        <View
          onClick={this.skillChange.bind(this)}
          className="next at-icon at-icon-chevron-down"
        >
        </View>
        <View className="skill-list-wrap">
          <View className="echarts-item">
            <Echarts
              id={`echarts${skillIndex}`}
              className={`echarts skill-echarts${skillIndex + 1}`}
              option={skillData[skillIndex]}
            ></Echarts>
          </View>
        </View>
      </View>
    )
  }
  // 切换技能
  skillChange() {
    if (!changeOnOff) return;
    changeOnOff = false;
    setTimeout(() => {
      let { skillIndex } = this.state;
      changeOnOff = true;
      skillIndex = skillIndex > 2 ? 0 : skillIndex + 1;
      this.setState({
        skillIndex
      });
    }, 1000);
  }
}