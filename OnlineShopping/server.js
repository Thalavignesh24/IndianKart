const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Router = require('./Helpers/CommonRoutes');
const path = require('path');
var fileupload = require("express-fileupload");
const device = require('express-device');
var useragent = require('express-useragent');
const ratelimiter = require('express-rate-limit');

app.use(useragent.express());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileupload({ useTempFiles: true }));
app.use(express.static(path.join(__dirname, 'Public')));
app.use(device.capture());

const limiter = ratelimiter({
    windowMs: 1 * 60 * 1000,
    max: 2, standardHeader: true,
    message: "Too many requests hitted, please try again later."
});
app.use(limiter);

app.set('views', path.join(__dirname, 'Frontend'));
app.set('view engine', 'ejs');

app.use('/IndianKart', Router.CustomerRoutes);

app.use('/IndianKart/Admin', Router.AdminRoutes);

app.use('/IndianKart/Admin/Auth', Router.ProductRoutes);

app.listen(3000, (res) => {
    let message = ({ "Connection": "Database Connected!", "Port": "http://localhost:3000/" });
    console.log(message);
})