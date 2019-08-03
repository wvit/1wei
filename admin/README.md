

## 安装项目依赖
```
npm install
```

### 启动项目web服务
```

npm run serve
```

### 打包项目
```
npm run build
```

<!-- wv write js/vue-->

### 部分文件介绍
axios.js:axios的配置操作；

main.js:vue项目入口文件；

router.js:路由配置主文件；

store.js:vuex文件；

utils.js:封装的公共工具；

### 参考学习地址
vue:https://cn.vuejs.org/v2/guide/;

vuex:https://vuex.vuejs.org/zh/guide/;

axios:https://www.kancloud.cn/yunye/axios/234845;

vue-router:https://router.vuejs.org/zh/;

vue-cli(>3.0):https://cli.vuejs.org/zh/guide/installation.html;

element-ui:http://element-cn.eleme.io/#/zh-CN;

### 部分请求返回code介绍
res.data.code===0:请求成功；

res.data.code===400:用户未登录；


### 风格 
es6语法风格；

函数尽量不超过30行；

变量名为驼峰命名，部分变量不是驼峰是为了和后端接收参数名一致；

组件模块导入基本是在组件注册时引入；



