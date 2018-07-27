import Vue from 'vue'
import Vuex from 'vuex'
import ParkingModule from '@/ParkingModule.js'
import UserModule from '@/UserModule.js'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
<<<<<<< HEAD
    user :{
      // _id : '5b583081f6d632e56ebd6a43',
      firstName : '',
      lastName: '',
      eMail: ''
    }
=======
   
>>>>>>> 019c07706d432bb046a9613aac7c15a4d68f9f7a
  },
  getters: {
  },
  mutations: {
   
    
  },
  actions: {

  },
  modules:{
    ParkingModule,
    UserModule,
  }
})
