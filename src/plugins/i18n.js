import { createI18n } from 'vue-i18n'
// 載入語言
import jp from '@/lang/jp.json'
import tw from '@/lang/tw.json'

const i18n = createI18n({
  locale: 'jp', // 設定語言
  fallbackLocale: 'jp', // 若選擇的語言缺少翻譯則退回的語言
  messages: {
    jp,
    tw
  }
})
export default i18n
