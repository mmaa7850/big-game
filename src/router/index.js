import { createRouter, createWebHashHistory } from 'vue-router'
import IndexView from '../views/Front/Index.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Front/Home.vue'),
    children:
      [
        {
          path: '',
          name: '',
          component: IndexView
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
          path: 'favorite',
          component: () => import('../views/Front/Favorite.vue')
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
        },
        {
          path: 'searchOrder',
          component: () => import('../views/Front/SearchOrder.vue')
        }
      ]
  },
  {
    path: '/admin',
    component: () => import('../views/Admin/DashBoard.vue'),
    children:
      [
        {
          path: 'login',
          component: () => import('../views/Admin/Login.vue')
        },
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
  },
  {
    path: '/:pathMatch(.*)*', component: IndexView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes
})

router.beforeEach((to, from, next) => {
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  next()
})

export default router
