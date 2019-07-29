<template>
  <layout>
    <template slot="sidebar">
      <div>
        <span>Currently focusing on Interaction and Object Design exploring the interaction of objects, people, art, technology and science using form and code with a mix of analog and digital materials.</span>
      </div>
      <nav class="nav">
        <ol>
          <li v-for="link in links" :key="link.title">
            <g-link :to="link.url">{{ link.title }}</g-link>
          </li>
        </ol>
      </nav>
    </template>
    <div class="camera">
      <webcam @cameras="setCameras" :deviceId="camera" class="video" />
    </div>
  </layout>
</template>

<script>
import Layout from "~/layouts/default.vue";
import Grid from "~/components/grid.vue";
import Webcam from "~/components/webcam.vue";

export default {
  components: {
    Layout,
    Grid,
    Webcam
  },
  data() {
    return {
      cameras: null,
      links: [
        {
          title: "resources",
          url: "/ressources"
        },
        {
          title: "tweets",
          url: "/tweets"
        },
        {
          title: "projects",
          url: "/"
        },
        {
          title: "resume",
          url: "/about"
        }
      ]
    };
  },
  methods: {
    setCameras(cameras) {
      this.cameras = cameras;
    }
  },
  computed: {
    camera() {
      return this.cameras && this.cameras[0].deviceId;
    }
  }
};
</script>

<style lang="scss">
.nav {
  margin-top: 1rem;
  ol {
    li {
      background: white;
      overflow: hidden;
    }
  }
}

.camera {
  width: 325px;
  height: 610px;
  overflow: hidden;
  position: relative;
  border-radius: 39px;
  transform: rotate(-350deg) translateX(70%) skewX(-11deg) skewY(-41deg) scaleY(0.8);

  .video {
    min-width: 100%;
    min-height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%) scale(-2.5, 2.5);
  }
}
</style>