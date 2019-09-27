import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView, Text, Navigator } from '@tarojs/components'
import { req } from '../../utils/utils'
import { connect } from '@tarojs/redux'
import Title from '../../components/title/title'
import Toolbar from '../../components/toolbar/toolbar'
import '../../assets/css/blogList.css'
import './zhihu.css'

let answerData: any = []; //回答数据

@connect(({ appData }) => ({
  appData
}))

export default class Zhihu extends Component<any> {
  constructor(props) {
    super(props);
  }

  state = {
    visible: Taro.getStorageSync('zhihuToolbarVisible') === false ? false : true, // 工具条开关
    toolbarBtns: [],  // 工具条按钮
    list: [],// 列表
    toolbarActive: 0, // 工具条选中index
    scrollTop: 0 //容器卷去的高度
  }

  render() {
    const { visible, toolbarBtns, toolbarActive, list, scrollTop } = this.state;
    const { appData }: any = this.props;
    return (
      <View className="zhihu blog-wrap">
        <Title title="知乎收藏"></Title>
        <Toolbar
          visible={visible}
          label="title"
          btns={toolbarBtns}
          active={toolbarActive}
          onVisible={this.visibleChange.bind(this)}
          onChange={this.toolbarChange.bind(this)}
        />

        <ScrollView
          scrollY={true}
          onScroll={this.viewScroll.bind(this)}
          style={`height:calc(100vh - ${appData.scrollHeight - 56}px)`}
          onScrollToLower={this.scrollBottom.bind(this)}
          scrollTop={scrollTop}
        >
          {
            list.map((item: any) => {
              return (
                <Navigator
                  className="item"
                  key={item._id}
                  url={`/pages/zhihuDetail/zhihuDetail?_id=${item._id}`}>
                  <Text className="item-title">{item.quesition}</Text>
                  <View className='clearfix mt15'>
                    <Text className="item-author">
                      作者： {item.author || '无法获取作者'}
                    </Text>
                    <Text className="add-time">
                      {item.date || '无法获取时间'}
                    </Text>
                  </View>
                  <Text className="item-summary">
                    {item.summary}
                  </Text>
                  <View className="answer-info clearfix">
                    <View className="answer-star icon icon-dianzan">
                      {item.star}
                    </View>
                    <View className="answer-comment icon icon-pinglun">
                      {item.comment}
                    </View>
                  </View>
                </Navigator>
              )
            })
          }
        </ScrollView>
      </View>
    )
  }
  // 组件即将挂载
  componentWillMount() {
    Taro.setStorageSync('zhihuToolbarVisible', false);
    req.get('/app/zhihu/collections').then(res => {
      const { code, data } = res.data;
      if (code) return;
      this.setState({
        toolbarBtns: data
      });
      answerData = [];
      data.forEach(item => {
        answerData.push({
          page: 1,
          id: item.id,
          scrollTop: 0,
          list: []
        })
      });
      this.getAnswerPage();
    })
  }
  // 容器滚动
  viewScroll(ev) {
    const active = this.state.toolbarActive;
    answerData[active].scrollTop = ev.detail.scrollTop;
  }
  // 工具条显示/隐藏变化
  visibleChange() {
    const { toolbarActive } = this.state;
    this.setState({
      visible: !this.state.visible,
      scrollTop: answerData[toolbarActive].scrollTop
    })
  }
  // 工具条点击
  toolbarChange(index) {
    const { toolbarActive } = this.state;
    if (index === toolbarActive) return;
    this.setState({
      toolbarActive: index,
      visible: false,
      scrollTop: answerData[index].scrollTop
    }, () => {
      this.getAnswerPage();
    });
  }
  // 滚动到底部
  scrollBottom() {
    const active = this.state.toolbarActive;
    const { page }: any = answerData[active];
    answerData[active].page = page + 1;
    this.getAnswerPage();
  }
  // 获取分页
  getAnswerPage() {
    const active = this.state.toolbarActive;
    const { id, page }: any = answerData[active];
    req.get(`/app/zhihu/collectionAnswers?id=${id}&page=${page}&pageSize=10`).then(res => {
      const { code, data } = res.data;
      if (code) return;
      data.list.forEach(item => {
        item.summary = item.summary.replace(/\r?\n/g, '');
        item.summary = item.summary.replace('显示全部', '');
        answerData[active].list.push(item);
      });
      const { list, scrollTop } = answerData[active];
      this.setState({ list, scrollTop });
    })
  }
}