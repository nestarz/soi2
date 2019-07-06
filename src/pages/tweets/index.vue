<template>
  <layout>
    <template slot="sidebar" >
      <tags :tags="tags" @select="filter" />
    </template>
    <div>
      <posts :posts="search || posts" @select="highlight" :equal="true" />
      <ClientOnly>
        <infinite-loading @infinite="infiniteHandler" v-if="$page"></infinite-loading>
      </ClientOnly>
    </div>
  </layout>
</template>

<script>
import Posts from "~/components/posts.vue";
import Tags from "~/components/tags.vue";
import Search from "~/components/search.vue";
import Layout from "~/layouts/default.vue";

const twitterLinkRegex = /(?:<\w+.*?>|[^=!:'"\/]|)((?:https?:\/\/|www\.)[-\w]+(?:\.[-\w]+)*(?::\d+)?(?:\/(?:(?:[~\w\+%-]|(?:[,.;@:][^\s$]))+)?)*(?:\?[\w\+%&=.;:-]+)?(?:\#[\w\-\.]*)?)(?:\p{P}|\s|<|$)/;
export default {
  components: {
    Posts,
    Tags,
    Search,
    InfiniteLoading: () => import("vue-infinite-loading"),
    Layout,
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