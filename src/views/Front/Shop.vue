<template>
  <Loading :active="isLoading"/>
  <ShopNavBar :cartLength="cartLength" :cart="cart"/>
  <NavBarSm :cartLength="cartLength"/>
  <div class="container shop">
    <div class="row mt-4">
      <h1 class="text-center">{{ $t('Shop.online-shop') }}</h1>
      <div class="col-lg-3 mt-5 products_select">
        <div class="list-group">
          <a href="#" class="list-group-item list-group-item-action" @click.prevent="sort = ''" :class="{ active: sort === '' }" aria-current="true">{{ $t('Shop.all') }}</a>
          <a href="#" class="list-group-item list-group-item-action" aria-current="true" v-for="item in categories" @click.prevent="sort = item" :class="{ active: item === sort }" :key="item">{{ item }}</a>
        </div>
      </div>
      <div class="col-lg-9 mt-5">
        <ul>
          <li>
            <a href="#" v-for="item in products" :key="item.id" @click.prevent="getProduct(item.id)">
              <div class="d-flex mx-auto product_big" v-if="item.title === 'PlayStation 5 光碟版' && sort === 'PS5'">
                <div class="img_wrap">
                  <img :src="item.imageUrl" alt="product-image" />
                </div>
                <div class="product_description mx-auto d-flex justify-content-center align-items-center">
                  <div class="product_description_inner">
                    <h3 class="product_description_title">{{ item.title }}</h3>
                    <p>{{ item.content }}</p>
                    <div class="text-danger product_description_price">NT ${{ $filters.currency(item.price) }}</div>
                  </div>
                </div>
              </div>
              <div class="d-flex mx-auto product_big" v-if="item.title === 'PlayStation 5 光碟版' && sort === ''">
                <div class="img_wrap">
                  <img :src="item.imageUrl" alt="product-image" />
                </div>
                <div class="product_description mx-auto d-flex justify-content-center align-items-center">
                  <div class="product_description_inner">
                    <h3 class="product_description_title">{{ item.title }}</h3>
                    <p>{{ item.content }}</p>
                    <div class="text-danger product_description_price">NT ${{ $filters.currency(item.price) }}</div>
                  </div>
                </div>
              </div>
              <div class="d-flex mx-auto product_big" v-else-if="sort === 'Switch' && item.title === 'Nintendo Switch 集合啦！動物森友會 特別版主機'">
                <div class="img_wrap">
                  <img :src="item.imageUrl" alt="product-image" />
                </div>
                <div class="product_description mx-auto d-flex justify-content-center align-items-center">
                  <div class="product_description_inner">
                    <h3 class="product_description_title">{{ item.title }}</h3>
                    <p>{{ item.content }}</p>
                    <div class="text-danger product_description_price">NT ${{ $filters.currency(item.price) }}</div>
                  </div>
                </div>
              </div>
              <div class="d-flex mx-auto product_big" v-else-if="sort === 'Xbox' && item.title === 'Xbox Series X 台灣專用機 + XBOX Game Pass Ultimate 同梱組'">
                <div class="img_wrap">
                  <img :src="item.imageUrl" alt="product-image" />
                </div>
                <div class="product_description mx-auto d-flex justify-content-center align-items-center">
                  <div class="product_description_inner">
                    <h3 class="product_description_title">{{ item.title }}</h3>
                    <p>{{ item.content }}</p>
                    <div class="text-danger product_description_price">NT ${{ $filters.currency(item.price) }}</div>
                  </div>
                </div>
              </div>
            </a>
          </li>
        </ul>
        <div class="row row-cols-2 row-cols-md-4 g-3 mt-4">
          <div class="col" v-for="item in filterData" :key="item.id">
            <a href="#" class="card_Togo" @click.prevent="getProduct(item.id)">
            <div class="card">
              <img :src="item.imageUrl" class="card-img-top" alt="product-image" />
              <div class="card-body d-flex flex-column justify-content-between">
                <h6 class="card-title">{{ item.title }}</h6>
                <div class="d-flex flex-column">
                  <p class="original_price text-muted text-decoration-line-through">NT ${{ $filters.currency(item.origin_price) }}</p>
                  <p class="price fw-bold text-danger align-self-end pt-1">NT ${{ $filters.currency(item.price) }}</p>
                </div>
              </div>
            </div>
            </a>
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
import Footer from '@/components/Footer.vue'

export default {
  components: {
    ShopNavBar,
    NavBarSm,
    Footer
  },
  data () {
    return {
      products: [],
      categories: [],
      sort: '',
      isLoading: false,
      cart: {},
      cartLength: 0
    }
  },
  methods: {
    getProducts () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.isLoading = true
      this.$http.get(url).then((response) => {
        this.products = response.data.products
        const category = this.products.map(item => item.category)
        this.categories = category.filter((item, index, arr) => arr.indexOf(item) === index)
        this.isLoading = false
      }).catch((error) => {
        this.$httpMessageState(error, '錯誤訊息')
      })
    },
    getProduct (id) {
      this.$router.push(`/products/${id}`)
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
    }
  },
  computed: {
    filterData () {
      const vm = this
      if (vm.sort) {
        let data = vm.products.filter((item) => item.category === vm.sort)
        data = data.slice(1)
        return data
      } else {
        const data = vm.products.slice(1)
        return data
      }
    }
  },
  created () {
    this.getProducts()
    this.getCart()
  }
}
</script>
