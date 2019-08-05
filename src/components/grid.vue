<template functional>
  <div>
    <div class="grid">
      <slot/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.grid {
  display: block;
  margin-bottom: 1rem;

  @media all and (min-width: 600px) {
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: 1fr 1fr;
  }

  @media only screen and (min-width: 1000px) {
    grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
  }

  & > /deep/ * {
    min-height: 10vw;
    display: grid;
    grid-gap: 1rem;
    grid-auto-rows: min-content;
  }
}
</style>

<script>
export default {
  functional: true
};
</script>
