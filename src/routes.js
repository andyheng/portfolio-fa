import PortfolioItems from "./components/PortfolioItems";
import Contact from "./components/Contact";
import Personal from "./components/Personal";
import Admin from "./components/Admin";
import Login from "./components/Login";
import NotFound from "./components/NotFound";

import { auth } from "./main";
const title = "Fahdad Atin";
export default [
  {path: "/", component: PortfolioItems, props: true, name: "Home", meta: {title}},
  {path: "/contact", component: Contact, name: "Contact", meta: {title}},
  {path: "/personal", component: Personal, name: "Personal", meta: {title}},
  {path: "*", component: NotFound, name: "404", meta: {title}},
  {
    path: "/admin", 
    component: Admin, 
    meta: {requireAuth: true, title},
    beforeEnter: (to, from, next) => {
      const requireAuth = to.matched.some(record => record.meta.requireAuth);
      auth.onAuthStateChanged(user => {
        if (requireAuth && !user) {
          next("/login");
        } else {
          next();
        }
      })
    }
  },
  {path: "/login", component: Login, meta: {title}}
]