<template>
  <div class="index">
    <header class="header">
      <h1>
        <g-link to="/">
          <span class="dot"></span>
        </g-link>
      </h1>
      <!-- <resources-search class="search" :posts="posts" @search="results => apply(results)"/> -->
    </header>
    <resources-tags class="tags" ref="tags" :tags="tags" @select="selected => fetch(selected)"/>
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
      const tags = this.$page.ressources.edges.flatMap(
        ({ node: post }) => post.tags
      );
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
  grid-template-areas:
    "a b b"
    "a c c"
    "a c c";
  grid-template-rows: 0fr 1fr 1fr;
  grid-gap: 5px;
  height: 100vh;

  @media only screen and (orientation: landscape) {
    grid-template-areas:
      "b b b"
      "a c c";
    grid-template-columns: 0.2fr 0.8fr;
    grid-template-rows: 0 1fr;
  }

  .tags {
    overflow: auto;
    scrollbar-width: none;
    grid-area: a;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .posts {
    overflow: auto;
    grid-area: c;
  }

  .header {
    grid-area: b;
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    z-index: 99;
    padding: 5px;
    mix-blend-mode: difference;
    
    h1 {
      display: flex;
      justify-content: center;
      font-size: 3em;
      line-height: 1;
    }

    .dot {
      height: 5vmax;
      width: 5vmax;
      background-color: rgb(255, 0, 0);
      border-radius: 50%;
      display: inline-block;
      margin: 1em;
    }
    .search {
      flex: 0.5;
      pointer-events: all;
      transform: rotate(-90deg);
      float: left;
    }
  }
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