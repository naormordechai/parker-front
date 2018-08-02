import ParkingService from '../../services/ParkingService.js'
import LocService from '../../services/LocService'
import { eventBus } from '../../services/EventBusService.js'


export default {
    state: {
        parkings: [],
        position: {
            lat: 0,
            lng: 0
        },
        component: 'ParkingFilter',
        latLng: {},
        isSearch: false,
        filterBy : {
            distance: 100,
            isPaved: '',
            isCovered: '',
            isForDisable: ''            
        }
    },
    getters: {
        parkingToDisplay(state) {
            return state.parkings
            .filter(parking =>{
                if (state.filterBy.isPaved){
                    return parking.amenities.isPaved
                } else {
                    return true 
                }
            })
            .filter(parking =>{
                if (state.filterBy.isCovered){
                    return parking.amenities.isCovered
                } else {
                    return true 
                }
            })
            .filter(parking =>{
                if (state.filterBy.isForDisable){
                    return parking.amenities.isForDisable
                } else {
                    return true 
                }
            })
            .filter(parking => {
                var distance =  LocService.getDistanceFromLatLonInKm(
                    state.position.lat,
                    state.position.lng,
                    parking.location.lat,
                    parking.location.lng                      
                )
                parking.distance =distance
                return distance  < state.filterBy.distance
            })
            .sort((a,b )=> {
                return a.distance  > b.distance
            })
        },
        componentToShow(state) {
            return state.component
        },
        p(state) {
            return state.latLng
            // return state.latLng
        },
        position : (state) => state.position,
        search(state){
            return state.isSearch
        }
    },

    mutations: {
        setParkings(state, { parkings }) {
            state.parkings = parkings
        },
        reserveParking(state, { parking }) {
            console.log('parking in mutation: ', parking)
            console.log('state before splicing: ', state)
            var idx = state.parkings.findIndex(currParking => currParking._id === parking._id)
            console.log('idx: ', idx)
            console.log('state after splicing: ', state)
            state.parkings.splice(idx, 1, parking)
        },
        stopParking(state, { parking }) {
            console.log('commit state: ', state)
            var idx = state.parkings.findIndex(currParking => currParking._id === parking._id)
            console.log('idx: ', idx)
            state.parkings.splice(idx, 1, parking)
            console.log('state after stop parking: ', state)
        },

        addParking(state, { newParking }) {
            state.parkings.unshift(newParking)
            console.log("parkings form store:",state.parkings)
            return newParking
        },
        setPosition(state, payload) {
            state.position.lat = payload.lat
            state.position.lng = payload.lng

            // console.log('paypay',payload.lat);
            // console.log('paypay',payload.lng);
            state.latLng.lat = payload.lat
            state.latLng.lng = payload.lng
            console.log('state', state.latLng);
        },
        updateFilter(state, {filterBy}){
            console.log('filter: ', filterBy)
            state.filterBy = filterBy
        }
    },
    actions: {
        loadParkings(context) {
            // console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx')
            // console.log(context.getters.position)
            return ParkingService.query(context.getters.position)
                .then((parkings) => {
                    context.commit({ type: 'setParkings', parkings })
                    return parkings

                })
        },

        reserveParking(context, { parking }) {
            console.log('parking to reserve', parking)
            return ParkingService.reserveParking(parking)
                .then(parking => {
                    context.commit({ type: 'reserveParking', parking })
                })
        },

        stopParking(context, { parking }) {
            console.log('context', context)
            console.log('parking', parking)
            // var storeParking = context.state.parkings.find(currParking=> currParking._id === parking._id)
            console.log('store parking before stopping: ', parking)
            parking.occupiedUntil = 0
            parking.reserverId = ''
            console.log('store parking after init: ', parking)
            return ParkingService.stopParking(parking)
                .then((parking) => {
                    context.commit({ type: 'stopParking', parking })
                })
        },
        addParking(context, { newParking }) {
            console.log("actions:", newParking);

            return ParkingService.addParking(newParking)
                .then((res) => {
                    console.log('res in store: ', res)
                     context.commit({ type: 'addParking', newParking: res.data })
                     return res.data
                   // .then ((res) => res.data)
                })
        },
    }

}