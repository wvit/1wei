import { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './tabs.css'

export default class Tabs extends Component<{ btns: Array<string>, color: string, active: number, onClick: any }> {
  constructor(props) {
    super(props);
  }
  render() {
    const { btns = [], color = '#409eff', active } = this.props;
    return (
      <View className="tabs-wrap" style={`color:${color}`}>
        <View className="btns-wrap clearfix" style={`border:1px solid ${color};`}>
          {
            btns.map((item: any, index: number) => {
              return (
                <Text
                  key={index}
                  onClick={this.changeTabs.bind(this, index)}
                  className="tabs-btn"
                  style={`${active === index && `background:${color};color:#fff`}`}>
                  {item}
                </Text>
              )
            })
          }
        </View>
      </View>
    )
  }
  // 选项卡变化
  changeTabs(index) {
    const { active, onClick } = this.props;
    if (index === active) return;
    this.setState({
      active: index
    })
    onClick(index);
  }
}