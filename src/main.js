import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap'
import 'animate.css'
import App from './App.vue'
import router from './router'
import Loading from 'vue3-loading-overlay'
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css'
import { currency, date } from './methods/filters'
import $httpMessageState from './methods/pushMessageState'
import 'bootstrap-icons/font/bootstrap-icons.css'
import {
  Form, Field, ErrorMessage, defineRule, configure
} from 'vee-validate'
import AllRules from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'
import i18n from './plugins/i18n'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTwitter, faFacebook, faLine, faSquareInstagram } from '@fortawesome/free-brands-svg-icons'
import AOS from 'aos'
import 'aos/dist/aos.css'

const app = createApp(App)
app.config.globalProperties.$filters = {
  date,
  currency
}
Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule])
})

library.add(faTwitter, faFacebook, faLine, faSquareInstagram)

app.config.productionTip = false

AOS.init({
  once: true
})

configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: true // 當輸入任何內容直接進行驗證
})
// 設定預設語系
setLocale('zh_TW')

app.config.globalProperties.$httpMessageState = $httpMessageState
app.use(VueAxios, axios)
app.use(router)
app.use(i18n)
app.component('Loading', Loading)
app.component('Form', Form)
app.component('Field', Field)
app.component('ErrorMessage', ErrorMessage)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
