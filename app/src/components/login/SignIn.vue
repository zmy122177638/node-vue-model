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
      <van-button
        :loading="isLoad"
        @click="onSubmitFormData()"
        class="sign_btn"
        type="info"
        text="登录"
        loading-text="登录中..."
      />
    </div>
    <van-button
      class="helper-item left"
      @click="onUseComponent('modify')"
      text="修改密码"
    ></van-button>
    <van-button
      class="helper-item center"
      @click="onUseComponent('email')"
      text="注册账号"
    ></van-button>
    <van-button
      class="helper-item right"
      @click="onUseComponent('reset')"
      text="忘记密码"
    ></van-button>
  </section>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Button, Field, CellGroup } from "vant";
import * as api from "../../api/index";
interface TformData {
  account: string;
  password: string;
  regTips: any;
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
  private isLoad: boolean = false;
  private formData: TformData = {
    account: "",
    password: "",
    regTips: {
      account: "",
      password: ""
    }
  };

  private onUseComponent(val: string) {
    this.useComponent = val;
  }

  private onSubmitFormData() {
    const { account, password, regTips } = this.formData;
    if (!account) {
      regTips.account = "账号不能为空";
      return;
    } else if (!password) {
      regTips.password = "密码不能为空";
      return;
    }
    api.accountSign({ account, password }).then(() => {
      this.$toast("登录成功");
      this.$router.push({ name: "Home" });
    });
  }
}
</script>
<style lang="scss" scoped>
@import "../../common/css/login.scss";
</style>
