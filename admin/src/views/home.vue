<template>
  <div class="home">
    <div class="home-head clearfix">
      <div class="user">
        <p>{{userInfo.user_name}}，你好</p>
        <a @click="signOut">退出</a>
      </div>
    </div>
    <div class="main clearfix">
      <ul class="leftNav">
        <li v-for="(item,index) of leftNav" :key="index">
          <router-link :to="item.url" active-class="active">{{item.text}}</router-link>
        </li>
      </ul>
      <div class="right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //左边导航
      leftNav: [
        {
          text: "博客管理",
          url: "/home/blog"
        },
        {
          text: "请求数据统计",
          url: "/home/reqData"
        }
      ],
      userInfo: { user_name: "wv" } //用户信息
    };
  },
  //初始化
  beforeMount() {
    return;
    this.$axios.get(`/admin/user/info`).then(res => {
      if (res.data.code === 0) {
        this.$store.commit("setAdmin", res.data.data);
        this.userInfo = res.data.data;
      } else if (res.data.code === 100013 || res.data.code === 400) {
        this.$utils.showToast({ text: "登录已失效，请重新登录" }).then(() => {
          this.$router.replace("/signIn");
        });
      }
    });
  },
  methods: {
    //退出登录
    signOut() {
      return;
      this.$router.replace("/signIn");
      this.$utils.store.clear();
    }
  }
};
</script>
<style scoped>
.home {
  width: 100vw;
  height: 100vh;
  background: #00205d;
}
.home-head {
  padding: 30px;
}

.user {
  float: right;
}

.user * {
  float: left;
  color: #fff;
  line-height: 30px;
  margin-right: 15px;
}

.user p {
  font-size: 14px;
}

.user a {
  font-size: 12px;
  padding: 0 20px;
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.3);
}
.main {
  height: calc(100vh - 100px);
}
.leftNav {
  float: left;
  width: 12%;
  background: rgba(255, 255, 255, 0.3);
  margin-top: 70px;
}
.leftNav li a {
  color: #fff;
  line-height: 50px;
  display: block;
  text-align: center;
  font-size: 14px;
}

.leftNav li .active {
  background: rgba(0, 32, 93, 0.6);
}

.leftNav li:nth-of-type(n + 2) a {
  border-top: 1px solid #333;
}

.right {
  float: right;
  background: #fff;
  min-height: 100%;
  width: 88%;
  padding: 15px;
  box-sizing: border-box;
  overflow-y: scroll;
  max-height: calc(100vh - 100px);
}
</style>

