<template>
  <main>
      <div class="container portfolio-container">
      <div class="portfolio-item" v-for="portfolioItem in portfolioItems" :key="portfolioItem.id">
        <img
          class="portfolio-img"
          @load="fade"
          @click="showModalSetData(portfolioItem)"
          v-lazy="portfolioItem.i[0].src"
        >
      </div>
    </div>
    <modal @close="closeModal" :show="showModal" :item="currentItem" :mobile="mobile"></modal>
  </main>
</template>

<script>
import Modal from "./Modal";
import createHistory from "history/createBrowserHistory";
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
  props: ["itemsProp"],
  methods: {
    fade(e) {
      let target = e.target;
      setTimeout(() => {
        target.classList.add("portfolio-img-fadein")
      }, 150);
    },
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
      const formatTitle = portfolioItem.t.replace(/ /g, "-").toLowerCase();
      history.push(`/${formatTitle}`);
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
    this.portfolioItems = this.itemsProp;

    addEventListener("resize", () => {
      this.mobile = this.setMobileBoolean();
    });

    history.listen((location, action) => {
      if (action == "POP") {
        this.closeModal();
      }
    });
  }
};
</script>
