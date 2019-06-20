<script>
import PostContent from "~/components/content.vue";
let a = 1;
export default {
  functional: true,
  components: {
    PostContent
  },
  props: {
    full: Boolean,
    category: String,
    name: String,
    alias: String,
    url: String,
    description: String,
    authors: Array,
    location: [Object, String],
    tags: Array,
    screenshot: String,
    slug: String,
    index: Number,
    logo: String
  },
  render(h, { props }) {
    if (props.screenshot) {
      a = a + 1;
      const res = [
        <div class="container">
          <div class="container-image">
            <g-image
              class="image"
              quality="20"
              blur="1"
              width="20"
              src={props.screenshot}
            />
          </div>
          <PostContent {...{ props: props }} />
        </div>
      ];
      return res.reverse();
    }
    return [<PostContent {...{ props: props }} />];
  }
};
</script>

<style lang="scss" scoped>
.container {
  grid-row-start: span 2;
  display: grid;
  grid-gap: 0.2em;
  grid-template-rows: 1fr 1fr;
}
.container-image {
  height: 100%;
  position: relative;

  /deep/ img {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    height: 100%;
  }
}
</style>
