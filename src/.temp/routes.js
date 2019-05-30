export default [
  {
    name: "ressourcesAdd",
    path: "/ressources/add",
      component: () => import(/* webpackChunkName: "component--ressources-add" */ "/home/elirhouzlane/repos/perso/soi/src/pages/ressources/Add.vue"),
    meta: { isStatic: true }
  },
  {
    name: "home",
    path: "/",
    component: () => import(/* webpackChunkName: "component--home" */ "/home/elirhouzlane/repos/perso/soi/src/pages/Index.vue"),
    meta: { isStatic: true }
  },
  {
    name: "about",
    path: "/about",
    component: () => import(/* webpackChunkName: "component--about" */ "/home/elirhouzlane/repos/perso/soi/src/pages/About.vue"),
    meta: { isStatic: true }
  },
  {
    name: "404",
    path: "/404",
    component: () => import(/* webpackChunkName: "component--404" */ "/home/elirhouzlane/repos/perso/soi/node_modules/gridsome/app/pages/404.vue"),
    meta: { isStatic: true, isIndex: false }
  },
  {
    name: "ressources",
    path: "/ressources/:page(\\d+)?",
    component: () => import(/* webpackChunkName: "component--ressources" */ "/home/elirhouzlane/repos/perso/soi/src/pages/ressources/Index.vue")
  },
  {
    name: "*",
    path: "*",
    component: () => import(/* webpackChunkName: "component--404" */ "/home/elirhouzlane/repos/perso/soi/node_modules/gridsome/app/pages/404.vue"),
    meta: { isStatic: true, isIndex: false }
  }
]

