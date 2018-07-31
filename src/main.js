import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './stores/store.js'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import './registerServiceWorker'
import './assets/style/main.scss'

import * as VueGoogleMaps from 'vue2-google-maps'
import StorageService from '../services/StorageService.js'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyC6AifY9XewU3b2wEp0Dr7XKyOjSS1oebQ',
    libraries: 'places', // This is required if you use the Autocomplete plugin
  },
})



Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    var user = StorageService.load('loggedInUser')
    if (user) {
      this.$store.commit({type:'setUser', user})
    }

  }
}).$mount('#app')
