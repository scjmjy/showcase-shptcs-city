import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/styles/index.scss' // global css
import '@/icons'
import { scrollBoard } from '@jiaminghi/data-view'

import { Pagination } from 'element-ui'
Vue.use(Pagination)

Vue.use(scrollBoard)
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
