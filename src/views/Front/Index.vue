<template>
  <NavBar/>
  <div class="top-account d-flex justify-content-end">
    <div class="top-account-aside">
      <ul class="top-account-list d-flex">
        <li :class="{ 'slide-left': isSlide === true }">
          <router-link to="/admin/login" class="px-2">
            <img src="~@/assets/img/user.svg" alt="user" />
            <span class="top-account-slide slide1">{{ $t("Index.login") }}</span>
          </router-link>
        </li>
        <li :class="{ 'slide-right': isSlide === true }" v-if="cartLength === 0">
          <a href="#" class="px-2 isCart" @click.prevent="EmptyCart">
            <img class="isCart" src="~@/assets/img/shopping-cart.svg" alt="shopping-cart"/>
            <span class="top-account-cart-num badge rounded-pill isCart" v-if="cartLength > 0">
              <em class="isCart">{{ cartLength }}</em>
            </span>
            <span class="top-account-slide isCart">{{ $t("Index.cart") }}</span>
          </a>
        </li>
        <li :class="{ 'slide-right-cart': isSlide === true }" v-else>
          <a href="#" class="px-2 isCart" @click.prevent="EmptyCart">
            <img class="isCart" src="~@/assets/img/shopping-cart.svg" alt="shopping-cart"/>
            <span class="top-account-cart-num badge rounded-pill isCart" v-if="cartLength > 0">
              <em class="isCart">{{ cartLength }}</em>
            </span>
            <span class="top-account-slide isCart">{{ $t("Index.cart") }}</span>
          </a>
        </li>
      </ul>
    </div>
    <CartModal :hide="hide"/>
  </div>
  <NavBarSm :cartLength="cartLength"/>
  <IndexSwiper @slide="slideDown"/>
  <div class="container main_container" id="mainContainer" :style="{ maxWidth: width + 'px', marginLeft: marginLeft + 'px' }">
    <section class="container_news" id="news">
      <div class="important_news py-4 mx-0" data-aos="fade-up">
        <div class="content row align-items-center ">
          <div class="col-3">
            <h2 class="text-danger fw-bolder">{{ $t("Index.important-news") }}</h2>
          </div>
          <div class="col-9">
            <ul>
              <li>
                <a href="#" class="fw-bold" @click.prevent>{{ $t("Index.important-news-contentFirst") }}
                  <span class="text-danger">{{ $t("Index.important-news-contentTime") }}</span>
                  {{ $t("Index.important-news-contentLast") }}
                  <span class="text-decoration-underline underline">{{ $t("Index.important-news-contentLast-line")}}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="news py-3">
        <div class="text-center">
          <h2 class="title-font title-bg d-inline" data-aos="fade-up">{{ $t("Index.news-title") }}</h2>
        </div>
        <ul class="news_list pt-4">
          <li data-aos="fade-up">
            <img src="~@/assets/img/oliveSmart.png" alt="oliveSmart"/>
            <div class="news_list_description">
              <div class="news_list_content mx-auto">
                <h3 class="bg-primary text-white">{{ $t("Index.special") }}</h3>
                <p class="news_list-title"><a href="#" @click.prevent>{{ $t("Index.news-title-1") }}</a></p>
                <p>{{ $t("Index.news-content-1") }}</p>
                <a href="#" @click.prevent class="news_detail">{{ $t("Index.news-detail-1") }}</a>
              </div>
            </div>
          </li>
          <li data-aos="fade-up">
            <img src="~@/assets/img/shopyoyaku.png" alt="shopyoyaku"/>
            <div class="news_list_description">
              <div class="news_list_content mx-auto">
                <h3 class="bg-primary text-white">{{ $t("Index.special") }}</h3>
                <p class="news_list-title"><a href="#" @click.prevent>{{ $t("Index.news-title-2") }}</a></p>
                <p>{{ $t("Index.news-content-2") }}</p>
                <a href="#" @click.prevent class="news_detail">{{ $t("Index.news-detail-2") }}</a>
              </div>
            </div>
          </li>
          <li data-aos="fade-up">
            <img src="~@/assets/img/app_touch_comic.png" alt="app_touch_comic"/>
            <div class="news_list_description">
              <div class="news_list_content mx-auto">
                <h3 class="bg-primary text-white">{{ $t("Index.special") }}</h3>
                <p class="news_list-title"><a href="#" @click.prevent>{{ $t("Index.news-title-3") }}</a></p>
                <p>{{ $t("Index.news-content-3") }}</p>
                <span>※{{ $t("Index.news-detail-3") }}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
    <section class="info" id="info">
      <div class="text-center">
        <h2 class="title-font d-inline title-bg position-relative" data-aos="fade-up">{{ $t("Index.info-title") }}</h2>
      </div>
      <div class="row info-wrap mt-4">
        <div class="col-12 col-md-6 p-2 align-items-center">
          <div data-aos="flip-left">
            <span class="ps5">PS5</span>
            <div class="d-flex info-border">
              <div class="info-img">
                <img src="~@/assets/img/info-1.jpeg" alt="God of War"/>
              </div>
              <div class="info-content">
                <a href="#" @click.prevent>{{ $t("Index.info-content-1") }}</a>
              </div>
            </div>
          </div>
          <div data-aos="flip-left">
            <span class="ps5">PS5</span><span class="ns">NS</span><span class="xbox">XBOX X</span>
            <div class="d-flex info-border">
              <div class="info-img">
                <img src="~@/assets/img/info-3.jpeg" alt="FF VII"/>
              </div>
              <div class="info-content">
                <a href="#" @click.prevent>{{ $t("Index.info-content-3") }}</a>
              </div>
            </div>
          </div>
          <div data-aos="flip-left">
            <span class="ps5">PS5</span><span class="xbox">XBOX X</span>
            <div class="d-flex info-border">
              <div class="info-img">
                <img src="~@/assets/img/info-5.jpeg" alt="Ishin"/>
              </div>
              <div class="info-content">
                <a href="#" @click.prevent>{{ $t("Index.info-content-5") }}</a>
              </div>
            </div>
          </div>
          <div data-aos="flip-left">
            <span class="ps5">PS5</span>
            <div class="d-flex info-border">
              <div class="info-img">
                <img src="~@/assets/img/info-7.jpeg" alt="Tekken 8"/>
              </div>
              <div class="info-content">
                <a href="#" @click.prevent>{{ $t("Index.info-content-7") }}</a>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-6 p-2 align-items-center">
          <div data-aos="flip-right">
            <span class="ns">NS</span>
            <div class="d-flex info-border">
              <div class="info-img">
                <img src="~@/assets/img/info-2.jpeg" alt="Resident Evil 8"/>
              </div>
              <div class="info-content">
                <a href="#" @click.prevent>{{ $t("Index.info-content-2") }}</a>
              </div>
            </div>
          </div>
          <div data-aos="flip-right">
            <span class="ps5">PS5</span>
            <div class="d-flex info-border">
              <div class="info-img">
                <img src="~@/assets/img/info-4.jpeg" alt="Rise of the Ronin"/>
              </div>
              <div class="info-content">
                <a href="#" @click.prevent>{{ $t("Index.info-content-4") }}</a>
              </div>
            </div>
          </div>
          <div data-aos="flip-right">
            <span class="ps5">PS5</span><span class="xbox">XBOX X</span>
            <div class="d-flex info-border">
              <div class="info-img">
                <img src="~@/assets/img/info-6.jpeg" alt="Hogwarts Legacy">
              </div>
              <div class="info-content">
                <a href="#" @click.prevent>{{ $t("Index.info-content-6") }}</a>
              </div>
            </div>
          </div>
          <div data-aos="flip-right">
            <span class="ns">NS</span>
            <div class="d-flex info-border">
              <div class="info-img">
                <img src="~@/assets/img/info-8.jpeg" alt="Atelier Ryza 3"/>
              </div>
              <div class="info-content">
                <a href="#" @click.prevent>{{ $t("Index.info-content-8") }}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div data-aos="fade-up" class="mySwiper px-2">
      <SimpleProductSwiper :products="products"/>
    </div>
  </div>
  <Footer/>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import NavBarSm from '@/components/NavBarSm.vue'
