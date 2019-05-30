<template>
  <nav class="tags">
    <li
      v-for="(count, tag) in tags"
      :key="tag"
      @click="count && select(tag)"
      class="tag"
      :class="{ active : selected.has(tag), inactive: count === 0 }"
    >
      <span class="tag">
        {{ tag }}&nbsp;<span class="count">{{ count }}</span>
      </span>
    </li>
  </nav>
</template>

<script>
export default {
  props: {
    tags: Object
  },
  data() {
    return {
      selected: new Map()
    };
  },
  methods: {
    select(tag) {
      this.selected.has(tag)
        ? this.selected.delete(tag)
        : this.selected.set(tag, null);
      this.$emit("select", Array.from(this.selected.keys()));
    }
  }
};
</script>

<style lang="scss" scoped>
.tags {
  list-style: none;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;

  .tag {
    margin: 0;
    cursor: pointer;
    flex: 0;
    flex-basis: 50%;
    max-width: 50%;
    align-self: flex-start;

    &.active {
      color: var(--link-color);
      color: rgb(255, 62, 81);
      text-decoration: underline;
    }

    &.inactive {
      opacity: 0.2;
      cursor: default;
    }

    .count {
      font-size: 60%;
    }
  }
}
</style>
