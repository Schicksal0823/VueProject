<template>
  <el-menu
    :default-active="$route.path"
    :router="true"
    class="el-menu-demo"
    background-color="#eeee"
  >
    <el-menu-item index="/showblog">首页</el-menu-item>
    <el-menu-item index="/newblog">新博客</el-menu-item>
    <el-menu-item index="/editbloglist">管理</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed:{
    
  },
  methods: {
    
  }
};
</script>

<style scoped>
.el-menu {
  text-align: center;
}

.el-menu-item {
  display: inline-block;
}
</style>


