const path = require('path');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const ejs = require('ejs');
const Mail = require('nodemailer');
const fs = require('fs');
const ElasticMail = require('nodelastic');

var client = new ElasticMail('c802e30d-7ea8-4ecf-b993-1ba53959f872');
// console.log(client);
// this.sendMailer = async function (attachment, data, type, result) {

//     let template = await SmtpTemplateModel.findOne({ "email_type": type });
//     var attachments = [];

//     if (template) {
//         var client = new ElasticMail('c802e30d-7ea8-4ecf-b993-1ba53959f872');
//     } else {
//         return result(false);
//     }

//     ejs.renderFile(__dirname + '/../Views/' + template.template_file, data, {}, function (err, html) {

//         if (!err && html) {
//             let message = {
//                 from: 'info@ippopay.com',
//                 fromName: 'Tutelar',
//                 subject: (data.subject) ? data.subject : template.email_subject,
//                 msgTo: data.client_mail,
//                 bodyHtml: html
//             };

//             if (data.cc) {
//                 message.msgCC = data.cc;
//             }

//             if (attachment) {
//                 attachment.forEach(item => {
//                     let file = {
//                         data: fs.readFileSync(process.cwd() + "/" + item.path),
//                         filename: 'attachment.pdf',
//                         contentType: 'application/pdf'
//                     }
//                     attachments.push(file)
//                 })
//             }

//             client.send(message, attachments).then((mail) => {
//                 let results = JSON.parse(mail)

//                 if (results.success == true) {
//                     return result(results)
//                 } else {
//                     return result(false);
//                 }
//             });
//         } else {
//             return result(false);
//         }
//     });
// }


let Transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'info@ippopay.com',
		pass: client.apiKey,
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
