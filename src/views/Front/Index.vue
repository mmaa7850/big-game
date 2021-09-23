<template>
  <NavBar></NavBar>
  <div class="top-account d-flex justify-content-end">
    <div class="top-account-aside">
      <ul class="top-account-list d-flex">
        <li :class="{'slide-left' : isSlide === true}">
          <router-link to="/login" class="px-2">
            <img src="~@/assets/images/user.svg" alt="">
            <span class="top-account-slide slide1">{{ $t('Index.login') }}</span>
          </router-link>
        </li>
        <li :class="{'slide-right' : isSlide === true}" v-if="cartLength === 0">
          <a href="#" class="px-2 isCart" @click.prevent="EmptyCart">
            <img class="isCart" src="~@/assets/images/shopping-cart.svg" alt="">
            <span class="top-account-cart-num badge rounded-pill isCart" v-if="cartLength > 0">
              <em class="isCart">{{cartLength}}</em>
            </span>
            <span class="top-account-slide isCart">{{ $t('Index.cart') }}</span>
          </a>
        </li>
        <li :class="{'slide-right-cart' : isSlide === true}" v-else>
          <a href="#" class="px-2 isCart" @click.prevent="EmptyCart">
            <img class="isCart" src="~@/assets/images/shopping-cart.svg" alt="">
            <span class="top-account-cart-num badge rounded-pill isCart" v-if="cartLength > 0">
              <em class="isCart">{{cartLength}}</em>
            </span>
            <span class="top-account-slide isCart">{{ $t('Index.cart') }}</span>
          </a>
        </li>
      </ul>
    </div>
    <!-- 購物車下滑選單 -->
    <CartModal :cart="cart" :cartLength="cartLength" :hide="hide"></CartModal>
  </div>
  <NavBarSm :cartLength="cartLength"></NavBarSm>
  <IndexSwiper></IndexSwiper>
  <div class="main_container" :style="{width: width + 'px', marginLeft: marginLeft + 'px'}">
    <!-- News -->
    <section class="container_news" id="news">
      <div class="important_news py-4 mx-0">
        <div class="content row align-items-center">
          <div class="col-5 col-md-3">
            <h2 class="text-danger fw-bolder">{{ $t('Index.important-news') }}</h2>
          </div>
          <div class="col-7 col-md-9">
            <ul>
              <li>
                <a href="#/index" class="fw-bold">{{ $t('Index.important-news-contentFirst') }}<span class="text-danger">{{ $t('Index.important-news-contentTime') }}</span>{{ $t('Index.important-news-contentLast') }} <span class="text-decoration-underline underline">{{ $t('Index.important-news-contentLast-line') }}</span></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="news py-3">
        <ul class="news_list">
          <li>
            <div class="news_list_img1"></div>
            <div class="news_list_description d-flex flex-column align-items-center justify-content-center">
              <div class="news_list_content">
                <span class="bg-primary text-white">{{ $t('Index.news-title') }}</span>
                <h3>{{ $t('Index.news-content-1') }}</h3>
              </div>
            </div>
          </li>
          <li>
            <div class="news_list_img2"></div>
            <div class="news_list_description d-flex flex-column align-items-center justify-content-center">
              <div class="news_list_content">
                <span class="bg-primary text-white">{{ $t('Index.news-title') }}</span>
                <h3>{{ $t('Index.news-content-2') }}</h3>
              </div>
            </div>
          </li>
          <li>
            <div class="news_list_img3"></div>
            <div class="news_list_description d-flex flex-column align-items-center justify-content-center">
              <div class="news_list_content">
                <span class="bg-primary text-white">{{ $t('Index.news-title') }}</span>
                <h3>{{ $t('Index.news-content-3') }}</h3>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
    <!-- Information -->
      <section class="info" id="info">
        <div class="row">
          <div class="col-12 col-md-6 text-center bg-white p-2 align-items-center">
            <h3>企業情報</h3>
            <div class="info-content pb-3">
              <p class="pt-4">{{ $t('Index.company-info-top') }}</p>
              <p>{{ $t('Index.company-info-down') }}</p>
            </div>
            <router-link to="/index#info" class="text-primary">{{ $t('Index.company-info') }}</router-link>
          </div>
          <div class="col-12 col-md-6 p-0">
            <div class="Nintendo-tokyo"></div>
          </div>
          <div class="col-12 d-flex justify-content-center align-items-center info-img">
            <div class="info-text text-center">
              <span>{{ $t('Index.companyImg-info-top') }}</span>
              <br>
              <span>{{ $t('Index.companyImg-info-down') }}</span>
            </div>
          </div>
        </div>
      </section>
      <!-- branch -->
      <section class="branch mt-5 text-center p-2" id="branch">
        <h3>{{ $t('Index.branch') }}</h3>
        <hr>
        <div class="row branch-pc">
          <div class="col-4">
            <ul>
              <li>
                <router-link to="/index#branch">秋葉原本店</router-link>
              </li>
              <li>
                <router-link to="/index#branch">有楽町店</router-link>
              </li>
              <li>
                <router-link to="/index#branch">赤坂見附駅店</router-link>
              </li>
              <li>
                <router-link to="/index#branch">セレクト六本木駅店</router-link>
              </li>
            </ul>
          </div>
          <div class="col-4">
            <ul>
              <li>
                <router-link to="/index#branch">渋谷東口店</router-link>
              </li>
              <li>
                <router-link to="/index#branch">日本橋三越</router-link>
              </li>
              <li>
                <router-link to="/index#branch">セレクト原宿店</router-link>
              </li>
              <li>
                <router-link to="/index#branch">聖蹟桜ヶ丘駅店</router-link>
              </li>
            </ul>
          </div>
          <div class="col-4">
            <ul>
              <li>
                <router-link to="/index#branch">JR八王子駅店</router-link>
              </li>
              <li>
                <router-link to="/index#branch">立川店</router-link>
              </li>
              <li>
                <router-link to="/index#branch">町田店</router-link>
              </li>
              <li>
                <router-link to="/index#branch">横浜西口店</router-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="row branch-mobile">
          <div class="col-6">
            <ul>
              <li>
                <router-link to="/index#branch">秋葉原本店</router-link>
              </li>
              <li>
                <router-link to="/index#branch">有楽町店</router-link>
              </li>
              <li>
                <router-link to="/index#branch">赤坂見附駅店</router-link>
              </li>
              <li>
                <router-link to="/index#branch">セレクト六本木駅店</router-link>
              </li>
              <li>
                <router-link to="/index#branch">渋谷東口店</router-link>
              </li>
              <li>
                <router-link to="/index#branch">日本橋三越</router-link>
              </li>
            </ul>
          </div>
          <div class="col-6">
            <ul>
              <li>
                <router-link to="/index#branch">セレクト原宿店</router-link>
              </li>
              <li>
                <router-link to="/index#branch">聖蹟桜ヶ丘駅店</router-link>
              </li>
              <li>
                <router-link to="/index#branch">JR八王子駅店</router-link>
              </li>
              <li>
                <router-link to="/index#branch">立川店</router-link>
              </li>
              <li>
                <router-link to="/index#branch">町田店</router-link>
              </li>
              <li>
                <router-link to="/index#branch">横浜西口店</router-link>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <!-- GoToShop-->
      <section class="toshop mt-5">
        <div class="row mx-0">
          <div class="col-md-12 toshop-Img d-flex align-items-end justify-content-center">
            <div class="box text-center">
              <h2 class="text-warning">{{ $t('Index.online-shop') }}</h2>
              <router-link to="/shop" class="btn btn-outline-primary btn-lg text-white">{{ $t('Index.GotoShop') }}</router-link>
            </div>
          </div>
        </div>
      </section>
  </div>
  <!-- footer -->
  <footer class="pt-3 bg-primary">
    <div class="footer-inner p-3 text-center">
      <p>{{ $t('Footer.tel') }}：886-987-654-456</p>
      <p>練習用作品 | 資料來源 : ビッグカメラ</p>
    </div>
  </footer>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import NavBarSm from '@/components/NavBar-sm.vue'
