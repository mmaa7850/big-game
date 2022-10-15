<template>
  <Loading :active="isLoading"/>
  <div class="container">
    <div class="text-end mt-2">
      <button class="btn btn-primary text-white" type="button" @click="openModal(true)">增加一個產品</button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="100">是否啟用</th>
          <th width="200">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-right">{{ $filters.currency(item.origin_price) }}</td>
          <td class="text-right">{{ $filters.currency(item.price) }}</td>
          <td>
            <span class="text-success" v-if="item.is_enabled">啟用</span>
            <span class="text-danger" v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button class="btn btn-outline-primary btn-sm" type="button" @click="openModal(false, item)">編輯</button>
              <button class="btn btn-outline-danger btn-sm" type="button" @click="openDelModal(item)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <Pagination :pages="pagination" @emit-page="getProducts"/>
  <ProductModal ref="productModal" :product="tempProduct" @update-product="updateProduct"/>
  <DelModal ref="delModal" :item="tempProduct" @del-product="delProduct"/>
</template>

<script>
import ProductModal from '@/components/ProductModal.vue'
import DelModal from '@/components/DelModal.vue'
import Pagination from '@/components/Pagination.vue'

export default {
  data () {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: false,
      isLoading: false
    }
  },
  components: {
    ProductModal,
    DelModal,
    Pagination
  },
  inject: ['emitter'],
  methods: {
    getProducts (page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products/?page=${page}`
      this.isLoading = true
      this.$http.get(api).then((res) => {
        this.isLoading = false
        this.products = res.data.products
        this.pagination = res.data.pagination
      }).catch((error) => {
        this.$httpMessageState(error, '錯誤訊息')
      })
    },
    openModal (isNew, item) {
      if (isNew) {
        this.tempProduct = {}
      } else {
        this.tempProduct = { ...item }
      }
      this.isNew = isNew
      const productComponent = this.$refs.productModal
      productComponent.showModal()
    },
    updateProduct (item) {
      this.tempProduct = item
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`
      let httpMethod = 'post'
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`
        httpMethod = 'put'
      }
      const productComponent = this.$refs.productModal
      this.isLoading = true
      this.$http[httpMethod](api, { data: this.tempProduct }).then((res) => {
        this.isLoading = false
        productComponent.hideModal()
        this.$httpMessageState(res, '編輯商品')
      }).catch((error) => {
        this.$httpMessageState(error, '錯誤訊息')
      })
    },
    openDelModal (item) {
      this.tempProduct = { ...item }
      const delComponent = this.$refs.delModal
      delComponent.showModal()
    },
    delProduct () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`
      this.isLoading = true
      this.$http.delete(api).then((res) => {
        this.isLoading = false
        const delComponent = this.$refs.delModal
        delComponent.hideModal()
        this.$httpMessageState(res, '刪除產品')
        this.getProducts()
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
      this.getProducts()
    }
  }
}
</script>
