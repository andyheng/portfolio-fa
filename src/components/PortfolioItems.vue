<template>
  <main>
    <div class="container portfolio-container">
      <div class="portfolio-item" v-for="portfolioItem in portfolioItems" :key="portfolioItem.id">
        <img class="portfolio-img" :src="portfolioItem.images.cover" @click="showModalSetData(portfolioItem)" />
      </div>
      </div>
      <modal @close="closeModal" :show="showModal" :item="currentItem" :mobile="mobile">
      </modal>
  </main>
</template>

<script>
import dummy from "../assets/dummy";
import Modal from "./Modal";
export default {
  components: {
    Modal
  },
  data() {
    return {
      portfolioItems: [],
      currentItem: {},
      showModal: false,
      addBodyClass: true,
      bodyClassName: "modal-open",
      mobile: this.setMobileBoolean()
    };
  },
  methods: {
    closeModal() {
      history.pushState("", document.title, window.location.pathname);
      this.toggleBodyModalOpenClass(!this.addBodyClass);
      this.showModal = false;
    },
    toggleBodyModalOpenClass(bodyClassBool) {
      const el = document.body;
      if (bodyClassBool) {
        el.classList.add(this.bodyClassName);
      } else {
        el.classList.remove(this.bodyClassName);
      }
    },
    showModalSetData(portfolioItem) {
      const formatTitle = portfolioItem.title.replace(/ /g, "-").toLowerCase();
      window.location.hash = formatTitle;
      if (window.location.hash.substring(-1) == "/") {
        window.location.hash = window.location.hash.slice(0, -1);
      }
      this.currentItem = portfolioItem;
      this.showModal = true;
      this.toggleBodyModalOpenClass(this.addBodyClass);
    },
    setMobileBoolean() {
      const mobileMaxWidth = 600;
      return innerWidth <= mobileMaxWidth;
    }
  },
  created() {
    this.portfolioItems = dummy;
    addEventListener("resize", () => {
      this.mobile = this.setMobileBoolean();
    });
    window.addEventListener("hashchange", () => {
      if (!location.hash) {
        this.closeModal();
      }
    })
  }
};
</script>