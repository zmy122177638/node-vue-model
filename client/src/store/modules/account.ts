import { VuexModule, Module, MutationAction, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from "../index"
import api from '@/api'
import { UserInfo } from '@/ts/modules/userInfo'

@Module({ dynamic: true, store, name: 'account' })
class Account extends VuexModule implements IAccountModule{
  public userInfo: UserInfo = new UserInfo()
  public isLogin: boolean = false

  @Action
  public async getUserInfo(){
    const result = await (api.getUserInfo() as any as UserInfo)
    this.setUserInfo(result)
  }

  @Mutation
  public setUserInfo(userInfo: UserInfo){
    if (userInfo.id) {
      this.userInfo = userInfo
      this.isLogin = true
    }
  }
}
interface IAccountModule {
  /** 用户信息 */
  userInfo: UserInfo
  /** 是否登录 */
  isLogin: boolean
}
export const AccountMoudule = getModule(Account)