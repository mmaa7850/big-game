<template>
  <swiper :autoplay="option.autoplay" :effect="'fade'" :spaceBetween="30" class="Swiper">
    <swiper-slide>
      <router-link to="/products/-NB_VnzT2NJpth_7oJn8">
        <div class="swiperBg-01"/>
      </router-link>
    </swiper-slide>
    <swiper-slide>
      <router-link to="/products/-NB_cIlyIh8h9sw4cdh-">
        <div class="swiperBg-02"/>
      </router-link>
    </swiper-slide>
    <swiper-slide>
      <router-link to="/products/-MidPegkzga8xS_Hk3sU">
        <div class="swiperBg-03"/>
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
  }
}
</script>

<style scoped>
  .Swiper {
    padding-top: 90px;
  }
  @media screen and (max-width: 991px) {
      .Swiper {
        padding-top: 58px;
      }
    }
  .swiperBg-01 {
  background-image: url("~@/assets/img/pokemon.jpg");
  background-size: cover;
  background-position: 50%;
  background-repeat: no-repeat;
  min-height: 410px
  }
  .swiperBg-02 {
  background-image: url("~@/assets/img/horizon.jpg");
  background-size: cover;
  background-position: 50%;
  background-repeat: no-repeat;
  min-height: 410px
  }
  .swiperBg-03 {
  background-image: url("~@/assets/img/car.jpg");
  background-size: cover;
  background-position: 50%;
  background-repeat: no-repeat;
  min-height: 410px
  }
  @media screen and (max-width: 768px) {
      .swiperBg-01,.swiperBg-02,.swiperBg-03 {
        min-height: 300px
      }
    }
  @media screen and (max-width: 576px) {
    .swiperBg-01 {
        background-image: url("~@/assets/img/pokemon.jpg")
      }
  }
</style>
