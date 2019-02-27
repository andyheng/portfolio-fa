import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Routes from "./routes";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronCircleLeft, faChevronCircleRight, faBars, faTimes, faCircle, faEnvelope, faPhone, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueFire from 'vuefire'
// import * as firebase from 'firebase'
import VueLazyLoad from "vue-lazyload";
import firebase from 'firebase/app'
import "firebase/auth"
import 'firebase/firestore'
import "firebase/functions"
import "firebase/storage"

Vue.config.productionTip = false

//lazyload
Vue.use(VueLazyLoad);

//fontawesome
library.add(faTimes)
library.add(faChevronCircleLeft)
library.add(faChevronCircleRight)
library.add(faBars)
library.add(faCircle)
library.add(faTwitter)
library.add(faInstagram)
library.add(faEnvelope)
library.add(faPhone)
library.add(faLinkedin)
library.add(faChevronLeft)
Vue.component('font-awesome-icon', FontAwesomeIcon)

//firebase
Vue.use(VueFire)
firebase.initializeApp({
  apiKey: "AIzaSyDcw1mguQQNw3SY6n3b60_YNm5E4z_emSE",
  authDomain: "portfolio-fa.firebaseapp.com",
  databaseURL: "https://portfolio-fa.firebaseio.com",
  projectId: "portfolio-fa",
  storageBucket: "portfolio-fa.appspot.com",
  messagingSenderId: "829050108576"
})
export const db = firebase.firestore()
export const auth = firebase.auth();
export const functions = firebase.functions();
export const storageService = firebase.storage();
export const storageRef = storageService.ref();
const settings = {timestampsInSnapshots: true};
db.settings(settings);

//router
Vue.use(VueRouter);
const router = new VueRouter({
  routes: Routes
});
router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
})

new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app')
