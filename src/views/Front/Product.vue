<template>
  <Loading :active="isLoading"></Loading>
  <ShopNavBar :cartLength="cartLength" :cart="cart"></ShopNavBar>
  <NavBarSm :cartLength="cartLength"></NavBarSm>
  <div class="container pb-4">
    <div id="product" class="row pb-3">
      <div class="col-lg-7 product_video">
        <iframe
          :src="product.description"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <div class="col-lg-5 product_wrap my-auto">
        <div class="product_inner">
          <h2 class="product_title">{{ product.title }}</h2>
          <div class="product_content">
            <h5 class="text-danger mb-2 fw-bold">[{{ $t('Product.product-info') }}]</h5>
            {{ product.content }}
          </div>
          <div class="product_price d-flex flex-column align-items-end">
            <p class="orginal_price text-muted text-decoration-line-through">
              NT ${{ $filters.currency(product.origin_price) }}
            </p>
            <p class="price text-danger h4 fw-bold">
              NT ${{ $filters.currency(product.price) }}
            </p>
            <div class="add_cart row w-100 pt-3">
              <div class="col-4">
                <select name="amount" class="w-100" v-model.number="qty">
                  <option disabled>個数</option>
                  <option value="1">1点</option>
                  <option value="2">2点</option>
                  <option value="3">3点</option>
                  <option value="4">4点</option>
                  <option value="5">5点</option>
                  <option value="6">6点</option>
                  <option value="7">7点</option>
                  <option value="8">8点</option>
                  <option value="9">9点</option>
                  <option value="10">10点</option>
                </select>
              </div>
              <div class="col-8">
                <button class="btn w-100" @click="addCart(product.id)">{{ $t('Product.product-button') }}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr>
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
    <hr>
    <ProductSwiper :products="products"></ProductSwiper>
  </div>
  <footer class="pt-3 bg-primary">
    <div class="footer-inner p-3 text-center">
      <p>{{ $t('Footer.tel') }}：886-987-654-456</p>
      <p>練習用作品 | 資料來源 : ビッグカメラ</p>
    </div>
  </footer>
</template>

<script>
import ShopNavBar from '@/components/ShopNavBar.vue'
import NavBarSm from '@/components/NavBar-sm.vue'
import ProductSwiper from '@/components/ProductSwiper.vue'
export default {
  components: {
    ShopNavBar,
    NavBarSm,
    ProductSwiper
  },
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
      cartLength: 0
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
      })
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
    addCart (id, qty = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      const cart = {
        product_id: this.$route.params.productId,
        qty: this.qty
      }
      this.isLoading = true
      this.$http.post(api, { data: cart }).then((res) => {
        this.getCart()
        this.isLoading = false
        this.$httpMessageState(res, '加入購物車')
      })
    }
  },
  created () {
    this.getProduct()
    this.getData()
    this.getCart()
  }
}
</script>
