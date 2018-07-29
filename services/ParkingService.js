import axios from 'axios'
const PARKING_URL = '//localhost:3000/parking'


// var parkingDetail = {
//     owenr: {
//         firstName: 'firstName',
//         lastName: 'lastName',
//         eMail: 'a@a.com',
//         _id: '5b583081f6d632e56ebd6a43'
//     },
//     parking: {
//         occupiedUntil: 0,
//         reserverId: '',
//         _id: "5b583499c0b5ace041055cdf",
//         location: {
//             lat: 32.055401,
//             lng: 34.759499
//         },
//         address: "basel 32, Tel Aviv",
//         isAvaliable: true,
//         ownerId: "5b583081f6d632e56ebd6a43",

//         price: 28,
//         amenities: {
//             isCovered: true,
//             isPaved: true,
//             isForDisable: false
//         },
//         description: "One of the most popular spots for parking - available during the days at a killer price",
//         createdAt: 1532502809,
//         imageURL: "http://newshaifakrayot.net/wp-content/uploads/2015/03/%D7%97%D7%A0%D7%99%D7%94-%D7%9B%D7%97%D7%95%D7%9C-%D7%9C%D7%91%D7%9F-300x225.jpg"
//     }
// }


// var parkings = [
//     {
//         _id: "5b583499c0b5ace041055cde",
//         location: {
//             lat: 32.109333,
//             lng: 34.855499
//         },
//         occupiedUntil: 0,
//         reserverId: '5b583081f6d632e56ebd6a43',
//         address: "Sokolov 87, Tel Aviv",
//         isAvaliable: true,
//         occupiedUntil: Date.now(),
//         reserverId: '',
//         ownerId: "5b583081f6d632e56ebd6a44",        
//         price: 20,
//         amenities: {
//             isCovered: true,
//             isPaved: true,
//             isForDisable: true
//         },
//         description: "Daily parking in the old north of Tel Aviv. Located just few minutes walking from all the main cultural places of TLV",
//         createdAt: 1532502489,
//         imageURL: "https://media.phillyvoice.com/media/images/071516_tasker_broad.2e16d0ba.fill-735x490.png"
//     },
//     {
//         _id: "5b583499c0b5ace041055cdf",
//         location: {
//             lat: 32.055401,
//             lng: 34.759499
//         },
//         address: "basel 32, Tel Aviv",
//         isAvaliable: true,
//         occupiedUntil: Date.now(),
//         reserverId: '',
//         ownerId: "5b583081f6d632e56ebd6a43",
//         price: 28,
//         amenities: {
//             isCovered: true,
//             isPaved: true,
//             isForDisable: false
//         },
//         description: "One of the most popular spots for parking - available during the days at a killer price",
//         createdAt: 1532502809,
//         imageURL: "http://newshaifakrayot.net/wp-content/uploads/2015/03/%D7%97%D7%A0%D7%99%D7%94-%D7%9B%D7%97%D7%95%D7%9C-%D7%9C%D7%91%D7%9F-300x225.jpg"
//     }
// ]


// var parkingsActivity = {
//     user: {
//         firstName: 'yakov',
//         lastName: 'lastName',
//         eMail: 'a@a.com',
//         _id: '5b583081f6d632e56ebd6a43'
//     },
//     reserveParkings: [
//         {
//             _id: "5b583499c0b5ace041055cde",
//             location: {
//                 lat: 32.109333,
//                 lng: 34.855499
//             },
//             occupiedUntil: 0,
//             reserverId: '5b583081f6d632e56ebd6a43',
//             address: "Sokolov 87, Tel Aviv",
//             ownerId: "5b583081f6d632e56ebd6a44",
//             price: 20,
//             amenities: {
//                 isCovered: true,
//                 isPaved: true,
//                 isForDisable: true
//             },
//             description: "Daily parking in the old north of Tel Aviv. Located just few minutes walking from all the main cultural places of TLV",
//             createdAt: 1532502489,
//             imageURL: "https://media.phillyvoice.com/media/images/071516_tasker_broad.2e16d0ba.fill-735x490.png"
//         }
//     ],
//     ownedParkings:[]
// }


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

function getUserById(userId) {
    return Promise.resolve(parkingsActivity)
}

export default {
    query,
    getById,
    getUserById,
    reserveParking
}
