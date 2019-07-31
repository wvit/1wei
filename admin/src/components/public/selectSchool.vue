<template>
  <div class="select-school">
    <search
      @search="searchSchool"
      width="100%"
    ></search>
    <p
      class="reset"
      v-if="resetBtn"
      @click="reset"
    >
      <a>重置</a>
    </p>
    <el-select
      v-model="schoolId"
      @change="changeSchool"
      placeholder="请搜索营区然后选择"
      class="w300"
    >
      <el-option
        v-for="(item,index) of schoolList"
        :key="index"
        :label="item.school_name"
        :value="item.id"
      ></el-option>
    </el-select>
  </div>
</template>
<script>
export default {
  props: {
    //重置按钮
    resetBtn: {
      type: Boolean,
      default: false
    },
    //校区id
    school_id: {
      type: [String, Number],
      default: ""
    }
  },
  data() {
    return {
      schoolId: "", //校区id
      schoolList: [] //校区列表
    };
  },
  //初始化
  beforeMount() {
    this.schoolId = this.school_id;
    if (typeof this.school_id === "number") {
      this.$axios
        .get(`/admin/school/info?school_id=${this.school_id}`)
        .then(res => {
          if (res.data.code === 0) {
            this.schoolList = [res.data.data];
          }
        });
    }
  },
  methods: {
    //搜索校区
    searchSchool(keyword) {
      if (this.$utils.judgeNull(keyword)) {
        this.$axios
          .get(`/admin/school/list?key=${keyword}&page=1&pageSize=100`)
          .then(res => {
            if (res.data.code === 0) {
              this.schoolList = res.data.data.list;
              this.schoolId = "";
            }
          });
      }
    },
    //选择校区
    changeSchool(id) {
      this.$emit("changeSchool", id);
    },
    //重置
    reset() {
      this.changeSchool("");
    }
  },
  components: {
    search: () => import("@/components/public/search.vue")
  }
};
</script>
<style scoped>
.select-school .search-wrap {
  margin: 0 auto 15px;
}
.reset {
  line-height: 16px;
  margin-bottom: 15px;
}
.reset a {
  font-size: 12px;
  color: #409eff;
}
</style>
