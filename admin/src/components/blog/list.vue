<template>
  <div class="admin-list">
    <tabList :config="tabsListConfig"></tabList>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tabsListConfig: {
        deleteUrl: "/admin/blog", //删除的请求地址
        deleteKey: "type", //删除的参数键名
        deleteType: 2, //删除请求的类型参数
        editBtnName: "修改", //修改按钮名字
        editUrl: "/home/blog/list/edit", //修改内容跳转的页面
        getListUrl: "/admin/getBlogs", //请求分页数据地址
        //表格的每项数据
        tabItem: [
          {
            prop: "_id",
            label: "ID"
          },
          {
            prop: "title",
            label: "新闻标题"
          },
          {
            prop: "pageView",
            label: "浏览量"
          },
          {
            prop: "addTime",
            label: "发布时间"
          }
        ]
      }
    };
  },
  methods: {},
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
