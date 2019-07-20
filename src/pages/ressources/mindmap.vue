<template>
  <div class="mindmap" ref="parent">
    <d3-network :net-nodes="nodes" :net-links="links" :options="options" />
  </div>
</template>

<script>
import D3Network from "vue-d3-network";

export default {
  components: {
    D3Network
  },
  data() {
    return {
      nodes: [],
      links: [],
      nodesize: 10,
      canvas: false,
      height: 0,
      width: 0
    };
  },
  mounted() {
    this.nodes = [
      ...this.$page.ressources.edges.map(({ node }) => ({
        id: node.id,
        name: node.name,
        _color: "white"
      })),
      ...[
        ...new Set(this.$page.ressources.edges.flatMap(({ node }) => node.tags))
      ].map(tag => ({
        id: tag,
        name: tag,
        _color: "white",
        _height: 20,
        _width: 20,
        _size: 20
      }))
    ];
    this.links = this.$page.ressources.edges.flatMap(({ node }) =>
      node.tags.map(tag => ({
        tid: tag,
        sid: node.id,
        _color: "rgba(255, 0, 0, 0.03)"
      }))
    );
    this.setSize();
  },
  computed: {
    options() {
      return {
        fontSize: 9,
        force: 500,
        strLinks: false,
        size: {
          w: this.width,
          h: this.height
        },
        nodeLabels: true,
        linkLabels: true,
        linkWidth: 3,
        canvas: this.canvas
      };
    }
  },
  methods: {
    setSize() {
      this.height = this.$refs.parent.clientHeight;
      this.width = this.$refs.parent.clientWidth;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../node_modules/vue-d3-network/dist/vue-d3-network.css";

.mindmap {
  width: 100vw;
  height: 100vh;
}
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
      }
    }
  }
}
</page-query>