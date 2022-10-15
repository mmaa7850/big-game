<template>
  <Loading :active="isLoading"/>
  <ShopNavBar :cartLength="cartLength" :cart="cart"/>
  <NavBarSm :cartLength="cartLength"/>
  <div class="container order">
    <div class="cartStep">
      <div class="centerWrap mx-auto">
        <div class="step d-flex justify-content-around align-items-stretch">
          <div class="step-item">
            <span>{{ $t('Cart.step-title-1') }}</span>
          </div>
          <div class="step-item">
            <span>{{ $t('Cart.step-title-2') }}</span>
          </div>
          <div class="step-item isActive">
            <span>{{ $t('Cart.step-title-3') }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="row centerWrap mx-auto">
      <h3 class="text-center d-none isPaid text-success">{{ $t('Order.paid') }}</h3>
      <h3 class="text-center isOrder" :class="{ 'animate__animated + animate__backOutRight + animate__slow' : order.is_paid === true }">{{ $t('Order.title') }}</h3>
      <div class="col-md-7">
        <table class="table orderTable">
          <thead>
            <tr>
              <th scope="1" colspan="2" class="text-center">{{ $t('Order.tableTitle') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th class="text-muted">{{ $t('Order.id') }}</th>
              <td>{{ order.id }}</td>
            </tr>
            <tr>
              <th>{{ $t('Order.createTime') }}</th>
              <td>{{ new Date().toLocaleString(order.create_at) }}</td>
            </tr>
            <tr>
              <th>{{ $t('Order.name') }}</th>
              <td>{{ order.user.name }}</td>
            </tr>
            <tr>
              <th>{{ $t('Order.tel') }}</th>
              <td>{{ order.user.tel }}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{{ order.user.email }}</td>
            </tr>
            <tr>
              <th>{{ $t('Order.address') }}</th>
              <td>{{ order.user.address }}</td>
            </tr>
            <tr>
              <th>{{ $t('Order.note') }}</th>
              <td>{{ order.message }}</td>
            </tr>
            <tr>
              <th>{{ $t('Order.is_paid') }}</th>
              <td v-if="order.is_paid === true" class="text-success">{{ $t('Order.paid') }}</td>
              <td v-else class="text-danger">{{ $t('Order.not_paid') }}</td>
            </tr>
          </tbody>
        </table>
        <a href="#" class="btn checkoutBtn" @click.prevent="checkOut" v-if="order.is_paid === false">{{ $t('Order.toPaid') }}</a>
        <router-link to="/shop" class="btn toShopBtn" v-else>{{ $t('Cart.toShop') }}</router-link>
      </div>
      <div class="col-md-5">
        <div class="orderList">
          <h4 class="text-center">{{ $t('Detail.listTitle') }}</h4>
          <div class="orderList-wrap">
            <div class="orderList-item row" v-for="item in order.products" :key="item">
              <div class="orderList-item-img col-md-4 col-sm-3 col-3">
                <img :src="item.product.imageUrl" alt="product-image" style="width:110px"/>
              </div>
              <div class="orderList-item-content col-md-8 col-sm-9 col-9">
                <div class="orderList-item-title">
                  <span>{{ item.product.title }}</span>
                </div>
                <div class="orderList-item-amount">
                  <span>{{ item.qty }}{{ $t('CartModal.unit') }}</span>
                  <span>NT ${{ $filters.currency(item.final_total) }}</span>
                </div>
              </div>
            </div>
          </div>
          <hr/>
          <div class="orderList-total">
            <h4>{{ $t('Detail.listPrice') }}</h4>
            <strong>NT ${{ $filters.currency(order.total) }}</strong>
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
      isLoading: false,
      cartLength: 0,
      cart: {},
      order: {
        user: {

        },
        message: ''
      },
      orderId: '',
      count: 1,
      isState: false
    }
  },
  watch: {
    isState () {
      const dNone = document.querySelector('.isOrder')
      const addAnimate = document.querySelector('.isPaid')
      const classesToAdd = ['animate__animated', 'animate__backInLeft', 'animate__slow']
      if (this.isState === true) {
        window.setTimeout(() => {
          dNone.classList.add('d-none')
          addAnimate.classList.remove('d-none')
          addAnimate.classList.add(...classesToAdd)
        }, 1000)
      }
    }
  },
  methods: {
    getOrder () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order/${this.$route.params.id}`
      this.isLoading = true
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.isLoading = false
          this.order = res.data.order
          this.isState = res.data.order.is_paid
        }
      }).catch((error) => {
        this.$httpMessageState(error, '錯誤訊息')
      })
    },
    checkOut () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/pay/${this.$route.params.id}`
      this.$http.post(api).then(() => {
        this.getOrder()
        this.isState = true
      }).catch((error) => {
        this.$httpMessageState(error, '錯誤訊息')
      })
    }
  },
  created () {
    this.getOrder()
  }
}
</script>
