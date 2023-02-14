const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Router = require('./Helpers/CommonRoutes');
const path=require('path');
var fileupload = require("express-fileupload");


console.log(typeof(path));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileupload({useTempFiles:true}));

app.set('views', path.join(__dirname, 'Frontend'));
app.set('view engine', 'ejs');

app.use('/IndianKart', Router.CustomerRoutes);

app.listen(3000, (message) => {
    console.log("Server Is Running");
})