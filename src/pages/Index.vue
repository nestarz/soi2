<template>
  <Layout>
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
  </Layout>
</template>

<script>
import author from "~/data/author.yml";
export default {
  metaInfo: {
    title: "Index"
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

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
