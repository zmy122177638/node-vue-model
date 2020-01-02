<template>
  <div class="home">
    <p>用户id: {{ userInfo.id }}</p>
    <p>手机号: {{ userInfo.phone }}</p>
    <p>邮箱: {{ userInfo.email || "暂无" }}</p>
    <button @click="onLogout">退出登录</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { AccountMoudule } from "../store/modules/account";
import api from "../api";
@Component
export default class Home extends Vue {
  private get userInfo() {
    return AccountMoudule.userInfo;
  }
  private onLogout() {
    api.logout().then(() => {
      AccountMoudule.logout();
      this.$router.replace({ name: "Login" });
    });
  }
}
</script>
<style lang="scss" scoped>
.home {
  height: 100%;
  text-align: center;
}
</style>
