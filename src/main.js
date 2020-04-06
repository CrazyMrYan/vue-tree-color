import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vue2OrgTree from 'vue-tree-color'

Vue.use(Vue2OrgTree)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
