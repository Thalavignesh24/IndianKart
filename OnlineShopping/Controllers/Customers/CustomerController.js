const CommonQuery = require('../../Helpers/CommonService');
const CustomerModel = require('../../Models/CustomerSchema/CustomerModel');
const Utils = require('../../Helpers/Utils');
const bcrypt = require('bcrypt');
const cloudinary = require('cloudinary').v2;
const jwt = require('jsonwebtoken');
const EmailSender = require('../../Helpers/EmailSender');


function CustomerManagement() {

    // this.CustomerRegisterPage = (req, res) => {
    //     res.render('CustomerInterface/CustomerRegister');
    // }

    // this.CustomerLoginPage = (req, res) => {
    //     res.render('CustomerInterface/CustomerLogin');
    // }

    // this.OtpPage = (req, res) => {
    //     res.render('CustomerInterface/EmailOtpVerification');
    // }

    // this.CustomerProfile = async (req, res) => {
    //     res.render('CustomerProfile')
    // }

    this.CustomerRegister = async (req, res) => {

        try {
            const { CustomerName, CustomerEmail, CustomerMobile, CustomerPassword } = req.body;
            const CustomerLogo = req.files?.CustomerLogo;
            const uuid = Utils.uuid();

            if (await CommonQuery.checkEmail(CustomerEmail))
                return res.send("Email Is Already Exists");

            if (await CommonQuery.checkMobile(CustomerMobile))
                return res.send("Mobile is Already Exists");

            let image = await cloudinary.uploader.upload(CustomerLogo.tempFilePath);

            if (!image)
                return res.send("Failed To Load");
            else {
                const otp = Utils.otp();
                const hashPassword = await bcrypt.hash(CustomerPassword, 10);
                const NewCustomer = await CommonQuery.loadModel(uuid, CustomerName, CustomerEmail, CustomerMobile, hashPassword, image.secure_url, otp);
                const emailData =
                {
                    Name: CustomerName,
                    Email: CustomerEmail,
                    OTP: NewCustomer.OtpVerification
                };
                EmailSender.sendMailer(emailData, "EV");
                const data = await NewCustomer.save({});
                if (!data)
                    return res.send("Failed To Register");
                return res.send("Register SuccessFully");
            }
        } catch (error) {
            console.log(error);
        }
    }

    this.otpVerify = async (req, res) => {
        let otpVerify = req.body.otp;
        if (!otpVerify) {
            res.send("Please enter the otp");
        }
        //console.log(otpVerify);
        let otp = await CustomerModel.findOne({ OtpVerification: otpVerify });
        if (!otp) {
            //console.log(otp);
            res.send("Invalid Otp");
        } else {
            //console.log(otp);
            res.send("Email Verified SuccessFully");
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
                    const userToken = await jwt.sign({ CustomerEmail: CustomerEmail }, "SecretKey", { expiresIn: "50s" });
                    let OTP = Utils.otp();
                    let otp = await CommonQuery.OtpUpdate(CustomerEmail, OTP);
                    EmailSender.sendMailer();

                    if (!otp)
                        return res.send('Invalid OTP');
                    else {
                        const CustomerOtp = await CommonQuery.getOTP(CustomerEmail);

                        if (CustomerOtp.OtpVerification == OTP) {
                            return res.send
                                ({
                                    message: "Login SuccessFully",
                                    Token: userToken
                                });
                        } else
                            return res.send("Otp Expired");
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