import axios from 'axios'
const PARKING_URL = (process.env.NODE_ENV !== 'development')
    ? '/parking'
    : '//localhost:3000/parking';

function query({lat, lng}) {
    return axios.get(PARKING_URL+`?lat=${lat}&lng=${lng}`)
    .then(res => res.data)
}


function getById(parkingId) {
    return axios.get(`${PARKING_URL}/${parkingId}`)
<<<<<<< HEAD
    .then(res => res.data)
    .then(data => {
        console.log('data',data);
        data.parking.location.lat = +data.parking.location.lat
        data.parking.location.lng = +data.parking.location.lng
        
        return data
    })
    console.log('res: ', res)
    console.log('res data: ', res.data)    
=======
    .then(res => res.data)     
>>>>>>> 806fdf7bbc16896596244122f96c2b2d2361ed04
}

function addParking(newParking) {
    return axios.post(PARKING_URL + '/add', newParking)
}

function reserveParking(parkingReserved){
<<<<<<< HEAD
    console.log('parking reserved: ', parkingReserved.parkingId)
    return axios.put(`${PARKING_URL}/reserve/${parkingReserved.parkingId}`, parkingReserved)
        .then(res => {
            console.log('parking service res: ', res)
            console.log('parking service res data: ', res.data)
           return res.data
        })
=======
    return axios.put(`${PARKING_URL}/reserve/${parkingReserved.parkingId}`, parkingReserved)
        .then(res => {
           return res.data})
        
>>>>>>> 806fdf7bbc16896596244122f96c2b2d2361ed04
}



function stopParking(parking) {  
    return axios.put(`${PARKING_URL}/stop`, parking)
    .then(res => res.data)
<<<<<<< HEAD
=======
    .then(data => {  
        return data
    })
>>>>>>> 806fdf7bbc16896596244122f96c2b2d2361ed04
}

export default {
    query,
    getById,
    reserveParking,
    stopParking,  
    reserveParking,
    addParking,
}
