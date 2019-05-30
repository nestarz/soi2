<template>
  <div class="posts">
    <resource-post
      class="post"
      v-for="post in posts"
      :key="post.name"
      v-bind="post"
      @click="$emit('select', post)"
    />
  </div>
</template>

<style lang="scss" scoped>
.posts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0.2rem;
  margin-bottom: 40px;

  @media only screen and (orientation: landscape) {
    grid-template-columns: 1fr 1fr 1fr;
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
  }
};
</script>
