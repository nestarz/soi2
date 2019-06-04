<template>
  <component
    :is="masonry ? 'masonry' : 'div'"
    :cols="{ default: 3, 1000: 2, 500: 1, 400: 1 }"
    :gutter="{ default: '5px' }"
    :class="{ grid: !masonry }"
    class="posts"
  >
    <resource-post
      class="post"
      v-for="post in posts"
      :key="post.id || `post-${index}`"
      v-bind="post"
      @click="$emit('select', post)"
    />
  </component>
</template>

<style lang="scss" scoped>
.posts {
  &.grid {
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
    posts: Array,
    masonry: Boolean,
  }
};
</script>
