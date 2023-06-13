const mongoose = require("mongoose");
const { MONGO_URI } = process.env;

console.log(MONGO_URI)

exports.connect = () => {

    // Connect to mongodb // 
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // authSource: 'admin',
        // auth: { username: 'root', password: 'TAI.innovative.admin' },
        // driverInfo: { name: 'Mongoose', version: '6.2.1' }
    })
    .then(() => {
        console.log("connected to database")
    })
    .catch((error) => {
        console.log("error connecting")
        console.error(error)
        process.exit(1)
    });

}

// const mongoose = require("mongoose");
// const { MONGO_URI } = process.env;

// exports.connect = () => {
//     mongoose.connect(MONGO_URI, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         authSource: 'admin',
//         auth: { username: 'root', password: 'root' },
//         driverInfo: { name: 'Mongoose', version: '6.2.1' }
//     })
//     .then(() => {
//         console.log("connected to database")
//     })
//     .catch((error) => {
//         console.log("error Database connecting")
//         console.error(error)
//         process.exit(1)
//     });
// }


