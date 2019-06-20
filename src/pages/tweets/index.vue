<template>
  <div class="index">
    <header class="header">
      <h1>Les Tweets</h1>
      <h1>
        <g-link to="/">ER</g-link>
      </h1>
    </header>
    <tags class="tags" ref="tags" :tags="tags" @select="fetch"/>
    <div class="posts">
      <posts
        ref="posts"
        :posts="search || posts"
        :masonry="true"
        @select="highlight"
        v-on:scroll.native="event => handleScroll(event, 'tags')"
      />
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
      selected: []
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
          this.$page.tweets.pageInfo.currentPage = this.$page.tweets.pageInfo.currentPage + 1;
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
    fetch(filters = []) {
      this.selected = filters;
      this.fetchPosts(filters);
      this.fetchTags(filters);
    },
    fetchPosts(filters = []) {
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
          post => !this.selected.length || this.selected.includes(post.name)
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
    "b a a"
    "b c c"
    "b c c";
  grid-template-rows: 0.19fr 1fr 1fr;
  grid-gap: 5px;
  height: 100vh;

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
    writing-mode: vertical-rl;
    text-orientation: mixed;
    h1 {
      display: flex;
      justify-content: center;
      transform: rotate(180deg);
      font-size: 12vmin;
      line-height: 10vmin;
    }

    .search {
      flex: 0.5;
      pointer-events: all;
      transform: rotate(-90deg);
      float: left;
    }
  }

  @media only screen and (orientation: landscape) {
    grid-template-areas: "b a c";
    grid-template-columns: 0fr 0.2fr 0.8fr;
    grid-template-rows: 1fr;
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