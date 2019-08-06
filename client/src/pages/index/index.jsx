import Taro, { Component } from '@tarojs/taro'
import { View, Text, Navigator } from '@tarojs/components'
import TabBer from '../../components/tabBer/tabBer'
import Title from '../../components/title/title'
import { req } from '../../utils/utils'
import { AtDrawer, AtIcon } from 'taro-ui'
import './index.css'

let reqOnOff = true; //是否允许请求
let questionList = []; // 热门列表

export default class Index extends Component {
  config = {
    // navigationBarTitleText: '1wei',
    navigationStyle: 'custom'
  }
  constructor(props) {
    super(props);
    this.state = {
      menuOnOff: false,// 侧边栏开关
      questionList,// 热门列表
      statusBarHeight: Taro.getSystemInfoSync().statusBarHeight// 标题栏高
    }
  }
  render() {
    const { menuOnOff, questionList, statusBarHeight } = this.state;
    return (
      <View className='index-wrap'>
        <Title title='知乎热门' back={false}>
          <AtIcon value='menu' color='#409eff' onClick={this.menuShowHide.bind(this)}></AtIcon>
        </Title>
        <AtDrawer
          show={menuOnOff}
          onClose={this.menuShowHide.bind(this)}
          mask
        >
          <View style={`height:${statusBarHeight}px`}></View>
          <View className="menu-list">
            <View className="menu-item icon icon-zhihu clearfix">
              他的知乎
               <AtIcon value='chevron-right'></AtIcon>
            </View>
            <View className="menu-item icon icon-music clearfix">
              他的网易云
              <AtIcon value='chevron-right'></AtIcon>
            </View>
          </View>
        </AtDrawer>
        <View className='zhihu'>
          {
            questionList.map((item, index) => {
              return (
                <Navigator className='zhihu-hot-item clearfix' key={index} target='miniProgram' app-id='wxeb39b10e39bf6b54'>
                  <View className='heat'>
                    <View className='number' style={`background:${index < 3 ? 'red' : '#6190e8'}`}>{index + 1}</View>
                    {item.detail_text}
                  </View>
                  <Text className='text' style={`width:${item.children[0].thumbnail ? '68%' : '100%'}`}>
                    {item.target.title}
                  </Text>
                  {
                    item.children[0].thumbnail ?
                      <View className='image' style={`background:url(${item.children[0].thumbnail}) no-repeat 50% 50%/100%;`}>
                      </View> : ''
                  }
                </Navigator>
              )
            })
          }
        </View>
        <TabBer current={0} />
      </View>
    )
  }
  //组件挂载完毕
  componentWillMount() {
    if (!reqOnOff) return;
    req.get(`/app/zhihu/hot`).then(res => {
      console.log(res.data)
      if (!res.data.code) {
        questionList = res.data.data.data
        this.setState({
          questionList
        });
        reqOnOff = false;
      }
    })
  }
  //菜单显示隐藏
  menuShowHide() {
    const menuOnOff = !this.state.menuOnOff;
    this.setState({ menuOnOff });
  }
}
