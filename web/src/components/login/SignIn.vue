<template>
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
        error-message
      />
      <van-field
        v-model="formData.password"
        left-icon="lock"
        clearable
        label-width="50"
        label="密码"
        placeholder="请输入登录密码"
        error-message
      />
    </van-cell-group>
    <div class="form-submit">
      <van-button :loading="false" class="sign_btn" type="info" text="登录" loading-text="登录中..." />
    </div>
    <van-button class="helper-item left" @click="onUseComponent('modify')" text="修改密码"></van-button>
    <van-button class="helper-item center" @click="onUseComponent('email')" text="注册账号"></van-button>
    <van-button class="helper-item right" @click="onUseComponent('reset')" text="忘记密码"></van-button>
  </section>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import axios from "axios";
import { Button, Field, CellGroup } from "vant";
interface TformData {
  account: string;
  password: string;
}
@Component({
  components: {
    [Button.name]: Button,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup
  }
})
export default class SignIn extends Vue {
  @Prop({ type: String }) public value!: string;
  private get useComponent() {
    return this.value;
  }
  private set useComponent(val) {
    this.$emit("input", val);
  }
  private formData: TformData = {
    account: "",
    password: ""
  };

  public mounted() {
    console.log(this.value);
  }

  private onUseComponent(val: string) {
    this.useComponent = val;
  }
}
</script>
<style lang="less" scoped>
@import url('./login.less');
</style>