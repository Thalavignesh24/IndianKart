const CommonQuery = require('../../Helpers/CommonService');
const CustomerModel = require('../../Models/CustomerSchema/CustomerModel');
const Utils = require('../../Helpers/Utils');
const bcrypt = require('bcrypt');
const cloudinary = require('cloudinary').v2;
const jwt = require('jsonwebtoken');
const EmailSender = require('../../Helpers/EmailSender');
const { UserAgent } = require('express-useragent');
const DeviceDetector = require('node-device-detector');



function CustomerManagement() {

    this.CustomerRegisterPage = (req, res) => {
        return res.render('CustomerInterface/CustomerRegister');
    }

    this.CustomerLoginPage = (req, res) => {
        res.render('CustomerInterface/CustomerLogin');
    }

    this.CustomerRegister = async (req, res) => {

        try {
            const { CustomerName, CustomerEmail, CustomerMobile, CustomerPassword } = req.body;
            const CustomerLogo = req.files?.CustomerLogo;
            const uuid = Utils.uuid();

            if (await CommonQuery.checkEmail(CustomerEmail))
                return res.send("Email Is Already Exists");

            if (await CommonQuery.checkMobile(CustomerMobile))
                return res.send("Mobile is Already Exists");

            if (await CommonQuery.checkImage(CustomerLogo.md5))
                return res.send("This profile picture is already used");

            let image = await cloudinary.uploader.upload(CustomerLogo.tempFilePath);

            if (!image)
                return res.send("Failed To Load");
            else {
                const otp = Utils.otp();
                const hashPassword = await bcrypt.hash(CustomerPassword, 10);
                let deviceData = req.useragent;
                const device = {
                    "Browser": deviceData.browser,
                    "version": deviceData.version,
                    "OS": deviceData.os,
                    "Platform": deviceData.platform,
                    "GeoIp": deviceData.geoIp,
                    "Source": deviceData.source,
                    "BotDetection": deviceData.isBot,
                    "Desktop": deviceData.isDesktop,
                    "Mobile": deviceData.isAndroid
                }
                const detector = new DeviceDetector({
                    clientIndexes: true,
                    deviceIndexes: true,
                    deviceAliasCode: false,
                });
                const userAgent = deviceData.source;
                const result = detector.detect(userAgent);
                const NewCustomer = await CommonQuery.loadModel(uuid, CustomerName, CustomerEmail, CustomerMobile, hashPassword, image.secure_url, CustomerLogo.md5, otp, "No", device, [{ "Client": result.client, "Device": result.device }]);

                const emailData =
                {
                    Name: CustomerName,
                    Email: CustomerEmail,
                    OTP: NewCustomer.OtpVerification,
                    DeviceName: JSON.stringify(device),
                    Logo: NewCustomer.CustomerLogo
                };

                EmailSender.sendMailer(emailData, "EV");
                const data = await NewCustomer.save({});
                if (!data)
                    return res.send("Failed To Register");
                return res.render("CustomerInterface/EmailOtpVerification");
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    this.otpVerify = async (req, res) => {
        let otpVerify = req.body.otp;
        if (!otpVerify)
            res.send("Please enter the otp");
        let otp = await CommonQuery.otpVerify(otpVerify);
        if (!otp)
            return res.send("Invalid Otp");
        else {
            await CommonQuery.updateStatus(otp.OtpVerification, "Yes");
            return res.redirect("http://localhost:3000/IndianKart/CustomerLogin");
        }
    }

    this.CustomerLogin = async (req, res) => {

        try {
            const { CustomerEmail, CustomerPassword } = req.body;

            if (! await CommonQuery.checkEmail(CustomerEmail))
                return res.send("Incorrect Email");
            else {
                let password = await CommonQuery.getPassword(CustomerEmail);
                let checkPassword = await bcrypt.compare(CustomerPassword, password.CustomerPassword);

                if (!checkPassword)
                    return res.send("Incorrect Password");
                else {
                    let Verify = await CommonQuery.checkStatus(CustomerEmail, "Yes");
                    if (Verify) {
                        const userToken = await jwt.sign({ CustomerEmail: CustomerEmail }, "SecretKey", { expiresIn: "2h" });
                        return res.send
                            ({
                                message: "Login SuccessFully",
                                Token: userToken
                            });
                    } else {
                        let OTP = Utils.otp();
                        let otp = await CommonQuery.OtpUpdate(CustomerEmail, OTP);
                        const emailData = {
                            Name: password.CustomerName,
                            Email: CustomerEmail,
                            OTP: OTP
                        }
                        EmailSender.sendMailer(emailData, 'LV');
                        return res.render("CustomerInterface/EmailOtpVerification");
                    }
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    this.CustomerViewDetails = async (req, res) => {
        const CustomerData = await CommonQuery.viewData(req.params.CustomerId);
        if (!CustomerData)
            return res.send("No data");
        else {
            return res.send(CustomerData);
        }
    }

    this.CustomerEdit = async (req, res) => {
        const { CustomerId, CustomerName, CustomerEmail, CustomerMobile, CustomerPassword } = req.body;
        const CustomerLogo = req.files?.CustomerLogo;
        const Edit = await CommonQuery.viewData(CustomerId);
        if (!Edit)
            return res.send("No data");
        else {
            let hashPassword = await bcrypt.hash(CustomerPassword, 10);
            if (CustomerLogo) {
                let image = await cloudinary.uploader.upload(CustomerLogo.tempFilePath);
                const updateStatus = await CommonQuery.editId(CustomerId, CustomerName, CustomerEmail, CustomerMobile, hashPassword, image.secure_url);
                return res.send("Updated Successfully");
            }
            const updateStatus = await CommonQuery.editId(CustomerId, CustomerName, CustomerEmail, CustomerMobile, hashPassword);
            return res.send(updateStatus);
        }
    }
}

module.exports = new CustomerManagement();