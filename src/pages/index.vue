<template>
  <header class="header">
    <h1>
      <span class="dot"></span>
    </h1>
    <div>
      <h1>
        <g-link to="/ressources">Ressources</g-link>
      </h1>
      <h1>
        <g-link to="/tweets">Tweets</g-link>
      </h1>
      <h1>
        <g-link to="">Me</g-link>
      </h1>
    </div>
    <!-- <resources-search class="search" :posts="posts" @search="results => apply(results)"/> -->
  </header>
</template>

<script>
import author from "~/data/author.yml";

export default {
  metaInfo: {
    title: "Index"
  },
  components: {},
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
.header {
  grid-area: b;
  display: flex;
  justify-content: space-between;
  z-index: 99;
  padding: 50px;

  h1 {
    display: flex;
    justify-content: center;
    font-size: 2em;
    line-height: 1;
  }

  .dot {
    height: 5vmax;
    width: 5vmax;
    background-color: rgb(255, 0, 0);
    border-radius: 50%;
    display: inline-block;
  }
}
</style>
