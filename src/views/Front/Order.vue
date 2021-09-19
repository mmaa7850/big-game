<template>
  <Loading :active="isLoading"></Loading>
  <ShopNavBar :cartLength="cartLength" :cart="cart"></ShopNavBar>
  <NavBarSm :cartLength="cartLength"></NavBarSm>
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
      <h3 class="text-center my-5">{{ $t('Order.title') }}</h3>
      <div class="col-md-7">
        <table class="table orderTable">
          <thead>
            <tr>
              <th scope="1" colspan="2" class="text-center">{{ $t('Order.tableTitle') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th class="text-muted">{{ $t('Order.createTime') }}</th>
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
        <a
            href="#"
            class="btn checkoutBtn"
            @click.prevent="checkOut"
            v-if="order.is_paid === false"
            >{{ $t('Order.toPaid') }}</a
          >
        <a
            href="#/shop"
            class="btn toShopBtn"
            v-else
            >{{ $t('Cart.toShop') }}</a
          >
      </div>
      <div class="col-md-5">
        <div class="orderList">
          <h4 class="text-center">{{ $t('Detail.listTitle') }}</h4>
          <div class="orderList-wrap">
            <div class="orderList-item row" v-for="item in order.products" :key="item">
              <div class="orderList-item-img col-4">
                <img :src="item.product.imageUrl" alt="" style="width:110px">
              </div>
              <div class="orderList-item-content col-8">
                <div class="orderList-item-title">
                  <span>{{item.product.title}}</span>
                </div>
                <div class="orderList-item-amount">
                  <span>{{item.qty}}{{item.product.unit}}</span>
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
      cartLength: 0,
      cart: {},
      order: {
        user: {

        },
        message: ''
      },
      orderId: ''
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
        }
      })
    },
    checkOut () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/pay/${this.$route.params.id}`
      this.isLoading = true
      this.$http.post(api).then((res) => {
        this.getOrder()
        this.isLoading = false
      })
    }
  },
  created () {
    this.getOrder()
  }
}
</script>
