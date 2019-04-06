<template>
  <div class="ressources">
    <div class="category" v-for="edge in $static.ressources.edges" :key="edge.node.id">
      {{ edge.node.categoryName }}
      <div v-for="bookmark in edge.node.list" :key="bookmark.name">
        <my-bookmark
          :name="bookmark.name"
          :alias="bookmark.alias"
          :description="bookmark.description"
          :url="bookmark.url"
          :authors="bookmark.authors"
          :location="bookmark.location"
          :tags="bookmark.tags"
          :screenshot="bookmark.screenshot"
        />
      </div>
    </div>  
  </div>
</template>

<static-query>
query Ressources {
  ressources: allRessources {
    edges {
      node {
        categoryName
        list {
          name
          alias
          url
          authors
          location {
            country
            city
          }
          description
          tags
          collection {
            name
            url
          }
        }
      }
    }
  }
}
</static-query>

<script>
import author from "~/data/author.yml";
import MyBookmark from "~/components/Bookmark.vue";

export default {
  components: {
    MyBookmark,
  },
};
</script>

<style scoped lang="scss">
.ressources {
  .category {
    display: grid;
    grid-gap: 1em;
  }
}
</style>
