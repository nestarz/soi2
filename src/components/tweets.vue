<template>
  <div class="posts">
    <masonry :cols="{default: 3, 1000: 3, 700: 2, 400: 1}" :gutter="{default: '5px', 700: '5px'}">
      <resource-post
        class="post"
        v-for="post in posts"
        :key="post.name"
        :category="post.createdAt"
        :name="post.user.name"
        :alias="post.user.screen_name"
        :url="''"
        :description="post.fullText.split('https://t.co/')[0]"
        :location="post.user.location"
        :screenshot="(post.entities && 
        post.entities.media.length)
        ? post.entities.media[0].mediaUrlHttps 
        : (post.entities && 
          post.entities.media.length) 
          ? post.extendedEntities.media[0].mediaUrlHttps 
          : null"
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

export default {
  components: {
    ResourcePost
  },
  props: {
    posts: Array
  },
  methods: {
    handleScroll(event) {
      console.log(event.target.scrollLeft);
      event.target.scrollLeft = event.target.scrollTop;
    }
  }
};
</script>
