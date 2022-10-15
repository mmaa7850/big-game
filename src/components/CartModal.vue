<template>
  <div class="top-account-aside-cart" :class="{ 'cart-hide': hide === true}" v-if="cartLength > 0">
    <div class="top-account-cart">
      <ul class="top-account-cart-list">
        <li v-for="item in cart.carts" :key="item">
          <router-link :to="`/products/${item.product.id}`" class="d-flex align-items-center">
            <figure class="mb-0">
              <img :src="item.product.imageUrl" alt="product.image" />
            </figure>
            <p class="top-account-cart-span mb-0">
              <span class="top-account-cart-name">{{ item.product.title }}</span>
              <span class="top-account-cart-count">{{ item.qty }} {{ $t('CartModal.unit') }}</span>
              <span class="top-account-cart-price">NT ${{ $filters.currency(item.total) }}</span>
            </p>
          </router-link>
        </li>
      </ul>
      <ul class="top-account-cart-total d-flex justify-content-center">
        <li class="top-account-cart-total-count">小計 <span>{{ cartLength }}</span>{{ $t('CartModal.unit') }}</li>
        <li class="top-account-cart-total-price">NT ${{ $filters.currency(cart.total) }} 元</li>
      </ul>
      <p class="top-account-cart-link mb-0">
        <router-link to="/cart" class="top-account-cart-link-a text-center">
          <span>{{ $t('CartModal.cart') }}</span>
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['cart', 'cartLength', 'hide'],
  data () {
    return {
      close: true
    }
  }
}
</script>
