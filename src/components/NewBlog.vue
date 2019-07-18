<template>
  <div class="newBlog">
    <el-form
      :rules="rules"
      ref="form"
      :model="form"
      label-width="80px"
      size="medium"
      v-if="!submmited"
    >
      <el-page-header @back="goBack" content="发布文章"></el-page-header>

      <el-form-item label="文章标题" prop="title">
        <el-input placeholder="请输入文章标题" v-model="form.title"></el-input>
      </el-form-item>

      <el-form-item label="文章内容" prop="description">
        <el-input
          type="textarea"
          :rows="10"
          v-model="form.description"
          placeholder="输入不少于10字..."
          minlength="10"
          maxlength="1000"
          show-word-limit
        ></el-input>
      </el-form-item>

      <el-form-item label="个人分类">
        <el-col :span="8">
          <el-select v-model="categoryOld" placeholder="请选择分类" @change="handleOptionChange">
            <el-option
              v-for="optionCategoryOld in categoryOlds"
              :key="optionCategoryOld"
              :label="optionCategoryOld"
              :value="optionCategoryOld"
            ></el-option>
          </el-select>
        </el-col>

        <el-col :span="8">
          <el-input
            placeholder="添加新个人分类"
            v-model="form.categorySelf"
            maxlength="10"
            show-word-limit
          ></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="博客分类" prop="categoryBlog">
        <el-select v-model="form.categoryBlog" placeholder="请选择分类">
          <el-option
            v-for="optionCategoryBlog in categoryBlogs"
            :key="optionCategoryBlog"
            :label="optionCategoryBlog"
            :value="optionCategoryBlog"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="高级选项">
        <el-checkbox
          :indeterminate="form.isIndeterminate"
          v-model="form.checkAll"
          @change="handleCheckAllChange"
        >全选</el-checkbox>
        <el-checkbox-group v-model="form.select" @change="handleCheckedCitiesChange">
          <el-checkbox
            v-for="checkSelect in selects"
            :key="checkSelect"
            :label="checkSelect"
            :value="checkSelect"
          ></el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="文章类型" prop="typeBlog">
        <el-radio-group v-model="form.typeBlog">
          <el-radio v-for="radioTypeBlog in typeBlogs" :key="radioTypeBlog" :label="radioTypeBlog"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即发布</el-button>
        <el-button type @click="onSave">保存草稿</el-button>
      </el-form-item>
    </el-form>

    <dir class="blogSuccess" v-if="submmited">
      <p>您的博客{{Subtext}}成功！</p>
      <el-button type="primary" icon="el-icon-arrow-left" plain @click="goBack">返回主页</el-button>
    </dir>
  </div>
</template>

<script>
export default {
  name: "NewBlog",
  data() {
    return {
      form: {
        title: "",
        description: "",
        categorySelf: "",
        categoryBlog: "",
        select: [],
        checkAll: false,
        isIndeterminate: false,
        typeBlog: "",
        publish: true,
        publishCN: "发布"
      },
      rules: {
        title: [
          { required: true, message: "请输入文章标题", trigger: "blur" },
          { min: 2, max: 32, message: "长度在 2 到 32 个字符", trigger: "blur" }
        ],
        description: [
          { required: true, message: "请输入文章内容", trigger: "blur" },
          {
            min: 10,
            max: 1000,
            message: "长度在 10 到 1000 个字符",
            trigger: "blur"
          }
        ],
        categoryBlog: [
          { required: true, message: "请选择博客类型", trigger: "change" }
        ],
        typeBlog: [
          { required: true, message: "请选择文章类型", trigger: "change" }
        ]
      },
      categoryOld: "",
      categoryOlds: [],
      categoryBlogs: ["前端", "后端", "安全", "数据库", "编程语言"],
      selects: ["置顶", "允许评论", "更新创建时间"],
      typeBlogs: ["原创", "转载", "翻译"],
      submmited: false,
      Subtext: "发布"
    };
  },
  created() {
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
        this.categoryOlds = categoryArray;
      })
      .catch(() => {
        console.log("接收失败");
      });
  },
  methods: {
    goBack() {
      this.$router.push({ path: "/" });
      this.$router.go({ path: "/" });
      console.log("goBack!");
    },
    onSubmit() {
      // post 新博客
      this.$axios
        .post("/1/classes/newBlogs", this.form)
        .then(res => {
          //console.log(res.data);
          this.submmited = true;
        })
        .catch(error => {
          console.log(error);
          alert("提交失败，请求未响应!");
        });

      // 不重复提交个人分类
      let isRun = true;
      for (let i = 0; i < this.categoryOlds.length; i++) {
        //console.log(this.categoryOlds[i]);
        if (this.categoryOlds[i] === this.form.categorySelf) {
          isRun = false;
        }
      }

      // post新个人分类
      if (isRun) {
        this.$axios
          .post("/1/classes/categoryOlds", {
            categorySelf: this.form.categorySelf
          })
          .then(res => {
            //console.log(res.data);
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    onSave() {
      // post 新博客
      this.form.publish = false;
      this.form.publishCN= "未发布";
      this.$axios
        .post("/1/classes/newBlogs", this.form)
        .then(res => {
          //console.log(res.data);
          this.Subtext = "草稿保存";
          this.submmited = true;
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleOptionChange(value) {
      this.form.categorySelf = value;
    },
    handleCheckAllChange(value) {
      this.form.select = value ? this.selects : [];
      this.form.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.form.checkAll = checkedCount === this.selects.length;
      this.form.isIndeterminate =
        checkedCount > 0 && checkedCount < this.selects.length;
    }
  }
};
</script>

<style scoped>
.newBlog .el-page-header {
  padding: 20px 10px;
}

.newBlog .el-col {
  padding: 0px !important;
}

.blogSuccess {
  font-size: 40px;
  text-align: center;
  color: #c0ccda;
}
</style>


