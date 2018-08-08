import UserService from '../../services/UserService.js'
import StorageService from '../../services/StorageService.js'

export default {
  state: {
    user: {
      _id: '',
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    },
  },
  getters: {
    isLoggedIn(state) {
      return !!state.user._id
    },
    loggedInUser(state) {
      return state.user
    }
  },
  mutations: {
    setUser(state, { user }) {
      state.user = user
    },
    logoutUser(state) {
      state.user = {
        _id: '',
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      }
    },
<<<<<<< HEAD
    addUser(state, { newUser }) {
=======
    addUser(state, {newUser}) {      
>>>>>>> 806fdf7bbc16896596244122f96c2b2d2361ed04
      state.user = newUser
    }
  },
  actions: {
    login(context, { userInfo }) {
      return UserService.login(userInfo)
<<<<<<< HEAD
        .then(user => {
          console.log('UserModule-55-this user logged in successfully', user)
=======
        .then(user => {          
          if (!user) {
            return Promise.reject(err => err)
          } 
>>>>>>> 806fdf7bbc16896596244122f96c2b2d2361ed04
          context.commit({ type: 'setUser', user: user })
          StorageService.store('loggedInUser', user)
          return user
        })
        .catch(err => {
          return Promise.reject()
        })
<<<<<<< HEAD

    },
    signup(context, { newUser }) {
       UserService.addUser(newUser)
        .then(newUser => {
          console.log('new user before committing:', newUser)
          context.commit({ type: 'addUser', newUser })
        })
    },

=======
      .catch (err => {
        return Promise.reject()
       })

    },
    signup(context, {newUser}) {
      return UserService.addUser(newUser)
      .then (newUser => {
        context.commit({type:'addUser', newUser})
      })
    },
    
>>>>>>> 806fdf7bbc16896596244122f96c2b2d2361ed04
  }
}