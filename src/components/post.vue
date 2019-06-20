<template functional>
  <div class="bookmark" :class="{ container: props.screenshot }">
    <div class="container-image" v-if="props.screenshot">
      <g-image class="image" quality="20" blur="1" width="20" :src="props.screenshot"/>
    </div>
    <div class="main">
      <div class="header">
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
              <span class="name" v-if="props.name">{{ props.name }}</span>
              <span class="alias" v-else-if="props.alias">@{{ props.alias }}</span>
            </a>
            <div class="location">
              <span class="alias" v-if="props.alias">@{{ props.alias }}</span>
              <span
                v-if="props.location"
              >{{ typeof props.location === 'object' ? `${props.location.city}${props.location.country && props.location.city ? ", " : ""}${props.location.country}` : props.location }}</span>
              <div v-for="author in props.authors" :key="author">{{ author }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="main">
        <div
          class="description"
        >{{ props.description.length > 249 ? props.description.replace(/^(.{249}[^\s]*).*/, "$1...") : props.description }}</div>
        <div class="tags">
          <!-- <span class="category">{{ `${props.category} ` }}</span> -->
          <span v-for="tag in props.tags" :key="tag">{{ `${tag} ` }}</span>
        </div>
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
  &.container {
    grid-row-start: span 2;
    display: grid;
    grid-gap: 5px;
    grid-template-rows: 1fr 1fr;

    .container-image {
      height: 100%;
      position: relative;

      /deep/ img {
        max-height: 100%;
        object-fit: contain;
        flex: 1;
        width: 100%;
      }
    }
  }

  .main {
    line-height: 1.18em;

    .head {
      display: flex;
      align-items: center;
      line-height: 1;
      margin-bottom: 5px;

      .logo {
        height: 30px;
        width: 30px;
      }

      .title {
        margin-left: 5px;

        .name {
          font-weight: 600;
        }

        .location {
          font-size: 75%;

          .alias {
            margin-right: 5px;
          }
        }
      }
    }
  }
}
</style>
