import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'

Vue.config.productionTip = false
Vue.config.devtools = true
Vue.use(Vuelidate)

const app = new Vue({
  render: h => h(App),
})
app.$mount('#app')
