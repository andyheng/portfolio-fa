<template>
  <header ref="vueHeaderRef">
    <div class="container header-container header-container-border" ref="vueHeaderContainerRef">
      <div class="header-title">
        <div class="header-logo-container">
          <router-link to="/" class="header-item">
            <!-- <img src="../assets/ui-logo.png" alt="Fahdad Atin" class="header-logo"> -->
            Fahdad Atin
          </router-link>
        </div>
        <div class="header-burger" :class="{'header-burger-open':showNav}" @click="toggleNav">
          <font-awesome-icon icon="bars"/>
        </div>
      </div>
      <nav class="nav" v-show="showNav">
        <ul class="nav-list">
          <li class="nav-item" v-if="loggedInAdmin">
            <router-link to="/admin" class="nav-link">Admin</router-link>
          </li>
          <li class="nav-item" v-if="loggedInAdmin">
            <router-link to="/edit" class="nav-link">Edit</router-link>
          </li>
          <li class="nav-item" v-if="loggedInAdmin">
            <span class="nav-link" @click="handleLogout">Logout</span>
          </li>
          
          <li class="nav-item">
            <!-- <router-link to="/work" class="nav-link">
              <img src="../assets/ui-work.png" alt="Work">
            </router-link> -->
            <router-link to="/work" class="nav-link">Work</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/personal" class="nav-link">
              Extra
              <!-- <img src="../assets/ui-extra.png" alt="Extra"> -->
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/contact" class="nav-link">
              Contact
              <!-- <img src="../assets/ui-contact.png" alt="Contact"> -->
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
import { auth } from "../main";
export default {
  data() {
    return {
      showNav: false,
      loggedInAdmin: false
    };
  },
  props: ["mobile"],
  methods: {
    toggleNav() {
      this.showNav = !this.showNav;
    },
    handleLogout() {
      auth.signOut();
      auth.onAuthStateChanged(() => {
        this.loggedInAdmin = false;
      });
      this.$router.push("/");
    },
    checkAuth() {
      auth.onAuthStateChanged(user => {
        if (user) {
          user.getIdTokenResult().then(idTokenResult => {
            // user.admin = idTokenResult.claims.admin
            if (idTokenResult.claims.admin) {
              this.loggedInAdmin = true;
            }
          });
        } else {
          this.loggedInAdmin = false;
        }
      });
    },
    showHeaderBorder() {
      if (this.$route.name === "Work" || this.$route.name === "Personal") {
        this.$refs.vueHeaderContainerRef.classList.remove(
          "header-container-border-hidden"
        );
      } else {
        this.$refs.vueHeaderContainerRef.classList.add(
          "header-container-border-hidden"
        );
      }
    },
    hideHeaderBorder() {
      if (this.$route.name === "Contact") {
        this.$refs.vueHeaderRef.classList.remove("header-scroll-active")
      }
    },
    setTransparent() {
      if (this.$route.name === "Contact") {
        this.$refs.vueHeaderRef.classList.remove("header-solid");
        this.$refs.vueHeaderRef.classList.add("header-transparent");
      } else {
        this.$refs.vueHeaderRef.classList.remove("header-transparent");
        this.$refs.vueHeaderRef.classList.add("header-solid");
      }
    },
    throttled(delay, fn) {
      let lastCall = 0;
      return function(...args) {
        const now = new Date().getTime();
        if (now - lastCall < delay) {
          return;
        }
        lastCall = now;
        return fn(...args);
      };
    }
  },
  watch: {
    $route() {
      this.showNav = false;
      this.checkAuth();
      this.hideHeaderBorder();
      // this.showHeaderBorder();
      // this.setTransparent();
    }
  },
  created() {
    this.checkAuth();
  },
  mounted() {
    const handleScroll = () => {
      if (this.mobile) {
        return;
      }
      const scroll = window.scrollY;
      const header = this.$refs.vueHeaderRef;
      if (this.$route.name === "Work" || this.$route.name === "Extra") {
        if (scroll < 30) {
          header.classList.remove("header-scroll-active");
        } else {
          header.classList.add("header-scroll-active");
        }
      }
    };
    const tHandle = this.throttled(1, handleScroll);
    document.addEventListener("scroll", tHandle);
    // this.showHeaderBorder();
    this.setTransparent();
  }
};
</script>