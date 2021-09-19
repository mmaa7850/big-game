<template>
  <nav class="navbar navbar-expand-lg navbar-light" id="ShopNavBar">
    <div class="container-fluid">
      <router-link class="navbar-brand me-0" to="/BigGame/index">
        <img src="~@/assets/images/logo.svg" alt="" style="height: 40px" />
      </router-link>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="d-flex justify-content-center">
          <li class="nav-item">
            <router-link to="/BigGame/index#news">
              <div class="nav-link">{{ $t('NavBar.info') }}</div>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/BigGame/index#info">
              <div class="nav-link">{{ $t('NavBar.company-info') }}</div>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/BigGame/index#branch">
              <div class="nav-link">{{ $t('NavBar.branch') }}</div>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/BigGame/shop">
              <div class="nav-link"><span>{{ $t('NavBar.online') }}</span>{{ $t('NavBar.shop') }}</div>
            </router-link>
          </li>
          <li class="nav-item nav-lang">
            <a
              href="#"
              class="nav-link ms-2"
              id="jp"
              @click.prevent="handleChangeLanguage"
              >日本語</a
            >
          </li>
          <li class="nav-item nav-lang">
            <a
              href="#"
              class="nav-link ms-2"
              id="tw"
              @click.prevent="handleChangeLanguage"
              >繁体中文</a
            >
          </li>
        </ul>
      </div>
    </div>
    <div class="top-account-list account-pc">
      <ul class="d-flex">
        <li>
          <router-link to="/login" class="px-2">
            <img src="~@/assets/images/user.svg" alt="" />
            <span>{{ $t('NavBar.login') }}</span>
          </router-link>
        </li>
        <li class="account-hide-withoutCart isCart" v-if="cartLength === 0">
          <a href="#" class="px-2 isCart" @click.prevent="EmptyCart">
            <img class="isCart" src="~@/assets/images/shopping-cart.svg" alt="" />
            <span class="top-account-cart-num badge rounded-pill isCart" v-if="cartLength > 0">
              <em class="isCart">{{cartLength}}</em>
            </span>
            <span class="isCart">{{ $t('NavBar.cart') }}</span>
          </a>
        </li>
        <li class="account-hide-withCart isCart" v-else>
          <a href="#" class="px-2 isCart" @click.prevent="EmptyCart">
            <img class="isCart" src="~@/assets/images/shopping-cart.svg" alt="" />
            <span class="top-account-cart-num badge rounded-pill isCart" v-if="cartLength > 0">
              <em class="isCart">{{cartLength}}</em>
            </span>
            <span class="isCart">{{ $t('NavBar.cart') }}</span>
          </a>
        </li>
      </ul>
    </div>
    <CartModal :hide="hide" :cart="cart" :cartLength="cartLength"></CartModal>
  </nav>
</template>

<script>
import CartModal from '@/components/CartModal.vue'
import { useI18n } from 'vue-i18n'
export default {
  components: {
    CartModal
  },
  props: {
    cartLength: Number,
    cart: Object,
    msg: String
  },
  setup (props, context) {
    const { locale } = useI18n()
    const handleChangeLanguage = (e) => {
      locale.value = e.target.getAttribute('id')
    }
    return {
      handleChangeLanguage
    }
  },
  data () {
    return {
      hide: true
    }
  },
  methods: {
    EmptyCart () {
      if (this.cartLength === 0) {
        this.$router.push('/BigGame/cart')
      }
    }
  },
  mounted () {
    const vm = this
    // 監聽點擊區域
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
  }
}
</script>
