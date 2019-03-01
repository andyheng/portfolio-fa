<template>
  <header ref="vueHeaderRef">
    <div class="container header-container header-container-border" ref="vueHeaderContainerRef">
      <div class="header-title">
        <div class="header-logo">
          <router-link to="/">
            <img src="../assets/logo-rs.png">
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
            <span class="nav-link" @click="handleLogout">Log out</span>
          </li>
          <li class="nav-item">
            <router-link to="/personal" class="nav-link">Personal</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/contact" class="nav-link">Contact</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Instagram</a>
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
          user.getIdTokenResult()
            .then(idTokenResult => {
              // user.admin = idTokenResult.claims.admin
              if (idTokenResult.claims.admin) {
                this.loggedInAdmin = true;
              }
            })
        } else {
          this.loggedInAdmin = false;
        }
      })
    },
    showHeaderBorder() {
      if (this.$route.name === "Home" || this.$route.name === "Personal") {
        this.$refs.vueHeaderContainerRef.classList.remove("header-container-border-hidden");
      } else {
        this.$refs.vueHeaderContainerRef.classList.add("header-container-border-hidden");
      }
    }
  },
  watch: {
    $route() {
      this.showNav = false;
      this.checkAuth();
      this.showHeaderBorder();
    }
  },
  created() {
    this.checkAuth();
  },
  mounted() {
    document.addEventListener("scroll", () => {
      const scroll = window.scrollY;
      const header = this.$refs.vueHeaderRef;
      if (scroll > 0) {
        header.classList.add("header-scroll-active");
      } else {
        header.classList.remove("header-scroll-active");
      }
    });
    this.showHeaderBorder()
  }
};
</script>