<template>
  <div class="home">
    <h1>home</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';
@Component({})
export default class Home extends Vue {}
</script>
<style lang="less" scoped>
.home {
  height: 100%;
}
.container {
  .user-list {
    display: flex;
    align-items: center;
    list-style: none;
    .user-item {
      height: 40px;
      flex: 1;
      min-width: 60px;
      padding: 15px 0;
    }
  }
}
</style>
