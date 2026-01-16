// https://vitepress.dev/guide/custom-theme
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import Download from './layouts/download.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({app}) {
    app.component('download' , Download)
  }
}