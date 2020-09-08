<template>
  <div>
    <div>欢迎来到小墨之家后台系统</div>
    <ul>
      <li v-for="(item) in linkList" :key="item.name">
        <router-link :to="item.path">{{item.title}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      linkList: [
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