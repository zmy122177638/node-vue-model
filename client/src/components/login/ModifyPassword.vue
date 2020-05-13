<template>
  <section class="form-sec">
    <h1 class="form-title">修改密码</h1>
    <van-cell-group>
      <van-field
        v-model="formData.oldPsd"
        left-icon="lock"
        clearable
        type="password"
        label-width="80"
        label="旧密码"
        placeholder="请输入旧密码"
      />
      <van-field
        v-model="formData.newPsd"
        left-icon="lock"
        clearable
        type="password"
        label-width="80"
        label="新密码"
        placeholder="请输入新密码"
      />
      <van-field
        v-model="formData.newPsdReg"
        left-icon="lock"
        clearable
        type="password"
        label-width="80"
        label="确认密码"
        placeholder="请再次输入新密码"
      />
    </van-cell-group>
    <div class="form-submit">
      <van-button
        :loading="loading"
        class="sign_btn"
        type="info"
        text="确认修改"
        loading-text="登录中..."
        @click="submit"
      />
    </div>
    <van-button
      class="helper-item left"
      @click="$router.back()"
      text="返回"
    ></van-button>
  </section>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Button, Field, CellGroup } from "vant";
import api from "../../api";
interface IFormData {
  oldPsd: string;
  newPsd: string;
  newPsdReg: string;
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
  private loading: boolean = false;
  private get useComponent() {
    return this.value;
  }
  private set useComponent(val) {
    this.$emit("input", val);
  }
  private formData: IFormData = {
    oldPsd: "",
    newPsd: "",
    newPsdReg: ""
  };

  private onUseComponent(val: string) {
    this.useComponent = val;
  }
  private submit() {
    const { oldPsd, newPsd, newPsdReg } = this.formData as IFormData;
    if (!oldPsd) {
      this.$toast("旧密码不能为空");
      return;
    } else if (!newPsd) {
      this.$toast("新密码不能为空");
      return;
    } else if (!newPsdReg) {
      this.$toast("确认密码不能为空");
      return;
    } else if (newPsd !== newPsdReg) {
      this.$toast("两次密码不一致");
      return;
    }
    this.loading = true;
    api
      .modifyUserPsd({ oldPsd, newPsd })
      .then((res: any) => {
        this.$toast("修改成功");
        this.$router.push({ name: "Login", query: { use: "sign" } });
      })
      .finally(() => {
        this.loading = false;
      });
  }
}
</script>
<style lang="scss" scoped>
@import "../../assets/styles/login.scss";
</style>
