<template>
  <layout>
    <template slot="sidebar">
      <div class="mindmap" ref="parent">
        <d3-network :net-nodes="nodes" :net-links="links" :options="options" />
        <span>Currently focusing on Interaction and Object Design exploring the interaction of objects, people, art, technology and science using form and code with a mix of analog and digital materials.</span>
      </div>
    </template>
  </layout>
</template>

<script>
import Layout from "~/layouts/default.vue";
import Grid from "~/components/grid.vue";
import D3Network from "vue-d3-network";

export default {
  components: {
    D3Network,
    Layout,
    Grid
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
        _color: "white",
        _labelClass: "item"
      })),
      ...[
        ...new Set(
          this.$page.ressources.edges.map(({ node }) => node.category || " ")
        )
      ].map(category => ({
        id: category,
        name: category.toLowerCase(),
        _color: "white",
        _size: 0.000001
      }))
    ];
    this.links = this.$page.ressources.edges.flatMap(({ node }) => ({
      tid: node.category || " ",
      sid: node.id,
      _color: "rgba(0, 0, 0, 1)"
    }));
    this.setSize();
  },
  computed: {
    options() {
      return {
        fontSize: 12,
        force: 80,
        strLinks: true,
        size: {
          w: this.width,
          h: this.height
        },
        nodeLabels: true,
        linkLabels: true,
        linkWidth: 0,
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

<style lang="scss">
.mindmap {
  width: 100%;
  height: 50vh;

  span {
    display: block;
    /* transform: rotate(-20deg) skewX(-20deg) scaleX(1.1);
    transform-origin: 0 0; */
  }

  canvas {
    position: absolute;
    top: 0;
    left: 0;
  }
  .net {
    height: 100%;
    margin: 0;
  }
  .node {
    stroke: rgba(0, 0, 0, 1);
    stroke-width: 1px;
    -webkit-transition: fill 0.5s ease;
    transition: fill 0.5s ease;
    fill: #dcfaf3;
  }
  .node.selected {
    stroke: #caa455;
  }
  .node.pinned {
    stroke: rgba(0, 0, 0, 1);
  }
  .link {
    stroke: rgba(0, 0, 0, 1);
  }
  .link,
  .node {
    stroke-linecap: round;
  }
  .link:hover,
  .node:hover {
    stroke: #be385d;
    stroke-width: 5px;
  }
  .item {
    display: none;
  }
  .link.selected {
    stroke: rgba(0, 0, 0, 1);
  }
  .curve {
    fill: none;
  }
  .link-label,
  .node-label {
    fill: rgba(0, 0, 0, 0);
    cursor: pointer;
    transform: translateX(-25px);

    &:hover {
      fill: rgba(0, 0, 0, 0.7);
    }
  }
  .link-label {
    -webkit-transform: translateY(-0.5em);
    transform: translateY(-0.5em);
    text-anchor: middle;
  }
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
        category
      }
    }
  }
}
</page-query>