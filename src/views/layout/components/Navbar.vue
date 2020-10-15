<template>
  <div>
    <ul>
      <li v-for="(item) in linkList" :key="item.name">
        <router-link :to="item.path">{{item.title}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      linkList: [
        {
          name: "Dashboard",
          path: "/",
          title: "首页",
        },
        {
          name: "Game",
          path: "/game",
          title: "游戏首页",
        },
        {
          name: "Product",
          path: "/product",
          title: "产品首页",
        },
      ],
    };
  },
};
</script>

<style>
</style>