// This is the main.js file. Import global CSS and scripts here.
import '~/assets/style/index.scss';

// Import default layout so we don't need to import it to every page
import DefaultLayout from '~/layouts/default.vue';

import Vuex from 'vuex';

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
  appOptions.store = new Vuex.Store({
    state: {
      lang: typeof navigator === 'undefined' ? langs.fr
        : ((navigator.language == 'fr-FR' || navigator.userLanguage == 'fr-FR')
          ? langs.fr : langs.en),
    },
    mutations: {
      toggleLang(state) {
        state.lang = state.lang.slug == 'fr' ? langs.en : langs.fr;
      },
    },
  });

  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout);
}
