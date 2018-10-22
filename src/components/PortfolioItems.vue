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
      mobile: undefined
    };
  },
  methods: {
    closeModal() {
      history.pushState("", document.title, window.location.pathname);
      this.toggleBodyModalOpenClass("removeClass", "modal-open");
      this.showModal = false;
    },
    toggleBodyModalOpenClass(addRemove, className) {
      const el = document.body;
      if (addRemove === "addClass") {
        el.classList.add(className);
      } else {
        el.classList.remove(className);
      }
    },
    showModalSetData(portfolioItem) {
      const formatTitle = portfolioItem.title.replace(/ /g, "-").toLowerCase();
      window.location.hash = formatTitle;
      this.currentItem = portfolioItem;
      this.showModal = true;
      this.toggleBodyModalOpenClass("addClass", "modal-open");
    }
  },
  created() {
    this.portfolioItems = dummy;
    addEventListener("resize", () => {
      this.mobile = innerWidth <= 600;
    });
    window.addEventListener("hashchange", () => {
      if (!location.hash) {
        this.closeModal();
      }
    })
  }
};
</script>