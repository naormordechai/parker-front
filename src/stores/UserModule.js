import UserService from '../../services/UserService.js'
import StorageService from '../../services/StorageService.js'

export default{
    state: {
        user :{
          _id : '',
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
        },
        logoutUser(state) {
          state.user = {
            _id : '',
            firstName : '',
            lastName: '',
            eMail: ''
          }
          console.log('state logged in user: ', state.user)
        }
      },
      actions: {
        login(context, {email}){
          UserService.login(email)
          .then (user => {
              if (!user._id) return Promise.reject()
              console.log('this user logged in successfully', user)
              context.commit({type: 'setUser', user: user})  
              StorageService.store('loggedInUser',user )          
              return Promise.resolve(user)       
          })
          // .catch (err => {
          //   console.log('wrong login details')
          //   return Promise.reject()
          // })
          
        },
        logout(context) {
          context.commit({type: 'logoutUser'})
          console.log('user logged out successfully')
        }
    
      },
}