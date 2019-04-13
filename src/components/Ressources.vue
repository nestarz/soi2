<template>
  <div class="ressources">
    <my-tags :tags="bookmarksTags" :selected="selectedTags" @select="toggleTag"/>
    <div>
      <a href="#" @click="full = !full">Affichage {{ full ? 'Basique' : 'Complet' }}</a> -
      <a href="#">Filters</a>
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
</template>

<static-query>
query Ressources {
  ressources: allRessources(perPage: 1000, sortBy: "category", order: ASC) {
    edges {
      node {
        fileInfo {
          name
        }
        metadata {
          image
          description
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

  .category {
    display: grid;
    grid-gap: 1em;
    grid-template-columns: 1fr 1fr;

    &.full {
      grid-template-columns: 1fr;
    }
  }
  .nav {
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
