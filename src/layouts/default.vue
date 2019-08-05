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
    <input id="toggle" class="toggle" type="checkbox">
    <label for="toggle">
      <span class="close">?</span>
      <span class="open">!</span>
    </label>
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
    url: String
  },
  data() {
    return {
      links: [
        {
          title: "eliaspourquoi",
          url: "/"
        }
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
  display: grid;
  grid-template-areas:
    "b b toggle"
    "a a a"
    "c c c"
    "c c c";
  grid-template-columns: 0.2fr 0.8fr;
  grid-template-rows: min-content;

  @media only screen and (orientation: landscape) {
    display: grid;
    grid-template-areas:
      "b c c"
      "a c c";
    grid-template-columns: 11rem 1fr;
    grid-template-rows: auto 1fr;
    height: 100vh;
  }

  .toggle {
    display: none;

    + label {
      display: block;
      grid-area: toggle;
      padding: 1rem 1rem 0 0;
      position: sticky;
      top: 0;
      z-index: 9999;

      @media only screen and (orientation: landscape) {
        display: none;
      }

      span {
        background: #0d0d0d;
        border-radius: 50%;
        width: 1rem;
        display: flex;
        justify-content: center;
        height: 1rem;
        align-items: center;
        color: white;
        padding-top: 0.1rem;
        cursor: pointer;
        user-select: none;
      }

      .open {
        display: none;
      }
      .close {
        display: flex;
      }
    }

    &:checked {
      & ~ .sidebar {
        display: block;
      }

      + label {
        .open {
          display: flex;
        }
        .close {
          display: none;
        }
      }
    }
  }

  .sidebar {
    scrollbar-width: none;
    grid-area: a;
    padding: 0 1rem 0rem 1rem;
    margin-bottom: 1rem;
    display: none;
    max-height: 50vh;
    overflow: hidden;

    @media only screen and (orientation: landscape) {
      max-height: none;
      display: block;
    }

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .main {
    grid-area: c;

    overflow: none;
    padding: 0 1rem;

    @media only screen and (orientation: landscape) {
      padding-top: 1rem;
      overflow: auto;
    }
  }

  .sidebar,
  .header {
    padding-left: 1rem;
  }

  .header {
    padding-top: 1rem;
  }

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
    padding: 1rem;

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
