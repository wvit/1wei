import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import { req, showToast, uploadFiles } from '../../utils/utils'
import Title from '../../components/title/title'
import Tabs from '../../components/tabs/tabs'
import './cloudMusic.css'

export default class CloudMusic extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    allData: [], // 全部听歌数据
    weekData: [], // 最近听歌数据
    tabsConfig: [] //tabs配置
  }
  render() {
    const { allData, weekData, tabsConfig } = this.state;
    return (
      <View className='pd-lr30'>
        <Title title="云音乐记录" />
        <Tabs config={tabsConfig}></Tabs>
      </View>
    )
  }
  //组件挂载完毕
  componentDidMount() {
    req.get('/app/cloudMusic/wvRecord?type=allData').then(res => {
      console.log(res.data)
    })
  }
}
