const nodemailer = require('nodemailer');
const ejs = require('ejs');
const ElasticMail = require('nodelastic');
const TemplateModel = require('../Models/TemplateSchema/TemplateModel');

let Transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'vignesh.k@ippopay.com',
        pass: 'Vigneshoffice@2000',
    }
});

module.exports.sendMailer = async function (emailData, type) {
    let template = await TemplateModel.findOne({ EmailType: type });
    if (template) {
        let directory = __dirname + '/Templates/' + template.FileName;

        ejs.renderFile(directory, emailData, function (err, html) {
            if (err) {
                console.log(err);
            }
            let message = {
                from: "vignesh.k@ippopay.com",
                fromName: "Email Verification",
                subject: template.EmailSubject,
                msgTo: emailData.Email,
                bodyHtml: html
            };
            console.log(message);
            Transporter.sendMail(message, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        });
    } else {
        return false;
    }
}
