<template>
  <div class="index">
    <header class="header">
      <g-link to>about</g-link>
      <g-link to="/tweets">tweets</g-link>
      <g-link to="/ressources">ressources</g-link>
    </header>
    <div class="tags" ref="tags" />
    <div class="posts" ref="posts">
      <grid>
        <span v-for="i in [1,2,3,4]" :key="i"></span>
        <div
          class="description"
        >Currently focusing on Interaction and Object Design exploring the interaction of objects, people, art, technology and science using form and code with a mix of analog and digital materials.</div>
      </grid>
    </div>
  </div>
</template>

<script>
import Grid from "~/components/grid.vue";

export default {
  components: {
    Grid
  }
};
</script>

<style lang="scss" scoped>
.index {
  display: grid;
  grid-template-areas:
    "b b b"
    "a c c";
  grid-template-columns: 0.2fr 0.8fr;
  grid-template-rows: auto 1fr;
  grid-gap: 1rem;
  height: 100vh;

  @media only screen and (orientation: landscape) {
    grid-template-areas:
      "b c c"
      "a c c";
    grid-template-columns: 0.2fr 0.8fr;
    grid-template-rows: auto 1fr;
  }

  .tags {
    scrollbar-width: none;
    grid-area: a;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .posts {
    grid-area: c;
    padding: 0 1rem;

    .description {
      grid-row-start: 2;
      grid-column-start: 1;
    }
  }

  .tags,
  .header {
    padding-left: 1rem;
  }

  .posts,
  .header {
    padding-top: 1rem;
  }

  .posts,
  .tags,
  .header {
    overflow: auto;

    @media print {
      overflow: none;
    }
  }

  .header {
    grid-area: b;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 99;

    h1 {
      font-weight: 600;
    }

    .dot {
      height: 5vmax;
      width: 5vmax;
      background-color: rgb(255, 0, 0);
      border-radius: 50%;
      display: inline-block;
      margin: 1em;
    }

    .search {
      flex: 0.5;
      pointer-events: all;
      transform: rotate(-90deg);
      float: left;
    }
  }
}
</style>
