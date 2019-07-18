import Taro, { Component } from '@tarojs/taro'
import { AtTabBar } from 'taro-ui'

export default class TabBer extends Component {
  constructor(props) {
    super(props)
    this.routers = [
      '/pages/index/index',
      '/pages/learn/learn',
      '/pages/life/life',
      '/pages/user/user'
    ]
    this.state = {
      current: props.current || 0
    }
  }
  render() {
    return (
      <AtTabBar
        fixed
        tabList={[
          { title: '首页', iconPrefixClass: 'icon', iconType: 'home' },
          { title: '学习', iconPrefixClass: 'icon', iconType: 'xuexi1' },
          { title: '生活', iconPrefixClass: 'icon', iconType: 'java' },
          { title: '用户', iconPrefixClass: 'icon', iconType: 'yonghu' }
        ]}
        onClick={this.handleClick.bind(this)}
        current={this.state.current}
      />
    )
  }
  handleClick(current) {
    if (current !== this.props.current) {
      Taro.redirectTo({ url: this.routers[current] });
      this.setState({
        current
      })
    }
  }
}
