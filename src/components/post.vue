<template functional>
  <div class="bookmark" :class="{ full: props.full }">
    <div class="header">
      <div class="container-image">
        <g-image
          class="image"
          quality="20"
          blur="1"
          width="20"
          :src="props.screenshot"
          v-if="props.screenshot"
        />
        <div v-else></div>
      </div>
      <div class="head">
        <div class="logo" v-if="props.logo">
          <g-image
            class="image"
            quality="20"
            blur="1"
            width="20"
            :src="props.logo"
            v-if="props.logo"
          />
        </div>
        <div class="title">
          <a :href="props.url">
            <span class="name">{{ props.name }}</span>
            <span class="alias" v-if="props.alias">({{ props.alias }})</span>
          </a>
          <div
            class="location"
            v-if="props.location"
          >{{ typeof props.location === 'object' ? `${props.location.city}${props.location.country && props.location.city  ? ", " : ""}${props.location.country}` : props.location }}</div>
          <div v-for="author in props.authors" :key="author">{{ author }}</div>
        </div>
      </div>
    </div>
    <div class="main">
      <div
        class="description"
      >{{ props.description.length > 249 ? props.description.replace(/^(.{249}[^\s]*).*/, "$1...") : props.description }}</div>
      <div class="tags">
        <span class="category">{{ `${props.category} ` }}</span>
        <span v-for="tag in props.tags" :key="tag">{{ `${tag} ` }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  functional: true,
  props: {
    full: Boolean,
    category: String,
    name: String,
    alias: String,
    url: String,
    description: String,
    authors: Array,
    location: [Object, String],
    tags: Array,
    screenshot: String,
    slug: String,
    index: Number,
    logo: String
  }
};
</script>

<style lang="scss" scoped>
.bookmark {
  margin-bottom: 5px;
  padding-bottom: 5px;

  &.full {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-columns: minmax(0, 0.3fr) minmax(0, 0.7fr);
    grid-gap: 0 1em;
  }

  .header {
    margin-bottom: 5px;

    .head {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 10px;
    }
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
      //display: grid;
      background-color: #eee;
      //grid-auto-rows: minmax(350px, max-content);
      //min-height: 200px;

      img {
        position: relative;
        object-fit: cover;
        width: 100%;
        max-height: 100%;
        bottom: 0;
        height: 100%;

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
