import ParkingService from '../../services/ParkingService.js'

export default{
    state:{
        parkings:[],

    },
    mutations:{
        setParkings(state, {parkings}){
            state.parkings = parkings
            console.log('state parkings after mutation: ', state.parkings)
        }
    },
    getters: {
        parkingToDisplay(state) {
            return state.parkings
        }
    },
    actions: {
        loadParkings(context, payload){
            return ParkingService.query()
            .then((parkings)=> {
                console.log('store action then parkings: ', parkings)
                context.commit({type: 'setParkings', parkings})
                return parkings
                
            })
        }
    }
    
}