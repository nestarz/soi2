<template>
  <div class="search">
    <input type="text" v-model="search" placeholder="Search...">
    {{ search }}
  </div>
</template>

<style lang="scss" scoped>
.search {
  input {
    width: 100%;
  }
}
</style>

<script>
import Fuse from "fuse.js";

export default {
  props: {
    posts: Array
  },
  data() {
    return {
      search: null
    };
  },
  computed: {
    searchindex() {
      const options = {
        shouldSort: true,
        matchAllTokens: true,
        threshold: 0.1,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
          {
            name: "name",
            weight: 0.4
          },
          {
            name: "tags",
            weight: 0.4
          },
          {
            name: "description",
            weight: 0.05
          },
          {
            name: "location.city",
            weight: 0.05
          },
          {
            name: "location.country",
            weight: 0.05
          },
          {
            name: "alias",
            weight: 0.05
          }
        ]
      };
      return new Fuse(this.posts, options);
    },
    searchposts() {
      if (!this.search) {
        return this.posts;
      }

      return this.searchindex.search(this.search);
    }
  },
  watch: {
    search() {
      this.$emit("search", this.searchposts);
    }
  }
};
</script>
