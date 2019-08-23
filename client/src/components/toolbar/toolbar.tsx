import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './toolbar.css'

interface ToolbarProps {
  visible: boolean;
  btns: Array<object>;
  onVisible: any;
  onChange: any;
  active: number;
  top?: number;
  height?: number;
  color?: string;
}

export default class Toolbar extends Component<ToolbarProps> {
  constructor(props) {
    super(props);
  }
  static options = {
    addGlobalClass: true //开启全局样式
  }
  render() {
    const {
      visible, active, onVisible, onChange,
      btns = [], top = 100, height = 50, color = "#3296e6"
    } = this.props;
    const style = `
    left:${visible ? '10px' : 'calc(100vw - 40px)'};
    top:${top}px;
    line-height:${height}px;
    height:${height}px;
    color:${color};
    `;

    return (
      <View
        className="toolbar-wrap clearfix"
        style={style}>
        <Text
          className="show-btn icon icon-Left"
          style={`transform:rotate(${visible ? 180 : 0}deg);width:40px;`}
          onClick={onVisible}
        ></Text>
        <View className="toolbar-list" style={`width: calc(100vw - 40px);`}>
          <View
            className="toolbar-btns-wrap"
            style={`padding:7px 0;height:${height}px;line-height:${height - 14}px;`}
          >
            {
              btns.map((item: any, index: number) => {
                const on = active === index;
                return (
                  <Text
                    key={Math.random()}
                    style={`background:${on ? color : '#fff'};color:${on ? '#fff' : color};`}
                    className="toolbar-btn-item"
                    onClick={() => onChange(index, item)}
                  >
                    {item.text}
                  </Text>
                )
              })
            }
            <Text style="padding:0 10px;" />
          </View>
        </View>
      </View>
    )
  }
}