<template>
  <Loading :active="isLoading"/>
  <ShopNavBar :cartLength="cartLength" :cart="cart"/>
  <NavBarSm :cartLength="cartLength"/>
  <div class="container pb-4">
    <div id="product" class="row pb-3">
      <div class="col-lg-7 product_video">
        <iframe :src="product.description" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen/>
      </div>
      <div class="col-lg-5 product_wrap my-auto">
        <div class="product_inner">
          <h2 class="product_title">{{ product.title }}</h2>
          <div class="product_content">
            <h5 class="text-danger mb-2 fw-bold">[{{ $t('Product.product-info') }}]</h5>
            {{ product.content }}
          </div>
          <div class="product_price d-flex flex-column align-items-end">
            <p class="original_price text-muted text-decoration-line-through">NT ${{ $filters.currency(product.origin_price) }}</p>
            <p class="price text-danger h4 fw-bold">NT ${{ $filters.currency(product.price) }}</p>
          </div>
            <div class="add_cart row pt-3 justify-content-end align-items-center">
              <div class="col-3">
                <select name="amount" class="w-100" v-model.number="qty">
                  <option disabled>{{ $t('Product.productUnit') }}</option>
                  <option :value="i" v-for="i in 10" :key="i">{{ $t(`Product.productNum-${i}`) }}</option>
                </select>
              </div>
              <div class="col-5">
                <button class="addBtn w-100" @click="addCart(product.id)" type="button">{{ $t('Product.product-button') }}</button>
              </div>
              <div class="col-4">
                <button class="favoriteBtn w-100" @click="addFavorite(product.id)" type="button" v-if="favoriteList.indexOf(product.id) === -1">{{ $t('Product.favoriteAdd-button') }}</button>
                <button class="favoriteBtn w-100" @click="cancelFavorite(product.id)" type="button" v-else>{{ $t('Product.favoriteCancel-button') }}</button>
              </div>
            </div>
        </div>
      </div>
    </div>
    <hr/>
    <div class="shopping_note">
      <h5 class="text-danger fw-bold mb-1">[{{ $t('Product.shopping-info') }}]</h5>
      <p>{{ $t('Product.shopping-content') }}</p>
      <dl class="row">
        <dt class="col-lg-3">{{ $t('Product.delivery-info') }}：</dt>
        <dd class="col-lg-9">{{ $t('Product.delivery-content') }}</dd>
        <dt class="col-lg-3">{{ $t('Product.deliveryTime-info') }}：</dt>
        <dt class="col-lg-9">{{ $t('Product.deliveryTime-content') }}</dt>
      </dl>
    </div>
    <hr/>
    <ProductSwiper :products="products"/>
  </div>
  <Footer/>
</template>

<script>
import ShopNavBar from '@/components/ShopNavBar.vue'
import NavBarSm from '@/components/NavBarSm.vue'
import ProductSwiper from '@/components/ProductSwiper.vue'
import Footer from '@/components/Footer.vue'

export default {
  components: {
    ShopNavBar,
    NavBarSm,
    ProductSwiper,
    Footer
  },
  inject: ['emitter'],
  watch: {
    $route (to) {
      if (this.product.id === to.params.id) {
        return
      }
      this.getProduct()
    }
  },
  data () {
    return {
      qty: 1,
      player: null,
      product: [],
      products: [],
      isLoading: false,
      cart: {},
      cartLength: 0,
      favoriteList: JSON.parse(localStorage.getItem('favoriteList')) || []
    }
  },
  methods: {
    getProduct () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${this.$route.params.productId}`
      this.isLoading = true
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.product = res.data.product
        }
        this.isLoading = false
      }).catch((error) => {
        this.$httpMessageState(error, '錯誤訊息')
      })
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
        this.isLoading = false
      }).catch((error) => {
        this.$httpMessageState(error, '錯誤訊息')
      })
    },
    shuffle (arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
      }
      return arr
    },
    addCart () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      const cart = {
        product_id: this.$route.params.productId,
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
    addFavorite (id) {
      this.isLoading = true
      const favoriteId = this.favoriteList.indexOf(id)
      if (favoriteId === -1) {
        this.favoriteList.push(id)
        this.emitter.emit('push-message', {
          style: 'success',
          title: '已加入收藏'
        })
      } else {
        this.emitter.emit('push-message', {
          style: 'danger',
          title: '重複加入收藏'
        })
      }
      setTimeout(() => {
        this.isLoading = false
      }, 500)
      localStorage.setItem('favoriteList', JSON.stringify(this.favoriteList))
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
      this.isLoading = false
    }
  },
  created () {
    this.getProduct()
    this.getData()
    this.getCart()
  }
}
</script>
