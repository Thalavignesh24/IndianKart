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
        type: String
    },
    CustomerEmail:
    {
        type: String
    },
    CustomerMobile:
    {
        type: String
    },
    CustomerPassword:
    {
        type: String
    },
    CustomerLogo:
    {
        type: String
    }
});

let dbs = mongoose.model('customers', users);

module.exports = dbs;