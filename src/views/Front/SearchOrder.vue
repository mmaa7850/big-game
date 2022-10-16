<template>
  <Swiper/>
  <div class="container SearchOrder">
    <h1 class="fs-2 text-center fw-bold title-font">{{ $t("SearchOrder.search-order") }}</h1>
    <div class="centerWrap mx-auto mt-4">
      <div class="input-group mt-5 mb-1">
        <input type="text" class="form-control" :placeholder="$t('SearchOrder.enter-order')" v-model="orderId"/>
        <button class="btn btn-dark" type="button" @click="getOrder">{{ $t("SearchOrder.search") }}</button>
      </div>
      <div class="row mx-auto mt-5">
        <div class="col-md-7" v-if="order.create_at">
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
        </div>
        <div class="col-md-5" v-if="order.create_at">
          <div class="orderList">
            <h4 class="text-center">{{ $t('Detail.listTitle') }}</h4>
            <div class="orderList-wrap">
              <div class="orderList-item row" v-for="item in order.products" :key="item">
                <div class="orderList-item-img col-4">
                  <img :src="item.product.imageUrl" alt="product-image" style="width:110px"/>
                </div>
                <div class="orderList-item-content col-8">
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
  </div>
  <Footer/>
</template>

<script>
import Swiper from '@/components/Swiper.vue'
import Footer from '@/components/Footer.vue'
import emitter from '@/methods/emitter'

export default {
  components: {
    Swiper,
    Footer
  },
  inject: ['emitter'],
  data () {
    return {
      orderId: '',
      order: {
        user: {
        }
      }
    }
  },
  methods: {
    getOrder () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order/${this.orderId}`
      this.isLoading = true
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.isLoading = false
          this.order = res.data.order
          this.isState = res.data.order.is_paid
          this.emitter.emit('push-message', {
            style: 'success',
            title: '已取得訂單資料'
          })
        }
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
        emitter.emit('updateCart', this.cart)
        emitter.emit('updateCartLength', this.cartLength)
        this.isLoading = false
      }).catch((error) => {
        this.$httpMessageState(error, '錯誤訊息')
      })
    }
  }
}

</script>
