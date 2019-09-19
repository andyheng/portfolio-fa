import { auth } from "./main";
const title = "Fahdad Atin";
const loadView = view => {
  return () => import(`@/components/${view}.vue`)
}
export default [
  {path: "/", redirect: "/work"},
  {path: "/work", component: loadView("ShowItems"), name: "Work", meta: {title}, props: {currentRoute: "projects"}},
  {path: "/work/*", redirect: "/work"},
  {path: "/contact", component: loadView("Contact"), name: "Contact", meta: {title}},
  {path: "/personal", component: loadView("ShowItems"), name: "Extra", meta: {title}, props: {currentRoute: "personal"}},
  {path: "/personal/*", redirect: "/personal"},
  {path: "/edit", component: loadView("EditItems"), name: "Edit", meta: {title}},
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