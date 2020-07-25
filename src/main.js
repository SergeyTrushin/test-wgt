import Vue from 'vue'
import App from './App.vue'
import store from './store'
import { VueResponsiveComponents } from "vue-responsive-components"

Vue.config.productionTip = false

Vue.use(VueResponsiveComponents)

new Vue({
	store,
  render: h => h(App)
}).$mount('#app')
