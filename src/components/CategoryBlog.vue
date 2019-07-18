<template>
  <div class="categoryBlog">
    <div
      class="singleBlogList"
      v-for="(blog, index) in searchBlogs"
      :key="blog.objectId"
      @mouseover="handleOnMouseOver(index)"
      @mouseleave="handleOnMouseLeave(index)"
      :class="{'active': isThis == index && over}"
    >
      <router-link :to="'/singleblog/' + blog.objectId">
        <h4 class="title">
          <span class="typeBlog" :class="typeObject(blog)">{{blog.typeBlog.slice(0, 1)}}</span>
          {{blog.title}}
        </h4>
      </router-link>
      <article class="content">{{blog.description | snippet}}</article>

      <div class="footer">
        <span class="date">{{blog.createdAt}}</span>
        <router-link :to="'/editblog/' +blog.objectId">编辑</router-link>
      </div>
    </div>

    <div class="pageBlock">
      <el-pagination
        layout="prev, pager, next"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="pageTotal"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShowBlog",
  data() {
    return {
      blogs: [],
      filterBlogs: [],
      isThis: "",
      over: false,
      search: "",
      currentPage: 1,
      pageSize: 6,
      pageTotal: 0,
      tags: [],
      // tag: this.$route.params.tag
    };
  },
  created() {
    // 数据重复使用，就直接传过来了，不重新GET
    this.$bus.$on("blogsObject", blogsObject => {
      this.blogs = blogsObject;
    });

    this.$bus.$on("tagsArray", tagsArray => {
      this.tags = tagsArray;
    });

    // 监听
    this.$bus.$on("searchCategory", searchCategory => {
      //   let _this = this;
      //   _this.search = searchCategory;
      this.search = searchCategory;
    });
  },
  watch: {
    blogs: "updateFilterBlogs",
    $route: "updateFilterBlogs"
  },
  computed: {
    // 返回需要显示的项
    searchBlogs: function() {
      let Ret = this.filterBlogs.filter(blog => {
        return blog.title.match(this.search);
      });
      this.pageTotal = Ret.length;
      return Ret.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    }
  },
  methods: {
    // 添加class
    typeObject(value) {
      let Ret = { typefist: false, typeSecond: false, typeThird: false };
      if (value.typeBlog === "原创") {
        Ret.typefist = true;
      } else if (value.typeBlog === "转载") {
        Ret.typeSecond = true;
      } else if (value.typeBlog === "翻译") {
        Ret.typeThird = true;
      }
      return Ret;
    },
    // 个人分类过滤
    updateFilterBlogs() {
      this.filterBlogs = this.blogs.filter(blog => {
        return blog.categorySelf.match(this.tags[this.$route.params.tag]);
      });
    },
    handleCurrentChange(value) {
      this.currentPage = value;
    },
    handleOnMouseOver(value) {
      this.over = true;
      this.isThis = value;
    },
    handleOnMouseLeave(value) {
      this.over = false;
      this.isThis = value;
    }
  },
  filters: {
    // 过滤
    snippet(value) {
      return value.slice(0, 100) + "...";
    }
  },
  beforeDestroy(){
    this.$bus.$off("blogsObject");
    this.$bus.$off("tagsArray");
    this.$bus.$off("searchCategory");
  }
};
</script>

<style>
.singleBlogList {
  margin-bottom: 20px;
  padding: 10px 20px;
  background-color: #ffff;
}

.active {
  background-color: #dddd;
  font-size: 1.2rem;
}

.singleBlogList a {
  color: #3d3d3d;
  text-decoration: none;
}

.singleBlogList a:hover {
  color: #79a5e5;
}

.singleBlogList .footer a {
  color: #79a5e5;
}

.singleBlogList article {
  margin-block-start: 1.5rem;
  margin-block-end: 1.5rem;
  color: #999;
}

.singleBlogList .footer {
  display: flex;
  justify-content: space-between;
  color: #6b6b6b;
  font-size: 0 rem;
}

.pageBlock {
  display: flex;
  justify-content: center;
}

.el-pagination .el-pager li {
  background: #f8f8f8 !important;
}

.typeBlog {
  display: inline-block;
  text-align: center;
  width: 1.625rem;
  height: 1.625rem;
  line-height: 1.625rem;
  font-size: 0.75rem;
  border-radius: 50%;
}

.typefist {
  color: #ca0c16;
  border: 1px solid #f4ced0;
}

.typeSecond {
  color: #86ca5e;
  border: 1px solid #e7f4df;
}

.typeThird {
  color: #8d1b9c;
  border: 1px solid #b358be;
}
</style>
