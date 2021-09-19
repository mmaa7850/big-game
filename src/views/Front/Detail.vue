<template>
  <Loading :active="isLoading"></Loading>
  <ShopNavBar :cartLength="cartLength" :cart="cart"></ShopNavBar>
  <NavBarSm :cartLength="cartLength"></NavBarSm>
  <div class="container detail">
    <div class="cartStep">
      <div class="centerWrap mx-auto">
        <div class="step d-flex justify-content-around align-items-stretch">
          <div class="step-item">
            <span>{{ $t('Cart.step-title-1') }}</span>
          </div>
          <div class="step-item isActive">
            <span>{{ $t('Cart.step-title-2') }}</span>
          </div>
          <div class="step-item">
            <span>{{ $t('Cart.step-title-3') }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="row centerWrap mx-auto form">
      <Form class="col-md-7" v-slot="{ errors }" @submit="createOrder">
        <h3 class="mb-3">{{ $t('Detail.formTitle') }}</h3>
        <div class="mb-3">
          <label for="name" class="form-label"
            >{{ $t('Detail.name') }} <span class="text-danger">*</span></label
          >
          <Field
            id="name"
            name="姓名"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['姓名'] }"
            placeholder="お名前を入力"
            rules="required"
            v-model="form.user.name"
          ></Field>
          <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
        </div>

        <div class="mb-3">
          <label for="tel" class="form-label"
            >{{ $t('Detail.tel') }} <span class="text-danger">*</span></label
          >
          <Field
            id="tel"
            name="電話"
            type="tel"
            class="form-control"
            :class="{ 'is-invalid': errors['電話'] }"
            placeholder="お電話番号を入力"
            rules="required"
            v-model="form.user.tel"
          ></Field>
          <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
        </div>

        <div class="mb-3">
          <label for="email" class="form-label"
            >{{ $t('Detail.email') }} <span class="text-danger">*</span></label
          >
          <Field
            id="email"
            name="email"
            type="email"
            class="form-control"
            :class="{ 'is-invalid': errors['email'] }"
            placeholder="Email"
            rules="email|required"
            v-model="form.user.email"
          ></Field>
          <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
        </div>

        <div class="mb-3">
          <label for="address" class="form-label"
            >{{ $t('Detail.address') }} <span class="text-danger">*</span></label
          >
          <Field
            id="address"
            name="地址"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['地址'] }"
            placeholder="お届け先"
            rules="required"
            v-model="form.user.address"
          ></Field>
          <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
        </div>

        <div class="mb-3">
          <label for="message" class="form-label">{{ $t('Detail.note') }}</label>
          <textarea
            name=""
            id="message"
            class="form-control"
            cols="30"
            rows="10"
            v-model="form.message"
          ></textarea>
        </div>
        <div class="text-end">
          <a
            href="#/cart"
            class="btn btn-outline-primary me-3 backBtn"
            >{{ $t('Detail.backToCart') }}</a
          >
          <button class="btn btn-danger">{{ $t('Detail.toCheckout') }}</button>
        </div>
      </Form>
      <div class="col-md-5">
        <div class="orderList">
          <h4 class="text-center">{{ $t('Detail.listTitle') }}</h4>
          <div class="orderList-wrap">
            <div
              class="orderList-item row"
              v-for="item in cart.carts"
              :key="item"
            >
              <div class="orderList-item-img col-4">
                <img :src="item.product.imageUrl" alt="" style="width: 110px" />
              </div>
              <div class="orderList-item-content col-8">
                <div class="orderList-item-title">
                  <span>{{ item.product.title }}</span>
                </div>
                <div class="orderList-item-amount">
                  <span>{{ item.qty }}{{ item.product.unit }}</span>
                  <span>NT ${{ $filters.currency(item.final_total) }}</span>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div class="orderList-total">
            <h4>{{ $t('Detail.listPrice') }}</h4>
            <strong>NT ${{ $filters.currency(cart.final_total) }}</strong>
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
      cart: {},
      cartLength: 0,
      isLoading: false,
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      }
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
    createOrder () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`
      const order = this.form
      this.isLoading = true
      this.$http.post(api, { data: order }).then((res) => {
        this.isLoading = false
        this.$router.push(`/order/${res.data.orderId}`)
      })
    }
  },
  created () {
    this.getCart()
  }
}
</script>
