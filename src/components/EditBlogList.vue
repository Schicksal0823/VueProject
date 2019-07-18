<template>
  <el-table
    :data="blogs"
    size="medium"
    max-height="500"
    style="width: 100%"
    border
    :default-sort="{prop: 'createdAt',order: 'ascending'}"
  >
    <el-table-column prop="title" label="标题" sortable show-overflow-tooltip></el-table-column>
    <el-table-column prop="createdAt" label="日期" sortable width="160" align="center"></el-table-column>
    <el-table-column prop="publishCN" label="发布状态" sortable width="110" align="center"></el-table-column>

    <el-table-column label="操作" width="160" align="center">
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "EditBlogList",
  inject: ["reload"],
  data() {
    return {
      blogs: []
    };
  },
  created() {
    // 接收传送过来的数据
    this.$bus.$on("editBlogsObject", blogsObject => {
      this.blogs = blogsObject;
    });
  },
  methods: {
    handleEdit(index, row) {
      //console.log(row);
      this.$router.push({ path: "/editblog/" + row.objectId });
    },
    handleDelete(index, row) {
      // delete 需要编辑的博客
      this.$axios
        .delete("/1/classes/newBlogs/" + row.objectId)
        .then(res => {
          //console.log(res.data);
          this.form = res.data;
        })
        .catch(error => {
          console.log(error);
        });
      this.$bus.$emit("idObject", row.objectId);
      //this.reload();
    }
  },
  beforeDestroy() {
    this.$bus.$off("editBlogsObject");
  }
};
</script>

<style scoped>
</style>


