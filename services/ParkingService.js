import axios from 'axios'
const PARKING_URL = '//localhost:3000/parking'

function query() {
    // return Promise.resolve(parkings)
    return axios.get(PARKING_URL)
    .then(res => res.data)
}

function getById(parkingId) {
    return axios.get(`${PARKING_URL}/${parkingId}`)
    .then(res => res.data)
    .then(data => {
        data.parking.location.lat = +data.parking.location.lat
        data.parking.location.lng = +data.parking.location.lng
        
        return data
    })
    console.log('res: ', res)
    console.log('res data: ', res.data)    
}

function reserveParking(parkingReserved){
    console.log('parking reserved: ', parkingReserved)
    return axios.put(`${PARKING_URL}/${parkingReserved.parkingId}`, parkingReserved)
        .then(res => res.data)
        console.log('res: ', res)
        console.log('res data: ', res.data)

}

// function getUserById(userId) {
//     return Promise.resolve(parkingsActivity)
// }

function stopParking(parking) {
    console.log('parking: ', parking)
    return axios.put(`${PARKING_URL}/stop`, parking)
    .then(res => res.data)
    .then(data => {  
        console.log('data: ', data)           
        return data
    })
}

export default {
    query,
    getById,
    // getUserById,
    reserveParking,
    stopParking
}
