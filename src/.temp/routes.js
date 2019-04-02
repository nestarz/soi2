export default [
  {
    name: "home",
    path: "/",
    component: () => import(/* webpackChunkName: "component--home" */ "/home/rhouzlane/repos/perso/soi/src/pages/Index.vue"),
    meta: { isStatic: true }
  },
  {
    name: "about",
    path: "/about",
    component: () => import(/* webpackChunkName: "component--about" */ "/home/rhouzlane/repos/perso/soi/src/pages/About.vue"),
    meta: { isStatic: true }
  },
  {
    name: "404",
    path: "/404",
    component: () => import(/* webpackChunkName: "component--404" */ "/home/rhouzlane/repos/perso/soi/node_modules/gridsome/app/pages/404.vue"),
    meta: { isStatic: true, isIndex: false }
  },
  {
    name: "*",
    path: "*",
    component: () => import(/* webpackChunkName: "component--404" */ "/home/rhouzlane/repos/perso/soi/node_modules/gridsome/app/pages/404.vue"),
    meta: { isStatic: true, isIndex: false }
  }
]

