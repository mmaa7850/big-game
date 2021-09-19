<template>
  <nav class="navbar navbar-expand-lg navbar-light" :class="{'bg-dark' : isShow === true | isSlide === true}" id="navbar">
    <div class="container-fluid px-0">
      <router-link class="navbar-brand me-0 ps-2" to="/index">
        <img v-if="isShow" src="~@/assets/images/logo-sm_white.svg" alt="" style="height:40px">
        <img v-else-if="isSlide" src="~@/assets/images/logo-sm_white.svg" alt="" style="height:40px">
        <img v-else src="~@/assets/images/logo-sm.svg" alt="" style="height:40px">
      </router-link>
      <div class="navbar--sm pe-2">
        <div class="top-account-sm d-flex justify-content-end pe-2">
          <ul class="top-account-list d-flex">
            <li>
              <router-link to="/login" class="px-2" id="user" >
                <img v-if="isShow" src="~@/assets/images/user_white.svg" alt="">
                <img v-else-if="isSlide" src="~@/assets/images/user_white.svg" alt="">
                <img v-else src="~@/assets/images/user.svg" alt="">
                <span :class="{'text-white' : isShow === true | isSlide === true}">{{ $t('Index.login') }}</span>
              </router-link>
            </li>
            <li>
              <router-link to="/cart" class="px-2" id="cart">
                <img v-if="isShow" src="~@/assets/images/shopping-cart_white.svg" alt="">
                <img v-else-if="isSlide" src="~@/assets/images/shopping-cart_white.svg" alt="">
                <img v-else src="~@/assets/images/shopping-cart.svg" alt="">
                <span class="top-account-cart-num badge rounded-pill" v-if="cartLength > 0">
                  <em>{{cartLength}}</em>
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
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
      <div class="collapse navbar-collapse bg-white mt-2 pb-0" id="navbarSupportedContent">
        <ul
          class="
            navbar-nav
            me-auto
            mb-lg-0
            d-flex
            flex-column
            align-items-center
          "
        >
          <li class="nav-item">
            <router-link to="/index#news">
              <div class="nav-link">{{ $t('NavBar.info') }}</div>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/index#info">
              <div class="nav-link">{{ $t('NavBar.company-info') }}</div>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/index#branch">
              <div class="nav-link">{{ $t('NavBar.branch') }}</div>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/shop" class="nav-link">{{ $t('NavBar.online-shop') }}</router-link>
          </li>
          <li class="nav-item row">
            <div class="col-6 px-0">
              <a href="#" class="nav-link" id="jp" @click.prevent="handleChangeLanguage">日本語</a>
            </div>
            <div class="col-6 px-0" style="border-left:1px solid black">
              <a href="#" class="nav-link" id="tw" @click.prevent="handleChangeLanguage">繁体中文</a>
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
      isSlide: false
    }
  },
  // props: ['cartLength'],
  props: {
    cartLength: Number,
    msg: String
  },
  setup (props, context) {
    const { locale } = useI18n()
    const handleChangeLanguage = (e) => {
      locale.value = e.target.getAttribute('id')
      console.log(locale.value)
    }
    return {
      handleChangeLanguage
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
    const navItem = document.querySelector('.nav-item')
    const collapse = document.querySelector('.collapse')
    navItem.addEventListener('click', function () {
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
    }
  }
}
</script>
