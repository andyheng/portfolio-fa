<template>
  <main>
    <div class="container portfolio-container" v-if="loggedIn">
      <div class="buttons-switch">
        <button class="btn edit-btn" data-id="projects" @click="switchCollection">Work Projects</button>
        <button class="btn edit-btn" data-id="personal" @click="switchCollection">Extra Projects</button>
      </div>
      <div class="items-container">
        <div class="portfolio-item" v-for="item in items" :key="item.id">
          <img :src="item.i[0].src" />
          <button @click="startEdit(item)" class="btn edit-btn">Edit Item</button>
          <button @click="deleteItem(item.id)" class="btn edit-btn">Delete Item</button>
        </div>
      </div>
    </div>
    <div v-else class="container portfolio-container">You must be logged in to see this page.</div>
    <modal-shell @close="closeModal" :show="showModal">
      <form class="form-edit" @submit.prevent="submitEdit">
        <h1>Editing {{currentItem.t}}</h1>

        <div class="edit-input">
          <label for="edit-title">Title</label>
          <input type="text" id="edit-title" class="edit" v-model="currentItemEditing.t" />
        </div>

        <div class="edit-input">
          <label for="edit-desc">Description</label>
          <textarea id="edit-desc" v-model="currentItemEditing.d" rows="10"></textarea>
        </div>
        <button class="btn edit-btn">Submit Changes</button>
      </form>
    </modal-shell>
  </main>
</template>

<script>
import { db, auth } from "../main";
import ModalShell from "./ModalShell";

export default {
  components: {
    "modal-shell": ModalShell
  },
  data() {
    return {
      items: [],
      collection: "projects",
      currentItem: {},
      currentItemEditing: {
        t: "",
        d: "",
        i: []
      },
      showModal: false,
      loggedIn: ""
    };
  },
  methods: {
    authenticate() {
      auth.onAuthStateChanged(user => {
        user.getIdTokenResult().then(idTokenResult => {
          if (!idTokenResult.claims.admin) {
            alert("Not verified account");
            return;
          }
        });
      });
    },
    switchCollection(e) {
      const id = e.target.dataset.id;
      if (id !== this.collection) {
        this.collection = id;
        // this.items = [];
        this.items = this[`${id}`];
      }
    },
    deleteItem(id) {
      this.authenticate();
      db.collection(this.collection)
        .doc(id)
        .delete();
    },
    startEdit(item) {
      this.authenticate();
      this.showModal = true;
      this.currentItem = item;
      this.currentItemEditing = { ...this.currentItemEditing, ...item };
    },
    closeModal() {
      this.showModal = false;
    },
    submitEdit(item) {
      const updatedItem = { ...item, ...this.currentItemEditing };
      const itemWithId = this[`${this.collection}`].filter(
        obj => obj.da == updatedItem.da
      )[0];
      this.authenticate();
      db.collection(this.collection)
        .doc(itemWithId.id)
        .set(updatedItem)
        .then(() => {});
    }
  },
  created() {
    this.items = this.projects;
    auth.onAuthStateChanged(user => {
      if (!user) {
        this.loggedIn = false;
        return;
      }
      user.getIdTokenResult().then(idTokenResult => {
        if (idTokenResult.claims.admin) {
          this.loggedIn = true;
        } else {
          this.loggedIn = false;
        }
      });
    });
  },
  firestore: {
    projects: db.collection("projects"),
    personal: db.collection("personal")
  }
};
</script>

<style scoped>
.portfolio-item > img {
  width: 100%;
  border-radius: 3px;
  display: block;
}
</style>