import { createRouter, createWebHistory } from 'vue-router'
import List from '../views/series/List.vue'

const routes = [
  {
    path: '/',
    name: 'Series',
    component: List
  },
  {
    path: '/series/nova',
    name: 'Nova Série',
    component: () => import('../views/series/Save.vue')
  },
  {
    path: '/series/editar/:id',
    name: 'Editar Série',
    component: () => import('../views/series/Save.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
