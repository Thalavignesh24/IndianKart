const mongoose = require('mongoose');
const connection = require('../Connection');
const users = mongoose.Schema({
    CustomerId:
    {
        type: String,
        required: true,
        unique: true
    },
    CustomerName:
    {
        type: String,
        required: true,
        uppercase:true
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
    }
});

const dbs = mongoose.model("Customers", users);
module.exports = dbs;