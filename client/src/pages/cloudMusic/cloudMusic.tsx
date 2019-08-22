import Taro, { Component } from '@tarojs/taro'
import { View, Text, Navigator } from '@tarojs/components'
import { req } from '../../utils/utils'
import Title from '../../components/title/title'
import Tabs from '../../components/tabs/tabs'
import ProgressV from '../../components/progress/progress'
import './cloudMusic.css'

export default class CloudMusic extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    allData: [], // 全部听歌数据
    weekData: [], // 最近听歌数据
    logs: [], //渲染记录列表
    active: 0,// 选中的选项卡索引
    tabsConfig: [], //tabs配置
    userInfo: Taro.getStorageSync('userInfo') //1wei用户信息
  }
  render() {
    const { logs, active, userInfo }: any = this.state;
    return (
      <View className='pd-lr30'>
        <Title title="云音乐记录" color='red' />
        <View className="btns-wrap">
          <Tabs btns={['所有记录', '最近记录']} color='red' onClick={this.changeTabs.bind(this)} active={active} />
        </View>
        <View className="music-list">
          {
            !userInfo && active === 1 && (
              <View className="hint">您好，查看最近听歌记录需登录1wei。
              <Navigator url='/pages/signIn/signIn' className="go-signIn">
                  去登录 ~
              </Navigator>
              </View>
            )
          }
          {
            logs.map((item: any) => {
              const progress = Number((item.playCount / logs[0].playCount * 100).toFixed(2));
              if (item.playCount > 5) {
                return (
                  <View key={Math.random()} className="item-progress clearfix">
                    <Text className="music-name">{item.song.name}</Text>
                    <View className="music-progress">
                      <Text className="playCount"
                        style={`${progress > 30 ? 'left' : 'right'}:10px;color:${progress > 30 ? '#fff' : 'red'}`}>
                        {item.playCount} 次
                      </Text>
                      <ProgressV height={20} progress={progress} />
                    </View>
                  </View>
                )
              }
            })
          }
        </View>
      </View>
    )
  }
  //组件挂载完毕
  componentWillMount() {
    req.get('/app/cloudMusic/wvRecord?type=allData').then(res => {
      this.setState({
        allData: res.data.data
      }, () => {
        this.changeTabs(0);
      });
    });
    req.get('/app/cloudMusic/wvRecord?type=weekData').then(res => {
      this.setState({
        weekData: res.data.data
      });
    });
  }
  // 切换选项卡
  changeTabs(index) {
    this.setState({
      active: index,
      logs: []
    }, () => {
      this.setState({
        logs: this.state[index === 0 ? 'allData' : 'weekData']
      })
    })
  }
}
