<template>
  <div class="app">
    <Layout />
    <router-view class="page"></router-view>
  </div>
</template>

<script>
import Layout from "./components/Layout.vue";
export default {
  name: "App",
  components: {
    Layout,
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}

.app {
  color: #2c3e50;
  font-family: Roboto, Arial;
}

.page {
  padding: 132px 20px 20px 20px;
}
</style>
