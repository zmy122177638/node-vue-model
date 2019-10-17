<template>
  <section class="login">
    <div class="container">
      <!-- 登录表单 -->
      <section class="form-sec">
        <h1 class="form-title">用户登录</h1>
        <van-cell-group>
          <van-field
            v-model="formData.account"
            left-icon="manager"
            clearable
            label-width="50"
            label="账号"
            placeholder="请输入登录账号"
            error-message=""
          />
          <van-field
            v-model="formData.password"
            left-icon="lock"
            clearable
            label-width="50"
            label="密码"
            placeholder="请输入登录密码"
            error-message=""
          />
        </van-cell-group>
        <div class="form-submit">
          <van-button :loading="false" class="sgin_btn" type="info" text="立即登录" loading-text="登录中..." />
        </div>
        <div class="helper-item register">注册账号</div>
        <div class="helper-item password">忘记密码</div>
      </section>
      
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import { Button, Field, CellGroup  } from "vant";
@Component({
  components: {
    [Button.name]: Button,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup
  }
})
export default class Login extends Vue {
  private formData = {
    account: '',
    password: ''
  };
  public mounted() {
    console.log(123);
  }
}
</script>
<style lang="less" scoped>
.login {
  height: 100%;
  background: url("../assets/img/timg.jpg") left top / 100% 100%;
}
.container{
  height:100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.form-sec{
  width:90%;
  box-sizing: border-box;
  min-height:150px;
  background:rgba(46, 145, 236, 0.5);
  border-radius:7px;
  padding:15px 10px 60px;
  position: relative;
  .form-title{
    font-size:18px;
    color:rgb(8, 107, 92);
    font-weight: bold;
    text-align: center;
    letter-spacing: 3px;
    margin-bottom: 15px;
  }
  .form-submit{
    margin-top:20px;
    text-align: center;
  }
  .sgin_btn{
    background: linear-gradient(rgba(46, 145, 236), rgb(5, 110, 151)) !important;
    border-radius: 2px;
    width: 55%;
  }
  .helper-item{
    position: absolute;
    width: 25%;
    line-height:35px;
    box-sizing: border-box;
    font-size:13px;
    bottom:20px;
    color:rgb(194, 192, 192);
    background-color:rgba(8, 77, 109, 0.7);
    &.register{
      left:0;
      border-radius: 0 15px 15px 0;
      padding-left:10px;
    }
    &.password{
      right: 0;
      padding-right:10px;
      text-align: right;
      border-radius: 15px 0px 0px 15px;
    }
  }
  .helper-box{
    display: flex;
    align-items: center;
    justify-content: space-between;
    .helper-item{
      font-size:14px;
      color: rgb(21, 57, 177);
      text-decoration: underline;
    }
  }
}

</style>