<template>
  <layout>
    <template slot="sidebar" >
      <tags :tags="tags" @select="filter" />
    </template>
    <div>
      <posts :posts="search || posts" @select="highlight" :equal="false" />
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

function getInstagramUrlFromMediaId(media_id) {
    media_id = parseInt(media_id.substring(0, media_id.indexOf('_')));
    var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
    var shortenedId = '';
    while (media_id > 0) {
        var remainder = modulo(media_id % 64);
        media_id = (media_id - remainder) / 64;
        shortenedId = alphabet.charAt(remainder) + shortenedId;
    }
    return 'https://www.instagram.com/p/' + shortenedId + '/';
}
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
          "/instagram/" + (this.$page.saved.pageInfo.currentPage + 1)
        );
        if (results.data.saved.edges.length > 0) {
          this.$page.saved.pageInfo.currentPage =
            this.$page.saved.pageInfo.currentPage + 1;
          this.$page.saved.edges = this.$page.saved.edges.concat(
            results.data.saved.edges
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
      this.posts = this.$page.saved.edges
        .map(({ node: post }) => {
          return {
            id: post.media.id,
            url: `https://www.instagram.com/${post.media.user.username}/`,
            description: post.media.caption && post.media.caption.text,
            category: post.media.saved_collection_ids,
            name: post.media.user.username,
            logo: post.media.user.profile_pic_url,
            screenshot: post.screenshot,
          };
        })
        .filter(
          post => !this.filters.length || this.filters.includes(post.media.name)
        );
    },
    fetchTags() {
      this.tags = this.$page.tags.edges
        .map(({ node: post }) => post.media.user.username)
        .reduce((obj, num) => {
          obj[num] = ++obj[num] || 1;
          return obj;
        }, {});
    }
  }
};
</script>

<page-query>
query InstagramSaved($page: Int) {
  tags: allInstagramSaved(
    sortBy: "id", 
    order: DESC, 
  ) {
    edges {
      node {
        media {
          user {
            username
          }
        }
      }
    }
  }
  saved: allInstagramSaved(
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
        screenshot
        media {
          id
          user {
            username
            profile_pic_url
          }
          image_versions2 {
            candidates
          }
          caption {
            text
          }
        }
      }
    }
  }
}
</page-query>