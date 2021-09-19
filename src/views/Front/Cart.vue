<template>
  <Loading :active="isLoading"></Loading>
  <ShopNavBar :cart="cart" :cartLength="cartLength"></ShopNavBar>
  <NavBarSm :cartLength="cartLength"></NavBarSm>
  <div class="container cart">
    <div class="cartStep">
      <div class="centerWrap mx-auto">
        <div class="step d-flex justify-content-around align-items-stretch">
          <div class="step-item isActive">
            <span>{{ $t('Cart.step-title-1') }}</span>
          </div>
          <div class="step-item">
            <span>{{ $t('Cart.step-title-2') }}</span>
          </div>
          <div class="step-item">
            <span>{{ $t('Cart.step-title-3') }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="centerWrap mx-auto">
      <header class="cartHeader mt-5">
        <h1 class="cartPageTitle">{{ $t('Cart.cart') }}</h1>
      </header>
      <div class="cartBasket" v-if="cartLength > 0">
        <div class="cartBasket-item" v-for="item in cart.carts" :key="item">
          <div class="cartBasketCard">
            <div class="cartBasketCard-image">
              <figure>
                <img :src="item.product.imageUrl" alt="">
              </figure>
            </div>
            <div class="cartBasketCard-content">
              <div class="cartBasketCard-productInfo is-column">
                <div class="cartBasketCard-productName my-auto">
                  <span>{{item.product.title}}</span>
                </div>
                <div class="cartBasketCard-price my-auto">
                  <span>NT ${{ $filters.currency(item.total) }}円</span>
                </div>
                <div class="cartBasketCard-productNum is-desktop">
                  <div class="cartBasketCard-select">
                    <select name="" id="" v-model.number="item.qty" @change="updateCart(item)">
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
                  <div class="cartBasketCard-editor">
                    <ul>
                      <li>
                        <a href="" @click.prevent="delCart(item.id)">{{ $t('Cart.del') }}</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="cartBasketCard-productInfo is-mobile">
              <div class="cartBasketCard-select">
                    <select name="" id="" v-model.number="item.qty" @change="updateCart(item)">
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
                  <div class="cartBasketCard-editor">
                    <ul>
                      <li>
                        <a href="" @click.prevent="delCart(item.id)">{{ $t('Cart.del') }}</a>
                      </li>
                    </ul>
                  </div>
            </div>
          </div>
        </div>
        <div class="cartBasket-subTotal">
          <div class="subTotal">
            <div class="row subTotal-sum align-items-center">
              <div class="col-md-9 d-flex">
                <input type="text" placeholder="試試 Big Game" class="subTotal-coupon" v-model="coupon">
                <button class="subTotal-sendBtn" @click="addCoupon">
                  <img src="~@/assets/images/paper-plane.svg" alt="">
                </button>
              </div>
              <div class="col-md-3 subTotal-price" v-if="cart.final_total === cart.total">
                <span>小計 </span>
                NT $ <strong>{{ $filters.currency(cart.total) }}</strong>
                円
              </div>
              <div class="col-md-3 subTotal-price" v-else>
                <span>小計 </span>
                NT $ <strong class="text-success">{{ $filters.currency(cart.final_total) }}</strong>
                円
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="cartAlert mt-5" v-else>
        <div class="alertBox">
          <div class="alertText">
            <p class="mb-0">{{ $t('Cart.mobileTitle') }}</p>
          </div>
        </div>
      </div>
      <div class="cartToShop" :class="{'cartEmpty' : cartLength === 0}">
        <div class="cartToShopBtn">
          <ul>
            <li>
              <router-link to="/detail" class="btn btn-lg btn-active w-100" v-if="cartLength > 0">
                <span class="btnInner">{{ $t('Cart.toDetail') }}</span>
              </router-link>
            </li>
            <li>
              <a href="#/shop" class="btn btn-lg btnToShop w-100">
                <span class="btnInner">{{ $t('Cart.toShop') }}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <!-- footer -->
  <footer class="pt-3 bg-primary mt-5">
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
      isLoading: false,
      cart: {},
      cartLength: 0,
      coupon: ''
    }
  },
  methods: {
    getCart () {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.$http.get(api).then((res) => {
        this.cart = res.data.data
        this.cartLength = this.cart.carts.length
        this.isLoading = false
      })
    },
    delCart (id) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`
      this.isLoading = true
      this.$http.delete(url).then((response) => {
        this.$httpMessageState(response, '移除購物車品項')
        this.getCart()
        this.isLoading = false
      })
    },
    updateCart (item) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`
      this.isLoading = true
      // this.status.loadingItem = item.id
      const cart = {
        product_id: item.product_id,
        qty: item.qty
      }
      this.$http.put(url, { data: cart }).then((res) => {
        // this.status.loadingItem = ''
        this.getCart()
      })
    },
    addCoupon () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/coupon`
      const coupon = {
        code: this.coupon
      }
      this.isLoading = true
      this.$http.post(url, { data: coupon }).then((response) => {
        this.$httpMessageState(response, '加入優惠券')
        this.getCart()
        this.isLoading = false
      })
    }
  },
  created () {
    this.getCart()
  }
}
</script>
