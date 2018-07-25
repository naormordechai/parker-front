

    var parkingDetail = {
        owenr: {
            name: 'asdas',
            _id: 'asdasd'
        },
        parking: {
            occupidUntil :  0,
            occupiderId  : 0,
            _id: "5b583499c0b5ace041055cdf",
            location: {
                lat: 32.055401,
                lng: 34.759499
            },
            address: "basel 32, Tel Aviv",
            isAvaliable: true,
            ownerId: "5b583081f6d632e56ebd6a43",
            price: 28,
            amenities: {
                isCovered: true,
                isPaved: false,
                isForDisable: false
            },
            description: "One of the most popular spots for parking - available during the days at a killer price",
            createdAt: 1532502809,
            imageURL: "http://newshaifakrayot.net/wp-content/uploads/2015/03/%D7%97%D7%A0%D7%99%D7%94-%D7%9B%D7%97%D7%95%D7%9C-%D7%9C%D7%91%D7%9F-300x225.jpg"
        }
    }


var parkings = [
    {
        _id: "5b583499c0b5ace041055cde",
        location: {
            lat: 32.109333,
            lng: 34.855499
        },
        address: "Sokolov 87, Tel Aviv",
        isAvaliable: true,
        ownerId: "5b583081f6d632e56ebd6a44",
        price: 20,
        amenities: {
            isCovered: true,
            isPaved: false,
            isForDisable: true
        },
        description: "Daily parking in the old north of Tel Aviv. Located just few minutes walking from all the main cultural places of TLV",
        createdAt: 1532502489,
        imageURL: "https://media.phillyvoice.com/media/images/071516_tasker_broad.2e16d0ba.fill-735x490.png"
    },
    {
        _id: "5b583499c0b5ace041055cdf",
        location: {
            lat: 32.055401,
            lng: 34.759499
        },
        address: "basel 32, Tel Aviv",
        isAvaliable: true,
        ownerId: "5b583081f6d632e56ebd6a43",
        price: 28,
        amenities: {
            isCovered: true,
            isPaved: false,
            isForDisable: false
        },
        description: "One of the most popular spots for parking - available during the days at a killer price",
        createdAt: 1532502809,
        imageURL: "http://newshaifakrayot.net/wp-content/uploads/2015/03/%D7%97%D7%A0%D7%99%D7%94-%D7%9B%D7%97%D7%95%D7%9C-%D7%9C%D7%91%D7%9F-300x225.jpg"
    }
]




function query() {
    return Promise.resolve(parkings)
}

function getById(id) {
    return Promise.resolve(parkingDetail)
}
export default {
    query,
    getById
}
