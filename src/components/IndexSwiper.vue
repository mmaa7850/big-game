<template>
  <swiper
    :autoplay="option.autoplay"
    :effect="'fade'"
    :spaceBetween="30"
     class="IndexSwiper"
  >
    <swiper-slide>
      <router-link to="/products/-MhRhRiVg2S0bNIkCSGW">
      <div class="banner-01"></div>
      </router-link>
    </swiper-slide>
    <swiper-slide>
      <router-link to="/products/-MhRkUDBRg3LIJ4iI5ka">
      <div class="banner-02"></div>
      </router-link>
    </swiper-slide>
    <swiper-slide>
      <router-link to="/products/-MhqXHGkgXZ2onXAISAz">
      <div class="banner-03"></div>
      </router-link>
    </swiper-slide>
  </swiper>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/swiper-bundle.css'

// import Swiper core and required modules
import SwiperCore, {
  Autoplay, EffectFade
} from 'swiper/core'

// install Swiper modules
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
  }
}

</script>
