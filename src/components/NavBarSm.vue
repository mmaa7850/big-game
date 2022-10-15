<template>
  <nav class="navbar navbar-expand-lg navbar-light" :class="{'bg-dark' : isShow === true | isSlide === true}" id="navbar">
    <div class="container-fluid px-0">
      <router-link class="navbar-brand me-0 ps-2" to="/">
        <img v-if="isShow" src="~@/assets/img/logo-sm_white.svg" alt="logo-sm" style="height:40px"/>
        <img v-else-if="isSlide" src="~@/assets/img/logo-sm_white.svg" alt="logo-sm" style="height:40px"/>
        <img v-else src="~@/assets/img/logo-sm.svg" alt="logo-sm" style="height:40px"/>
      </router-link>
      <div class="navbar--sm pe-2">
        <div class="top-account-sm d-flex justify-content-end pe-2">
          <ul class="top-account-list d-flex">
            <li>
              <router-link to="/admin/login" class="px-2" id="user" >
                <img v-if="isShow" src="~@/assets/img/user_white.svg" alt="user"/>
                <img v-else-if="isSlide" src="~@/assets/img/user_white.svg" alt="user"/>
                <img v-else src="~@/assets/img/user.svg" alt="user"/>
                <span :class="{'text-white' : isShow === true | isSlide === true}">{{ $t('Index.login') }}</span>
              </router-link>
            </li>
            <li>
              <router-link to="/cart" class="px-2" id="cart">
                <img v-if="isShow" src="~@/assets/img/shopping-cart_white.svg" alt="shopping-cart"/>
                <img v-else-if="isSlide" src="~@/assets/img/shopping-cart_white.svg" alt="shopping-cart"/>
                <img v-else src="~@/assets/img/shopping-cart.svg" alt="shopping-cart"/>
                <span class="top-account-cart-num badge rounded-pill" v-if="cartLength > 0">
                  <em>{{ cartLength }}</em>
                </span>
              </router-link>
            </li>
          </ul>
        </div>
        <button
          class="navbar-toggler"
          :class="{'bg-white' : isShow === true | isSlide === true}"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          @click="ChangeStyle"
          ref="show"
        >
          <span class="navbar-toggler-icon"/>
        </button>
      </div>
      <div class="collapse navbar-collapse bg-white mt-2 pb-0" id="navbarSupportedContent">
        <ul class=" navbar-nav me-auto mb-lg-0 d-flex flex-column align-items-center">
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
            <router-link to="/shop" class="nav-link">{{ $t('NavBar.online-shop') }}</router-link>
          </li>
          <li class="nav-item row">
            <div class="col-6 px-0">
              <a href="#" class="nav-link" id="jp" @click.prevent="handleChangeLanguage('jp')">日本語</a>
            </div>
            <div class="col-6 px-0" style="border-left:1px solid black">
              <a href="#" class="nav-link" id="tw" @click.prevent="handleChangeLanguage('tw')">繁体中文</a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { useI18n } from 'vue-i18n'

export default {
  data () {
    return {
      isShow: false,
      top: 0,
      isSlide: false,
      locale: useI18n()
    }
  },
  props: {
    cartLength: Number,
    msg: String
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
    const navItem = document.querySelector('.nav-item')
    const collapse = document.querySelector('.collapse')
    navItem.addEventListener('click', () => {
      collapse.classList.remove('show')
    })
  },
  methods: {
    ChangeStyle () {
      if (this.$refs.show.classList.contains('collapsed')) {
        this.isShow = false
      } else {
        this.isShow = true
      }
    },
    handleScroll () {
      this.top = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (this.top === 0) {
        this.isSlide = false
      } else {
        this.isSlide = true
      }
    },
    handleChangeLanguage (lang) {
      this.locale.locale = lang
    }
  },
  unmounted () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>
