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
import createHistory from 'history/createBrowserHistory';
const history = createHistory();

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
      history.replace("/");
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
      history.push(`/${formatTitle}`)
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
    history.listen((location, action) => {
      if (action == "POP") {
        this.closeModal();
      }
    })
  }
};
</script>