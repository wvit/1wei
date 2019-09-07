import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, ScrollView, Navigator } from '@tarojs/components'
import { AtImagePicker } from 'taro-ui'
import { req } from '../../utils/utils'
import { connect } from '@tarojs/redux'
import TabBer from '../../components/tabBer/tabBer'
import Title from '../../components/title/title'
import '../../assets/css/blogList.css'
import './life.css'

let reqOnOff = true;
let listData = [];// 博客列表
let page = 0; // 列表分页
let listScrollTop = 0; //ScrollView的scrollTop

@connect(({ appData }) => ({
  appData
}))

export default class Life extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData// 博客列表
    };
  }
  render() {
    const { listData } = this.state;
    const { appData } = this.props;
    return (
      <View className='blog-wrap life-wrap'>
        <View className="title-height">
          <Title title='生活记录' back={false} />
        </View>
        <ScrollView
          class="blog-list"
          onScroll={this.listScroll}
          scrollY={true}
          scrollTop={listScrollTop}
          style={`height:calc(100vh - ${appData.scrollHeight}px)`}
          onScrollToLower={this.getPageData.bind(this)}>
          {
            listData.map((item, index) => {
              return (
                <View className="item" key={Math.random()}>
                  <Text className="item-content">
                    {item.content}
                  </Text>
                  <AtImagePicker
                    files={item.imgs}
                    length={3}
                    showAddBtn={false}
                    onImageClick={this.showImg.bind(this, item.imgs)}
                  >
                  </AtImagePicker>
                  <View className='clearfix mt15'>
                    <Text className="add-time">
                      {item.addTime}
                    </Text>
                  </View>
                </View>
              )
            })
          }
        </ScrollView>
        <TabBer current={2} />
      </View>
    )
  }
  //组件即将挂载
  componentWillMount() {
    if (reqOnOff) this.getPageData();
  }
  // 获取分页数据
  getPageData() {
    page++;
    req.get(`/app/life/list?page=${page}&pageSize=10`).then(res => {
      const { code, data } = res.data;
      if (code || data.list < 1) return;
      listData = this.state.listData;
      data.list.forEach(item => {
        item.imgs.forEach(imgItem => {
          imgItem.url = imgItem.path;
        });
        listData.push(item);
      });
      this.setState({
        listData
      });
      reqOnOff = false;
    })
  }
  //列表滚动
  listScroll(ev) {
    listScrollTop = ev.detail.scrollTop;
  }
  // 查看大图
  showImg(imgs, index, file) {
    const urls = [];
    imgs.forEach(item => {
      urls.push(item.url);
    });
    Taro.previewImage({
      current: file.url,
      urls
    });
  }
}
