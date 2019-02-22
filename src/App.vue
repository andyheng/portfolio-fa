<template>
  <div id="app">
    <v-header></v-header>
    <transition name="fade">
      <div class="loading" v-show="portfolioItems.length === 0 && this.$route.name === 'Home'"></div>
    </transition>
    <transition name="fade" mode="out-in" @beforeLeave="beforeLeave" @enter="enter" @afterEnter="afterEnter">
        <router-view :itemsProp="portfolioItems" :personalProp="personalItems"></router-view>
    </transition>
    <v-footer></v-footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
import { db } from "./main";

export default {
  name: 'app',
  components: {
    "v-header": Header,
    "v-footer": Footer
  },
  data() {
    return {
      portfolioItems: [],
      personalItems: [],
      prevHeight: 0
    }
  },
  methods: {
    // before we transition to a new page...
    beforeLeave(e) {
      // getComputedStyle returns an object containing ALL CSS values / properties
      // here we get the height of the app before we move to another page
      this.prevHeight = getComputedStyle(e).height;
    },
    // when we enter a new page...
    enter(e) {
      const { height } = getComputedStyle(e);
      e.style.height = this.prevHeight;
      setTimeout(() => {
        e.style.height = height;
      });
    },
    afterEnter(e) {
      e.style.height = "auto";
    }
  },
  firestore() {
    return {
      portfolioItems: db.collection("projects"),
      personalItems: db.collection("personal")
    }
  }
}
</script>

<style lang="sass">
  @import "./styles/App.scss";
</style>