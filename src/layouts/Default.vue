<template>
  <div class="layout">
    <header class="header">
      <strong>
        <g-link to="/">{{ fullName }}</g-link>
      </strong>
      <nav class="nav">
        <g-link class="nav__link" to="/">Home</g-link>
        <g-link class="nav__link" to="/ressources">Ressources</g-link>
        <g-link class="nav__link" to="/about">About</g-link>
        <a class="nav__link" href="#" @click="() => $store.commit('toggleLang')">{{ $store.state.lang.name }}</a>
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
import author from '~/data/author.yml'
export default {
  data() {
    return {
      fullName: `${author.firstName} ${author.lastName}`,
    }
  }
}
</script>

<style>
.layout {
  max-width: 1000px;
  margin: 0;
  padding: 1em;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.nav__link {
  margin-left: 20px;
}
</style>