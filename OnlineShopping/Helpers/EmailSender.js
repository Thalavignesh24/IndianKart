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
    var attachments = [];
    let template = await TemplateModel.findOne({ EmailType: type });
    if (template) {
        var client = new ElasticMail('c802e30d-7ea8-4ecf-b993-1ba53959f872');

        let directory = __dirname + '/Templates/'+template.FileName;

        ejs.renderFile(directory, emailData, function (err, html) {
            if (err) {
                console.log(err);
            }
            let message = {
                from: "info@ippopay.com",
                fromName: "Email Verification",
                subject: template.EmailSubject,
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
    } else {
        return false;
    }
}
