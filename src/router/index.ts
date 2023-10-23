import {
  createRouter as createVueRouter,
  createWebHistory,
  Router,
  RouteRecordRaw
} from "vue-router";


export function createRouter(): Router {

  const location = window.location.href
  if (location.includes('cases')) {
    const locationSplit = location.split('/')
    const id = locationSplit[locationSplit.length - 1]
    localStorage.setItem('lastLocation', `/cases/${id}`)
  }

  const routes: RouteRecordRaw[] = [
    {
      path: "/:pathMatch(.*)*",
      name: "404",
      component: () => import("../views/Error404.vue")
    },
    {
      path: "/",
      name: "HomeRoot",
      component: () => import("../layouts/Dashboard.vue")
    }
  ]

  const router = createVueRouter({ routes, history: createWebHistory() })

  return router

}
