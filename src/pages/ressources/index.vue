<template>
  <div class="index">
    <header class="header">
      <h1>Ressources</h1>
      <resources-search class="search" :posts="posts" @search="results => apply(results)"/>
    </header>
    <resources-tags
      class="tags"
      ref="tags"
      :tags="tags"
      @select="selected => fetch(selected)"
    />
    <resources-posts
      class="posts"
      ref="posts"
      :posts="search || posts"
      @select="post => highlight(post)"
      v-on:scroll.native="event => handleScroll(event, 'tags')"
    />
    <div class="highlight" v-if="false">{{ highlighted.name }}</div>
  </div>
</template>

<script>
import Fuse from "fuse.js";
import ResourcesTags from "~/components/tags.vue";
import ResourcesPosts from "~/components/posts.vue";
import ResourcesSearch from "~/components/search.vue";

export default {
  components: {
    ResourcesTags,
    ResourcesPosts,
    ResourcesSearch
  },
  data() {
    return {
      search: null,
      tags: null,
      posts: null,
      highlighted: null
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    handleScroll(event, ref) {
      this.$refs[ref].$el.scrollTop = event.target.scrollTop;
    },
    highlight(post) {
      this.highlighted = post;
    },
    apply(results) {
      this.search = results;
    },
    fetch(filters = []) {
      this.fetchPosts(filters);
      this.fetchTags(filters);
    },
    fetchPosts(filters = []) {
      this.posts = this.$page.ressources.edges
        .map(({ node: post }) => post)
        .filter(post => filters.every(tag => post.tags.indexOf(tag) > -1));
    },
    fetchTags(filters = []) {
      const tags = this.$page.ressources.edges
        .flatMap(({ node: post }) => post.tags);
      const poststags = this.posts.flatMap(post => post.tags);
      this.tags = poststags.reduce((obj, num) => {
        obj[num] = ++obj[num] || 1;
        return obj;
      }, {});
      this.tags = tags.reduce((obj, num) => {
        obj[num] = obj[num] || 0;
        return obj;
      }, this.tags);
    }
  }
};
</script>

<style lang="scss" scoped>
.index {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  height: 100vh;

  .tags {
    grid-column: 1;
    grid-row: 1;
    overflow: auto;
    scrollbar-width: none;
    padding: 5px;

    &::-webkit-scrollbar { 
      display: none; 
    }
  }

  .posts {
    grid-column: 1;
    grid-row: 2;
    overflow: auto;
  }

  .header {
    position: fixed;
    bottom: 0%;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.85);
    pointer-events: none;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    z-index: 99;
    padding: 5px;

    h1 {
      color: white;
    }

    .search {
      flex: 0.5;
      pointer-events: all;
    }
  }

  @media only screen and (orientation: landscape) {
    grid-template-columns: 0.2fr 0.8fr;
    grid-template-rows: 100vh;

    .posts {
      grid-column: 2;
      grid-row: 1 / span 3;
    }
  }

  /* display: grid;
  grid-template:
    "b c" auto / 0.2fr 0.8fr;
  grid-gap: 1rem;
  .header {
    grid-area: d;
    position: fixed;
    top: 50%;
    left: 0;
    right: 0;
    background-color: rgba(255, 255, 255, 0.85);
    border-bottom: 1px solid;
    pointer-events: none;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    z-index: 99;

    .search {
      flex: 0.5;
      pointer-events: all;
    }
  }
  .tags {
    grid-area: b;
    max-height: 100vh;
    overflow: scroll;
  }
  .posts {
    grid-area: c;
    max-height: 100vh;
    overflow: scroll;
  } */
}
</style>

<page-query>
query Ressources {
  ressources: allRessources(
    sortBy: "category", 
    order: ASC, 
    perPage: 1000, 
    page: 1,
  ) @paginate {
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        category
        name
        alias
        description
        url
        authors
        tags
        screenshot
        location {
          city
          country
        }
      }
    }
  }
}
</page-query>