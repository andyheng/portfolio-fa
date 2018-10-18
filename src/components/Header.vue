<template>
  <header ref="vueHeaderRef">
    <div class="container header-container">
      <div class="header-title">
        <div class="header-logo">
          <a href="#">
            <img src="../assets/logo-rs.png">
          </a>
        </div>
        <div class="header-burger" :class="{'header-burger-open':showNav}" @click="toggleNav">
          <font-awesome-icon icon="bars" />
        </div>
      </div>
      <nav class="nav" v-show="showNav">
        <ul class="nav-list">
          <li class="nav-item">
            <a class="nav-link" href="#">Contact</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Instagram</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Extra</a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      showNav: false
    };
  },
  methods: {
    toggleNav() {
      this.showNav = !this.showNav;
    }
  },
  created() {
    document.addEventListener("scroll", () => {
      const scroll = window.scrollY;
      const header = this.$refs.vueHeaderRef;
      if (scroll > 0) {
        header.classList.add("header-scroll-active");
      } else {
        header.classList.remove("header-scroll-active");
      }
    });
  }
};
</script>