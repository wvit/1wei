import { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './progress.css'

export default class Progress extends Component<{ height?: number, color?: string, progress: string, speed?: number }> {
  constructor(props) {
    super(props);
  }
  state = {
    width: 0
  }
  render() {
    const { width } = this.state;
    const { height = 15, color = 'red', speed = 1 } = this.props;
    return (
      <View className="progress-wrap">
        <View className="progress" style={`background:${color};width:${width};height:${height}px;transition:${speed}s;`}></View>
      </View>
    )
  }
  // 组件挂载完毕
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        width: this.props.progress
      })
    }, 10);
  }
}
