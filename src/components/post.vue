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
}
.container-image {

  /* &:hover {

    & /deep/ img {
      position: absolute;
      left: 0;
      pointer-events: none;
      width: 50vw;
    }
  } */

  /deep/ img {
    position: relative;
    object-fit: cover;
    width: 100%;
    max-height: 100%;
    bottom: 0;
    height: 100%;
    height: 12vmax;

    @media only screen and (orientation: landscape) {
      object-fit: contain;
      min-height: 10vmax;
    }
  }
}
</style>
