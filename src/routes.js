import { auth } from "./main";
const title = "Fahdad Atin";
const loadView = view => {
  return () => import(`@/components/${view}.vue`)
}
export default [
  {path: "/", redirect: "/home"},
  {path: "/home", component: loadView("PortfolioItems"), props: true, name: "Home", meta: {title}},
  {path: "/home/*", redirect: "/home"},
  {path: "/contact", component: loadView("Contact"), name: "Contact", meta: {title}},
  {path: "/personal", component: loadView("Personal"), name: "Personal", meta: {title}},
  {path: "/personal/*", redirect: "/personal"},
  {path: "*", component: loadView("NotFound"), name: "404", meta: {title}},
  {
    path: "/admin", 
    component: loadView("Admin"), 
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
  {path: "/login", component: loadView("Login"), meta: {title}}
]