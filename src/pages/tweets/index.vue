<template>
  <div class="index">
    <header class="header">
      <h1>Tweets</h1>
      <twitter-search class="search" :posts="posts" @search="apply"/>
    </header>
    <twitter-names class="tags" ref="tags" :tags="tags" @select="fetch"/>
    <twitter-tweets
      class="posts"
      ref="posts"
      :posts="search || posts"
      :masonry="true"
      @select="highlight"
      v-on:scroll.native="event => handleScroll(event, 'tags')"
    />
  </div>
</template>

<script>
import TwitterTweets from "~/components/posts.vue";
import TwitterNames from "~/components/tags.vue";
import TwitterSearch from "~/components/search.vue";

const twitterLinkRegex = /(?:<\w+.*?>|[^=!:'"\/]|)((?:https?:\/\/|www\.)[-\w]+(?:\.[-\w]+)*(?::\d+)?(?:\/(?:(?:[~\w\+%-]|(?:[,.;@:][^\s$]))+)?)*(?:\?[\w\+%&=.;:-]+)?(?:\#[\w\-\.]*)?)(?:\p{P}|\s|<|$)/;
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
      highlighted: null,
      selected: [],
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
      this.selected = filters;
      this.fetchPosts(filters);
      this.fetchTags(filters);
    },
    fetchPosts(filters = []) {
      this.posts = this.$page.tweets.edges
        .map(({ node: tweet }) => {
          const [description, url, ...others] = tweet.fullText.split(
            twitterLinkRegex
          );
          return {
            id: tweet.id,
            url,
            description,
            category: tweet.createdAt,
            name: tweet.user.name,
            alias: tweet.user.screen_name,
            location: tweet.user.location,
            logo: tweet.user.profileImageUrlHttps,
            screenshot:
              tweet.entities && tweet.entities.media.length
                ? tweet.entities.media[0].mediaUrlHttps
                : tweet.entities && tweet.entities.media.length
                ? tweet.extendedEntities.media[0].mediaUrlHttps
                : null
          };
        })
        .filter(
          post =>
            !this.selected.length || this.selected.includes(post.name)
        );
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
    left: 70%;
    right: 20%;
    top: 70%;
    pointer-events: none;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    z-index: 99;
    padding: 5px;
    background: rgba(0, 0, 0, 0.9);

    h1 {
      color: #fff;
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
          profileImageUrlHttps
          profileBannerUrl
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