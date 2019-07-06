<template>
  <layout>
    <template slot="header">
      <g-link to="/">.</g-link>
      <g-link to>about</g-link>
      <g-link to="/tweets">tweets</g-link>
      <g-link to="/ressources">ressources</g-link>
    </template>
    <grid>
      <span class="description">
        Currently focusing on Interaction and Object Design exploring the interaction of objects, people, art, technology and science using form and code with a mix of analog and digital materials.
      </span>
    </grid>
  </layout>
</template>

<script>
import Layout from "~/layouts/default.vue";
import Grid from "~/components/grid.vue";

export default {
  components: {
    Layout,
    Grid
  }
};
</script>

<style lang="scss" scoped>
.description {
  grid-row: 2 / span 2;
  margin-top: 20vh;
}
</style>
