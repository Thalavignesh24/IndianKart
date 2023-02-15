const CustomerModel = require('../../Models/CustomerSchema/CustomerModel');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const Utils = require('../../Helpers/Utils');
const cloudinary = require('cloudinary').v2;

function CustomerManagement() {
    this.CustomerRegisterPage = (req, res) => {
        res.render('CustomerInterface/CustomerRegister');
    }

    this.CustomerLoginPage = (req, res) => {
        res.render('CustomerInterface/CustomerLogin');
    }

    this.CustomerRegister = async (req, res) => {

        try {
            const { CustomerName, CustomerEmail, CustomerMobile, CustomerPassword } = req.body;
            const CustomerLogo = req?.files?.CustomerLogo;
            let image = await cloudinary.uploader.upload(CustomerLogo.tempFilePath);
            
            if (!image) {
                res.send("Failed To Load");
            } else {
                const NewCustomer = await new CustomerModel({
                    CustomerId: uuidv4(),
                    CustomerName: CustomerName,
                    CustomerEmail: CustomerEmail,
                    CustomerMobile: CustomerMobile,
                    CustomerPassword: await bcrypt.hash(CustomerPassword, 10),
                    CustomerLogo: image.secure_url
                });
                const data = await NewCustomer.save({});

                if (!data) {
                    res.send("Failed To Register");
                } else {
                    res.redirect('http://localhost:3000/IndianKart/CustomerLogin');
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    this.CustomerLogin = async (req, res) => {

        try {
            const { CustomerEmail, CustomerPassword } = req.body;
            let checkEmail = await CustomerModel.findOne({ CustomerEmail: CustomerEmail });

            if (!checkEmail) {
                res.send("Incorrect Email");
            } else {
                let password = checkEmail.CustomerPassword;
                let checkPassword = await bcrypt.compare(CustomerPassword, password);

                if (!checkPassword) {
                    res.send("Incorrect Password");
                } else {
                    res.send("Login Success");
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    }
}

module.exports = new CustomerManagement();