const USER_URL = (process.env.NODE_ENV !== 'development')
    ? '/user'
    : '//localhost:3000/user';

import axios from 'axios'

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


function getUserById(userId) {
    return axios.get(`${USER_URL}/${userId}`)
    // return Promise.resolve(parkingsActivity)
    .then(res => {
        console.log('res: ', res)
        return res.data
    })
}

function login(userInfo) {
    console.log('userService-50-userInfo: ', userInfo)
    return axios.post(`${USER_URL}/checkLogin`, {userInfo})
        .then(res => {
             console.log('userService-53-res.data :',res.data)
            return (res.data)
        })
}

function addUser(newUser) {
    console.log('new user: ', newUser)
    return axios.post(`${USER_URL}/add`, newUser)
        .then(res => {
            console.log('res data user: ', res.data)
            return (res.data)
        })
}




export default {
    getUserById,
    login,
    addUser
}