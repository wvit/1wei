<template>
  <div class="paging">
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      @current-change="pagingChange"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  props: {
    url: String, //请求地址
    //搜索关键字
    keyword: {
      type: String,
      default: ""
    },
    //额外请求参数
    data: {
      type: Object,
      default() {
        return {};
      }
    },
    //一页数量
    pageSize: {
      type: Number,
      default: 10
    },
    refreshPage: Number //刷新页面
  },
  data() {
    return {
      page: 1, //页码
      total: 0, //总数量
      pageData: [], //当前页数据
      requestUrl: "" //请求地址
    };
  },
  //初始化
  beforeMount() {
    this.setReqData();
  },
  methods: {
    //设置额外请求数据
    setReqData() {
      let data = "";
      this.page = 1;
      for (let key in this.data) {
        data += `&${key}=${this.data[key]}`;
      }
      this.requestUrl = `${this.url}?pageSize=${this.pageSize}${data}`;
      this.getPageData();
    },
    //分页改变
    pagingChange(page) {
      this.page = page;
      this.getPageData();
    },
    //获取分页数据
    getPageData() {
      this.$axios
        .get(`${this.requestUrl}&key=${this.keyword}&page=${this.page}`)
        .then(res => {
          if (res.data.code === 0) {
            this.total = res.data.data.count;
            this.$emit("getPageData", res.data.data);
          }
        });
    }
  },
  watch: {
    //监听变化再次请求
    keyword() {
      this.setReqData();
    },
    data: {
      handler() {
        this.setReqData();
      },
      deep: true
    },
    refreshPage() {
      this.getPageData();
    }
  }
};
</script>
<style scoped>
.paging {
  text-align: center;
}

.paging > div {
  display: inline-block;
  margin: 30px auto;
}
</style>
