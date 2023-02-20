const path = require('path');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const ejs = require('ejs');

console.log(path.resolve('Public'));

let Transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '953622104072@ritrjpm.ac.in',
        pass: 'raju1234'
    }
});

const handlebarsOptions = ({
    viewEngine: {
        extName: ".html",
        partialsDir: path.resolve('./Public'),
        defaultLayout: false,
    },
    viewPath: path.resolve('./Public'),
    extName: ".html",
});


Transporter.use('compile', hbs(handlebarsOptions));

module.exports = { Transporter, handlebarsOptions }
