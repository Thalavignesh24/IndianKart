const mongoose = require('mongoose');
let dbconnect = mongoose.connect("mongodb://localhost:27017/IndianKart");

if (!dbconnect) {
    console.log("Database Connection Failed");
}
const users = mongoose.Schema({
    CustomerId:
    {
        type: String,
        unique: true
    },
    CustomerName:
    {
        type: String,
        uppercase: true,
        required: true
    },
    CustomerEmail:
    {
        type: String,
        required: true
    },
    CustomerMobile:
    {
        type: String,
        required: true
    },
    CustomerPassword:
    {
        type: String,
        required: true
    },
    LogoId:
    {
        type: String
    },
    CustomerLogo:
    {
        type: String
    },
    OtpVerification:
    {
        type: String,
        required: true
    },
    VerifiedStatus:
    {
        type: String
    }
}, {
    timestamps: true
});

let dbs = mongoose.model('customers', users);
module.exports = dbs;
console.log("Database connected!")