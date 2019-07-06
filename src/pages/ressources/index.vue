<template>
  <layout>
    <tags slot="sidebar" :tags="tags" @select="fetch"/>
    <div>
      <posts :posts="search || posts" @select="highlight"/>
      <ClientOnly>
        <infinite-loading @infinite="infiniteHandler" v-if="$page"></infinite-loading>
      </ClientOnly>
    </div>
  </layout>
</template>


<script>
import Layout from "~/layouts/default.vue";
import Fuse from "fuse.js";
import Tags from "~/components/tags.vue";
import Posts from "~/components/posts.vue";
import Search from "~/components/search.vue";

export default {
  components: {
    Layout,
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