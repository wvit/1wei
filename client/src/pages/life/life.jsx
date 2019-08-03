import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import { req } from '../../utils/utils'
import { connect } from '@tarojs/redux'
import TabBer from '../../components/tabBer/tabBer'
import Title from '../../components/title/title'
import '../../assets/css/blogList.css'

let reqOnOff = true;
let blogList = [];// 博客列表
let page = 0; // 列表分页
let listScrollTop = 0; //ScrollView的scrollTop

@connect(({ appData }) => ({
  appData
}))

export default class Life extends Component {
  config = {
    navigationStyle: 'custom',
  }
  constructor(props) {
    super(props);
    this.state = {
      blogList// 博客列表
    };
  }
  render() {
    const { blogList } = this.state;
    const { appData } = this.props;
    return (
      <View className='blog-wrap'>
        <View className="title-height">
          <Title title='生活记录' />
        </View>
        <ScrollView
          class="blog-list"
          onScroll={this.listScroll}
          scrollY={true}
          scrollTop={listScrollTop}
          style={`height:calc(100vh - ${appData.scrollHeight}px)`}
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
                  <Text className="item-intro">{item.intro}</Text>
                  {
                    item.cover ? <Image className="item-cover" lazyLoad={true} src={item.cover} mode="widthFix"></Image> : ''
                  }
                </View>
              )
            })
          }
        </ScrollView>
        <TabBer current={2} />
      </View>
    )
  }
  //组件挂载完毕
  componentWillMount() {
    if (reqOnOff) this.getPageData();
  }
  // 获取分页数据
  getPageData() {
    page++;
    req.get(`/app/blog/list?page=${page}&pageSize=10&type=2`).then(res => {
      console.log(res.data)
      if (!res.data.code) {
        blogList = this.state.blogList;
        res.data.data.list.forEach(item => {
          blogList.push(item);
        });
        this.setState({
          blogList
        });
        reqOnOff = false;
      }
    })
  }
  //列表滚动
  listScroll(ev) {
    listScrollTop = ev.detail.scrollTop;
  }
}
