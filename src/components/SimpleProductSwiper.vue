<template>
  <Loading :active="isLoading"/>
  <div class="text-center">
    <h2 class="title-font d-inline title-bg">{{ $t('ProductSwiper.title') }}</h2>
  </div>
  <swiper :slidesPerView="3" :spaceBetween="30" :loop="true" :autoplay="option.autoplay" :breakpoints="option.breakpoints" class="pt-3 pb-5">
    <swiper-slide v-for="item in products" :key="item.id" class="simpleProductSwiper">
      <div class="productItem">
        <img :src="item.imageUrl" alt="imageUrl" class="productImg w-100"/>
        <router-link :to="`/products/${item.id}`" class="productLink">前往商品</router-link>
      </div>
    </swiper-slide>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper.scss'
import SwiperCore, { Autoplay } from 'swiper/core'

SwiperCore.use([Autoplay])

export default {
  components: {
    Swiper,
    SwiperSlide
  },
  props: ['products'],
  data () {
    return {
      productId: '',
      option: {
        autoplay: {
          delay: 2000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        },
        breakpoints: {
          0: {
            slidesPerView: 1,
            spaceBetween: 0
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 16
          },
          767: {
            slidesPerView: 3,
            spaceBetween: 18
          }
        }
      },
      isLoading: false
    }
  },
  methods: {
    getProduct (id) {
      this.$router.push(`/products/${id}`)
    }
  }
}
</script>
