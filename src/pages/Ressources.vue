<template>
  <Layout class="ressources">
    <my-ressources />
  </Layout>
</template>

<script>
import MyRessources from "~/components/Ressources.vue";

export default {
  metaInfo: {
    title: "Ressources"
  },
  components: {
    MyRessources,
  },
};
</script>

<style lang="scss">
.ressources {
}
</style>
