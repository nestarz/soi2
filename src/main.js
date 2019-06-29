import 'circular-std';
// This is the main.js file. Import global CSS and scripts here.
import '~/assets/style/index.scss';

// Import default layout so we don't need to import it to every page
import VueMasonry from 'vue-masonry-css';


import Vuex from 'vuex';
import DefaultLayout from '~/layouts/default.vue';

const langs = {
  fr: {
    slug: 'fr',
    name: 'Français',
  },
  en: {
    slug: 'en',
    name: 'English',
  },
};

// The Client API can be used here. Learn more: gridsome.org/docs/client-api
export default function (Vue, {
  router, head, isClient, appOptions,
}) {
  Vue.use(Vuex);
  Vue.use(VueMasonry);

  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout);
}
