export default [
  {
    path: "/about",
    component: () => import(/* webpackChunkName: "page--src--pages--about-vue" */ "/home/elirhouzlane/repos/perso/soi/src/pages/about.vue")
  },
  {
    path: "/resume",
    component: () => import(/* webpackChunkName: "page--src--pages--resume-vue" */ "/home/elirhouzlane/repos/perso/soi/src/pages/Resume.vue"),
    meta: {
      data: true
    }
  },
  {
    path: "/cv",
    component: () => import(/* webpackChunkName: "page--src--pages--cv-vue" */ "/home/elirhouzlane/repos/perso/soi/src/pages/cv.vue")
  },
  {
    path: "/index-1",
    component: () => import(/* webpackChunkName: "page--src--pages--index-1-vue" */ "/home/elirhouzlane/repos/perso/soi/src/pages/index.1.vue")
  },
  {
    name: "home",
    path: "/",
    component: () => import(/* webpackChunkName: "page--src--pages--index-vue" */ "/home/elirhouzlane/repos/perso/soi/src/pages/index.vue")
  },
  {
    path: "/ressources/add",
    component: () => import(/* webpackChunkName: "page--src--pages--ressources--add-vue" */ "/home/elirhouzlane/repos/perso/soi/src/pages/ressources/add.vue")
  },
  {
    path: "/midi",
    component: () => import(/* webpackChunkName: "page--src--pages--midi--index-vue" */ "/home/elirhouzlane/repos/perso/soi/src/pages/midi/index.vue")
  },
  {
    path: "/ressources/ceramics",
    component: () => import(/* webpackChunkName: "page--src--pages--ressources--ceramics-vue" */ "/home/elirhouzlane/repos/perso/soi/src/pages/ressources/ceramics.vue")
  },
  {
    path: "/ressources/mindmap",
    component: () => import(/* webpackChunkName: "page--src--pages--ressources--mindmap-vue" */ "/home/elirhouzlane/repos/perso/soi/src/pages/ressources/mindmap.vue"),
    meta: {
      data: true
    }
  },
  {
    name: "404",
    path: "/404",
    component: () => import(/* webpackChunkName: "page--node-modules--gridsome--app--pages--404-vue" */ "/home/elirhouzlane/repos/perso/soi/node_modules/gridsome/app/pages/404.vue")
  },
  {
    path: "/instagram/:page(\\d+)?",
    component: () => import(/* webpackChunkName: "page--src--pages--instagram--index-vue" */ "/home/elirhouzlane/repos/perso/soi/src/pages/instagram/index.vue"),
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
    component: () => import(/* webpackChunkName: "page--node-modules--gridsome--app--pages--404-vue" */ "/home/elirhouzlane/repos/perso/soi/node_modules/gridsome/app/pages/404.vue")
  }
]