import IndexSwiper from '@/components/IndexSwiper.vue'
import CartModal from '@/components/CartModal.vue'
// import $ from 'jquery'
export default {
  components: {
    NavBar,
    NavBarSm,
    IndexSwiper,
    CartModal
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
      hide: true
    }
  },
  mounted () {
    const vm = this
    vm.fullWidth = window.innerWidth
    // 設定 main_content寬度
    vm.width = vm.fullWidth / 2
    vm.marginLeft = vm.width / 2
    console.log(vm.width, vm.marginLeft)
    // 改變 main_content寬度
    window.onresize = () => {
      vm.fullWidth = window.innerWidth
      vm.width = vm.fullWidth / 1.28 / 7 * 5
      vm.marginLeft = vm.fullWidth / 1.3 / 7 * 2
    }
    // 滾動監聽
    window.addEventListener('scroll', this.handleScroll)
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
  },
  methods: {
    handleScroll () {
      this.top = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (this.top === 0) {
        this.isSlide = false
      } else {
        this.isSlide = true
      }
    },
    getCart () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.isLoading = true
      this.$http.get(url).then((response) => {
        this.cart = response.data.data
        this.cartLength = this.cart.carts.length
        this.isLoading = false
      })
    },
    EmptyCart () {
      if (this.cartLength === 0) {
        this.$router.push('/cart')
      }
    }
  },
  created () {
    this.getCart()
  }
}
</script>
