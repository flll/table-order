import { createRouter, createWebHistory } from '@ionic/vue-router'
import type { RouteRecordRaw } from 'vue-router'
import TabsPage from '../views/TabsPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/menu'
  },
  {
    path: '/admin',
    component: () => import('../views/AdminPage.vue')
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/menu'
      },
      {
        path: 'menu',
        component: () => import('../views/MenuPage.vue')
      },
      {
        path: 'cart',
        component: () => import('../views/CartPage.vue')
      },
      {
        path: 'orders',
        component: () => import('../views/OrdersPage.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router 