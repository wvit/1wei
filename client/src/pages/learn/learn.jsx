import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, ScrollView, Navigator } from '@tarojs/components'
import { req } from '../../utils/utils'
import { connect } from '@tarojs/redux'
import TabBer from '../../components/tabBer/tabBer'
import Title from '../../components/title/title'
import { AtDrawer, AtIcon } from 'taro-ui'
import '../../assets/css/blogList.css'
import './learn.css'

const TARO_ENV = process.env.TARO_ENV;
let reqOnOff = true;//是否允许请求
let blogList = [];// 博客列表
let page = 0; // 列表分页
let listScrollTop = 0; //ScrollView的scrollTop

@connect(({ appData }) => ({
  appData
}))

export default class Learn extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    blogList, // 博客列表
    menuOnOff: false,// 侧边栏开关
    statusBarHeight: Taro.getSystemInfoSync().statusBarHeight // 标题栏高
  }

  render() {
    const { blogList, statusBarHeight, menuOnOff } = this.state;
    const { appData } = this.props;
    return (
      <View className='blog-wrap'>
        <Title title='学习日志' back={false}>
          <View className='menu at-icon at-icon-menu' onClick={this.menuShowHide.bind(this)}></View>
        </Title>
        <AtDrawer
          show={menuOnOff}
          onClose={this.menuShowHide.bind(this)}
          mask
        >
          <View style={`height:${statusBarHeight}px`}></View>
          <View className="menu-list">
            <Navigator url='/pages/zhihu/zhihu' className="menu-item icon icon-zhihu clearfix">
              他的知乎
               <AtIcon value='chevron-right'></AtIcon>
            </Navigator>
            <Navigator url='/pages/cloudMusic/cloudMusic' className="menu-item icon icon-music clearfix">
              他的网易云
              <AtIcon value='chevron-right'></AtIcon>
            </Navigator>
            <Navigator url='/pages/skill/skill' className="menu-item icon icon-tubiao clearfix">
              他的技能
              <AtIcon value='chevron-right'></AtIcon>
            </Navigator>
            <Navigator url='/pages/introduce/introduce' className="menu-item icon icon-jieshao clearfix">
              应用介绍
              <AtIcon value='chevron-right'></AtIcon>
            </Navigator>
            <Navigator url='/pages/contact/contact' className="menu-item icon icon-email clearfix">
              撩他
              <AtIcon value='chevron-right'></AtIcon>
            </Navigator>
          </View>
        </AtDrawer>
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
        <TabBer current={0} />
      </View>
    )
  }
  //组件挂载完毕
  componentWillMount() {
    if (!reqOnOff) return;
    this.getPageData();
    this.getUserInfo();
    if (TARO_ENV === 'h5') return;
    const updateManager = Taro.getUpdateManager();
    updateManager.onCheckForUpdate(res => {
      if (res.hasUpdate) updateManager.applyUpdate();
    })
    Taro.checkSession()
      .then(() => this.getTencentUserInfo())
      .catch(() => this.getTencentUserInfo());
  }
  // 获取分页数据
  getPageData() {
    page++;
    req.get(`/app/blog/list?page=${page}&pageSize=10&type=1`).then(res => {
      if (res.data.code) return;
      blogList = this.state.blogList;
      res.data.data.list.forEach(item => {
        blogList.push(item);
      });
      this.setState({
        blogList
      });
      reqOnOff = false;
    })
  }
  //列表滚动
  listScroll(ev) {
    listScrollTop = ev.detail.scrollTop;
  }
  // 获取腾讯用户信息
  getTencentUserInfo() {
    Taro.login();
    Taro.getSetting()
      .then(res => {
        if (res.authSetting['scope.userInfo']) {
          return Taro.getUserInfo({ lang: 'zh_CN' });
        }
        return new Promise(resolve => { resolve() });
      }).then(res => {
        if (res) this.saveUserInfo(res);
      })
  }
  // 获取用户信息
  getUserInfo() {
    req.get(`/app/user/info`).then(res => {
      if (res.data.code) {
        Taro.removeStorageSync('userInfo');
      } else {
        Taro.setStorageSync('userInfo', res.data.data);
      };
    });
  }
  //菜单显示隐藏
  menuShowHide() {
    const menuOnOff = !this.state.menuOnOff;
    this.setState({ menuOnOff });
  }
  // 保存用户数据
  saveUserInfo(data) {
    const { userInfo, encryptedData, iv } = data;
    const url = TARO_ENV === 'weapp' ? 'wxSignIn' : 'qqSignIn';
    if (!userInfo) return;
    Taro.setStorageSync('tencentUserInfo', userInfo);
    Taro.login().then(res => {
      return req.post(`/app/tencent/${url}`, { js_code: res.code, encryptedData, iv });
    });
  }
}
