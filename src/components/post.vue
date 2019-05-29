<template>
  <div class="bookmark" :class="{ full }">
    <div class="header">
      <div class="container-image">
        <g-image class="image" quality="20" blur="1" width="20" :src="screenshot"/>
      </div>
      <div class="title">
        <a :href="url">
          <span class="name">{{ name }}</span>
          <span class="alias" v-if="alias">({{ alias }})</span>
        </a>
        <div class="location" v-if="location">{{ locationFormatted }}</div>
        <div v-for="author in authors" :key="author">{{ author }}</div>
      </div>
    </div>
    <div class="main">
      <div class="description">{{ description.replace(/^(.{135}[^\s]*).*/, "$1") }}...</div>
      <div class="tags">
        <span class="category">{{ `${category} ` }}</span>
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
    slug: String,
    index: Number
  },
  computed: {
    locationFormatted() {
      const full = this.location.city && this.location.country;
      return `${this.location.city}${full ? ", " : ""}${this.location.country}`;
    }
  }
};
</script>

<style lang="scss" scoped>
.bookmark {
  &.full {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-columns: minmax(0, 0.3fr) minmax(0, 0.7fr);
    grid-gap: 0 1em;
  }

  .header {
    margin-bottom: 5px;

    .title {
      margin-top: 10px;

      a {
        color: rgb(255, 62, 81);
        .name {
          background: ghostwhite;
        }
      }

      .alias {
        font-size: 70%;
        font-style: italic;
      }

      .location {
        font-size: 70%;
        font-style: italic;
      }
    }
    .container-image {
      display: grid;
      background-color: #eee;

      img {
        position: relative;

        &:after {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: #fafafa;
          content: " ";
        }
      }
    }
  }

  .main {
    .description {
      word-break: break-word;
      margin-bottom: 5px;
    }

    .tags {
      color: var(--link-color);
      font-size: 70%;
      text-transform: lowercase;

      span {
        margin-right: 5px;

        &:not(:last-child):after {
          content: " ";
        }
      }
    }
  }
}
</style>
