<template>
  <div>
    <ul class="agrms-list w600">
      <li class="clearfix">
        <span>博客标题：</span>
        <div>
          <el-input v-model="blogData.title" placeholder="请输入博客标题" clearable></el-input>
        </div>
      </li>
      <li class="clearfix">
        <span>博客类型：</span>
        <div>
          <el-select v-model="blogData.type" placeholder="请选择博客类型" class="w300">
            <el-option label="工作" :value="1"></el-option>
            <el-option label="生活" :value="2"></el-option>
          </el-select>
        </div>
      </li>
      <li class="clearfix" v-show="blogData.type===1">
        <span>博客标签：</span>
        <div>
          <el-checkbox-group v-model="blogData.tags">
            <ul class="clearfix tag-list">
              <li v-for="(item,index) of tagList" :key="index">
                <el-checkbox :label="item.name" class="tag-item">{{item.name}}</el-checkbox>
                <span class="delete-item icon icon-close" @click="removeTag(item._id)"></span>
              </li>
            </ul>
          </el-checkbox-group>
        </div>
      </li>
      <li class="clearfix" v-show="blogData.type===1">
        <span>添加标签：</span>
        <div>
          <el-input v-model="tagData.name" placeholder="请输入标签名" class="w300"></el-input>
          <el-button type="primary" class="w100 ml10" @click="addTag">添加</el-button>
        </div>
      </li>
      <li class="clearfix">
        <span>博客内容：</span>
        <div class="content-wrap">
          <el-input type="textarea" v-model="blogData.content" placeholder="请输入博客内容" :rows="10"></el-input>
          <div>
            <el-upload class="upload-file" action="/file/upload" multiple :file-list="fileList">
              <el-button type="primary">点击上传文件</el-button>
            </el-upload>
          </div>
        </div>
      </li>
    </ul>
    <div class="btn-wrap">
      <el-button type="primary" class="btn" @click="addBlog" round>确认</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fileList: [], //文件列表
      tagList: [], //博客标签
      //添加标签分类数据
      tagData: {
        name: ""
      },
      //添加博客数据
      blogData: {
        title: "",
        content: "",
        type: 1, //1工作 2生活
        tags: [] //标签
      },
      editOnOff: false //是否是修改
    };
  },
  //初始化
  beforeMount() {
    this.getTags();
    this.$utils.store.set("defaultData", this.blogData);
    this.editOnOff = this.$route.path === "/home/blog/list/edit" ? true : false;
    if (this.editOnOff) {
      const editData = this.$utils.store.get("editData");
      for (let key in this.blogData) {
        this.blogData[key] = editData[key];
      }
      this.blogData.id = editData._id;
    }
  },
  methods: {
    //添加新闻
    addBlog() {
      const utils = this.$utils;
      if (!utils.judgeNull(this.blogData.title)) {
        utils.showToast({ text: "请输入标题" });
      } else if (this.blogData.type === 1 && this.blogData.tags.length === 0) {
        utils.showToast({ text: "请至少勾选一个标签" });
      } else if (!utils.judgeNull(this.blogData.content)) {
        utils.showToast({ text: "请输入博客内容" });
      } else {
        this.$axios.post("/admin/blog/add", this.blogData).then(res => {
          if (res.data.code !== 0) return;
          utils.showToast({ text: res.data.msg });
          this.blogData = this.$utils.store.get("defaultData");
          if (this.editOnOff) this.$router.replace("/home/blog/list");
        });
      }
    },
    //获取标签
    getTags() {
      this.$axios.get(`/admin/tag/list`).then(res => {
        if (!res.data.code) this.tagList = res.data.data;
      });
    },
    //添加标签分类
    addTag() {
      if (!this.$utils.judgeNull(this.tagData.name)) {
        this.$utils.showToast({ text: "请输入标签名" });
      } else {
        this.$axios.post("/admin/tag/add", this.tagData).then(res => {
          if (res.data.code) return;
          this.$utils.showToast({ text: res.data.msg });
          this.tagData.name = "";
          this.getTags();
        });
      }
    },
    //删除标签分类
    removeTag(id) {
      this.$confirm(`此操作将永久删除该条目, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          return this.$axios.delete(`/admin/tag/delete/${id}`);
        })
        .then(res => {
          if (res.data.code) return;
          this.$utils.showToast({ text: "删除成功" });
          this.getTags();
        })
        .catch(() => {});
    }
  }
};
</script>

<style scoped>
.agrms-list .search-wrap {
  margin: 0 0 15px;
}
.tag-list {
  width: 750px;
}
.tag-list li {
  float: left;
  margin-right: 30px;
  cursor: pointer;
}

.tag-list li span:hover {
  color: red;
}

.tag-item {
  margin-right: 15px;
}

.type-item {
  display: block;
}

.type-item i {
  float: right;
}

.type-item i:hover {
  color: red;
}

.agrms-list .content-wrap {
  width: 700px;
}

.upload-file {
  margin-top: 20px;
}

.upload-file .el-upload {
  text-align: center;
}
</style>
