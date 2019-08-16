import Taro, { Component } from '@tarojs/taro'
import { View, Navigator } from '@tarojs/components'
import { req } from '../../utils/utils'
import { AtButton, AtIcon } from 'taro-ui'
import TabBer from '../../components/tabBer/tabBer'
import Title from '../../components/title/title'
import './user.css'

export default class User extends Component {
  render() {
    return (
      <View className='pd-lr30'>
        <Title title='用户中心' back={false} />
        <AtButton
          type='primary'
          className='mt30'
          onClick={() => Taro.navigateTo({ url: '/pages/signInType/signInType' })}
        >
          您还未登录，去登录吧 ~
        </AtButton>
        <View className="hint">
          目前未添加需要登录的特殊权限，可不必登录。
        </View>
        <View className="nav-list">
          <Navigator url='/pages/publishLife/publishLife' className="nav-item icon icon-java clearfix">
            发布生活记录
              <AtIcon value='chevron-right'></AtIcon>
          </Navigator>
        </View>
        <TabBer current={3} />
      </View>
    )
  }
  //组件显示
  componentDidShow() {
    req.get(`/app/user/info`).then(res => {
      console.log(res.data)
    })
  }
}
