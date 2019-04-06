<template>
  <div class="bookmark">
    <div>
      <a :href="url">{{ name }} {{ alias }}</a>
      <div v-for="author in authors" :key="author">{{ author }}</div>
    </div>
    <div class="description">
      {{ description }}
      <div class="tags">
        <span v-for="tag in tags" :key="tag">{{ tag }} </span>
      </div>
    </div>
  </div>
</template>

<script>
import book from "~/data/author.yml";

export default {
  props: {
    name: String,
    alias: String,
    url: String,
    description: String,
    authors: Array,
    location: Object,
    tags: Array
  }
};
</script>

<style lang="scss">
.bookmark {
  display: grid;
  grid-template-columns: 0.3fr 0.7fr;
  grid-gap: 1em;
  .description {
    display: grid;
    grid-gap: 0.5em;
    .tags {
      color: var(--link-color);
    }
  }
}
</style>
