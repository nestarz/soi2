<template>
  <Layout class="index">
    <p>{{ bio }}</p>

    <p class="home-links">
      <a
        v-for="item in social"
        :key="item.name"
        :href="item.src"
        target="_blank"
        rel="noopener"
      >{{ item.name }}</a>
    </p>

    <h2>{{ $store.state.lang.slug == "fr" ? "Dernières écoutes" : "Last listened" }}</h2>
    <listen />
  </Layout>
</template>

<script>
import author from "~/data/author.yml";
import Listen from "~/components/Listen.vue";

export default {
  metaInfo: {
    title: "Index"
  },
  components: {
    Listen,
  },
  data() {
    return {
      social: author.social
    };
  },
  computed: {
    bio() {
      return author.bio[this.$store.state.lang.slug];
    },
  },
};
</script>

<style lang="scss" scoped>
.index {
  .home-links a {
    margin-right: 1rem;
  }
}
</style>
