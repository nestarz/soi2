export default [
  {
    path: "/cv",
    component: () => import(/* webpackChunkName: "page--src-pages-cv-vue" */ "C:\\Users\\elias\\projects\\soi\\src\\pages\\cv.vue")
  },
  {
    path: "/index-1",
    component: () => import(/* webpackChunkName: "page--src-pages-index-1-vue" */ "C:\\Users\\elias\\projects\\soi\\src\\pages\\index.1.vue")
  },
  {
    path: "/about",
    component: () => import(/* webpackChunkName: "page--src-pages-about-vue" */ "C:\\Users\\elias\\projects\\soi\\src\\pages\\about.vue")
  },
  {
    path: "/resume",
    component: () => import(/* webpackChunkName: "page--src-pages-resume-vue" */ "C:\\Users\\elias\\projects\\soi\\src\\pages\\Resume.vue"),
    meta: {
      data: true
    }
  },
  {
    name: "home",
    path: "/",
    component: () => import(/* webpackChunkName: "page--src-pages-index-vue" */ "C:\\Users\\elias\\projects\\soi\\src\\pages\\index.vue")
  },
  {
    path: "/ressources/add",
    component: () => import(/* webpackChunkName: "page--src-pages-ressources-add-vue" */ "C:\\Users\\elias\\projects\\soi\\src\\pages\\ressources\\add.vue")
  },
  {
    path: "/ressources/ceramics",
    component: () => import(/* webpackChunkName: "page--src-pages-ressources-ceramics-vue" */ "C:\\Users\\elias\\projects\\soi\\src\\pages\\ressources\\ceramics.vue")
  },
  {
    path: "/ressources/mindmap",
    component: () => import(/* webpackChunkName: "page--src-pages-ressources-mindmap-vue" */ "C:\\Users\\elias\\projects\\soi\\src\\pages\\ressources\\mindmap.vue"),
    meta: {
      data: true
    }
  },
  {
    name: "404",
    path: "/404",
    component: () => import(/* webpackChunkName: "page--node-modules-gridsome-app-pages-404-vue" */ "C:\\Users\\elias\\projects\\soi\\node_modules\\gridsome\\app\\pages\\404.vue")
  },
  {
    path: "/instagram/:page(\\d+)?",
    component: () => import(/* webpackChunkName: "page--src-pages-instagram-index-vue" */ "C:\\Users\\elias\\projects\\soi\\src\\pages\\instagram\\index.vue"),
    meta: {
      data: true
    }
  },
  {
    path: "/ressources/:page(\\d+)?",
    component: () => import(/* webpackChunkName: "page--src-pages-ressources-index-vue" */ "C:\\Users\\elias\\projects\\soi\\src\\pages\\ressources\\index.vue"),
    meta: {
      data: true
    }
  },
  {
    path: "/tweets/:page(\\d+)?",
    component: () => import(/* webpackChunkName: "page--src-pages-tweets-index-vue" */ "C:\\Users\\elias\\projects\\soi\\src\\pages\\tweets\\index.vue"),
    meta: {
      data: true
    }
  },
  {
    name: "*",
    path: "*",
    component: () => import(/* webpackChunkName: "page--node-modules-gridsome-app-pages-404-vue" */ "C:\\Users\\elias\\projects\\soi\\node_modules\\gridsome\\app\\pages\\404.vue")
  }
]

