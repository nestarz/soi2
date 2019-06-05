<template>
  <div class="index">
    <header class="header">
      <h1>Les Tweets</h1>
      <h1><g-link to="/">ER</g-link></h1>
    </header>
    <tags class="tags" ref="tags" :tags="tags" @select="fetch"/>
    <posts
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
import Posts from "~/components/posts.vue";
import Tags from "~/components/tags.vue";
import Search from "~/components/search.vue";

const twitterLinkRegex = /(?:<\w+.*?>|[^=!:'"\/]|)((?:https?:\/\/|www\.)[-\w]+(?:\.[-\w]+)*(?::\d+)?(?:\/(?:(?:[~\w\+%-]|(?:[,.;@:][^\s$]))+)?)*(?:\?[\w\+%&=.;:-]+)?(?:\#[\w\-\.]*)?)(?:\p{P}|\s|<|$)/;
export default {
  components: {
    Posts,
    Tags,
    Search
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
          post => !this.selected.length || this.selected.includes(post.name)
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
  grid-template-areas:
    "b a a"
    "b c c"
    "b c c";
  grid-template-rows: 0.5fr 1fr 1fr;
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