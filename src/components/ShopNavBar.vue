<template>
  <nav class="navbar navbar-expand-lg navbar-light" id="ShopNavBar">
    <div class="container-fluid">
      <router-link class="navbar-brand me-0" to="/">
        <img src="~@/assets/img/logo.svg" alt="logo" style="height: 40px" />
      </router-link>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="d-flex justify-content-center">
          <li class="nav-item title-font">
            <router-link to="/favorite">
              <div class="nav-link">{{ $t('NavBar.favorite') }}</div>
            </router-link>
          </li>
          <li class="nav-item title-font">
            <router-link to="/searchOrder">
              <div class="nav-link">{{ $t('NavBar.search-order') }}</div>
            </router-link>
          </li>
          <li class="nav-item title-font">
            <router-link to="/shop">
              <div class="nav-link"><span>{{ $t('NavBar.online') }}</span>{{ $t('NavBar.shop') }}</div>
            </router-link>
          </li>
          <li class="nav-item nav-lang">
            <a href="#" class="nav-link ms-2" id="jp" @click.prevent="handleChangeLanguage('jp')">日本語</a>
          </li>
          <li class="nav-item nav-lang">
            <a href="#" class="nav-link ms-2" id="tw" @click.prevent="handleChangeLanguage('tw')">繁体中文</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="top-account-list account-pc">
      <ul class="d-flex">
        <li>
          <router-link to="/admin/login" class="px-2">
            <img src="~@/assets/img/user.svg" alt="user" />
            <span>{{ $t('NavBar.login') }}</span>
          </router-link>
        </li>
        <li class="account-hide-withoutCart isCart" v-if="cartLength === 0">
          <a href="#" class="px-2 isCart" @click.prevent="EmptyCart">
            <img class="isCart" src="~@/assets/img/shopping-cart.svg" alt="shopping-cart" />
            <span class="top-account-cart-num badge rounded-pill isCart" v-if="cartLength > 0">
              <em class="isCart">{{ cartLength }}</em>
            </span>
            <span class="isCart">{{ $t('NavBar.cart') }}</span>
          </a>
        </li>
        <li class="account-hide-withCart isCart" v-else>
          <a href="#" class="px-2 isCart" @click.prevent="EmptyCart">
            <img class="isCart" src="~@/assets/img/shopping-cart.svg" alt="shopping-cart" />
            <span class="top-account-cart-num badge rounded-pill isCart" v-if="cartLength > 0">
              <em class="isCart">{{ cartLength }}</em>
            </span>
            <span class="isCart">{{ $t('NavBar.cart') }}</span>
          </a>
        </li>
      </ul>
    </div>
    <CartModal :hide="hide"/>
  </nav>
</template>

<script>
import CartModal from '@/components/CartModal.vue'
import emitter from '@/methods/emitter'
import { useI18n } from 'vue-i18n'

export default {
  components: {
    CartModal
  },
  data () {
    return {
      hide: true,
      locale: useI18n(),
      cart: {},
      cartLength: 0
    }
  },
  methods: {
    EmptyCart () {
      if (this.cartLength === 0) {
        this.$router.push('/cart')
      }
    },
    handleChangeLanguage (lang) {
      this.locale.locale = lang
    }
  },
  mounted () {
    const vm = this
    window.addEventListener('click', (e) => {
      if (e.target.className.includes('isCart')) {
        e.preventDefault()
        if (vm.hide === true) {
          vm.hide = false
        } else {
          vm.hide = true
        }
      } else {
        vm.hide = true
      }
    })
  },
  created () {
    emitter.on('updateCart', (cart) => {
      this.cart = cart
    })
    emitter.on('updateCartLength', (cartLength) => {
      this.cartLength = cartLength
    })
  },
  unmounted () {
    window.removeEventListener('click', () => {})
  }
}
</script>
