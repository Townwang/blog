// https://vitepress.dev/guide/custom-theme
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import * as dailyPwdUtils from './utils/dailyPwd'
import Download from './layouts/download.vue'
import DailyPassword from './layouts/DailyPassword.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({app}) {
    app.component('download' , Download)
    app.component('password' , DailyPassword)
    app.config.globalProperties.$dailyPwd = dailyPwdUtils
  }
}