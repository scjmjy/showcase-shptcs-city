import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/styles/index.scss' // global css
import '@/icons'

import { Pagination, Table, TableColumn, Loading } from 'element-ui'
Vue.use(Pagination)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Loading.directive);

import { scrollBoard } from '@jiaminghi/data-view'
Vue.use(scrollBoard)
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
