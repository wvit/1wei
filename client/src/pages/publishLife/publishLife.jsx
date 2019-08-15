import { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtButton, AtImagePicker, AtTextarea } from 'taro-ui'
import { req, showToast, uploadFile } from '../../utils/utils'
import Title from '../../components/title/title'
import './publishLife.css'

export default class PublishLife extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    uploadLoading: false,//上传请求加载icon
    reqLoading: false,//发布请求加载icon
    imgs: [], // 图片列表
    // 发布数据
    publishData: {
      content: '',
      imgs: []
    }
  }
  render() {
    const { uploadLoading, reqLoading, imgs, publishData } = this.state;
    return (
      <View className='pd-lr30'>
        <Title title="发布内容" />
        <AtTextarea
          maxLength={1024}
          height={200}
          value={publishData.content}
          onChange={this.contentChange.bind(this)}
          placeholder='输入您的内容...'
          className="content"
        />
        <AtImagePicker
          files={imgs}
          multiple={true}
          length={3}
          onChange={this.selectImg.bind(this)}
        >
        </AtImagePicker>
        <AtButton
          loading={uploadLoading}
          type='primary'
          className={`mt30 upload-imgs ${uploadLoading ? '' : 'at-icon at-icon-image'}`}
          onClick={this.uploadImgs.bind(this)}
        >
          上传图片
        </AtButton>
        <AtButton
          loading={reqLoading}
          type='primary'
          className="mt30"
          onClick={this.publish.bind(this)}
        >
          确认发布
        </AtButton>
      </View>
    )
  }
  // 选择img
  selectImg(imgs) {
    this.setState({
      imgs
    })
  }
  //上传图片
  uploadImgs() {
    this.state.imgs.forEach(item => {
      this.setState({
        uploadLoading: true
      })
      uploadFile({ filePath: item.url, url: '/admin/upload' }).then(res => {
        this.setState({
          uploadLoading: false
        });
      })
    })
  }
  // 发布
  publish() {

  }
  //输入改变
  contentChange({ detail: { value } }) {
    const publishData = this.state.publishData;
    publishData.content = value;
    this.setState({
      publishData
    });
  }
}
