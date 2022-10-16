<template>
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
      <header class="cartHeader mt-5 py-3">
        <h1 class="cartPageTitle text-center">{{ $t('Cart.cart') }}</h1>
      </header>
      <div class="cartBasket" v-if="cartLength > 0">
        <div class="cartBasket-item" v-for="item in cart.carts" :key="item">
          <div class="cartBasketCard">
            <div class="cartBasketCard-image">
              <figure>
                <img :src="item.product.imageUrl" alt="product-image"/>
              </figure>
            </div>
            <div class="cartBasketCard-content">
              <div class="cartBasketCard-productInfo is-column">
                <div class="cartBasketCard-productName my-auto">
                  <span>{{ item.product.title }}</span>
                </div>
                <div class="cartBasketCard-price my-auto">
                  <span class="text-danger fw-bold">NT ${{ $filters.currency(item.total) }}元</span>
                </div>
                <div class="cartBasketCard-productNum is-desktop">
                  <div class="cartBasketCard-select">
                    <select name="amount" id="" v-model.number="item.qty" @change="updateCart(item)">
                      <option :value="i" v-for="i in 10" :key="i">{{ $t(`Product.productNum-${i}`) }}</option>
                    </select>
                  </div>
                  <div class="cartBasketCard-editor">
                    <ul>
                      <li>
                        <a href="#" @click.prevent="delCart(item.id)">{{ $t('Cart.del') }}</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="cartBasketCard-productInfo is-mobile">
              <div class="cartBasketCard-select">
                <select name="amount" id="" v-model.number="item.qty" @change="updateCart(item)">
                  <option :value="i" v-for="i in 10" :key="i">{{ $t(`Product.productNum-${i}`) }}</option>
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
              <div class="col-lg-9 col-md-8 col-sm-6 d-flex">
                <input type="text" :placeholder="$t('Cart.try-coupon')" class="subTotal-coupon" v-model="coupon"/>
                <button class="subTotal-sendBtn" type="button" @click="addCoupon">
                  <img src="~@/assets/img/paper-plane.svg" alt="paper-plane"/>
                </button>
                <div class="text-center my-auto ms-2">
                  <span class="text-success font-sm" v-if="isCoupon === 'success'">套用成功</span>
                  <span class="text-danger font-sm" v-else-if="isCoupon === 'fail'">套用失敗</span>
                </div>
              </div>
              <div class="col-lg-3 col-md-4 col-sm-6 subTotal-price" v-if="cart.final_total === cart.total">
                <span>小計 </span>
                NT $ <strong>{{ $filters.currency(cart.total) }}</strong>元
              </div>
              <div class="col-lg-3 col-md-4 col-sm-6 subTotal-price" v-else>
                <span>小計 </span>
                NT $ <strong class="text-success">{{ $filters.currency(cart.final_total) }}</strong>元
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
              <router-link to="/shop" class="btn btn-lg btnToShop w-100">
                <span class="btnInner">{{ $t('Cart.toShop') }}</span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <Footer/>
</template>

<script>
import Footer from '@/components/Footer.vue'
import emitter from '@/methods/emitter'

export default {
  components: {
    Footer
  },
  data () {
    return {
      isLoading: false,
      cart: {},
      cartLength: 0,
      coupon: '',
      isCoupon: ''
    }
  },
  methods: {
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
    delCart (id) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`
      this.isLoading = true
      this.$http.delete(url).then((response) => {
        this.$httpMessageState(response, '移除購物車品項')
        this.getCart()
        this.isLoading = false
      }).catch((error) => {
        this.$httpMessageState(error, '錯誤訊息')
      })
    },
    updateCart (item) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`
      this.isLoading = true
      const cart = {
        product_id: item.product_id,
        qty: item.qty
      }
      this.$http.put(url, { data: cart }).then((response) => {
        this.getCart()
        this.$httpMessageState(response, '更新購物車品項')
      }).catch((error) => {
        this.$httpMessageState(error, '錯誤訊息')
      })
    },
    addCoupon () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/coupon`
      const coupon = {
        code: this.coupon
      }
      this.isLoading = true
      this.$http.post(url, { data: coupon }).then((response) => {
        if (response.data.success === true) {
          this.isCoupon = 'success'
          this.getCart()
          this.isLoading = false
        } else {
          this.isCoupon = 'fail'
          this.isLoading = false
        }
      }).catch((error) => {
        this.$httpMessageState(error, '錯誤訊息')
      })
    }
  },
  created () {
    this.getCart()
  }
}
</script>
