<template>
  <div class="app-wrapper">
    <header class="header-container">
      <navbar />
      <div class="header-logout">
        <button type="button" @click="logout">退出</button>
      </div>
    </header>
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <app-main />
    </div>
  </div>
</template>

<script>
import AppMain from "./components/AppMain.vue";
import Navbar from "./components/Navbar.vue";
import Sidebar from "./components/Sidebar/index.vue";

export default {
  name: "Layout",
  components: {
    AppMain,
    Navbar,
    Sidebar,
  },
  methods: {
    logout() {
      this.$store.removeToken();
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="less" scoped>
.app-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
}
.header {
  &-container {
    flex: none;
    width: 100%;
    height: 140px;
    background-color: lightblue;
    overflow: hidden;
  }
  &-logout {
    display: flex;
    align-items: center;
    padding-right: 30px;
    height: 100%;
    float: right;
  }
}
.sidebar-container {
  flex: none;
  width: 300px;
  height: calc(100% - 140px);
  background-color: lightcoral;
  overflow-y: auto;
}
.main-container {
  flex: 1;
  height: calc(100% - 140px);
  background-color: lightskyblue;
  overflow: auto;
}
</style>
