<template>
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
          <label for="name" class="form-label">{{ $t('Detail.name') }} <span class="text-danger">*</span></label>
          <Field id="name" name="姓名" type="text" class="form-control" :class="{ 'is-invalid': errors['姓名'] }" :placeholder="$t('Detail.formName')" rules="required" v-model="form.user.name"/>
          <ErrorMessage name="姓名" class="invalid-feedback"/>
        </div>
        <div class="mb-3">
          <label for="tel" class="form-label">{{ $t('Detail.tel') }} <span class="text-danger">*</span></label>
          <Field id="tel" name="電話" type="tel" class="form-control" :class="{ 'is-invalid': errors['電話'] }" :placeholder="$t('Detail.formPhone')" :rules="isPhone" v-model="form.user.tel"/>
          <ErrorMessage name="電話" class="invalid-feedback"/>
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">{{ $t('Detail.email') }} <span class="text-danger">*</span></label>
          <Field id="email" name="email" type="email" class="form-control" :class="{ 'is-invalid': errors['email'] }" placeholder="Email" rules="email|required" v-model="form.user.email"/>
          <ErrorMessage name="email" class="invalid-feedback"/>
        </div>
        <div class="mb-3">
          <label for="address" class="form-label">{{ $t('Detail.address') }} <span class="text-danger">*</span></label>
          <Field id="address" name="地址" type="text" class="form-control" :class="{ 'is-invalid': errors['地址'] }" :placeholder="$t('Detail.formAddress')" rules="required" v-model="form.user.address"/>
          <ErrorMessage name="地址" class="invalid-feedback"/>
        </div>
        <div class="mb-3">
          <label for="message" class="form-label">{{ $t('Detail.note') }}</label>
          <textarea name="" id="message" class="form-control" :placeholder="$t('Detail.formTextArea')" cols="30" rows="5" v-model="form.message"/>
        </div>
        <div class="text-end">
          <router-link to="/cart" class="btn btn-outline-primary me-3 backBtn">{{ $t('Detail.backToCart') }}</router-link>
          <button class="btn btn-danger" type="submit">{{ $t('Detail.toCheckout') }}</button>
        </div>
      </Form>
      <div class="col-md-5">
        <div class="orderList">
          <h4 class="text-center">{{ $t('Detail.listTitle') }}</h4>
          <div class="orderList-wrap">
            <div class="orderList-item row" v-for="item in cart.carts" :key="item">
              <div class="orderList-item-img col-md-4 col-sm-3 col-3">
                <img :src="item.product.imageUrl" alt="product.image" style="width: 110px" />
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
            <strong>NT ${{ $filters.currency(cart.final_total) }}</strong>
          </div>
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
    createOrder () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`
      const order = this.form
      this.isLoading = true
      this.$http.post(api, { data: order }).then((res) => {
        this.isLoading = false
        this.$router.push(`/order/${res.data.orderId}`)
      }).catch((error) => {
        this.$httpMessageState(error, '錯誤訊息')
      })
    },
    isPhone (value) {
      const number = /^(09)[0-9]{8}$/
      return number.test(value) ? true : '請輸入正確的電話號碼'
    }
  },
  created () {
    this.getCart()
  }
}
</script>
