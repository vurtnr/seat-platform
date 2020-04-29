import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from 'vuex-module-decorators'
import { RouteConfig } from 'vue-router'
import { asyncRoutes, constantRoutes } from '@/router'
import store from '@/store'

const hasPermission = (roles: string[], route: RouteConfig) => {
  if (route.meta && route.meta.roles) {
    return roles.some((role) => route.meta.roles.includes(role))
  } else {
    return true
  }
}

export const filterAsyncRoutes = (
  routes: Array<RouteConfig>,
  roles: string[]
) => {
  const res: Array<RouteConfig> = []
  routes.forEach((route) => {
    const r = { ...route }
    if (hasPermission(roles, r)) {
      if (r.children) {
        r.children = filterAsyncRoutes(r.children, roles)
      }
      res.push(r)
    }
  })
  return res
}

export interface PermissionState {
  routes: Array<RouteConfig>
  dynamicRoutes: Array<RouteConfig>
}

@Module({ dynamic: true, store, name: 'permission' })
class Permission extends VuexModule implements PermissionState {
  public routes: Array<RouteConfig> = []
  public dynamicRoutes: Array<RouteConfig> = []

  @Mutation
  private SET_ROUTES(routes: Array<RouteConfig>) {
    this.routes = constantRoutes.concat(routes)
    this.dynamicRoutes = routes
  }

  @Action
  public GenerateRoutes(roles: string[]) {
    let accessRoutes
    if (roles.includes('admin')) {
      accessRoutes = asyncRoutes
    } else {
      accessRoutes = filterAsyncRoutes(asyncRoutes, roles)
    }
    this.SET_ROUTES(accessRoutes)
  }
}

export const PermissionModule = getModule(Permission)
