<template functional>
  <div class="bookmark" :class="{ full: props.full }">
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
              <template v-if="props.alias">@{{ props.alias }}</template>
              <template
                v-if="props.location"
              >{{ typeof props.location === 'object' ? `${props.location.city}${props.location.country && props.location.city ? ", " : ""}${props.location.country}` : props.location }}</template>
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
}
</style>
