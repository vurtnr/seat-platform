import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

Vue.use(VueRouter)

export const constantRoutes: Array<RouteConfig> = [
  {
    path: '/redirect',
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () =>
          import(
            /* webpackChunkName: "redirect" */ '@/views/redirect/index.vue'
          )
      }
    ]
  },
  {
    path: '/login',
    component: () =>
      import(/* webpackChunkName: "login" */ '@/views/login/index.vue'),
    meta: { hidden: true }
  },
  {
    path: '/auth-redirect',
    component: () =>
      import(
        /* webpackChunkName: "auth-redirect" */ '@/views/login/auth-redirect.vue'
      ),
    meta: { hidden: true }
  },
  {
    path: '/404',
    component: () =>
      import(/* webpackChunkName: "404" */ '@/views/error-page/404.vue'),
    meta: { hidden: true }
  },
  {
    path: '/401',
    component: () =>
      import(/* webpackChunkName: "401" */ '@/views/error-page/401.vue'),
    meta: { hidden: true }
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'
          ),
        name: 'Dashboard',
        meta: {
          title: 'dashboard',
          icon: 'dashboard',
          affix: true
        }
      }
    ]
  }
]

export const asyncRoutes: Array<RouteConfig> = [
  {
    path: '/params',
    component: Layout,
    redirect: '/params/setting',
    meta: {
      title: 'params',
      icon: 'zip',
      alwaysShow: true
    },
    children: [
      {
        path: 'setting',
        component: () =>
                 import(
                   /* webpackChunkName: "paramsSetting" */ '@/views/params/index.vue'
                 ),
        name: '参数设置',
        meta: {
          title: 'setting',
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: '/product',
    component: Layout,
    redirect: '/product/list',
    meta: {
      title: 'product',
      icon: 'zip',
      alwaysShow: true
    },
    children: [
      {
        path: 'list',
        component: () =>
                 import(
                   /* webpackChunkName: "paramsSetting" */ '@/views/product/list.vue'
                 ),
        name: '设备列表',
        meta: {
          title: 'list',
          roles: ['admin']
        }
      },
      {
        path: 'hardware',
        component: () =>
                 import(
                   /* webpackChunkName: "paramsSetting" */ '@/views/product/hardware.vue'
                 ),
        name: '硬件列表',
        meta: {
          title: 'hardware',
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/user',
    meta: {
      title: 'system',
      icon: 'user',
      alwaysShow: true
    },
    children: [
      {
        path: 'user',
        component: () =>
                 import(
                   /* webpackChunkName: "user" */ '@/views/user/index.vue'
                 ),
        name: '用户管理',
        meta: {
          title: 'user',
          roles: ['admin']
        }
      },
      {
        path: 'role',
        component: () =>
                 import(
                   /* webpackChunkName: "role" */ '@/views/role/index.vue'
                 ),
        name: '角色管理',
        meta: {
          title: 'role',
          roles: ['admin']
        }
      }
    ]
  }
]

// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes
// })

const createRouter = () =>
  new VueRouter({
    scrollBehavior: (to, from, savePosition) => {
      if (savePosition) {
        return savePosition
      } else {
        return { x: 0, y: 0 }
      }
    },
    base: process.env.BASE_URL,
    routes: constantRoutes,
    mode: 'history'
  })

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter();
  (router as any).matcher = (newRouter as any).matcher
}

export default router
