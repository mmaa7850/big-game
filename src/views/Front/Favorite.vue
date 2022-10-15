<template>
  <Loading :active="isLoading"/>
  <ShopNavBar :cartLength="cartLength" :cart="cart"/>
  <NavBarSm :cartLength="cartLength"/>
  <Swiper/>
  <div class="container favorite">
    <h1 class="fs-2 text-center fw-bold title-font" v-if="favoriteData.length !== 0">{{ $t("Favorite.favorite") }}</h1>
    <div class="d-flex flex-column align-items-center" v-if="favoriteData.length === 0">
      <h2 class="fs-3 fw-bold title-font">{{ $t("Favorite.favorite-title") }}</h2>
      <router-link to="/shop" class="btn btn-dark to-product">{{ $t("Favorite.GotoShop") }}</router-link>
    </div>
    <div class="centerWrap mx-auto row row-cols-2 row-cols-lg-4 row-cols-md-3 g-3 mt-4">
      <div class="col" v-for="item in favoriteData" :key="item.id">
        <div class="card">
        <div class="card-hover d-flex justify-content-center">
          <div class="d-flex flex-column align-items-center justify-content-center">
            <button class="btn w-100" type="button" @click="cancelFavorite(item.id)">{{ $t("Favorite.favoriteCancel-button") }}</button>
            <button class="btn mt-3 w-100" type="button" @click="addCart(item)">{{ $t("Favorite.addCart-button") }}</button>
          </div>
        </div>
        <img :src="item.imageUrl" :alt="item.title"/>
          <div class="card-body d-flex flex-column justify-content-between">
            <h6 class="card-title">{{ item.title }}</h6>
            <div class="d-flex flex-column">
              <p class="original_price text-muted text-decoration-line-through">NT ${{ $filters.currency(item.origin_price) }}</p>
              <p class="price fw-bold text-danger align-self-end pt-1">NT ${{ $filters.currency(item.price) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer/>
</template>

<script>
import ShopNavBar from '@/components/ShopNavBar.vue'
import NavBarSm from '@/components/NavBarSm.vue'
import Swiper from '@/components/Swiper.vue'
import Footer from '@/components/Footer.vue'

export default {
  components: {
    ShopNavBar,
    NavBarSm,
    Swiper,
    Footer
  },
  inject: ['emitter'],
  data () {
    return {
      products: [],
      cart: {},
      cartLength: 0,
      qty: 1,
      favoriteData: [],
      favoriteList: JSON.parse(localStorage.getItem('favoriteList')) || [],
      isLoading: false
    }
  },
  methods: {
    getProducts () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.isLoading = true
      this.$http.get(url).then((response) => {
        this.products = response.data.products
        this.getFavorite()
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
        this.isLoading = false
      }).catch((error) => {
        this.$httpMessageState(error, '錯誤訊息')
      })
    },
    addCart (item) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      const cart = {
        product_id: item.id,
        qty: this.qty
      }
      this.isLoading = true
      this.$http.post(api, { data: cart }).then((res) => {
        this.emitter.emit('push-message', {
          style: 'success',
          title: '更新成功',
          content: res.data.message
        })
        this.getCart()
        this.isLoading = false
      }).catch((error) => {
        this.$httpMessageState(error, '錯誤訊息')
      })
    },
    getFavorite () {
      this.favoriteData = this.products.filter((item) => this.favoriteList.indexOf(item.id) !== -1)
    },
    cancelFavorite (id) {
      this.isLoading = true
      const favoriteIndex = this.favoriteList.indexOf(id)
      if (favoriteIndex || favoriteIndex === 0) {
        this.favoriteList.splice(favoriteIndex, 1)
        localStorage.setItem('favoriteList', JSON.stringify(this.favoriteList))
        this.emitter.emit('push-message', {
          style: 'success',
          title: '已取消收藏'
        })
      } else {
        this.emitter.emit('push-message', {
          style: 'danger',
          title: '找不到收藏'
        })
      }
      this.getFavorite()
      this.isLoading = false
    }
  },
  created () {
    this.getProducts()
    this.getCart()
  }
}

</script>
