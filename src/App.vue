<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  provide() {
    // 父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      // 控制视图是否显示的变量
      isRouterAlive: true
    };
  },
  methods: {
    reload() {
      // 先关闭，
      this.isRouterAlive = false;
      // 再打开
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  }
};
</script>

<style>
h2,
h4,
p {
  margin-block-start: 0rem;
  margin-block-end: 0rem;
}
</style>
