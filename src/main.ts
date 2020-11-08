import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/styles/index.scss' // global css
import '@/icons'

import { Pagination, Table, TableColumn, Loading, Input, Message, Dropdown, DropdownMenu, DropdownItem } from 'element-ui'
Vue.use(Pagination)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Input)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Loading.directive);
Vue.prototype.$message = Message

import { scrollBoard, borderBox8 } from '@jiaminghi/data-view'
Vue.use(scrollBoard)
Vue.use(borderBox8)
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
