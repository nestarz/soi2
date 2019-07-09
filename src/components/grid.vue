<template functional>
  <div>
    <div class="grid">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
  margin-bottom: 40px;

  @media all and (min-width: 600px) {
    grid-template-columns: 1fr 1fr;
  }

  @media only screen and (min-width: 1000px) {
    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  }

  & > /deep/ * {
    min-height: 10vw;
  }
}
</style>

<script>
export default {
  functional: true
};
</script>
