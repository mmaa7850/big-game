<template>
  <Loading :active="isLoading"/>
  <ToastMessage/>
  <div class="container mt-5">
    <form class="row justify-content-center" @submit.prevent="signIn">
      <div class="col-md-6 login p-3" style="border:2px solid #c8c8c8; border-radius:20px">
        <h1 class="h3 mb-3 font-weight-normal">{{ $t('Login.login') }}</h1>
        <div class="mb-2">
          <label for="inputEmail" class="sr-only">Email</label>
          <input type="email" id="inputEmail" class="form-control" placeholder="Email" required autofocus v-model="user.username"/>
        </div>
        <div class="mb-2">
          <label for="inputPassword" class="sr-only">{{ $t('Login.password') }}</label>
          <input type="password" id="inputPassword" class="form-control" placeholder="Password" required v-model="user.password"/>
        </div>
        <div class="text-end mt-4">
          <button class="btn btn-lg btn-primary btn-block text-white" type="submit">登入</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import ToastMessage from '@/components/ToastMessages.vue'

export default {
  components: {
    ToastMessage
  },
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      isLoading: false
    }
  },
  inject: ['emitter'],
  methods: {
    signIn () {
      const api = `${process.env.VUE_APP_API}admin/signin`
      this.isLoading = true
      this.$http.post(api, this.user).then((res) => {
        this.isLoading = false
        if (res.data.success) {
          const { token, expired } = res.data
          document.cookie = `gameToken=${token}; expires=${new Date(expired)}`
          this.$router.push('/admin/products')
        } else {
          this.emitter.emit('push-message', {
            style: 'danger',
            title: '錯誤',
            content: res.data.message
          })
        }
      }).catch((error) => {
        this.$httpMessageState(error, '錯誤訊息')
      })
    }
  }
}
</script>
