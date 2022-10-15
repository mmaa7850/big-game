<template>
  <Loading :active="isLoading"/>
  <AdminNavBar/>
  <div class="container-fluid">
    <ToastMessage/>
    <RouterView />
  </div>
</template>

<script>
import emitter from '@/methods/emitter'
import ToastMessage from '@/components/ToastMessages.vue'
import AdminNavBar from '@/components/AdminNavBar.vue'

export default {
  components: {
    ToastMessage,
    AdminNavBar
  },
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
  methods: {
    checkLogin () {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)gameToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
      this.$http.defaults.headers.common.Authorization = token
      const api = `${process.env.VUE_APP_API}api/user/check`
      this.isLoading = true
      this.$http.post(api).then((res) => {
        this.isLoading = false
        if (!res.data.success) {
          this.$router.push('/admin/login')
        } else {
          this.$router.push('/admin/products')
        }
      }).catch((error) => {
        this.$httpMessageState(error, '錯誤訊息')
      })
    }
  },
  created () {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)gameToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    if (token === '') {
      this.$router.push('/admin/login')
    } else {
      this.checkLogin()
    }
  }
}
</script>
