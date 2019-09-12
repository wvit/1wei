import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import echarts from '../ec-canvas/echarts'

const TARO_ENV = process.env.TARO_ENV;

export default class Echarts extends Component {
  constructor(props) {
    super(props);
  }

  static options = {
    addGlobalClass: true //开启全局样式
  }

  static config = {
    usingComponents: {
      'ec-canvas': '../ec-canvas/ec-canvas'
    }
  }

  // 数据
  static state = {}

  echartsRef = node => this.echarts = node

  render() {
    const { ec } = this.state;
    const { className, id } = this.props;

    if (TARO_ENV === 'h5') {
      return (
        <View id={id} className={className}></View>
      )
    } else {
      return (
        <View className={className}>
          <ec-canvas ref={this.echartsRef}></ec-canvas>
        </View>
      )
    }
  }
  // 组件挂载完毕
  componentDidMount() {
    this.echartsInit();
  }
  // 数据更新完毕
  componentDidUpdate() {
    this.echartsInit();
  }
  // echarts初始化
  echartsInit() {
    const { id, option } = this.props;
    if (TARO_ENV === 'h5') {
      setTimeout(() => {
        const myChart = echarts.init(document.querySelector(`#${id}`));
        myChart.clear();
        myChart.resize();
        myChart.setOption(option);
      }, 20);
    } else {
      this.echarts.init((canvas, width, height) => {
        const myChart = echarts.init(canvas, null, { width, height });
        myChart.setOption(option);
        return myChart;
      });
    }
  }
}