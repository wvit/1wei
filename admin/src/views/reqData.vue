<template>
  <div>
    <tabs :config="config"></tabs>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //tabs路由配置
      config: [
        {
          name: "请求数据",
          url: "/home/reqData/list"
        },
    
      ]
    };
  },
  components: {
    tabs: () => import("@/components/public/tabs.vue")
  }
};
</script>

<style scoped>
</style>
