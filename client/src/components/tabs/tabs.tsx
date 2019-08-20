import { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './tabs.css'

export default class Tabs extends Component<{ config: Array<object>, color?: string }> {
  constructor(props) {
    super(props);
  }
  render() {
    const { config, color = '#409eff' } = this.props;
    return (
      <View className="tabs-wrap clearfix" style={`color:${color}`}>
        {
          config.map((item: any, index) => {
            return (
              <View key={index}>
                {item.text}
              </View>
            )
          })
        }
      </View>
    )
  }
}