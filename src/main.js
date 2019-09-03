import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import VueTextareaAutosize from 'vue-textarea-autosize'
import 'buefy/dist/buefy.css'

import Navigation from './components/Navigation.vue'
// import ListOptions from './components/ListOptions.vue'


Vue.component('navigation', Navigation);
Vue.directive('focus', {
  // When the bound element is inserted into the DOM...
  inserted: function (el) {
    // Focus the element
    el.focus()
  }
});


Vue.config.productionTip = false

Vue.use(Buefy)
Vue.use(VueTextareaAutosize)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
