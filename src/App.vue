<template>
  <div id="app">
    <transition name="none">
      <router-view />
    </transition>
  </div>
</template>

<style lang="scss" scoped>
// .fade-enter-active,
// .fade-leave-active {
//   transition-property: opacity, background-color;
//   transition-duration: .2s;
// }

// .fade-enter-active {
//   transition-delay: .2s;
// }

// .fade-enter,
// .fade-leave-active {
//   opacity: 0;
// }
</style>
