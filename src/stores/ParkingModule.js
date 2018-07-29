import ParkingService from '../../services/ParkingService.js'


export default {
    state: {
        parkings: [],

    },
    mutations: {
        setParkings(state, { parkings }) {
            state.parkings = parkings
            console.log('mutations:',state.parkings)
            console.log('state parkings after mutation: ', state.parkings)
        },
        addParking(state, { newParking }) {
            state.parkings.unshift(newParking)
        },
    },
    getters: {
        parkingToDisplay(state) {
            return state.parkings
        }
    },
    actions: {
        loadParkings(context, payload) {
            return ParkingService.query()
            .then((parkings)=> {
                console.log('store action then parkings: ', parkings)
                context.commit({type: 'setParkings', parkings})
                return parkings
                
            })
        },
        addParking(context, { newParking }) {
            console.log("actions:",newParking);
            
            return ParkingService.addParking({ newParking })
                .then((res) => {
                    return context.commit({ type: 'addParking', newParking: res.data })
                })
        },
    }

}