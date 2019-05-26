<template>
  <div class="layout">
    <header class="header">
      <strong>
        <g-link to="/">{{ fullName }}</g-link>
      </strong>
      <nav class="nav" v-if="false">
        <g-link class="nav__link" to="/">{{ locale.home }}</g-link>
        <g-link class="nav__link" to="/ressources">{{ locale.ressources }}</g-link>
        <g-link class="nav__link" to="/about">{{ locale.about }}</g-link>
        <a
          class="nav__link"
          href="#"
          @click="() => $store.commit('toggleLang')"
        >{{ $store.state.lang.name }}</a>
      </nav>
    </header>
    <slot/>
  </div>
</template>

<static-query>
query {
  metaData {
    siteName
  }
}
</static-query>

<script>
import author from "~/data/author.yml";

export default {
  data() {
    return {
      fullName: `${author.firstName} ${author.lastName}`
    };
  },
  computed: {
    locale() {
      const translations = {
        fr: {
          home: "Accueil",
          ressources: "Ressources",
          about: "À propos",
        },
        en: {
          home: "Home",
          ressources: "Ressources",
          about: "About",
        }
      };
      return translations[this.$store.state.lang.slug];
    }
  }
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 1em 1em 0 1em;
}

.nav__link {
  margin-left: 20px;
}
</style>