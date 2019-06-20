<template>
  <div>
    <div class="posts grid">
      <resource-post
        class="post"
        v-for="(post, index) in posts"
        :key="post.id || `post-${index}`"
        v-bind="post"
        @click="$emit('select', post)"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.posts {
  &.grid {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 5px;
    margin-bottom: 40px;

    @media all and (min-width: 600px) {
      grid-template-columns: 1fr 1fr;
    }

    @media only screen and (min-width: 1000px) {
      grid-template-columns: 1fr 1fr 1fr;
    }

    & > /deep/ * {
      min-height: 10vw;
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
    posts: Array,
    masonry: Boolean
  }
};
</script>
