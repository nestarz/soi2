<template>
  <layout>
    <template slot="sidebar">
      <div>
        <span>Currently focusing on Interaction and Object Design exploring the interaction of objects, people, art, technology and science using form and code with a mix of analog and digital materials.</span>
      </div>
    </template>
    <cytoscape :config="config" :preConfig="preConfig" :afterCreated="afterCreated" v-if="config" />
  </layout>
</template>

<script>
import Layout from "~/layouts/default.vue";
import Grid from "~/components/grid.vue";
import cola from "cytoscape-cola";

export default {
  components: {
    Layout,
    Grid
  },
  data() {
    return {
      config: null
    };
  },
  mounted() {
    this.nodes = [
      ...this.$page.ressources.edges.map(({ node }) => ({
        data: {
          id: node.id,
          //label: node.name,
          width: 5,
          color: "black"
        }
      })),
      ...[
        ...new Set(
          this.$page.ressources.edges.map(({ node }) => node.category || "none")
        )
      ].map(category => ({
        data: {
          id: category,
          label: category.toLowerCase(),
          width: 20,
          color: "white"
        }
      }))
    ];
    this.links = this.$page.ressources.edges.flatMap(({ node }) => ({
      data: {
        target: node.category || "none",
        source: node.id
      }
    }));
    this.config = {
      elements: [...this.nodes, ...this.links],
      autounselectify: true,
      boxSelectionEnabled: false,
      layout: {
        name: "cola",
        convergenceThreshold: 100, // end layout sooner, may be a bit lower quality
        animate: false,
        fit: true,
        nodeDimensionsIncludeLabels: true,
        randomize: true,
        handleDisconnected: false
      },
      style: [
        {
          selector: "node",
          css: {
            "background-color": "#fff",
            "border-width": 1,
            "border-color": "data(color)",
            content: "data(label)",
            "text-valign": "center",
            "text-outline-width": 10,
            "text-outline-color": "#fff",
            width: "data(width)",
            height: "data(width)"
          }
        },
        {
          selector: "edge",
          css: {
            "line-color": "#000"
          }
        }
      ]
    };
    console.log(this.config);
  },
  methods: {
    preConfig(cytoscape) {
      cytoscape.use(cola);
    },
    afterCreated(cy) {
      cy.nodes().on("click", function(e) {
        let clickedNode = e.target;
        console.log(clickedNode);
      });
    }
  }
};
</script>

<style lang="scss">
@import "../../node_modules/vue-cytoscape/dist/vue-cytoscape.css";
</style>



<page-query>
query Ressources {
  ressources: allRessources(
    sortBy: "category", 
    order: ASC, 
  ) {
    edges {
      node {
        id
        name
        url
        tags
        category
      }
    }
  }
}
</page-query>