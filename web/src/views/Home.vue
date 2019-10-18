<template>
  <div class="home">
    <h1>主页</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
@Component({
})
export default class Home extends Vue {
  public mounted() {
    axios.get("http://localhost:3000/web/api/user/getList").then((res) => {
      console.log(res);
    });
    // axios
    //   .post("http://localhost:3000/web/api/user/addUser", {
    //     : "anles",
    //     password: 123456
    //   })
    //   .then((res) => {
    //     console.log(res);
    //   });
    axios
      .post("http://localhost:3000/web/api/user/delUser", {uid: "12"})
      .then((res) => {
        console.log(res);
      });
  }
}
</script>
<style lang="less" scoped>
.home{
  height:100%;
}
.container {
  .user-list {
    display: flex;
    align-items: center;
    list-style: none;
    .user-item {
      height:40px;
      flex: 1;
      min-width: 60px;
      padding: 15px 0;
    }
  }
}
</style>
