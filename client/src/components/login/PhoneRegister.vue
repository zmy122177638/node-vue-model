<template>
  <section class="form-sec">
    <h1 class="form-title">手机号注册</h1>
    <van-cell-group>
      <van-field
        v-model="formData.phone"
        left-icon="manager"
        clearable
        label-width="80"
        label="手机号"
        placeholder="请输入手机号"
        :error-message="formData.regTips.phone"
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
      @click="onUseComponent('email')"
      text="邮箱注册"
    ></van-button>
  </section>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import api from "../../api/index";
import { Button, Field, CellGroup } from "vant";
interface TformData {
  phone: string;
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
export default class PhoneRegister extends Vue {
  @Prop({ type: String }) public value!: string;
  private get useComponent() {
    return this.value;
  }
  private set useComponent(val) {
    this.$emit("input", val);
  }
  private formData: TformData = {
    phone: "",
    password: "",
    passwordReg: "",
    regTips: {
      phone: "",
      password: "",
      passwordReg: ""
    }
  };
  private isLoad: boolean = false;

  private onUseComponent(val: string) {
    this.useComponent = val;
  }

  private onFormSubmit() {
    const { phone, password, passwordReg, regTips } = this.formData;
    const reg = /^1[3456789][0-9]{9}$/;
    if (!phone) {
      regTips.phone = "手机号不能为空";
    } else if (!reg.test(phone)) {
      regTips.phone = "手机号有误";
    } else {
      regTips.phone = "";
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
    if (!regTips.phone && !regTips.password && !regTips.passwordReg) {
      this.isLoad = true;
      api
        .addUserItem({ phone, password })
        .then(res => {
          this.$toast("注册成功");
          this.formData = {
            phone: "",
            password: "",
            passwordReg: "",
            regTips: {
              phone: "",
              password: "",
              passwordReg: ""
            }
          };
          console.log(res);
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
