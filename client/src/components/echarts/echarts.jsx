import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import echarts from '../ec-canvas/echarts'

const TARO_ENV = process.env.TARO_ENV;

export default class Echarts extends Component {
  config = {
    usingComponents: {
      'ec-canvas': '../ec-canvas/ec-canvas'
    }
  }
  constructor(props) {
    super(props);
  }
  // 数据
  state = {
    // acharts配置
    ec: {
      lazyLoad: true,
    }
  }
  render() {
    const { ec } = this.state;
    const { className, echartsId } = this.props;
    if (TARO_ENV === 'h5') {
      return (
        <View id={echartsId} className={className}></View>
      )
    } else if (TARO_ENV === 'weapp' || TARO_ENV === 'qq') {
      return (
        <View id={echartsId}>
          <ec-canvas className={className} ref={echartsId} ec={ec}></ec-canvas>
        </View>
      )
    }
  }
  // 组件挂载完毕
  componentDidMount() {
    const { echartsId, option } = this.props;
    if (TARO_ENV === 'h5') {
      setTimeout(() => {
        const myChart = echarts.init(document.querySelector(`#${echartsId}`));
        myChart.setOption(option);
      }, 20)
    } else if (TARO_ENV === 'weapp' || TARO_ENV === 'qq') {
      this.refs.echarts1.init(canvas => {
        const myChart = echarts.init(canvas);
        myChart.setOption(option);
        return myChart;
      });
    }
  }
}

