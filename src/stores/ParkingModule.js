import ParkingService from '../../services/ParkingService.js'
import LocService from '../../services/LocService'


export default {
    state: {
        parkings: [],
        positon : {
            lat: 0,
            lng : 0
        }

    },
    mutations: {
        setParkings(state, { parkings }) {
            state.parkings = parkings            
            console.log('state parkings after mutation: ', state.parkings)
        },
        reserveParking(state,{parking}){
            console.log('parking in mutation: ', parking)
            console.log('state before splicing: ', state)
            var idx= state.parkings.findIndex(currParking => currParking._id === parking._id)
            console.log('idx: ',idx)
            console.log('state after splicing: ', state)
            state.parkings.splice(idx,1,parking)
        },
        stopParking(state, {parking}) {
            console.log('commit state: ', state)
            var idx= state.parkings.findIndex(currParking=> currParking._id === parking._id)
            console.log('idx: ',idx)
            state.parkings.splice(idx,1,parking)
            console.log('state after stop parking: ', state)
        },
       
        addParking(state, { newParking }) {
            state.parkings.unshift(newParking)
            console.log("parkings form store:",state.parkings)
        },
    },
    getters: {
        parkingToDisplay(state) {
            return state.parkings
        }
    },
    actions: {
        loadParkings(context, {lat,lng}) { 
    console.log({lat,lng,msg:'in th moudle serviece'})

            return ParkingService.query({lat,lng})
            .then((parkings)=> {
                console.log('parkings returned from backend: ', parkings)
                context.commit({type: 'setParkings', parkings})
                console.log('parkings in store: ', context.state.parkings)
                return parkings
                
            })
        },
        reserveParking(context, {parking}){
            console.log('parking to reserve', parking)
            return ParkingService.reserveParking(parking)
            .then (parking => {              
                context.commit({type:'reserveParking', parking})
            })
        },

        stopParking (context, {parking}) {           
            console.log('context', context)
            console.log('parking', parking)
            // var storeParking = context.state.parkings.find(currParking=> currParking._id === parking._id)
            console.log('store parking before stopping: ', parking)
            parking.occupiedUntil = 0
            parking.reserverId = ''
            console.log('store parking after init: ', parking)
            return ParkingService.stopParking(parking)
            .then((parking) => {
                context.commit({type: 'stopParking', parking})
            })
        },
        addParking(context, { newParking }) {
            console.log("actions:",newParking);
            
            return ParkingService.addParking( newParking )
                .then((res) => {
                    return context.commit({ type: 'addParking', newParking: res.data })
                })
        },
    }

}