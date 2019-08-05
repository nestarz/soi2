<template functional>
  <div class="bookmark" :class="{ container: props.screenshot, equal: props.equal }">
    <div class="container-image" v-if="props.screenshot">
      <component :is="props.url ? 'a' : 'template'" :href="props.url" class="link">
        <g-image class="image" :src="props.screenshot" alt=" "/>
      </component>
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
              alt=" "
            />
          </div>
          <div class="title">
            <a :href="props.url">
              <span class="name" v-if="props.name">{{ props.name }}</span>
              <span class="alias" v-else-if="props.alias">@{{ props.alias }}</span>
            </a>
            <div class="location" v-if="props.alias || props.location">
              <span class="alias" v-if="props.alias">@{{ props.alias }}</span>
              <span
                v-if="props.location"
              >{{ typeof props.location === 'object' ? `${props.location.city}${props.location.country && props.location.city ? ", " : ""}${props.location.country}` : props.location }}</span>
              <div v-for="author in props.authors" :key="author">{{ author }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="information">
        <div
          class="description"
        >{{ (props.description && props.description.length > 149) ? `${(props.description.match(RegExp(".{149}\\S*"))||[props.description.substring(0, 149)])[0]}...` : props.description }}</div>
        <div class="tags">
          <!-- <span class="category">{{ `${props.category} ` }}</span> -->
          <span v-for="(tag, index) in props.tags" :key="`${tag}-${index}`">{{ `${tag} ` }}</span>
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
    screenshot: [Object, String],
    slug: String,
    index: Number,
    logo: String,
    equal: Boolean
  }
};
</script>

<style lang="scss" scoped>
.bookmark {
  &.container {
    grid-row-start: span 2;
    display: block;

    &.equal {
      .container-image {
        /deep/ img {
          max-height: 18rem;
        }
      }
    }

    .container-image {
      position: relative;
      user-select: none;
      margin-bottom: 1rem;

      /deep/ img {
        object-fit: contain;
        flex: 1;
        width: 100%;
        max-height: 23rem;
      }

      a {
        display: block;
        line-height: 0;
      }
    }
  }

  .main {
    line-height: 1.18em;
    /* display: none; */

    .description {
      word-break: break-word;
      font-size: 80%;
    }

    .tags {
      font-size: 70%;
      span:not(:last-child) {
        margin-right: 2px;
      }
    }

    .head {
      display: flex;
      align-items: center;
      line-height: 1;
      margin-bottom: 0.5rem;

      .logo {
        height: 1.5rem;
        width: 1.5rem;
        margin-right: 0.5rem;
      }

      .title {
        .name {
          font-weight: 600;
        }

        .location {
          font-size: 75%;
          margin-top: 0.1rem;

          .alias {
            margin-right: 5px;
          }
        }
      }
    }
  }

  /* position: relative;
  .main {
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding-top: 1rem;
    background: white;
    .information {
    }
  } */
}
</style>
