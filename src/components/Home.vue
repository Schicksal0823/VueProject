<template>
  <el-container class="home">
    <el-header>
      <Navbar />
    </el-header>

    <div class="container">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="6" :md="6">
          <div class="el-aside">
            <Aside />
          </div>
        </el-col>

        <el-col :xs="24" :sm="18" :md="18">
          <el-main>
            <router-view>www</router-view>
          </el-main>

          <el-footer>
            <Footer />
          </el-footer>
        </el-col>
      </el-row>
    </div>
  </el-container>
</template>

<script>
import Navbar from "@/components/Navbar";
import Aside from "@/components/Aside";
import Footer from "@/components/Footer";

export default {
  name: "Home",
  data() {
    return {};
  },
  components: {
    Navbar,
    Aside,
    Footer
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home > .container {
  padding: 0 20px;
}

.el-header {
  margin-bottom: 30px;
}

.el-aside {
  padding: 20px;
  background-color: #f8f8f8;
}

.el-main {
  background-color: #f8f8f8;
}

/* @media screen and (max-width: 1200px) {
    .aside {
      display: none;
    }
} */
</style>
