
const path = require('path');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const ejs = require('ejs');
const TemplateModel = require('../Models/TemplateSchema/TemplateModel');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'vignesh.k@ippopay.com',
        pass: 'Vigneshoffice@2000'
    }
});

const handlebarsOptions = ({
    viewEngine: {
        extName: ".html",
        partialsDir: path.resolve('./Helpers/Templates'),
        defaultLayout: false,
    },
    viewPath: path.resolve('./Helpers/Templates'),
    extName: ".html",
});

transporter.use('compile', hbs(handlebarsOptions));
module.exports.sendMailer = async (emailData, type) => {
    console.log(emailData);
    let template = await TemplateModel.findOne({ "EmailType": type });
    if (template) {
        var mailOptions = {
            from: 'youremail@gmail.com',
            to: emailData.Email,
            subject: template.EmailSubject,
            template: template.FileName,
            context: {
                Name: emailData.Name,
                OTP: emailData.OTP,
                DeviceName: emailData.DeviceName
            }
        }
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

    }
};



