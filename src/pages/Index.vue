<template>
  <div class="index">
    <div class="projects"></div>
    <div class="name">Elias Rhouzlane</div>
    <div class="ressources"></div>
  </div>
</template>

<script>
import author from "~/data/author.yml";
import Listen from "~/components/Listen.vue";

export default {
  metaInfo: {
    title: "Index"
  },
  components: {
    Listen
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

  .name {
    padding: 1em;
  }
}
</style>
