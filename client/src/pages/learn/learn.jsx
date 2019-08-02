import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import { req } from '../../utils/utils'
import TabBer from '../../components/tabBer/tabBer'
import Title from '../../components/title/title'
import './learn.css'

let reqOnOff = true
let blogList = [] // 博客列表

export default class Learn extends Component {
  config = {
    navigationStyle: 'custom',
  }
  constructor(props) {
    super(props)
    this.state = {
      scrollHeight: 0,// 页面被卷去的高
      menuOnOff: false,// 侧边栏开关
      blogList// 热门列表
    }
  }
  render() {
    const { blogList, scrollHeight } = this.state
    return (
      <View className='blog-wrap'>
        <View className="title-height">
          <Title title='学习日志' />
        </View>
        <ScrollView
          className="blog-list"
          scrollY={true}
          style={`height:calc(100vh - ${scrollHeight}px)`}
          onScrollToLower={this.getPageData.bind(this)}>
          {
            blogList.map((item, index) => {
              return (
                <View className="item" key={index}>
                  <Text className="item-title">{item.title}</Text>
                  <View className='clearfix mt15'>
                    <Text className="add-time icon icon-shijian">
                      {item.addTime}
                    </Text>
                  </View>
                  <View className='item-tag mt15 icon icon-tag'>
                    {item.tags}
                  </View>
                  <Text className="item-intro">{item.intro}</Text>
                  {/* <Image src={item.cover} mode="widthFix"></Image> */}
                </View>
              )
            })
          }
        </ScrollView>
        <TabBer current={1} />
      </View>
    )
  }
  //组件挂载完毕
  componentDidMount() {
    const query = Taro.createSelectorQuery()
    query.select('.title-height')
      .boundingClientRect(rect => {
        this.setState({
          scrollHeight: rect.height + 56
        })
      }).exec()
    if (!reqOnOff) return
    req.get(`/app/blog/list?page=1&pageSize=10&type=1`).then(res => {
      console.log(res.data)
      if (!res.data.code) {
        blogList = res.data.data.list
        this.setState({
          blogList
        })
        reqOnOff = false
      }
    })
  }
  // 获取分页数据
  getPageData() {
    console.log(1)
  }
}
