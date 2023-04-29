const mongoose = require('mongoose');
let dbconnect = mongoose.connect("mongodb://localhost:27017/IndianKart");

if (!dbconnect) {
    console.log("Database Connection Failed");
}

const stateSchema = mongoose.Schema({
    stateId: { type: String },
    stateName: { type: String },
    stateCode: { type: String },
    country: {
        id: { type: String },
        name: { type: String }
    },
}, {
    timestamps: true
});

let dbs = mongoose.model('state', stateSchema);
module.exports = dbs;