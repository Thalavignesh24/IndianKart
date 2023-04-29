const mongoose = require('mongoose');
let dbconnect = mongoose.connect("mongodb://localhost:27017/IndianKart");

if (!dbconnect) {
    console.log("Database Connection Failed");
}
const CountrySchema = mongoose.Schema({

    countryId: { type: String },
    countryName: { type: String },
    twoDigtCode: { type: String, uppercase: true },
    threeDigtCode: { type: String, uppercase: true },
    isoNumeric: String,
    dialCode: String,
    timezones: { type: String },
    flag: { type: String, default: "", lowercase: true },
    currency: {
        code: { type: String },
        name: { type: String },
        symbol: { type: String }
    }
}, {
    timestamps: true
});

let dbs = mongoose.model('country', CountrySchema);
module.exports = dbs;


