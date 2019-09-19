<template>
  <main>
    <div class="container portfolio-container">
      <div class="items-container" v-if="items.length > 0">
        <div class="portfolio-item" v-for="item in items" :key="item.id" :data-id="item.da">
          <div class="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <img
            class="portfolio-img"
            @load="fade"
            @click="showModalSetData(item)"
            v-lazy="item.i[0].src"
          >
        </div>
      </div>
      <div class="buttons-container" v-if="items.length > 0">
        <button class="btn" @click="loadMoreItems" v-if="!page.pageEnd">
          <span v-if="page.pageLoading">Loading...</span>
          <span v-else>Show More</span>
        </button>
        <button class="btn" disabled v-else>All projects loaded!</button>
      </div>
      <modal @close="closeModal" :show="showModal" :item="currentItem" :mobile="mobile"></modal>
    </div>
  </main>
</template>

<script>

// <div v-else>
//         <div class="lds-ring">
//           <div></div>
//           <div></div>
//           <div></div>
//           <div></div>
//         </div>
//       </div>
import Modal from "./Modal";
import { db } from "../main";
import createHistory from "history/createBrowserHistory";
const history = createHistory();

export default {
  components: {
    Modal
  },
  data() {
    return {
      componentKey: 0,
      items: [],
      currentItem: {},
      showModal: false,
      modalBodyClass: "modal-open",
      // mobile: this.setMobileBoolean(),
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
    deleteItem(item) {
      // db.collection("projects").doc(item.id).delete();
      this.$firestoreRefs[this.currentRoute].doc(item.id).delete();
      this.items = this.items.filter(obj => obj.id !== item.id);
    },
    fade(e) {
      let target = e.target;
      let lazy = target.getAttribute("lazy");
      if (!target.parentNode.classList.contains("item-bg-fadein")) {
        target.parentNode.classList.add("item-bg-fadein")
      }
      if (lazy === "loaded") {
        target.classList.add("portfolio-img-fadein");
        target.previousSibling.style.display = "none";
      }
    },
    closeModal() {
      //   history.replace(`/#/${}`);
      history.replace("/#/personal");
      this.toggleBodyModalOpenClass(!this.addBodyClass);
      this.showModal = false;
      this.$nextTick(() => {
        this.currentItem = {};
      });
    },
    toggleBodyModalOpenClass(bodyClassBool) {
      const el = document.body;
      if (bodyClassBool) {
        el.classList.add(this.bodyClassName);
      } else {
        el.classList.remove(this.bodyClassName);
      }
    },
    showModalSetData(item) {
      const formatTitle = item.t.replace(/ /g, "-").toLowerCase();
      history.push(`/#/personal/${formatTitle}`);
      this.currentItem = item;
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
            const data = doc.data();

            const da = data.da;
            const filterFirestore = this[this.currentRoute].filter(obj => {
              return obj.da == da;
            })
            this.items.push(filterFirestore[0]);
          });
          const last = documentSnapshots.docs[documentSnapshots.size - 1];
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
  props: ["currentRoute", "mobile"],
  created() {
    this.mobile ? (this.page.itemsPerPage = 5) : (this.page.itemsPerPage = 10);
    this.ref.itemsRef = db.collection(this.currentRoute).orderBy("da", "desc");
    const ref = this.ref.itemsRef.limit(this.page.itemsPerPage);
    this.loadItems(ref);

    // window.addEventListener("resize", () => {
    //   this.mobile = this.setMobileBoolean();
    // });

    history.listen((location, action) => {
      if (action === "POP") {
        this.closeModal();
      }
    });
  },
  firestore: {
    projects: db.collection("projects"),
    personal: db.collection("personal")
  }
};
</script>
