import ParkingService from '../../services/ParkingService.js'

export default{
    state:{
        parkings:[],

    },
    mutations:{
        setParkings(state, {parkings}){
            state.parkings = parkings
            console.log('state parkings after mutation: ', state.parkings)
        },
        stopParking(state, {parking}) {
            var idx= state.parkings.indexOf(parking)
            console.log('idx: ',idx)
            state.parkings.splice(idx,1,parking)
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
        },
        stopParking (context, {parkingId}) {
            // debugger
            console.log('context', context)
            var parking = context.state.parkings.find(parking=> parking._Id === parkingId)
            console.log('store parking: ', parking)
            parking.occupiedUntil = 0
            parking.reserverId = ''
            return ParkingService.stopParking(parking)
            .then((parking) => {
                context.commit({type: 'stopParking', parking})
            })
        }
    }
    
}