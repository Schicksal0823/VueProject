<template>
  <div class="aside">
    <el-input
      v-model="search"
      suffix-icon="el-icon-search"
      placeholder="搜索"
      clearable
      @change="handleInputChange"
    ></el-input>

    <div class="categoryTitle">
      <h4>个人分类</h4>
    </div>

    <div class="categorySelfs">
      <router-link
        v-for="(tag,index) in tags"
        :key="index"
        :to="'/categoryblog/' + index"
      >{{tag}}{{'('+tagNumber(tag)+')'}}</router-link>
    </div>
    <!-- <el-button type="primary" @click="handleclick"></el-button> -->
  </div>
</template>

<script>
export default {
  name: "Aside",
  data() {
    return {
      blogs: [],
      tags: [],
      search: ""
    };
  },
  watch: {
    // 将需要展示的数据传给ShowBlog组件
    blogs: "sendObject",
    $route: "sendObject"
  },
  created() {
    // get 所有微博数据
    this.$axios
      .get("/1/classes/newBlogs")
      .then(res => {
        //console.log(res.data.results);
        return res.data.results;
      })
      .then(res => {
        this.blogs = res;
      })
      .catch(error => {
        if (error.response) {
          console.log(error.response.status);
          alert(error.response.status);
        } else if (error.request) {
          console.log(error.request);
          alert("请求未响应！");
        } else {
          console.log("Error", error.message);
        }
        console.log(error);
      });
    // get 个人分类
    this.$axios
      .get("/1/classes/categoryOlds")
      .then(res => {
        //console.log(res.data.results);
        return res.data.results;
      })
      .then(res => {
        let categoryArray = [];
        for (let key in res) {
          categoryArray.push(res[key].categorySelf);
        }
        this.tags = categoryArray;
      })
      .catch(error => {
        console.log(error);
      });

    // 通过接收数据 需要删除的数据
    this.$bus.$on("idObject", idObject => {
      for (let i = 0; i < this.blogs.length; i++) {
        if (this.blogs[i].objectId === idObject) {
          delete this.blogs[i];
          this.blogs.sort();
          break;
        }
      }
    });
  },
  methods: {
    //测试
    // handleclick() {
    //   debugger;
    //   this.$route;
    // },
    // 各个人分类数量
    tagNumber(value) {
      let Number = 0;
      for (let i = 0; i < this.blogs.length; i++) {
        if (value === this.blogs[i].categorySelf) {
          Number++;
        }
      }
      return Number;
    },
    // send blogs Object
    // 由于此组件早已建立且不销毁，新组件$On就很尴尬了，故使用nextTick()方法
    sendObject() {
      this.$nextTick(() => {
        this.$bus.$emit("blogsObject", this.blogs);
      });

      this.$nextTick(() => {
        this.$bus.$emit("showBlogsObject", this.blogs);
      });

      this.$nextTick(() => {
        this.$bus.$emit("editBlogsObject", this.blogs);
      });

      this.$nextTick(() => {
        this.$bus.$emit("tagsArray", this.tags);
      });
    },
    // 触发
    handleInputChange() {
      this.$bus.$emit("searchString", this.search);
      this.$bus.$emit("searchCategory", this.search);
    }
  },
  beforeDestroy() {
    this.$bus.$off("idObject");
  }
};
</script>

<style scoped>
a {
  display: block;
  margin-bottom: 8px;
  color: #3d3d3d;
  text-decoration: none;
}

a:hover {
  color: #79a5e5;
}

.categoryTitle {
  margin-top: 10px;
  margin-bottom: 4px;
  padding: 15px 15px;
  background-color: #ffff;
}

.categorySelfs {
  padding: 15px 27px;
  background-color: #ffff;
}

.categoryTitle h4:before {
  display: inline-block;
  content: "";
  margin-right: 8px;
  width: 4px;
  height: 22px;
  vertical-align: middle;
  background-color: #d8d8d8;
}
</style>


