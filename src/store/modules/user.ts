import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import { getToken, setToken, removeToken } from '@/utils/cookies'
import { login, getUserInfo, logout } from '@/api/users'
import router, { resetRouter } from '@/router'
import store from '@/store'
import { TagsViewModule } from './tags-view'
export interface UserState {
  token: string
  name: string
  avatar: string
  introduction: string
  roles: string[]
  email: string
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements UserState {
  public token = getToken() || '';
  public name = '';
  public avatar = '';
  public introduction = '';
  public roles: string[] = [];
  public email = '';

  @Mutation
  private SET_TOKEN(token: string) {
    this.token = token
  }

  @Mutation
  private SET_NAME(name: string) {
    this.name = name
  }

  @Mutation
  private SET_AVATAR(avatar: string) {
    this.avatar = avatar
  }

  @Mutation
  private SET_INTRODUCTION(introduction: string) {
    this.introduction = introduction
  }

  @Mutation
  private SET_ROLES(roles: string[]) {
    this.roles = roles
  }

  @Mutation
  private SET_EMAIL(email: string) {
    this.email = email
  }

  @Action({ rawError: true })
  public async Login(params: { username: string, password: string }) {
    let { username: id, password } = params
    id = id.trim()
    const data = await login({
      id,
      password,
      messageType: 'LOGIN_REQUEST'
    })
    setToken(data.token)
    this.SET_TOKEN(data.token)
  }

  @Action
  public ResetToken() {
    removeToken()
    this.SET_TOKEN('')
    this.SET_ROLES([])
  }

  @Action
  public async GetUserInfo() {
    if (this.token === '') {
      throw Error('GetUserInfo: token is undefined!')
    }
    // const { data } = await getUserInfo({
    //   /* Your params here */
    // });
    // if (!data) {
    //   throw Error("Verification failed, please Login again.");
    // }
    // const { roles, name, avatar, introduction, email } = data.user;
    // if (!roles || roles.length <= 0) {
    //   throw Error("GetUserInfo: roles must be a non-null array!");
    // }

    this.SET_ROLES(['admin'])
    this.SET_NAME('Super Admin')
    this.SET_AVATAR('https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
    this.SET_INTRODUCTION('I am a super administrator')
    this.SET_EMAIL('admin@test.com')
  }

  @Action
  public async ChangeRoles(role: string) {
    const token = role + '-token'
    this.SET_TOKEN(token)
    setToken(token)
    await this.GetUserInfo()
    resetRouter()
  }

  @Action
  public async LogOut() {
    if (this.token === '') {
      throw Error('LogOut: token is undefined!')
    }
    await logout()
    removeToken()
    resetRouter()

    TagsViewModule.delAllViews()
    this.SET_TOKEN('')
    this.SET_ROLES([])
  }
}

export const UserModule = getModule(User)
