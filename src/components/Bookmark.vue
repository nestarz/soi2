<template>
  <div class="bookmark" :class="{ full }">
    <div class="header">
      <div class="container-image">
        <g-image v-if="mainScreenshot" class="image" :src="mainScreenshot"/>
      </div>
      <div class="title">
        <a :href="url">{{ name }} {{ alias }}</a>
        <div v-for="author in authors" :key="author">{{ author }}</div>
      </div>
    </div>
    <div class="main" v-if="full">
      <div class="description">{{ description }}</div>
      <div class="tags">
        <span>{{ `${category} ` }}</span>
        <span v-for="tag in tags" :key="tag">{{ `${tag} ` }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import book from "~/data/author.yml";

export default {
  props: {
    full: Boolean,
    category: String,
    name: String,
    alias: String,
    url: String,
    description: String,
    authors: Array,
    location: Object,
    tags: Array,
    screenshot: String,
    slug: String
  },
  computed: {
    mainScreenshot() {
      return this.screenshot
        ? this.screenshot
        : `./screenshots/${this.slug}.png`;
    }
  }
};
</script>

<style lang="scss" scoped>
.bookmark {
  display: grid;
  grid-template-columns: 1fr;

  &.full {
    grid-template-columns: minmax(0, 0.3fr) minmax(0, 0.7fr);
    grid-gap: 0 1em;
  }

  .header {
    display: flex;
    flex-direction: column;

    .container-image {
      background-color: #fafafa;
      height: 100%;

      .image {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
      }
    }
  }

  .main {
    display: flex;
    justify-content: space-between;
    flex-direction: column;

    .description {
      display: grid;
      grid-gap: 0.5em;
    }

    .tags {
      color: var(--link-color);
      margin-top: 1em;
    }
  }
}
</style>
