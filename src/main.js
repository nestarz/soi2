import "circular-std";
// This is the main.js file. Import global CSS and scripts here.
import "~/assets/style/index.scss";

// Import default layout so we don't need to import it to every page
import VueMasonry from "vue-masonry-css";

import VueCytoscape from "vue-cytoscape";
import DefaultLayout from "~/layouts/default.vue";
import App from "~/App";

const langs = {
  fr: {
    slug: "fr",
    name: "Français"
  },
  en: {
    slug: "en",
    name: "English"
  }
};

// The Client API can be used here. Learn more: gridsome.org/docs/client-api
export default function(Vue, { router, head, isClient, appOptions }) {
  Vue.use(VueMasonry);
  Vue.use(VueCytoscape);

  // Set default layout as a global component
  Vue.component("layout", DefaultLayout);

  appOptions.render = h => h(App);
}
