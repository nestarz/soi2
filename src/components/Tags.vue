<template>
  <nav class="nav">
    <ul class="tags">
      <li
        v-for="[tag, count] in set"
        :key="tag"
        class="tag"
        :class="{active: selected.includes(tag)}"
        @click="select(tag)"
      >
        <span>{{ tag }}</span>
        <span class="count">{{ count }}</span>
      </li>
    </ul>
  </nav>
</template>

<static-query>
query Tags {
  ressources: allRessources(perPage: 1000) {
    edges {
      node {
        tags
      }
    }
  }
}
</static-query>

<script>
export default {
  props: {
    tags: Array,
    selected: Array
  },
  methods: {
    select(tag) {
      console.log(tag, this.selected);
      this.$emit("select", tag);
    }
  },
  computed: {
    set() {
      return Array.from(
        this.tags
          .sort()
          .reduce(
            (acc, val) => acc.set(val, 1 + (acc.get(val) || 0)),
            new Map()
          )
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.nav {
  .tags {
    columns: 7em auto;
    list-style: none;
    margin: 0;

    .tag {
      margin: 0;
      cursor: pointer;
      border-bottom: 1px solid black;
      
      &.active {
        color: var(--link-color);
        text-decoration: underline;
      }

      .count {
        font-size: 60%;
      }
    }
  }
}
</style>
