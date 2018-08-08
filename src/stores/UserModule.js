import UserService from '../../services/UserService.js'
import StorageService from '../../services/StorageService.js'

export default {
  state: {
    user: {
      _id: '',
      firstName: '',
      lastName: '',
      eMail: '',
      password: ''
    },
    
    aboutUser:''
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
      // console.log('sababa',state.user);
    },
    logoutUser(state) {
      state.user = {
        _id: '',
        firstName: '',
        lastName: '',
        eMail: ''
      }
    },
    addUser(state, {newUser}) {
      // state.users.push(newUser)
      // console.log('state with new user: ', state)
      state.user = newUser
      console.log('new user logged in: ', state.user)
    }
  },
  actions: {
    login(context,  {userInfo}) {
      return UserService.login(userInfo)
        .then(user => {
          
          console.log('UserModule -50-this user', user)
          if (!user) {
            console.log('UserModule-52-this user', user)
            return Promise.reject(err => err)
          } 
          console.log('UserModule-55-this user logged in successfully', user)
          context.commit({ type: 'setUser', user: user })
          StorageService.store('loggedInUser', user)
          return Promise.resolve(user)
        })
      .catch (err => {
        console.log('wrong login details')
        return Promise.reject()
        console.log(err)
       })

    },
    signup(context, {newUser}) {
      UserService.addUser(newUser)
      .then (newUser => {
        console.log('new user before committing:', newUser)
        context.commit({type:'addUser', newUser})
      })
    },
    logout(context) {
      context.commit({ type: 'logoutUser' })
      console.log('user logged out successfully')
    }
    

  }
}