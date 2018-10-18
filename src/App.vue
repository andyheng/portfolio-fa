<template>
  <div id="app">
    <v-header></v-header>
    <portfolio-items></portfolio-items>
    <v-footer></v-footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import PortfolioItems from "./components/PortfolioItems";
import Footer from "./components/Footer";

export default {
  name: 'app',
  components: {
    "v-header": Header,
    "portfolio-items": PortfolioItems,
    "v-footer": Footer
  },
}
</script>

<style lang="sass">
  @import "./styles/App.scss";
</style>
