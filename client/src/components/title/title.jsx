import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { change } from '../../redux/actions/appData'
import { AtIcon } from 'taro-ui'
import './title.css'

@connect(({ appData }) => ({
  appData
}), (dispatch) => ({
  setAppData(data) {
    dispatch(change(data))
  }
}))

export default class Title extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusBarHeight: Taro.getSystemInfoSync().statusBarHeight// 标题栏高
    }
  }
  render() {
    const { statusBarHeight } = this.state;
    const { title, back = true } = this.props;
    return (
      <View className="title-container">
        <View className="title-wrap">
          <View style={`height:${statusBarHeight}px;`}></View>
          <View className="clearfix title">
            {this.props.children}
            {
              back ?
                <View className="back" onClick={() => Taro.navigateBack({ delta: 1 })}>
                  <AtIcon value="chevron-left" />
                </View> : ''
            }
            <Text className="title-text">{title}</Text>
          </View>
        </View>
        <View style={`height:${statusBarHeight}px`}></View>
        <View className="title-padding-box" ></View>
      </View>
    )
  }
  componentDidMount() {
    const query = Taro.createSelectorQuery().in(this.$scope);
    query.select('.title-container')
      .boundingClientRect(rect => {
        this.props.setAppData({ scrollHeight: rect.height + 56 });
      }).exec();
  }
}
