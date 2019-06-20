export default [
  {
    path: "/about",
    component: () => import(/* webpackChunkName: "page--src--pages--about-vue" */ "/home/elirhouzlane/repos/perso/soi/src/pages/about.vue"),
    meta: {
      data: true
    }
  },
  {
    path: "/cv",
    component: () => import(/* webpackChunkName: "page--src--pages--cv-vue" */ "/home/elirhouzlane/repos/perso/soi/src/pages/cv.vue"),
    meta: {
      data: true
    }
  },
  {
    name: "home",
    path: "/",
    component: () => import(/* webpackChunkName: "page--src--pages--index-vue" */ "/home/elirhouzlane/repos/perso/soi/src/pages/index.vue"),
    meta: {
      data: true
    }
  },
  {
    path: "/ressources/add",
    component: () => import(/* webpackChunkName: "page--src--pages--ressources--add-vue" */ "/home/elirhouzlane/repos/perso/soi/src/pages/ressources/add.vue"),
    meta: {
      data: true
    }
  },
  {
    name: "404",
    path: "/404",
    component: () => import(/* webpackChunkName: "page--node-modules--gridsome--app--pages--404-vue" */ "/home/elirhouzlane/repos/perso/soi/node_modules/gridsome/app/pages/404.vue"),
    meta: {
      data: true
    }
  },
  {
    path: "/ressources/:page(\\d+)?",
    component: () => import(/* webpackChunkName: "page--src--pages--ressources--index-vue" */ "/home/elirhouzlane/repos/perso/soi/src/pages/ressources/index.vue"),
    meta: {
      data: true
    }
  },
  {
    path: "/tweets/:page(\\d+)?",
    component: () => import(/* webpackChunkName: "page--src--pages--tweets--index-vue" */ "/home/elirhouzlane/repos/perso/soi/src/pages/tweets/index.vue"),
    meta: {
      data: true
    }
  },
  {
    name: "*",
    path: "*",
    component: () => import(/* webpackChunkName: "page--node-modules--gridsome--app--pages--404-vue" */ "/home/elirhouzlane/repos/perso/soi/node_modules/gridsome/app/pages/404.vue"),
    meta: {
      data: true
    }
  }
]

