import Taro, { Component } from '@tarojs/taro'
import { View, Text, RichText } from '@tarojs/components'
import Title from '../../components/title/title'
import { req, showToast } from '../../utils/utils'
import '../blogDetail/blogDetail.css'
import './zhihuDetail.css'

export default class Index extends Component {
  constructor(props) {
    super(props);
  }
  state: any = {
    detail: {} // 详情
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
              {detail.date || '无法获取时间'}
            </Text>
            <Text className="add-time author">
              作者：{detail.author || '无法获取作者'}
            </Text>
          </View>
          <View className="content">
            <RichText nodes={detail.content} ></RichText>
          </View>
        </View>
        <View className="data-info clearfix">
          <View className="answer-star icon icon-dianzan">
            {detail.star}
          </View>
          <View className="answer-comment icon icon-pinglun">
            {detail.comment}
          </View>
          <View className="copy-link" onClick={this.copyLink.bind(this)}>复制链接</View>
        </View>
      </View>
    )
  }
  //页面显示
  componentDidShow() {
    req.get(`/app/zhihu/answersDetail/${this.$router.params._id}`).then(res => {
      if (res.data.code) return;
      const detail = res.data.data;
      detail.content = detail.content.replace(/(<figure>|<\/figure>|<figure data-size="normal">)/g, ``);
      detail.content = detail.content.replace(/<p/g, `<p style='margin:10px 0;'`);
      detail.content = detail.content.replace(/<img/g, `<img style='max-width:100%;'`);
      this.setState({ detail });
    })
  }
  //复制链接
  copyLink() {
    Taro.setClipboardData({ data: this.state.detail.answerLink }).then(() => {
      showToast({ title: '复制知乎链接成功' });
    })
  }
}
