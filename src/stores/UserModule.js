
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
        }
      },
      actions: {
    
      },
}