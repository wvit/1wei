import Taro, { Component } from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import { AtImagePicker } from 'taro-ui'
import { req } from '../../utils/utils'
import { connect } from '@tarojs/redux'
import TabBer from '../../components/tabBer/tabBer'
import Title from '../../components/title/title'
import '../../assets/css/blogList.css'
import './life.css'

let reqOnOff: boolean = true;
let listData: Array<object> = [];// 博客列表
let page = 0; // 列表分页
let listScrollTop = 0; //ScrollView的scrollTop

@connect(({ appData }) => ({
  appData
}))

export default class Life extends Component<any> {
  constructor(props) {
    super(props);
  }
  state = {
    listData// 博客列表
  }

  render() {
    const { listData }: any = this.state;
    const { appData } = this.props;
    return (
      <View className='blog-wrap life-wrap'>
        <View className="title-height">
          <Title title='生活记录' back={false} />
        </View>
        <ScrollView
          className="blog-list"
          onScroll={this.listScroll}
          scrollY={true}
          scrollTop={listScrollTop}
          style={`height:calc(100vh - ${appData.scrollHeight}px)`}
          onScrollToLower={this.getPageData.bind(this)}>
          {
            listData.map((item: any) => {
              return (
                <View className="item" key={item._id}>
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
        <TabBer current={1} />
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
      const { code, data: { list } } = res.data;
      if (code || list < 1) return;
      listData = this.state.listData;
      list.forEach(item => {
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
    const urls: Array<string> = [];
    imgs.forEach((item: any) => {
      urls.push(item.url);
    });
    Taro.previewImage({
      current: file.url,
      urls
    });
  }
}
