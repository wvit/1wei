const mainColor = '#3296e6';

//工作技能
const workSkillOption = {
  title: {
    text: '前端主要技能',
    subtext: '评分是根据最擅长相对的',
    textStyle: {
      fontSize: 16
    },
    y: '4%'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '0%',
    right: '1%',
    top: '25%',
    bottom: '0%',
    containLabel: true
  },
  xAxis: {
    axisLabel: {
      fontSize: 14
    }
  },
  yAxis: {
    data: ['Vue', '微信小程序', 'ES6/7', 'Nodejs', 'React'],
    axisLabel: {
      fontSize: 14
    }
  },
  series: [
    {
      type: 'bar',
      itemStyle: {
        color: mainColor
      },
      data: [0.8, 1, 0.9, 0.75, 0.7]
    }
  ]
}

//所有技能
const allSkill = {
  title: {
    text: '其他技术',
    subtext: '库 / 常用包 / 技术点 / 工具',
    textStyle: {
      fontSize: 16
    },
    y: '3%'
  },
  tooltip: {
    trigger: 'item',
    triggerOn: 'mousemove'
  },
  series: [
    {
      type: 'tree',
      itemStyle: {
        borderColor: mainColor
      },
      lineStyle: {
        color: mainColor
      },
      data: [{
        name: 'WEB',
        children: [
          { name: 'pwa' },
          { name: 'taro' },
          { name: 'koa2' },
          { name: 'iView' },
          { name: 'antd' },
          { name: 'element-ui' },
          { name: 'taro-ui' },
          { name: 'mongoDB' },
          { name: 'redis' },
          { name: 'echarts' },
          { name: 'canvas' },
          { name: 'git' },
          { name: 'webpack' },
          { name: 'babel' },
          { name: 'eslint' },
          { name: 'typescript' },
          { name: 'axios/fetch' }
        ]
      }],
      top: '10%',
      bottom: '0%',
      left: '14%',
      right: '30%',
      symbolSize: 12,
      label: {
        normal: {
          position: 'left',
          verticalAlign: 'middle',
          align: 'right',
          fontSize: 14
        }
      },
      leaves: {
        label: {
          normal: {
            position: 'right',
            verticalAlign: 'middle',
            align: 'left'
          }
        }
      },
      expandAndCollapse: false,
      animationDurationUpdate: 800
    }
  ]
}

//学习意向
const learnSkill = {
  title: {
    text: '最近几月学习意向'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['Typescript', 'React', 'Nodejs', 'Electron'],
    top: '12%',
    padding: 5,
    itemGap: 15
  },
  grid: {
    top: '33%',
    left: '3%',
    right: '3%',
    bottom: '0%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    axisLabel: {
      show: false
    },
    data: ['阶段一', '阶段二', '阶段三', '阶段四', '阶段五', '未来']
  },
  yAxis: {
    splitLine: {
      show: false
    },
    axisLabel: {
      show: false
    },
  },
  series: [
    {
      name: 'Typescript',
      type: 'line',
      data: [4, 3, 4, 7, 8, 10]
    },
    {
      name: 'React',
      type: 'line',
      data: [3, 2, 3, 5, 7, 7]
    },
    {
      name: 'Nodejs',
      type: 'line',
      data: [6, 6, 7, 8, 9, 9]
    },
    {
      name: 'Electron',
      type: 'line',
      data: [2, 2, 3, 4, 5, 5]
    }
  ]
}

//其他技能
const otherSkill = {
  title: {
    text: '其他兴趣',
    y: '5%'
  },
  tooltip: {
    trigger: 'axis',
  },
  radar: [
    {
      indicator: [
        { text: 'MO法', max: 10 },
        { text: '游戏', max: 10 },
        { text: '武侠', max: 10 },
        { text: '象棋/围棋', max: 10 },
        { text: '学习', max: 10 },
        { text: '乒乓球', max: 10 }
      ],
      center: ['50%', '60%'],
      radius: 100
    },
  ],
  series: {
    type: 'radar',
    tooltip: {
      trigger: 'item'
    },
    itemStyle: {
      color: mainColor,
    },
    lineStyle: {
      color: mainColor,
    },
    areaStyle: {
      color: mainColor,
      opacity: 0.4
    },
    data: [
      {
        value: [10, 4, 6, 3, 8, 5],
        name: '兴趣一览'
      }
    ]
  },
}

export {
  workSkillOption,
  allSkill,
  learnSkill,
  otherSkill
}
