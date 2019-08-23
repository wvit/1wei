import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import Title from '../../components/title/title'
import Toolbar from '../../components/toolbar/toolbar'
import './zhihu.css'

export default class Zhihu extends Component {
  state = {
    visible: false, // 工具条开关
    // 工具条按钮
    toolbarBtns: [
      { text: '你好' },
      { text: 'hello wrod' },
      { text: '世界' },
      { text: '知乎收藏' },
      { text: '知乎收藏' },
      { text: '知乎收藏' }
    ],
    toolbarActive: 0 // 工具条选中index
  }
  render() {
    const { visible, toolbarBtns, toolbarActive } = this.state;
    return (
      <View>
        <Title title="知乎收藏"></Title>
        <Toolbar
          visible={visible}
          btns={toolbarBtns}
          active={toolbarActive}
          onVisible={this.visibleChange.bind(this)}
          onChange={this.toolbarChange.bind(this)}
        />
      </View>
    )
  }
  // 工具条显示/隐藏变化
  visibleChange() {
    this.setState({
      visible: !this.state.visible
    })
  }
  // 工具条点击
  toolbarChange(index, data) {
    this.setState({
      toolbarActive: index
    });
  }
}