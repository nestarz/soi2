<template>
  <div class="posts">
    <masonry :cols="{default: 3, 1000: 2, 500: 1, 400: 1}" :gutter="{default: '5px', 700: '5px'}">
      <resource-post
        class="post"
        v-for="post in posts"
        :key="post.id"
        v-bind="post"
        @click="$emit('select', post)"
      />
    </masonry>
  </div>
</template>

<style lang="scss" scoped>
.posts {
  .post {
    margin-bottom: 5px;
  }
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 0.2rem;
    margin-bottom: 40px;

    @media only screen and (orientation: landscape) {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
}
</style>

<script>
import ResourcePost from "~/components/post.vue";

const twitterLinkRegex = /(?:<\w+.*?>|[^=!:'"\/]|)((?:https?:\/\/|www\.)[-\w]+(?:\.[-\w]+)*(?::\d+)?(?:\/(?:(?:[~\w\+%-]|(?:[,.;@:][^\s$]))+)?)*(?:\?[\w\+%&=.;:-]+)?(?:\#[\w\-\.]*)?)(?:\p{P}|\s|<|$)/;
export default {
  components: {
    ResourcePost
  },
  props: {
    tweets: Array
  },
  computed: {
    posts() {
      return this.tweets.map(tweet => {
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
      });
    }
  }
};
</script>
