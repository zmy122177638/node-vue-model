<template>
  <div class="home">
    <span>home</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import api from "../api";
@Component({})
export default class Home extends Vue {}
</script>
<style lang="scss" scoped>
.home {
  height: 100%;
}
</style>
