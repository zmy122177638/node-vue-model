<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import api from "./api";
@Component({})
export default class App extends Vue {
  public mounted() {
    api.getUserInfo().then((res: any) => {
      console.log(res);
    });
  }
}
</script>
<style lang="scss" scoped>
#app {
  height: 100%;
  background-color: #f5f5f5;
}
</style>
