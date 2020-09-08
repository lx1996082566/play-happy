<template>
  <div>
    <div>
      <h1>401</h1>
      <p>你当前没有用户权限去该页面！</p>
      <p class="back-link" @click="back">可点击此返回首页</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Page401",
  methods: {
    back() {
      this.$router.push({ path: "/" });
    },
  },
};
</script>

<style scoped>
.back-link:hover {
  cursor: pointer;
  text-decoration: underline;
}
</style>