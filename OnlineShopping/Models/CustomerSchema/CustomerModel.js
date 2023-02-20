const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/IndianKart");

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
    CustomerLogo:
    {
        type: String
    },
    OtpVerification:
    {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

let dbs = mongoose.model('customers', users);

module.exports = dbs;