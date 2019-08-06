import Taro, { Component } from '@tarojs/taro'
import { View, Text, RichText } from '@tarojs/components'
import Title from '../../components/title/title'
import { req } from '../../utils/utils'
import './blogDetail.css'

export default class Index extends Component {
  config = {
    // navigationBarTitleText: '1wei',
    navigationStyle: 'custom'
  }
  constructor(props) {
    super(props);
    this.state = {
      blogDetail: { tags: [] }// 博客详情
    }
  }
  render() {
    const { blogDetail } = this.state;
    return (
      <View className='detail-wrap'>
        <Title title='博客详情'></Title>
        <View className='detail'>
          <View className="title">{blogDetail.title}</View>
          <View className="clearfix info">
            <Text className="add-time icon icon-shijian">
              {blogDetail.addTime}
            </Text>
          </View>
          {
            blogDetail.tags.length > 0 ?
              <View className="tags icon icon-tag">
                {
                  blogDetail.tags.map((tagItem, tagIndex) => {
                    return (
                      <Text className="tag-item" key={tagIndex}>{tagItem}</Text>
                    )
                  })
                }
              </View> : ''
          }
          <View className="content">
            <RichText nodes={blogDetail.content} ></RichText>
          </View>
        </View>
      </View>
    )
  }
  //组件挂载完毕
  componentWillMount() {
    req.get(`/app/blog/detail/${this.$router.params._id}`).then(res => {
      console.log(res.data)
      if (res.data.code) return
      this.setState({
        blogDetail: res.data.data
      });
    })
  }
}
