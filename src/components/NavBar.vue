<template>
    <header id="header" class="d-flex flex-column align-items-center">
      <h1 class="logo">
        <router-link to="/index">
          <img src="~@/assets/images/logo.svg" alt="" style="height:36px">
        </router-link>
      </h1>
      <nav id="nav">
        <ul class="nav-list px-0 text-center pt-4">
          <li>
            <router-link to="/index#news">{{ $t('NavBar.info') }}</router-link>
          </li>
          <li>
            <router-link to="/index#info">{{ $t('NavBar.company-info') }}</router-link>
          </li>
          <li>
            <router-link to="/index#branch">{{ $t('NavBar.branch') }}</router-link>
          </li>
          <li>
            <router-link to="/shop">{{ $t('NavBar.online-shop') }}</router-link>
          </li>
          <li class="nav-lang mt-4">
            <a href="#" id="jp" @click.prevent="handleChangeLanguage">日本語</a>
            <span class="px-2">|</span>
            <a href="#" id="tw" @click.prevent="handleChangeLanguage">繁体中文</a>
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
  setup (props, context) {
    const { locale } = useI18n()
    const handleChangeLanguage = (e) => {
      locale.value = e.target.getAttribute('id')
    }
    return {
      handleChangeLanguage
    }
  }
}
</script>
