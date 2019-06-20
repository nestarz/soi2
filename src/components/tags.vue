<template>
  <div class="tags">
    <nav>
    <li
      v-for="([tag, count]) in sorted"
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
  </div>
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
  },
  computed: {
    sorted() {
      var sortable = [];
      for (var tag in this.tags) {
        sortable.push([tag, this.tags[tag]]);
      }
      return sortable.sort((a, b) => b[1] - a[1]);
    }
  }
};
</script>

<style lang="scss" scoped>
nav {
  list-style: none;
  margin: 0;
  columns: 1;
  
  @media screen and (min-width: 600px) {
    columns: 2;
  }

  .tag {
    margin: 0;
    cursor: pointer;
    flex: 0;
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
