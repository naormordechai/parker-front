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

function addParking(newParking) {
    console.log('25-serice', newParking)
    return axios.post(PARKING_URL + '/add', newParking)
}

function reserveParking(parkingReserved){
    console.log('parking reserved: ', parkingReserved)
    return axios.put(`${PARKING_URL}/reserve/${parkingReserved.parkingId}`, parkingReserved)
        .then(res => {
            console.log('parking service res: ', res)
            console.log('parking service res data: ', res.data)
           return res.data})

}

function stopParking(parking) {  
    console.log('front end service parking: ', parking)  
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
    stopParking,  
    reserveParking,
    addParking
}
