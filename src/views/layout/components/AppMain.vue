<template>
  <div>
    <keep-alive :max="2">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "AppMain",
};
</script>

<style>
</style>