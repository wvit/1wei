<template>
  <div class="admin-list">
    <search @search="search"></search>
    <el-table :data="list" border style="width: 100%">
      <el-table-column
        v-for="(item,index) of config.tabItem"
        :key="index"
        :label="item.label"
        :width="item.width"
      >
        <template slot-scope="scope">
          <p v-if="!item.type&&!item.select">{{scope.row[item.prop]}}</p>
          <img v-if="item.type==='img'" :src="scope.row[item.prop]">
          <p v-if="item.select">{{item.select[scope.row[item.prop]]}}</p>
        </template>
      </el-table-column>
      <el-table-column label="排序" v-if="config.sortType" width="100">
        <template slot-scope="scope">
          <el-input @blur="sort(scope.row)" v-model="list[scope.$index].sort" clearable></el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作" v-if="config.deleteUrl||config.editUrl||config.dialogBtn">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            v-if="config.deleteUrl"
            @click="deleteItem(scope.$index)"
          >删除</el-button>
          <el-button
            type="text"
            size="small"
            v-if="config.editUrl"
            @click="edit(scope.row)"
          >{{config.editBtnName}}</el-button>
          <el-button
            type="text"
            size="small"
            v-for="(item,index) of config.dialogBtn"
            :key="index"
            @click="dialog(index,scope.row)"
          >{{item}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <paging
      @getPageData="getPageData"
      :url="config.getListUrl"
      :pageSize="pageSize"
      :keyword="keyword"
      :data="getListData"
      :refreshPage="refreshPage"
    ></paging>
  </div>
</template>
<script>
export default {
  props: {
    //表格配置
    config: {
      type: Object,
      default: {
        dialogBtn: Array, //对话框按钮
        deleteUrl: String, //删除的请求地址
        deleteKey: String, //删除的参数键名
        deleteType: Number, //删除请求的类型参数
        editUrl: String, //修改内容跳转的页面
        editBtnName: String, //修改按钮名字
        getListUrl: String, //请求分页数据地址
        sortType: Number, //设置排序的type
        tabItem: Array //表格的每项数据
      }
    },
    pageSize: {
      type: Number,
      default: 10
    },
    //额外请求参数
    getListData: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      list: [], //列表数据
      keyword: "", //搜索关键字
      refreshPage: Date.now() //刷新数据
    };
  },
  methods: {
    //排序
    sort(data) {
      this.$axios.post("admin/sort/set", {
        type: this.config.sortType,
        id: data.id,
        sort: data.sort
      });
    },
    //删除条目
    deleteItem(index) {
      this.$confirm(`此操作将永久删除该条目, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          return this.$axios.post(this.config.deleteUrl, {
            id: this.list[index]._id,
            [this.config.deleteKey]: this.config.deleteType
          });
        })
        .then(res => {
          if (res.data.code !== 0) return;
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.refreshPage = Date.now();
        })
        .catch(() => {});
    },
    //修改活动
    edit(thisItem) {
      this.$utils.store.set("editData", thisItem);
      this.$router.replace(this.config.editUrl);
    },
    //当前页数据
    getPageData(data) {
      console.log("本页数据", data);
      this.list = data.list;
    },
    //搜索关键字
    search(keyword) {
      this.keyword = keyword;
    },
    //对话框按钮
    dialog(index, data) {
      this.$emit("dialog", { index, data });
    }
  },
  components: {
    paging: () => import("@/components/public/paging.vue"),
    search: () => import("@/components/public/search.vue")
  }
};
</script>
<style scoped>
.admin-list {
  margin: 30px auto;
}
</style>
