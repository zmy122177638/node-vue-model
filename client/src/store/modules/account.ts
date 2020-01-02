import { VuexModule, Module, MutationAction, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from "../index"
import api from '@/api'
import { UserInfo } from '@/ts/modules/userInfo'

@Module({ dynamic: true, store, name: 'account' })
class Account extends VuexModule implements IAccountModule{
  public userInfo: UserInfo = new UserInfo()
  public isLogin: boolean = false

  @Mutation
  public setUserInfo(userInfo: UserInfo){
    this.userInfo = userInfo
    this.isLogin = true
  }

  @Mutation
  public logout(){
    this.userInfo = new UserInfo()
    this.isLogin = false
  }
}
interface IAccountModule {
  /** 用户信息 */
  userInfo: UserInfo
  /** 是否登录 */
  isLogin: boolean
}
export const AccountMoudule = getModule(Account)