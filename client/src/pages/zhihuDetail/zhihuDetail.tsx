import Taro, { Component } from '@tarojs/taro'
import { View, Text, RichText } from '@tarojs/components'
import Title from '../../components/title/title'
import { req } from '../../utils/utils'
import '../blogDetail/blogDetail.css'
import './zhihuDetail.css'

export default class Index extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    detail: {}// 详情
  }
  render() {
    const { detail }: any = this.state;
    return (
      <View className='detail-wrap'>
        <Title title='回答详情'></Title>
        <View className='detail'>
          <View className="title">{detail.quesition}</View>
          <View className="clearfix info">
            <Text className="add-time icon icon-shijian">
              {detail.date}
            </Text>
          </View>
          <View className="content">
            <RichText nodes={detail.content} ></RichText>
          </View>
        </View>
      </View>
    )
  }
  //组件挂载完毕
  componentWillMount() {
    // ${this.$router.params.id}
    req.get(`/app/zhihu/answersDetail/409100948`).then(res => {
      console.log(res.data)
      if (res.data.code) return;
      this.setState({
        detail: res.data.data
      });
    })
  }
}
