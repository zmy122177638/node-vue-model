<template>
  <section class="login">
    <div class="container">
      <transition name="login" mode="out-in">
        <email-register v-if="useComponent === 'email'" v-model="useComponent"></email-register>
        <phone-register v-else-if="useComponent === 'phone'" v-model="useComponent"></phone-register>
        <modify-password v-else-if="useComponent === 'modify'" v-model="useComponent"></modify-password>
        <reset-password v-else-if="useComponent === 'reset'" v-model="useComponent"></reset-password>
        <sign-in v-else v-model="useComponent"></sign-in>
      </transition>
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Button, Field, CellGroup } from "vant";
import SignIn from "@/components/login/SignIn.vue";
import EmailRegister from "@/components/login/EmailRegister.vue";
import PhoneRegister from "@/components/login/PhoneRegister.vue";
import ResetPassword from "@/components/login/ResetPassword.vue";
import ModifyPassword from "@/components/login/ModifyPassword.vue";

@Component({
  components: {
    SignIn,
    EmailRegister,
    PhoneRegister,
    ResetPassword,
    ModifyPassword
  }
})
export default class Login extends Vue {
  /** 默认用户登录 email 邮箱注册 phone 手机注册 reset 忘记密码 modify 修改密码 */
  private useComponent: string = "sign";

  public created() {
    const { use } = this.$route.query as any;
    if (use) {
      this.useComponent = use;
    }
  }
}
</script>
<style lang="less">
.login {
  height: 100%;
  background: url("../assets/img/timg.jpg") left top / 100% 100%;
}
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.login-enter-active,
.login-leave-active {
  transition: all 300ms ease-out;
}
.login-enter,.login-leave-to  {
  transform: rotate(180deg) scale(0.3);
  opacity: 0.3;
}

</style>