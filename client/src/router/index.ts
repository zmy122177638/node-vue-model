import Vue from "vue";
import Router, { Route, RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import { AccountMoudule } from '@/store/modules/account';
import { _deepIterator } from '@/common/utils';

Vue.use(Router);

/**
 * meta 参数介绍
 * isNotNeedLogin: 是否不需要登录
 */
const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/login",
      name: "Login",
      component: () => import(/* webpackChunkName: "Login" */ "../views/Login.vue"),
      meta: {
        isNotNeedLogin: true
      },
      children: [
        {
          path: "/login",
          name: "wwwww",
          component: () => import(/* webpackChunkName: "Login" */ "../views/Login.vue"),
          meta: {
            isNotNeedLogin: true
          }
        }
      ]
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/About.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {
  const routes = (router as Router as any).options.routes as RouteConfig[]
  let getNotNeedLoginRouteNames = _deepIterator(routes, (item: RouteConfig) => item.children, (item: RouteConfig) => item.meta && item.meta.isNotNeedLogin ? item.name : undefined)
  if (AccountMoudule.isLogin || getNotNeedLoginRouteNames.some((routeName: string) => routeName === to.name)) {
    next()
  } else {
    AccountMoudule.getUserInfo().then(() => {
      next()
    }).catch(() => {
      router.push({name: 'Login'})
    })
  }
})

export default router
