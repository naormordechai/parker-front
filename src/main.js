import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './stores/store.js'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// import VueMaterial from 'vue-material'
// import 'vue-material/dist/vue-material.min.css'

import './registerServiceWorker'
import './assets/style/main.scss'
import '../node_modules/animate.css/animate.min.css'

import * as VueGoogleMaps from 'vue2-google-maps'
import StorageService from '../services/StorageService.js'
import LocService from '../services/LocService.js'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyB3Inkvn9bFPdIultjxNHMjPqxwU_X0b40',
    libraries: 'places', // This is required if you use the Autocomplete plugin
  },
})

// Vue.use(VueMaterial)

Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    var user = StorageService.load('loggedInUser')
    if (user) {
      this.$store.commit({ type: 'setUser', user })
    }

    LocService.getPosition().then(({ coords }) => {
      this.$store.commit({
        type: 'setPosition',
        lat: coords.latitude,
        lng: coords.longitude
      })
    })

  }
}).$mount('#app')
