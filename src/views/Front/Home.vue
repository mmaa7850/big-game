<template>
  <ToastMessage/>
  <Loading :active="isLoading"/>
  <ShopNavBar :cartLength="cartLength" :cart="cart"/>
  <NavBarSm :cartLength="cartLength"/>
  <RouterView/>
</template>

<script>
import emitter from '@/methods/emitter'
import ToastMessage from '@/components/ToastMessages.vue'
import ShopNavBar from '@/components/ShopNavBar.vue'
import NavBarSm from '@/components/NavBarSm.vue'

export default {
  components: {
    ToastMessage,
    ShopNavBar,
    NavBarSm
  },
  provide () {
    return {
      emitter
    }
  },
  data () {
    return {
      cart: {},
      cartLength: 0,
      isLoading: false
    }
  },
  methods: {
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
  created () {
    this.getCart()
  }
}
</script>
