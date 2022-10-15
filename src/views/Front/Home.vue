<template>
  <ToastMessage/>
  <RouterView/>
</template>

<script>
import emitter from '@/methods/emitter'
import ToastMessage from '@/components/ToastMessages.vue'

export default {
  components: {
    ToastMessage
  },
  provide () {
    return {
      emitter
    }
  }
}
</script>
