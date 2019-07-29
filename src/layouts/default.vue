<template>
  <div class="layout">
    <header class="header">
      <nav>
        <ol>
          <li v-for="link in links" :key="link.title">
            <g-link :to="link.url">{{ link.title }}</g-link>
          </li>
        </ol>
      </nav>
    </header>
    <nav class="sidebar" ref="sidebar">
      <slot name="sidebar"/>
    </nav>
    <main class="main" ref="main" v-on:scroll="event => handleScroll(event, 'sidebar')">
      <slot/>
    </main>
  </div>
</template>

<script>
export default {
  props: {
    url: String,
  },
  data() {
    return {
      links: [
        {
          title: "eliaspourquoi",
          url: "/"
        },
      ]
    };
  },
  methods: {
    handleScroll(event, ref) {
      this.$refs[ref].scrollTop = event.target.scrollTop;
    }
  }
};
</script>

<style lang="scss" scoped>
.layout {
  display: block;
  grid-template-areas:
    "b b b"
    "a a a"
    "c c c";
  grid-template-columns: 0.2fr 0.8fr;
  grid-template-rows: min-content;
  grid-gap: 1rem;
  height: 100vh;

  @media only screen and (orientation: landscape) {
    display: grid;
    grid-template-areas:
      "b c c"
      "a c c";
    grid-template-columns: 11rem 1fr;
    grid-template-rows: auto 1fr;
  }

  .sidebar {
    scrollbar-width: none;
    grid-area: a;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .main {
    grid-area: c;

    padding: 0 1rem;
  }

  .sidebar,
  .header {
    padding-left: 20px;
  }

  .main,
  .header {
    padding-top: 20px;
  }

  .main,
  .sidebar,
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

    nav {
      ol {
        margin: 0;
        list-style: none;

        li {
          margin: 0;
          font-weight: 600;

          a.active {
            font-weight: 600;
          }
        }
      }
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
