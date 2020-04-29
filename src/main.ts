import Vue from 'vue'
import App from './App.vue'
import { AppModule } from '@/store/modules/app'
import SvgIcon from 'vue-svgicon'
import 'normalize.css'
import ElementUi from 'element-ui'
import i18n from '@/lang'
import router from './router'
import store from './store'
import '@/styles/index.scss'
import '@/styles/element-variables.scss'
import '@/permission'
import '@/utils/error-log'

Vue.config.productionTip = false
Vue.use(ElementUi, {
  size: AppModule.size,
  i18n: (key: string, value: string) => i18n.t(key, value)
})

Vue.use(SvgIcon, {
  tagName: 'svg-icon',
  defaultWidth: '1em',
  defaultHeight: '1em'
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
