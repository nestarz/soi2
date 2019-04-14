<template>
  <div class="ressources">
    <my-tags :tags="bookmarksTags" :selected="selectedTags" @select="toggleTag"/>
    <div>
      <div class="options">
        <a
          href="#"
          @click="full = !full"
        >{{ locale.display }} {{ full ? locale.basic : locale.full }}</a>
        <div class="search-wrapper">
          <input type="text" v-model="search" placeholder="Search title...">
        </div>
      </div>
      <div class="category" :class="{ full }">
        <my-bookmark
          :full="full"
          :category="node.category"
          :name="node.name"
          :alias="node.alias"
          :description="node.description"
          :url="node.url"
          :authors="node.authors"
          :location="node.location"
          :tags="node.tags"
          :slug="node.fileInfo.name"
          :screenshot="node.metadata ? node.metadata.image ? node.metadata.image : '' : ''"
          v-for="{ node } in bookmarks"
          :key="node.id"
        />
      </div>
    </div>
  </div>
</template>

<static-query>
query Ressources {
  ressources: allRessources(perPage: 1000, sortBy: "category", order: ASC) {
    edges {
      node {
        fileInfo {
          name
        }
        category
        name
        alias
        description
        url
        authors
        tags
        location {
          city
          country
        }
      }
    }
  }
}
</static-query>

<script>
import author from "~/data/author.yml";
import MyBookmark from "~/components/Bookmark.vue";
import MyTags from "~/components/Tags.vue";

function isSuperset(set, subset) {
  for (var elem of subset) {
    if (!set.has(elem)) {
      return false;
    }
  }
  return true;
}

export default {
  components: {
    MyBookmark,
    MyTags
  },
  data() {
    return {
      selectedTags: [],
      full: true
    };
  },
  computed: {
    bookmarks() {
      return this.$static.ressources.edges.filter(({ node }) =>
        isSuperset(new Set(node.tags), new Set(this.selectedTags))
      );
    },
    bookmarksTags() {
      return this.bookmarks.flatMap(({ node }) => node.tags);
    },
    locale() {
      const translations = {
        fr: {
          display: "Affichage",
          basic: "Basique",
          full: "Complet",
          filters: "Filtres"
        },
        en: {
          display: "Display",
          basic: "Basic",
          full: "Full",
          filters: "Filters"
        }
      };
      return translations[this.$store.state.lang.slug];
    }
  },
  methods: {
    toggleTag(tag) {
      this.selectedTags.includes(tag)
        ? (this.selectedTags = this.selectedTags.filter(
            selected => selected !== tag
          ))
        : this.selectedTags.push(tag);
      console.log(this.selectedTags);
    }
  }
};
</script>

<style lang="scss" scoped>
.ressources {
  display: grid;
  grid-gap: 1em;
  grid-template-columns: 1fr;

  @media only screen and (min-width: 600px) {
    grid-template-columns: 0.25fr 1fr;
  }

  .options {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .search-wrapper {
      input {
        border: 0;
        font-family: inherit;
        font-size: inherit;
        color: inherit;
        text-align: right;
        text-decoration: underline;
        &::placeholder {
          color: inherit;
          text-decoration: inherit;
          padding: 0;
          margin: 0;
        }
      }
    }
  }

  .category {
    display: grid;
    grid-gap: 1em;
    grid-template-columns: 1fr 1fr;
    @media only screen and (min-width: 600px) {
      overflow: scroll;
      max-height: 100vh;
    }

    &.full {
      grid-template-columns: 1fr;
    }
  }
  .nav {
    @media only screen and (min-width: 600px) {
      overflow: scroll;
      max-height: 100vh;
    }
    .tags {
      display: flex;
      flex-wrap: wrap;
      list-style: none;
      margin-left: -1em;

      .tag {
        margin: 0 1em;
      }
    }
  }
}
</style>
