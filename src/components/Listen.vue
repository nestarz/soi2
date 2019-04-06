<template>
  <div class="listen">
    <div class="track" v-for="listen in listens" :key="listen.listened_at">
      <div>{{ listen.track_metadata.artist_name }}</div>
      <div>{{ listen.track_metadata.release_name }}</div>
      <div>{{ listen.track_metadata.track_name }}</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import author from "~/data/author.yml";

export default {
  props: {
    count: {
      type: Number,
      default: 5,
    }
  },
  data() {
    return {
      listens: null
    };
  },
  mounted() {
    axios
      .get(`https://api.listenbrainz.org/1/user/nestarz/listens?count=${this.count}`)
      .then(response => (this.listens = response.data.payload.listens))
  }
};
</script>

<style lang="scss">
.listen {
  .track {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>
