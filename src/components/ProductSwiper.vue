<template>
  <Loading :active="isLoading"/>
  <h2 class="text-center pt-5">{{ $t('ProductSwiper.title') }}</h2>
  <swiper :slidesPerView="3" :spaceBetween="30" :autoplay="option.autoplay" :breakpoints="option.breakpoints" class="mySwiper">
    <swiper-slide v-for="item in products" :key="item.id" class="ProductSwiper">
      <div class="row g-4 pt-4">
        <router-link :to="`/products/${item.id}`" class="product_Card_Togo">
          <div class="col">
            <div class="card mb-4 h-100">
              <img :src="item.imageUrl" class="card-img-top" alt="product-image" />
              <div class="card-body">
                <h6 class="card-title">{{ item.title }}</h6>
                <div class="card-text d-flex justify-content-between align-items-center">
                  <del>NT ${{ $filters.currency(item.origin_price) }}</del>
                  <strong class="text-danger">NT ${{ $filters.currency(item.price) }}</strong>
                </div>
                <button class="btn btn-outline-danger w-100 mt-2 I-btn" type="button">{{ $t('ProductSwiper.Swiper-button') }}</button>
              </div>
            </div>
          </div>
        </router-link>
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
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 24
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
