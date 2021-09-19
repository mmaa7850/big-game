<template>
  <Loading :active="isLoading"></Loading>
  <ShopNavBar :cartLength="cartLength" :cart="cart"></ShopNavBar>
  <NavBarSm :cartLength="cartLength"></NavBarSm>
  <div class="container shop">
    <div class="row mt-4">
      <h1 class="text-center">{{ $t('Shop.online-shop') }}</h1>
      <div class="col-md-3 mt-5 products_select">
        <div class="list-group">
          <a
            href="#"
            class="list-group-item list-group-item-action"
            @click.prevent="sort = ''"
            :class="{ active: sort === '' }"
            aria-current="true"
          >
            {{ $t('Shop.all') }}
          </a>
          <a
            href="#"
            class="list-group-item list-group-item-action"
            aria-current="true"
            v-for="item in categories"
            @click.prevent="sort = item"
            :class="{ active: item === sort }"
            :key="item"
          >
            {{ item }}
          </a>
        </div>
      </div>
      <div class="col-md-9 mt-5">
        <ul>
          <li>
            <a href="#" v-for="item in products" :key="item.id">
              <div
                class="d-flex mx-auto product_big"
                v-if="item.title === 'PlayStation 5 光碟版' && sort === 'PS5'"
                @click.prevent="getProduct(item.id)"
              >
                <div class="img_wrap">
                  <img :src="item.imageUrl" alt="" />
                </div>
                <div
                  class="
                    product_description
                    mx-auto
                    d-flex
                    justify-content-center
                    align-items-center
                  "
                >
                  <div class="product_description_inner">
                    <h3 class="product_description_title">{{ item.title }}</h3>
                    <p>{{ item.content }}</p>
                  </div>
                </div>
              </div>
              <div
                class="d-flex mx-auto product_big"
                v-if="item.title === 'PlayStation 5 光碟版' && sort === ''"
                @click.prevent="getProduct(item.id)"
              >
                <div class="img_wrap">
                  <img :src="item.imageUrl" alt="" />
                </div>
                <div
                  class="
                    product_description
                    mx-auto
                    d-flex
                    justify-content-center
                    align-items-center
                  "
                >
                  <div class="product_description_inner">
                    <h3 class="product_description_title">{{ item.title }}</h3>
                    <p>{{ item.content }}</p>
                  </div>
                </div>
              </div>
              <div
                class="d-flex mx-auto product_big"
                v-else-if="
                  sort === 'Switch' &&
                  item.title === 'Nintendo Switch 集合啦！動物森友會 特別版主機'
                "
                @click.prevent="getProduct(item.id)"
              >
                <div class="img_wrap">
                  <img :src="item.imageUrl" alt="" />
                </div>
                <div
                  class="
                    product_description
                    mx-auto
                    d-flex
                    justify-content-center
                    align-items-center
                  "
                >
                  <div class="product_description_inner">
                    <h3 class="product_description_title">{{ item.title }}</h3>
                    <p>{{ item.content }}</p>
                  </div>
                </div>
              </div>
              <div
                class="d-flex mx-auto product_big"
                v-else-if="
                  sort === 'Xbox' &&
                  item.title ===
                    'Xbox Series X 台灣專用機 + XBOX Game Pass Ultimate 同梱組'
                "
                @click.prevent="getProduct(item.id)"
              >
                <div class="img_wrap">
                  <img :src="item.imageUrl" alt="" />
                </div>
                <div
                  class="
                    product_description
                    mx-auto
                    d-flex
                    justify-content-center
                    align-items-center
                  "
                >
                  <div class="product_description_inner">
                    <h3 class="product_description_title">{{ item.title }}</h3>
                    <p>{{ item.content }}</p>
                  </div>
                </div>
              </div>
            </a>
          </li>
        </ul>
        <div class="row row-cols-2 row-cols-md-4 g-3 mt-4">
          <div class="col" v-for="item in filterData" :key="item.id" @click.prevent="getProduct(item.id)">
            <a href="#" class="card_Togo">
            <div class="card">
              <img :src="item.imageUrl" class="card-img-top" alt="" />
              <div class="card-body">
                <h5 class="card-title">{{ item.title }}</h5>
              </div>
            </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- footer -->
  <footer class="pt-3 mt-5 bg-primary">
    <div class="footer-inner p-3 text-center">
      <p>{{ $t('Footer.tel') }}：886-987-654-456</p>
      <p>練習用作品 | 資料來源 : ビッグカメラ</p>
    </div>
  </footer>
</template>

<script>
import ShopNavBar from '@/components/ShopNavBar.vue'
import NavBarSm from '@/components/NavBar-sm.vue'
export default {
  components: {
    ShopNavBar,
    NavBarSm
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
        const category = this.products.map(function (item, index, arr) {
          return item.category
        })
        this.categories = category.filter((item, index, arr) => {
          return arr.indexOf(item) === index
        })
        this.isLoading = false
      })
    },
    getProduct (id) {
      this.$router.push(`/BigGame/products/${id}`)
    },
    getCart () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.isLoading = true
      this.$http.get(url).then((response) => {
        console.log(response)
        this.cart = response.data.data
        this.cartLength = this.cart.carts.length
        this.isLoading = false
        console.log(this.cart.carts)
      })
    }
  },
  computed: {
    // 商品分類
    filterData () {
      const vm = this
      if (vm.sort) {
        let data = vm.products.filter((item) => {
          return item.category === vm.sort
        })
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
