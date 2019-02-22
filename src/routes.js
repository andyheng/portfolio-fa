import PortfolioItems from "./components/PortfolioItems";
import Contact from "./components/Contact";
import Personal from "./components/Personal";
import Admin from "./components/Admin";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import { auth } from "./main";

export default [
  {path: "/", component: PortfolioItems, props: true, name: "Home"},
  {path: "/contact", component: Contact, name: "Contact"},
  {path: "/personal", component: Personal, name: "Personal"},
  {path: "*", component: NotFound, name: "404"},
  {
    path: "/admin", 
    component: Admin, 
    meta: {requireAuth: true},
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
  {path: "/login", component: Login}
]