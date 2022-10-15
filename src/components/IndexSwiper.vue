<template>
  <swiper :autoplay="option.autoplay" :effect="'fade'" :spaceBetween="30" class="IndexSwiper">
    <swiper-slide>
      <div class="arrow-animate" @click="slide">
        <div class="arrow"/>
        <div class="arrow"/>
        <div class="arrow"/>
      </div>
      <router-link to="/products/-MhRhRiVg2S0bNIkCSGW">
        <div class="banner-01"/>
      </router-link>
    </swiper-slide>
    <swiper-slide>
      <div class="arrow-animate" @click="slide">
        <div class="arrow"/>
        <div class="arrow"/>
        <div class="arrow"/>
      </div>
      <router-link to="/products/-MhRkUDBRg3LIJ4iI5ka">
        <div class="banner-02"/>
      </router-link>
    </swiper-slide>
    <swiper-slide>
      <div class="arrow-animate" @click="slide">
        <div class="arrow"/>
        <div class="arrow"/>
        <div class="arrow"/>
      </div>
      <router-link to="/products/-MhqXHGkgXZ2onXAISAz">
        <div class="banner-03"/>
      </router-link>
    </swiper-slide>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper-bundle.css'
import SwiperCore, {
  Autoplay, EffectFade
} from 'swiper/core'

SwiperCore.use([Autoplay, EffectFade])

export default {
  components: {
    Swiper,
    SwiperSlide
  },
  data () {
    return {
      option: {
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        }
      }
    }
  },
  methods: {
    slide () {
      this.$emit('slide')
    }
  }
}
</script>
