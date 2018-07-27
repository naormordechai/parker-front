import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user :{
      // _id : '5b583081f6d632e56ebd6a43',
      firstName : '',
      lastName: '',
      eMail: ''
    }
  },
  getters: {
    isLoggedIn (state){
      return !!state.user._id
    },
    loggedInUser(state){
      return state.user
    }
  },
  mutations: {
    setUser(state,{user}){
      state.user = user
    }
  },
  actions: {

  }
})
