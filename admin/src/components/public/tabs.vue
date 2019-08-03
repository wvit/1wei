<template>
  <div>
    <ul class="tabs-router clearfix">
      <li
        v-for="(item,index) of config"
        :key="index"
      >
        <router-link
          :to="item.url"
          active-class="active"
        >
          {{item.name}}
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    config: Array //tabs路由配置
  }
};
</script>
<style scoped>
.tabs-router {
  border-radius: 10px;
  background: #d4ddec;
  overflow: hidden;
}
.tabs-router li {
  float: left;
}
.tabs-router li a {
  display: block;
  line-height: 40px;
  text-align: center;
  color: #5987c7;
  font-size: 14px;
  padding: 0 20px;
}

.tabs-router li .active {
  background: rgba(0, 32, 93, 0.5);
  color: #fff;
}
</style>
