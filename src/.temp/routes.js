export default [
  {
    name: "tweets",
    path: "/tweets",
    component: () => import(/* webpackChunkName: "component--tweets" */ "/home/elirhouzlane/repos/perso/soi/src/pages/tweets/index.vue")
  },
  {
    name: "ressourcesAdd",
    path: "/ressources/add",
    component: () => import(/* webpackChunkName: "component--ressources-add" */ "/home/elirhouzlane/repos/perso/soi/src/pages/ressources/add.vue"),
    meta: { isStatic: true }
  },
  {
    name: "home",
    path: "/",
    component: () => import(/* webpackChunkName: "component--home" */ "/home/elirhouzlane/repos/perso/soi/src/pages/index.vue"),
    meta: { isStatic: true }
  },
  {
    name: "cv",
    path: "/cv",
    component: () => import(/* webpackChunkName: "component--cv" */ "/home/elirhouzlane/repos/perso/soi/src/pages/cv.vue"),
    meta: { isStatic: true }
  },
  {
    name: "about",
    path: "/about",
    component: () => import(/* webpackChunkName: "component--about" */ "/home/elirhouzlane/repos/perso/soi/src/pages/about.vue"),
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
    component: () => import(/* webpackChunkName: "component--ressources" */ "/home/elirhouzlane/repos/perso/soi/src/pages/ressources/index.vue")
  },
  {
    name: "*",
    path: "*",
    component: () => import(/* webpackChunkName: "component--404" */ "/home/elirhouzlane/repos/perso/soi/node_modules/gridsome/app/pages/404.vue"),
    meta: { isStatic: true, isIndex: false }
  }
]

