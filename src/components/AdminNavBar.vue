<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
    <a class="navbar-brand" href="#/index">
      <img src="~@/assets/images/logo.svg" alt="" style="height:36px">
    </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
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
        // 登出後轉址回 login
        this.$router.push('/login')
      })
    }
  }
}
</script>
