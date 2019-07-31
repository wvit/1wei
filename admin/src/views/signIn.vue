<template>
  <div class="wrap">
    <div class="signIn">
      <h1>blog后台管理登录</h1>
      <div class="mt20 username">
        <el-input v-model="signIn.username" placeholder="请输入账号" clearable></el-input>
      </div>
      <div class="mt20 password">
        <el-input type="password" v-model="signIn.password" placeholder="请输入密码" clearable></el-input>
      </div>
      <el-button type="primary" class="mt20" @click="adminSignIn">登录</el-button>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      signIn: {
        username: "", //账号
        password: "" //密码
      }
    };
  },
  methods: {
    //管理员登录
    adminSignIn() {
      if (!this.$utils.judgeNull(this.signIn.username)) {
        this.$utils.showToast({ text: "请输入管理员名字" });
      } else if (!this.$utils.judgeNull(this.signIn.password)) {
        this.$utils.showToast({ text: "请输入密码" });
      } else {
        this.$axios.post("/admin/signIn", this.signIn).then(res => {
          if (res.data.code === 0) {
            this.$router.replace("/home");
            this.$utils.store.set("token", res.data.token);
            this.$axios.defaults.headers.common["Authorization"] = `Bearer ${
              res.data.token
            }`;
          } else {
            this.$utils.showToast({ text: "登录失败，检查用户名或密码" });
          }
        });
      }
    }
  }
};
</script>
<style scoped>
.wrap {
  width: 100vw;
  height: 100vh;
  background: #001c51;
}
.signIn {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 30px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  width: 400px;
}
.signIn h1 {
  color: #333;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
}

.el-button--primary {
  width: 100%;
}
</style>

