<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
    <router-link class="navbar-brand" to="/index">
      <img src="~@/assets/img/logo.svg" alt="logo" style="height:36px"/>
    </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"/>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <div class="navbar-nav me-auto adminNavbar-nav">
          <router-link to="/admin/products" class="nav-link">產品</router-link>
          <router-link to="/admin/order" class="nav-link">訂單</router-link>
          <router-link to="/admin/coupon" class="nav-link">優惠券</router-link>
          <a href="#" @click.prevent="logOut" class="nav-link">登出</a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    logOut () {
      const api = `${process.env.VUE_APP_API}logout`
      this.$http.post(api, this.user).then((res) => {
        if (res.data.success) {
          document.cookie = `gameToken= ;expires=${new Date()}`
          this.$router.push('/admin/login')
        }
      }).catch((error) => {
        this.$httpMessageState(error, '錯誤訊息')
      })
    }
  }
}
</script>
