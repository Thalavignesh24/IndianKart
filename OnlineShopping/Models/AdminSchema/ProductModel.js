const mongoose = require('mongoose');
let dbconnect = mongoose.connect("mongodb://localhost:27017/IndianKart");

if (!dbconnect) {
    console.log("Database Connection Failed");
}
const products = mongoose.Schema({
    ProductId:
    {
        type: String,
        unique: true
    },
    ProductName:
    {
        type: String,
        uppercase: true,
        required: true
    },
    ProductQuantity:
    {
        type: String,
        required: true
    },
    ProductAmount:
    {
        type: String,
        required: true
    },
    LogoId:
    {
        type: String
    },
    ProductImage:
    {
        type: String
    },
}, {
    timestamps: true
});

let dbs = mongoose.model('products', products);
module.exports = dbs;
