
import ParkingServices from '../../services/ParkingService.js'

export default {
    state: {
        parkings: [],

    },
    mutations: {
        setParkings(state, {parkings}) {
            state.parkings = parkings
        }
    },
    getters: {
        parkingsToDisplay(state) {
            // console.log('state.getters',state.parkings);
            return state.parkings
        }
    },
    actions: {
        loadParkings(context) {
            return ParkingServices.query()
                .then(parkings => {
                    context.commit({ type: 'setParkings', parkings })
                    // console.log('promise parkings',parkings);
                })
        }
    }
}