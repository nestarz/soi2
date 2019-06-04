<template>
  <div class="index">
    <div class="projects"></div>
    <div class="name">Elias Rhouzlane</div>
    <div class="ressources">
      <g-link to="/ressources">Ressources</g-link>
      <g-link to="/tweets">Tweets</g-link>
    </div>
  </div>
</template>

<script>
import author from "~/data/author.yml";

export default {
  metaInfo: {
    title: "Index"
  },
  components: {
  },
  data() {
    return {
      social: author.social
    };
  },
  computed: {
    bio() {
      return author.bio[this.$store.state.lang.slug];
    }
  }
};
</script>

<style lang="scss" scoped>
.index {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  .ressources {
    display: flex;
    flex-direction: column;
  }
  .name {
    padding: 1em;
  }
}
</style>
