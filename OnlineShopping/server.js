const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Router = require('./Helpers/CommonRoutes');
const path = require('path');
var fileupload = require("express-fileupload");
const device = require('express-device');
var useragent = require('express-useragent');
let countryCodeToFlagEmoji = require("country-code-to-flag-emoji");

app.use(useragent.express());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileupload({ useTempFiles: true }));
app.use(express.static(path.join(__dirname, 'Public')));
app.use(device.capture());

app.set('views', path.join(__dirname, 'Frontend'));
app.set('view engine', 'ejs');

app.use('/IndianKart', Router.CustomerRoutes);

app.use('/IndianKart/Admin', Router.AdminRoutes);

app.use('/IndianKart/Admin/Auth', Router.ProductRoutes);


app.listen(5000, (res) => {
    let message = ({ "Connection": "Database Connected!", "Port": "http://localhost:5000/" });
    console.log(message);
})