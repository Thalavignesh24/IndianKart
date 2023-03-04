const path = require('path');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const ejs = require('ejs');
const ElasticMail = require('nodelastic');

let Transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'vignesh.k@ippopay.com',
        pass: 'Vigneshoffice@2000',
    }
});

module.exports.sendMailer = async function (emailData) {
    var attachments = [];
    var client = new ElasticMail('c802e30d-7ea8-4ecf-b993-1ba53959f872');

    let directory = __dirname + '/Views/OtpVerification.html';

    ejs.renderFile(directory, emailData, function (err, html) {
        if (err) {
            console.log(err);
        }
        let message = {
            from: "info@ippopay.com",
            fromName: "Email Verification",
            subject: "OTP Verification",
            msgTo: emailData.Email,
            bodyHtml: html
        };
        client.send(message, attachments).then((mail) => {
            if (!mail)
                console.log("Failed");
            let results = JSON.parse(mail);
            if (results.success == true) {
                console.log(true);
            } else {
                console.log(false);
            }
        });
    });

}
