import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, ScrollView, Navigator } from '@tarojs/components'
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

export default class Learn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogList // 博客列表
    };
  }
  render() {
    const { blogList } = this.state;
    const { appData } = this.props;
    return (
      <View className='blog-wrap'>
        <Title title='学习日志' back={false} />
        <ScrollView
          onScroll={this.listScroll}
          scrollY={true}
          scrollTop={listScrollTop}
          style={`height:calc(100vh - ${appData.scrollHeight}px)`}
          onScrollToLower={this.getPageData.bind(this)}>
          {
            blogList.map((item, index) => {
              return (
                <Navigator className="item" url={`/pages/blogDetail/blogDetail?_id=${item._id}`} key={Math.random()}>
                  <Text className="item-title">{item.title}</Text>
                  <View className='clearfix mt15'>
                    <Text className="add-time icon icon-shijian">
                      {item.addTime}
                    </Text>
                  </View>
                  <View className='item-tag mt15 icon icon-tag'>
                    {
                      item.tags.map((tagItem, tagIndex) => {
                        return (
                          <Text className="tag-item" key={Math.random()}>{tagItem}</Text>
                        )
                      })
                    }
                  </View>
                  <Text
                    className="item-intro"
                    style="-webkit-box-orient: vertical;">
                    {item.intro}
                  </Text>
                  {
                    item.cover ? <Image className="item-cover" lazyLoad={true} src={item.cover} mode="widthFix"></Image> : ''
                  }
                </Navigator>
              )
            })
          }
        </ScrollView>
        <TabBer current={1} />
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
    req.get(`/app/blog/list?page=${page}&pageSize=10&type=1`).then(res => {
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
