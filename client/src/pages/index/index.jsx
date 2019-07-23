import Taro, { Component } from '@tarojs/taro'
import { View, Text, Navigator } from '@tarojs/components'
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
      menuOnOff: false,// 侧边栏开关
      questionList: []// 问题列表
    }
  }
  render () {
    const { menuOnOff, questionList } = this.state
    return (
      <View className='pd-lr30'>
        <View className="header clearfix">
          <AtIcon value='menu' color='#409eff' onClick={this.menuShowHide.bind(this)}></AtIcon>
          知乎热门
        </View>
        <AtDrawer
          show={menuOnOff}
          onClose={this.menuShowHide.bind(this)}
          mask
        >
          <Navigator target="miniProgram" app-id="wxeb39b10e39bf6b54">知乎</Navigator>
          <Navigator url="/pages/webView/webView">1wei.cc</Navigator>
          <View>他的知乎</View>
          <View>他的网易云</View>
        </AtDrawer>
        <View className="zhihu">
          {
            questionList.map((item, index) => {
              return (
                <View className="zhihu-hot-item clearfix" key={index}>
                  <Text style={`width:${item.children[0].thumbnail ? '62%' : '100%'}`}>
                    {item.target.title}
                  </Text>
                  {
                    item.children[0].thumbnail ?
                      <View style={`background:url(${item.children[0].thumbnail}) no-repeat 50% 50%/100%`}>
                      </View> : ''
                  }
                </View>
              )
            })
          }
        </View>
        <TabBer current={0} />
      </View>
    )
  }
  //组件挂载完毕
  componentDidMount () {
    req.get(`/app/zhihu/hot`).then(res => {
      console.log(res.data)
      if (!res.data.code) {
        this.setState({
          questionList: res.data.data.data
        })
      }

    })
  }
  //菜单显示隐藏
  menuShowHide () {
    const menuOnOff = !this.state.menuOnOff
    this.setState({ menuOnOff })
  }
}
