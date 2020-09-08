<template>
  <div>
    <div class="login-wrap">
      <div>登录界面</div>
      <div class="login-item">
        <label for="username">用户名</label>
        <input type="text" id="username" v-model="username" />
      </div>
      <div class="login-item">
        <label for="password">密码</label>
        <input type="text" id="password" v-model="password" />
      </div>
      <button type="button" @click="login">登录</button>
    </div>
  </div>
</template>

<script>
// import '@/assets/le.less'
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      if (this.username && this.password) {
        let token = `username=${this.username}&password=${this.password}`;
        this.$store.setUserInfo(token);
        this.$store.setToken(token);
        this.$router.push({ path: "/" });
      } else {
        alert("请填全用户名和密码！");
      }
    },
  },
};
</script>

<style lang="less" scoped>
/* @import  '@/assets/e.less'; */
/* @import  '@/assets/common.css'; */
.login {
  &-wrap {
    margin: 100px auto;
    width: 400px;
    height: 300px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
    background-color: lightblue;
  }
  &-item {
    box-sizing: border-box;
    width: 100%;
    padding: 0 60px;
    display: flex;
    justify-items: center;
    label {
      flex: none;
      display: inline-block;
      width: 60px;
      line-height: 30px;
    }
    input {
      flex: 1;
      height: 30px;
      line-height: 30px;
    }
  }
}
</style>