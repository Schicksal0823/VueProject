<template>
  <div class="singleBlog">
    <div class="header">
      <h2 class="title">
        <span class="typeBlog" :class="typeObject(blogs)">{{typeTag}}</span>
        {{blogs.title}}
      </h2>
      <div class="between">
        <span class="date">{{blogs.createdAt}}</span>

        <router-link :to="'/editblog/' +id">编辑</router-link>
      </div>
    </div>

    <article class="content">{{blogs.description}}</article>
  </div>
</template>

<script>
export default {
  name: "SingleBlog",
  data() {
    return {
      blogs: {},
      id: this.$route.params.id
    };
  },
  created() {
    // get 博客
    this.$axios
      .get("/1/classes/newBlogs/" + this.id)
      .then(res => {
        //console.log(res.data);
        this.blogs = res.data;
      })
      .catch(error => {
        console.log(error);
      });
  },
  computed: {
      // 修改标签类型
      typeTag() {
        if (this.blogs.typeBlog) {
          return this.blogs.typeBlog.slice(0, 1);
        }
      }
  },
  methods: {
    // 添加class
    typeObject(value) {
      let ret = { typefist: false, typeSecond: false, typeThird: false };
      if (value.typeBlog === "原创") {
        ret.typefist = true;
      } else if (value.typeBlog === "转载") {
        ret.typeSecond = true;
      } else if (value.typeBlog === "翻译") {
        ret.typeThird = true;
      }
      return ret;
    }
  }
};
</script>

<style scoped>
.singleBlog {
  margin: 0px 20px;
  background-color: #dddd;
}

.between {
  display: flex;
  justify-content: space-between;
  padding: 20px 10px 10px 0px;
}

.between a {
  color: #79a5e5;
  text-decoration: none;
}

.singleBlog .content {
  margin: 2px 0px;
  padding: 10px 0px;
  font-size: 1.2rem;
  line-height: 1.6rem;
}

.singleBlog .header,.content {
  background-color: #f8f8f8;
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

/* .singleBlog h2 {
    margin-block-start: 0rem;
    margin-block-end: 0rem;
}
.singleBlog p {
    margin-block-start: 0rem;
    margin-block-end: 0rem;
} */
</style>


