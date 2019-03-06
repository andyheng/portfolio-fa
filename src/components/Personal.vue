<template>
  <main>
    <div class="container portfolio-container">
      <div class="items-container">
        <div class="portfolio-item" v-for="personalItem in personalItems" :key="personalItem.id">
          <div class="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <img
            class="portfolio-img"
            @load="fade"
            @click="showModalSetData(personalItem)"
            v-lazy="personalItem.i[0].src"
          >
        </div>
      </div>
      <div class="buttons-container">
        <button class="btn" @click="loadMoreItems" v-if="!page.pageEnd">
          <span v-if="page.pageLoading">Loading...</span>
          <span v-else>Load more...</span>
        </button>
        <button class="btn" disabled v-else>All projects loaded!</button>
      </div>
      <modal @close="closeModal" :show="showModal" :item="currentItem" :mobile="mobile"></modal>
    </div>
  </main>
</template>

<script>
import Modal from "./Modal";
import { db } from "../main";
import createHistory from "history/createBrowserHistory";
const history = createHistory();

export default {
  name: "personalItems",
  components: {
    Modal
  },
  data() {
    return {
      personalItems: [],
      currentItem: {},
      showModal: false,
      addBodyClass: "modal-open",
      mobile: this.setMobileBoolean(),
      page: {
        itemsPerPage: 0,
        pageEnd: false,
        pageLoading: false
      },
      ref: {
        itemsRef: undefined,
        itemsRefNext: undefined
      }
    };
  },
  methods: {
    fade(e) {
      let target = e.target;
      let lazy = target.getAttribute("lazy");
      if (lazy === "loaded") {
        target.classList.add("portfolio-img-fadein");
        target.previousSibling.style.display = "none";
      }
    },
    closeModal() {
      history.replace("/");
      this.toggleBodyModalOpenClass(!this.addBodyClass);
      this.showModal = false;
      this.$nextTick(() => {
        this.currentItem = {}
      })
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
    },
    loadItems(ref) {
      return new Promise((resolve, reject) => {
        ref.get().then(documentSnapshots => {
          if (documentSnapshots.empty) {
            this.page.pageEnd = true;
            resolve(documentSnapshots);
          }
          documentSnapshots.forEach(doc => {
            let data = doc.data();
            this.personalItems.push(data);
          });
          let last = documentSnapshots.docs[documentSnapshots.size - 1];
          if (!last) {
            return;
          }
          this.ref.itemsRefNext = this.ref.itemsRef
            .startAfter(last)
            .limit(this.page.itemsPerPage);
          resolve(documentSnapshots);
        });
      });
    },
    loadMoreItems() {
      if (this.page.pageEnd) {
        return;
      }
      this.page.pageLoading = true;
      this.loadItems(this.ref.itemsRefNext).then(documentSnapshots => {
        this.page.pageLoading = false;
        if (documentSnapshots.empty) {
          this.page.pageEnd = true;
        }
      });
    }
  },
  created() {
    this.mobile ? (this.page.itemsPerPage = 5) : (this.page.itemsPerPage = 10);
    this.ref.itemsRef = db.collection("personal");
    const ref = this.ref.itemsRef.limit(this.page.itemsPerPage);
    this.loadItems(ref);

    window.addEventListener("resize", () => {
      this.mobile = this.setMobileBoolean();
    });

    history.listen((location, action) => {
      if (action === "POP") {
        this.closeModal();
      }
    });
  }
};
</script>