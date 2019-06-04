<template>
  <div class="index">
    <header class="header">
      <h1>Tweets</h1>
    </header>
    <twitter-names class="tags" ref="tags" :tags="tags" @select="selected => fetch(selected)"/>
    <twitter-tweets
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
import TwitterTweets from "~/components/tweets.vue";
import TwitterNames from "~/components/tags.vue";
import TwitterSearch from "~/components/search.vue";

export default {
  components: {
    TwitterTweets,
    TwitterSearch,
    TwitterNames
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
    fetch() {
      this.fetchPosts();
      this.fetchTags();
    },
    fetchPosts() {
      this.posts = this.$page.tweets.edges.map(({ node: post }) => post);
    },
    fetchTags() {
      this.tags = this.$page.tweets.edges
        .map(({ node: post }) => post.user.name)
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
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  height: 100vh;

  .tags {
    grid-column: 1;
    grid-row: 1;
    overflow: auto;
    scrollbar-width: none;

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
    bottom: 20%;
    left: 50%;
    right: 20%;
    pointer-events: none;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    z-index: 99;
    padding: 5px;

    h1 {
      transform: scale(8, 3.1);
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
}
</style>

<page-query>
query Tweets {
  tweets: allTweets(
    sortBy: "parent_created_at", 
    order: ASC, 
    perPage: 300, 
  ) {
    edges {
      node {
        fullText
        user {
          name
          screenName
          location
        }
        createdAt
        parentCreatedAt
        extendedEntities {
          media {
            mediaUrlHttps
          }
        }
        entities {
          media {
            mediaUrlHttps
          }
        }
      }
    }
  }
}
</page-query>