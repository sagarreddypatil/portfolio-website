<template>
  <div id="app">
    <section class="hero is-success is-fullheight welcome">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Hi There!
          </h1>
          <h2 class="subtitle">
            My name is Sagar Patil
          </h2>
        </div>
      </div>
      <div class="hero-foot">
        <chevron-down-icon size="2x"></chevron-down-icon>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { ChevronDownIcon } from "vue-feather-icons";
export default Vue.extend({
  components: {
    ChevronDownIcon
  }
});
</script>

<style lang="scss">
#app {
  font-family: Ubuntu, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.welcome {
  background-image: linear-gradient(135deg, #8bc6ec 0%, #9599e2 100%);
}
</style>
