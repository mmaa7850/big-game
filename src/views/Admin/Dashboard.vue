<template>
  <Loading :active="isLoading"></Loading>
  <AdminNavBar></AdminNavBar>
  <div class="container-fluid">
    <ToastMessage></ToastMessage>
    <router-view />
  </div>
</template>

<script>
import emitter from '@/methods/emitter'
import ToastMessage from '@/components/ToastMessages.vue'
import AdminNavBar from '@/components/AdminNavBar.vue'
export default {
  // 以區域元件方式
  components: {
    ToastMessage,
    AdminNavBar
  },
  // provide 可以讓內層元件使用外層功能
  provide () {
    return {
      emitter
    }
  },
  data () {
    return {
      isLoading: false
    }
  },
  created () {
    // 取出 cookie
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)gameToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    this.$http.defaults.headers.common.Authorization = `${token}`
    // 檢查是否持續登入
    const api = `${process.env.VUE_APP_API}api/user/check`
    this.isLoading = true
    this.$http.post(api, this.user).then((res) => {
      this.isLoading = false
      // 如果登入失敗
      if (!res.data.success) {
        // 轉址回到 login
        this.$router.push('/login')
      }
    })
  }
}
</script>
