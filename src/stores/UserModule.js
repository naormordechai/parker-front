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
      console.log('state logged in user: ', state.user)
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
      UserService.login(userInfo)
        .then(user => {
          console.log('naor mordechaix',user);
          
          if (!user._id) return Promise.reject()
          console.log('this user logged in successfullyyyyyyyyyyyy', user)
          context.commit({ type: 'setUser', user: user })
          StorageService.store('loggedInUser', user)
          return Promise.resolve(user)
        })
      .catch (err => {
        console.log('wrong login details')
        return Promise.reject()
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