<template>
  <div id="app" ref="app">
    <v-header :mobile="mobile"></v-header>
    <transition
      name="fade"
      mode="out-in"
    >
      <keep-alive>
        <router-view :key="$route.fullPath" :mobile="mobile"></router-view>
      </keep-alive>
    </transition>
    <!-- <v-footer></v-footer> -->
  </div>
</template>



<script>

    // <transition
    //   name="fade"
    //   mode="out-in"
    //   @beforeLeave="beforeLeave"
    //   @enter="enter"
    //   @afterEnter="afterEnter"
    // >

import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  name: "app",
  components: {
    "v-header": Header,
    "v-footer": Footer
  },
  data() {
    return {
      mobile: this.setMobile(),
      prevHeight: 0
    };
  },
  methods: {
    setMobile() {
      const mobileMax = 600;
      return innerWidth <= mobileMax;
    },
    debounced(delay, fn) {
      let timerId;
      return function(...args) {
        if (timerId) {
          clearTimeout(timerId);
        }
        timerId = setTimeout(() => {
          fn(...args);
          timerId = null;
        }, delay);
      };
    },
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
  watch: {
    $route() {
      if (this.$route.name === "Contact") {
        this.$refs.app.classList.add("contact-background");
      } else {
        this.$refs.app.classList.remove("contact-background");
      }
    }
  },
  created() {
    const handleMobile = () => {
      this.mobile = this.setMobile();
    }
    const dHandle = this.debounced(200, handleMobile);
    window.addEventListener("resize", dHandle);
  }
};
</script>

<style lang="sass">
  @import "./styles/App.scss";
</style>