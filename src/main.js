import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import animejs from 'vue-animejs';

Vue.config.productionTip = false

Vue.use(animejs);

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
