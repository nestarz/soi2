<template>
  <div class="index">
    <header class="header">
      <h2>
        <g-link to="/">about</g-link>
      </h2>
      <h2>
        <g-link to="/">tweets</g-link>
      </h2>

      <h1>
        <g-link to="/">Ressources</g-link>
      </h1>
    </header>
    <tags class="tags" ref="tags" :tags="tags" @select="fetch" />
    <div class="posts" ref="posts" v-on:scroll="event => handleScroll(event, 'tags')">
      <posts :posts="search || posts" @select="highlight" />
      <ClientOnly>
        <infinite-loading @infinite="infiniteHandler" v-if="$page"></infinite-loading>
      </ClientOnly>
    </div>
  </div>
</template>


<script>
import Fuse from "fuse.js";
import Tags from "~/components/tags.vue";
import Posts from "~/components/posts.vue";
import Search from "~/components/search.vue";

export default {
  components: {
    Tags,
    Posts,
    Search,
    InfiniteLoading: () => import("vue-infinite-loading")
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
    async infiniteHandler($state) {
      try {
        const results = await this.$fetch(
          "/ressources/" + (this.$page.ressources.pageInfo.currentPage + 1)
        );
        if (results.data.ressources.edges.length > 0) {
          this.$page.ressources.pageInfo.currentPage =
            this.$page.ressources.pageInfo.currentPage + 1;
          this.$page.ressources.edges = this.$page.ressources.edges.concat(
            results.data.ressources.edges
          );
          $state.loaded();
          this.fetch();
        } else {
          $state.complete();
        }
      } catch (error) {
        console.log(error);
      }
    },
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
    fetchTags() {
      this.tags = this.$page.tags.edges
        .flatMap(({ node: post }) => post.tags)
        .reduce((obj, num) => {
          obj[num] = ++obj[num] || 1;
          return obj;
        }, {});
    }
  }
};
</script>

<style lang="scss" scoped>
.index {
  display: grid;
  grid-template-areas:
    "b b b"
    "a c c";
  grid-template-columns: 0.2fr 0.8fr;
  grid-template-rows: auto 1fr;
  grid-gap: 5px;
  height: 100vh;
  

  @media only screen and (orientation: landscape) {
    grid-template-areas:
      "b c c"
      "a c c";
    grid-template-columns: 0.2fr 0.8fr;
    grid-template-rows: auto 1fr;
  }

  .tags {
    scrollbar-width: none;
    grid-area: a;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .posts {
    grid-area: c;
    
    
    padding: 0 1rem;
  }

  .tags,
  .header {
    padding-left: 1rem;
  }

  .posts,
  .header {
    padding-top: 1rem;
  }

  .posts,
  .tags,
  .header {
    overflow: auto;

    @media print {
      overflow: none;
    }
  }

  .header {
    grid-area: b;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 99;

    h1 {
      font-weight: 600;
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
query Ressources($page: Int) {
  tags: allRessources(
    sortBy: "category", 
    order: DESC, 
  ) {
    edges {
      node {
        tags
      }
    }
  }
  ressources: allRessources(
    sortBy: "category", 
    order: ASC, 
    perPage: 20, 
    page: $page,
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