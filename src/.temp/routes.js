export default [
  {
    path: "/index-1",
    component: () => import(/* webpackChunkName: "page--src--pages--index-1-vue" */ "/Users/elias/projects/soi/src/pages/index.1.vue")
  },
  {
    path: "/cv",
    component: () => import(/* webpackChunkName: "page--src--pages--cv-vue" */ "/Users/elias/projects/soi/src/pages/cv.vue")
  },
  {
    path: "/about",
    component: () => import(/* webpackChunkName: "page--src--pages--about-vue" */ "/Users/elias/projects/soi/src/pages/about.vue")
  },
  {
    name: "home",
    path: "/",
    component: () => import(/* webpackChunkName: "page--src--pages--index-vue" */ "/Users/elias/projects/soi/src/pages/index.vue")
  },
  {
    path: "/ressources/add",
    component: () => import(/* webpackChunkName: "page--src--pages--ressources--add-vue" */ "/Users/elias/projects/soi/src/pages/ressources/add.vue")
  },
  {
    path: "/ressources/ceramics",
    component: () => import(/* webpackChunkName: "page--src--pages--ressources--ceramics-vue" */ "/Users/elias/projects/soi/src/pages/ressources/ceramics.vue")
  },
  {
    path: "/ressources/mindmap",
    component: () => import(/* webpackChunkName: "page--src--pages--ressources--mindmap-vue" */ "/Users/elias/projects/soi/src/pages/ressources/mindmap.vue"),
    meta: {
      data: true
    }
  },
  {
    path: "/resume/1562619188722",
    component: () => import(/* webpackChunkName: "page--src--templates--resume-vue" */ "/Users/elias/projects/soi/src/templates/Resume.vue"),
    meta: {
      data: true
    }
  },
  {
    name: "404",
    path: "/404",
    component: () => import(/* webpackChunkName: "page--node-modules--gridsome--app--pages--404-vue" */ "/Users/elias/projects/soi/node_modules/gridsome/app/pages/404.vue")
  },
  {
    path: "/ressources/:page(\\d+)?",
    component: () => import(/* webpackChunkName: "page--src--pages--ressources--index-vue" */ "/Users/elias/projects/soi/src/pages/ressources/index.vue"),
    meta: {
      data: true
    }
  },
  {
    path: "/tweets/:page(\\d+)?",
    component: () => import(/* webpackChunkName: "page--src--pages--tweets--index-vue" */ "/Users/elias/projects/soi/src/pages/tweets/index.vue"),
    meta: {
      data: true
    }
  },
  {
    name: "*",
    path: "*",
    component: () => import(/* webpackChunkName: "page--node-modules--gridsome--app--pages--404-vue" */ "/Users/elias/projects/soi/node_modules/gridsome/app/pages/404.vue")
  }
]

