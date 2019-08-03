<template>
  <div
    class="search-wrap clearfix"
    :style="{width:width}"
  >
    <div>
      <el-input
        placeholder="请输入搜索关键字"
        prefix-icon="el-icon-search"
        v-model="keyword"
        class="search"
      >
      </el-input>
      <el-button
        type="primary"
        icon="el-icon-search"
        class="search-btn"
        @click="search"
      >搜索</el-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    width: {
      type: String,
      default: "600px"
    }
  },
  data() {
    return {
      keyword: "" //搜索内容
    };
  },
  methods: {
    //搜索
    search() {
      this.$emit("search", this.keyword);
    }
  }
};
</script>
<style scoped>
.search-wrap {
  margin: 30px auto;
}

.search {
  float: left;
  width: 70%;
}

.search-btn {
  float: left;
  margin-left: 15px;
}
</style>
