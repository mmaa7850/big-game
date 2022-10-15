<template>
  <header id="header" class="d-flex flex-column align-items-center">
    <h1 class="logo">
      <router-link to="/">
        <img src="~@/assets/img/logo.svg" alt="logo" style="height:36px"/>
      </router-link>
    </h1>
    <nav id="nav">
      <ul class="nav-list px-0 text-center pt-4">
        <li class="title-font">
          <router-link to="/favorite">{{ $t('NavBar.favorite') }}</router-link>
        </li>
        <li class="title-font">
          <router-link to="/searchOrder">{{ $t('NavBar.search-order') }}</router-link>
        </li>
        <li class="title-font">
          <router-link to="/shop">{{ $t('NavBar.online-shop') }}</router-link>
        </li>
        <li class="nav-lang mt-4">
          <a href="#" id="jp" @click.prevent="handleChangeLanguage('jp')">日本語</a>
          <span class="px-2">|</span>
          <a href="#" id="tw" @click.prevent="handleChangeLanguage('tw')">繁体中文</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { useI18n } from 'vue-i18n'

export default {
  props: {
    msg: String
  },
  data () {
    return {
      locale: useI18n()
    }
  },
  methods: {
    handleChangeLanguage (lang) {
      this.locale.locale = lang
    }
  }
}
</script>
