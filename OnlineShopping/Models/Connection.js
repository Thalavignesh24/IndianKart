const mongoose=require('mongoose');
let connection=mongoose.connect("mongodb://localhost:27017/IndianKart");

module.exports=connection;