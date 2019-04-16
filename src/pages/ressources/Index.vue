<template>
  <Layout class="ressources">
    <my-ressources :ressources="$page.ressources.edges">
      <Pager :info="$page.ressources.pageInfo"/>
    </my-ressources>
  </Layout>
</template>


<page-query>
query Ressources ($page: Int) {
  ressources: allRessources(
    sortBy: "category", 
    order: ASC, 
    perPage: 1000, 
    page: $page,
  ) @paginate {
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        category
        name
        alias
        description
        url
        authors
        tags
        screenshot
        location {
          city
          country
        }
      }
    }
  }
}
</page-query>

<script>
import MyRessources from "~/components/Ressources.vue";
import { Pager } from "gridsome";

export default {
  metaInfo: {
    title: "Ressources"
  },
  components: {
    Pager,
    MyRessources
  }
};
</script>

<style lang="scss" scoped>
.ressources {
}
</style>
