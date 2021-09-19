import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Front/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:
    [
      {
        path: 'index',
        component: () => import('../views/Front/Index.vue')
      },
      {
        path: 'shop',
        component: () => import('../views/Front/Shop.vue')
      },
      {
        path: 'products/:productId',
        component: () => import('../views/Front/Product.vue')
      },
      {
        path: 'cart',
        component: () => import('../views/Front/Cart.vue')
      },
      {
        path: 'detail',
        component: () => import('../views/Front/Detail.vue')
      },
      {
        path: 'order/:id',
        component: () => import('../views/Front/Order.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/admin',
    component: () => import('../views/Admin/Dashboard.vue'),
    children:
    [
      {
        path: 'products',
        component: () => import('../views/Admin/Products.vue')
      },
      {
        path: 'order',
        component: () => import('../views/Admin/Order.vue')
      },
      {
        path: 'coupon',
        component: () => import('../views/Admin/Coupons.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return {
        el: to.hash,
        top: 10,
        behavior: 'smooth'
      }
    } else {
      return {
        top: 0
      }
    }
  }
})

export default router
