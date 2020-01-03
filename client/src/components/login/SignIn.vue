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
      />
      <van-field
        v-model="formData.password"
        left-icon="lock"
        clearable
        type="password"
        label-width="50"
        label="密码"
        placeholder="请输入登录密码"
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
      @click="onUseComponent('email')"
      text="注册账号"
    ></van-button>
    <!-- <van-button
      class="helper-item right"
      @click="onUseComponent('reset')"
      text="忘记密码"
    ></van-button> -->
  </section>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Button, Field, CellGroup } from "vant";
import api from "../../api/index";
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
  private isLoad: boolean = false;
  private formData: TformData = {
    account: "",
    password: ""
  };

  private onUseComponent(val: string) {
    this.useComponent = val;
  }

  private onSubmitFormData() {
    const { account, password } = this.formData;
    if (!account) {
      this.$toast("账号不能为空");
      return;
    } else if (!password) {
      this.$toast("密码不能为空");
      return;
    }
    this.isLoad = true;
    api
      .accountSign({ account, password })
      .then(() => {
        this.$toast("登录成功");
        this.$router.replace({ name: "Home" });
      })
      .finally(() => {
        this.isLoad = false;
      });
  }
}
</script>
<style lang="scss" scoped>
@import "../../assets/styles/login.scss";
</style>
