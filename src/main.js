import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
Vue.config.devtools = true

const app = new Vue({
  render: h => h(App),
})
app.$mount('#app')
