import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import TabBer from '../../components/tabBer/tabBer'
import { req } from '../../utils/utils'
import { AtDrawer, AtIcon } from 'taro-ui'
import './index.css'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '首页'
  }
  constructor(props) {
    super(props)
    this.state = {
      menuOnOff: false
    }
  }
  render() {
    const { menuOnOff } = this.state
    return (
      <View className='pd-lr30'>
        <View className="header">
          <AtIcon value='menu' color='#409eff' onClick={this.menuShowHide.bind(this)}></AtIcon>
          知乎日报
        </View>
        <AtDrawer
          show={menuOnOff}
          mask
        >
          <View>他的知乎</View>

        </AtDrawer>
        <View className="zhihu">

        </View>
        <TabBer current={0} />
      </View>
    )
  }
  //组件挂载完毕
  componentDidMount() {
    req.get(`/app/zhihu/hot`).then(res => {
      console.log(res.data)
    })
  }
  //菜单显示隐藏
  menuShowHide() {
    const menuOnOff = !this.state.menuOnOff
    this.setState({ menuOnOff })
  }
}
