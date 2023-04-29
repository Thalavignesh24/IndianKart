const mongoose = require('mongoose');
let dbconnect = mongoose.connect("mongodb://localhost:27017/IndianKart");

if (!dbconnect) {
    console.log("Database Connection Failed");
}
const products = mongoose.Schema({

    id: {
        type: String,
    },
    country_code: {
        type: String,
        required: true,
        uppercase: true
    },
    country_name: {
        type: String,
        required: true
    },
    timezone: {
        type: String,
        required: true
    },
    gmt_offset: {
        type: String,
        required: true
    },
    delete_status: {
        type: Number,
        default: 0
    },
    createdBy: {
        type: String,
        default: ""
    },
    updatedBy: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
});

let dbs = mongoose.model('timezones', products);
module.exports = dbs;
