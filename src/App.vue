<template>
  <div id="app">
    <section class="hero is-success is-fullheight welcome">
      <div class="hero-body">
        <div class="container">
          <div class="title">
            Hi There!
          </div>
          <div class="subtitle">
            My name is Sagar Patil
          </div>
        </div>
      </div>
      <div id="down-arrow">
        <a href="#" id="chevron-down-button"
          ><chevron-down-icon size="2x" class="mb-4"></chevron-down-icon
        ></a>
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

#chevron-down-button {
  color: #ffffff;
}

#chevron-down-button :hover {
  color: #ffffff;
}

#down-arrow {
  position: relative;
  top: 0;
  transition: top ease 0.5s;
}
#down-arrow:hover {
  top: -10px;
}
</style>
