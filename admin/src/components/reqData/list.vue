<template>
  <div class="admin-list">
    <tabList :config="tabsListConfig" :pageSize="20"></tabList>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tabsListConfig: {
        getListUrl: "/admin/getReqData", //请求分页数据地址
        //表格的每项数据
        tabItem: [
          {
            prop: "ip",
            label: "IP"
          },
          {
            prop: "userAgent",
            label: "设备"
          },
          {
            prop: "referer",
            label: "来源"
          },
          {
            prop: "reqDate",
            label: "请求时间"
          },
          {
            prop: "city",
            label: "城市"
          }
        ]
      }
    };
  },
  components: {
    tabList: () => import("@/components/public/tabList.vue")
  }
};
</script>
<style scoped>
.admin-list {
  margin: 30px auto;
}
</style>
