import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtButton, AtImagePicker, AtTextarea } from 'taro-ui'
import { req, showToast, uploadFiles } from '../../utils/utils'
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
        <View className="hint">
          您好，当前只支持管理员发布内容，sorry~
        </View>
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
    const { publishData, imgs }: { publishData: any, imgs: Array<object> } = this.state;
    this.setState({
      uploadLoading: true
    })
    uploadFiles({ filesPath: imgs }).then(files => {
      publishData.imgs = files;
      this.setState({
        uploadLoading: false,
        publishData
      });
    })
  }
  // 发布
  publish() {
    const { publishData } = this.state;
    let code: any = 1;
    this.setState({
      reqLoading: true
    })
    req.post('/app/life/add', publishData).then(res => {
      this.setState({
        reqLoading: false
      });
      code = res.data.code;
      return showToast({ title: res.data.msg });
    }).then(() => {
      if (!code) Taro.navigateBack({ delta: 1 });
    })
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
