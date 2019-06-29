<template>
  <div class="index">
    <header class="header">
      <g-link to="/">..</g-link>
      <g-link to="/about">about</g-link>
      <h1>
        <g-link to="/tweets">tweets</g-link>
      </h1>
      <g-link to="/ressources">ressources</g-link>
    </header>
    <tags class="tags" ref="tags" :tags="tags" @select="filter" />
    <div class="posts" ref="posts" v-on:scroll="event => handleScroll(event, 'tags')">
      <posts :posts="search || posts" @select="highlight" :equal="true" />
      <ClientOnly>
        <infinite-loading @infinite="infiniteHandler" v-if="$page"></infinite-loading>
      </ClientOnly>
    </div>
  </div>
</template>

<script>
import Posts from "~/components/posts.vue";
import Tags from "~/components/tags.vue";
import Search from "~/components/search.vue";

const twitterLinkRegex = /(?:<\w+.*?>|[^=!:'"\/]|)((?:https?:\/\/|www\.)[-\w]+(?:\.[-\w]+)*(?::\d+)?(?:\/(?:(?:[~\w\+%-]|(?:[,.;@:][^\s$]))+)?)*(?:\?[\w\+%&=.;:-]+)?(?:\#[\w\-\.]*)?)(?:\p{P}|\s|<|$)/;
export default {
  components: {
    Posts,
    Tags,
    Search,
    InfiniteLoading: () => import("vue-infinite-loading")
  },
  data() {
    return {
      search: null,
      tags: null,
      posts: null,
      highlighted: null,
      filters: []
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    async infiniteHandler($state) {
      try {
        const results = await this.$fetch(
          "/tweets/" + (this.$page.tweets.pageInfo.currentPage + 1)
        );
        if (results.data.tweets.edges.length > 0) {
          this.$page.tweets.pageInfo.currentPage =
            this.$page.tweets.pageInfo.currentPage + 1;
          this.$page.tweets.edges = this.$page.tweets.edges.concat(
            results.data.tweets.edges
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
    filter(tags) {
      this.filters = tags;
      this.fetch();
    },
    fetch() {
      this.fetchPosts();
      this.fetchTags();
    },
    fetchPosts() {
      this.posts = this.$page.tweets.edges
        .map(({ node: tweet }) => {
          const [description, url, ...others] = tweet.full_text.split(
            twitterLinkRegex
          );
          return {
            id: tweet.id,
            url,
            description,
            category: tweet.created_at,
            name: tweet.user.name,
            alias: tweet.user.screen_name,
            location: tweet.user.location,
            logo: tweet.user.profile_image_url_https,
            screenshot:
              tweet.entities && tweet.entities.media.length
                ? tweet.entities.media[0].media_url_https
                : tweet.entities && tweet.entities.media.length
                ? tweet.extendedEntities.media[0].media_url_https
                : null
          };
        })
        .filter(
          post => !this.filters.length || this.filters.includes(post.name)
        );
    },
    fetchTags() {
      this.tags = this.$page.tags.edges
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
  grid-template-areas:
    "b b b"
    "a c c";
  grid-template-columns: 0.2fr 0.8fr;
  grid-template-rows: auto 1fr;
  grid-gap: 1rem;
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
    padding-left: 20px;
  }

  .posts,
  .header {
    padding-top: 20px;
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
query Tweets($page: Int) {
  tags: allTweets(
    sortBy: "id", 
    order: DESC, 
  ) {
    edges {
      node {
        user {
          name
        }
      }
    }
  }
  tweets: allTweets(
    sortBy: "id", 
    order: DESC, 
    perPage: 20, 
    page: $page,
  ) @paginate {
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        full_text
        user {
          name
          screen_name
          location
          profile_image_url_https
          profile_banner_url
        }
        created_at
        parent_created_at
        extended_entities {
          media {
            media_url_https
          }
        }
        entities {
          media {
            media_url_https
          }
        }
      }
    }
  }
}
</page-query>