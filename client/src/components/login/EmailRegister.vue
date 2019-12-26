<template>
  <section class="form-sec">
    <h1 class="form-title">邮箱注册</h1>
    <van-cell-group>
      <van-field
        v-model="formData.email"
        left-icon="manager"
        clearable
        label-width="80"
        label="邮箱账号"
        placeholder="请输入邮箱地址"
        :error-message="formData.regTips.email"
      />
      <van-field
        v-model="formData.password"
        left-icon="lock"
        clearable
        type="password"
        label-width="80"
        label="登录密码"
        placeholder="请输入登录密码"
        :error-message="formData.regTips.password"
      />
      <van-field
        v-model="formData.passwordReg"
        left-icon="lock"
        clearable
        type="password"
        label-width="80"
        label="确认密码"
        placeholder="请再次输入登录密码"
        :error-message="formData.regTips.passwordReg"
      />
    </van-cell-group>
    <div class="form-submit">
      <van-button
        :loading="isLoad"
        @click="onFormSubmit()"
        class="sign_btn"
        type="info"
        text="立即注册"
        loading-text="注册中..."
      />
    </div>
    <van-button
      class="helper-item left"
      @click="onUseComponent('sign')"
      text="返回登录"
    ></van-button>
    <van-button
      class="helper-item right"
      @click="onUseComponent('phone')"
      text="手机注册"
    ></van-button>
  </section>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import * as api from "../../api/index";
import { Button, Field, CellGroup } from "vant";
interface TformData {
  email: string;
  password: string;
  passwordReg: string;
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
  private formData: TformData = {
    email: "",
    password: "",
    passwordReg: "",
    regTips: {
      email: "",
      password: "",
      passwordReg: ""
    }
  };
  private isLoad: boolean = false;

  private onUseComponent(val: string) {
    this.useComponent = val;
  }

  private onFormSubmit() {
    const { email, password, passwordReg, regTips } = this.formData;
    const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if (!email) {
      regTips.email = "邮箱不能为空";
    } else if (!reg.test(email)) {
      regTips.email = "邮箱地址有误";
    } else {
      regTips.email = "";
    }
    if (!password) {
      regTips.password = "密码不能为空";
    } else if (String(password).length < 6) {
      regTips.password = "密码长度不能小于6位";
    } else {
      regTips.password = "";
    }
    if (!passwordReg) {
      regTips.passwordReg = "确认密码不能为空";
    } else if (String(password) !== String(passwordReg)) {
      regTips.passwordReg = "两次密码不一致";
    } else {
      regTips.passwordReg = "";
    }
    if (!regTips.email && !regTips.password && !regTips.passwordReg) {
      this.isLoad = true;
      api
        .addUserItem({ email, password })
        .then(res => {
          this.$toast("注册成功");
          this.formData = {
            email: "",
            password: "",
            passwordReg: "",
            regTips: {
              email: "",
              password: "",
              passwordReg: ""
            }
          };
        })
        .finally(() => {
          this.isLoad = false;
        });
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../common/css/login.scss";
</style>
