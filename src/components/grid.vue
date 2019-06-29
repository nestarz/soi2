<template functional>
  <div>
    <div class="posts grid">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.posts {
  &.grid {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
    margin-bottom: 40px;

    @media all and (min-width: 600px) {
      grid-template-columns: 1fr 1fr;
    }

    @media only screen and (min-width: 1000px) {
      grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
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
  functional: true,
  props: {
    posts: Array,
    equal: Boolean
  }
};
</script>
