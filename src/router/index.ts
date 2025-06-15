import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Home from '@/views/Home.vue'
import Selected from '@/views/Selected.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/selected',
    name: 'Selected',
    component: Selected,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
