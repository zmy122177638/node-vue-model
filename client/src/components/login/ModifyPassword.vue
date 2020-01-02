<template>
  <section class="form-sec">
    <h1 class="form-title">修改密码</h1>
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
        type="password"
        label-width="50"
        label="密码"
        placeholder="请输入登录密码"
        error-message
      />
    </van-cell-group>
    <div class="form-submit">
      <van-button
        :loading="false"
        class="sign_btn"
        type="info"
        text="确认修改"
        loading-text="登录中..."
      />
    </div>
    <van-button
      class="helper-item left"
      @click="onUseComponent('sign')"
      text="返回登录"
    ></van-button>
  </section>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
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
export default class ModifyPassword extends Vue {
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

  private onUseComponent(val: string) {
    this.useComponent = val;
  }
}
</script>
<style lang="scss" scoped>
@import "../../assets/styles/login.scss";
</style>