import IndexSwiper from '@/components/IndexSwiper.vue'
import CartModal from '@/components/CartModal.vue'
import SimpleProductSwiper from '@/components/SimpleProductSwiper.vue'
import Footer from '@/components/Footer.vue'
import emitter from '@/methods/emitter'

export default {
  components: {
    NavBar,
    NavBarSm,
    IndexSwiper,
    CartModal,
    SimpleProductSwiper,
    Footer
  },
  data () {
    return {
      width: 0,
      marginLeft: 0,
      fullWidth: 0,
      top: 0,
      isSlide: false,
      cart: {},
      cartLength: 0,
      hide: true,
      products: []
    }
  },
  emits: ['slide'],
  mounted () {
    const vm = this
    vm.fullWidth = window.innerWidth
    // 設定 main_content寬度
    vm.width = vm.fullWidth / 1.77
    vm.marginLeft = vm.width / 2.2
    // 改變 main_content寬度
    window.addEventListener('resize', this.widthResize)
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('click', this.isCartIncludes)
  },
  methods: {
    slideDown () {
      document.getElementById('mainContainer').scrollIntoView({
        behavior: 'smooth'
      })
    },
    widthResize () {
      const vm = this
      vm.fullWidth = window.innerWidth
      vm.width = vm.fullWidth / 1.28 / 7 * 5
      vm.marginLeft = vm.fullWidth / 1.3 / 7 * 2
    },
    handleScroll () {
      this.top = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (this.top === 0) {
        this.isSlide = false
      } else {
        this.isSlide = true
      }
    },
    getData () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.isLoading = true
      this.$http.get(url).then((res) => {
        if (res.data.success) {
          this.products = res.data.products.filter((item) => item.title.includes('《'))
          this.shuffle(this.products)
        }
        this.isLoading = false
      }).catch((error) => {
        this.$httpMessageState(error, '錯誤訊息')
      })
    },
    getCart () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.isLoading = true
      this.$http.get(url).then((response) => {
        this.cart = response.data.data
        this.cartLength = this.cart.carts.length
        emitter.emit('updateCart', this.cart)
        emitter.emit('updateCartLength', this.cartLength)
        this.isLoading = false
      }).catch((error) => {
        this.$httpMessageState(error, '錯誤訊息')
      })
    },
    EmptyCart () {
      if (this.cartLength === 0) {
        this.$router.push('/cart')
      }
    },
    // 隨機順序
    shuffle (arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
      }
      return arr
    },
    isCartIncludes (e) {
      const vm = this
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
    }
  },
  created () {
    this.getData()
    this.getCart()
  },
  unmounted () {
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('click', this.isCartIncludes)
    window.removeEventListener('resize', this.widthResize)
  }
}

</script>
