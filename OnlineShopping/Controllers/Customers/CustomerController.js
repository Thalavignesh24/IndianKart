const CustomerModel = require('../../Models/CustomerSchema/CustomerModel');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const Utils = require('../../Helpers/Utils');
const cloudinary = require('cloudinary').v2;

function CustomerManagement() {
    this.CustomerRegisterPage = (req, res) => {
        res.render('CustomerInterface/CustomerRegister');
    }

    this.CustomerRegister = async (req, res) => {

        try {
            const { CustomerName, CustomerEmail, CustomerMobile, CustomerPassword } = req.body;
            const CustomerLogo = req?.files?.CustomerLogo;
            let image = await cloudinary.uploader.upload(CustomerLogo.tempFilePath);
            console.log(image);
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
                    res.send(data);
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    }
}

module.exports = new CustomerManagement();