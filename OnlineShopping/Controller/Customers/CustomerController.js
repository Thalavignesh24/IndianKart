const CustomerModel = require("../../Models/CustomerSchema/CustomerModel");
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

function CustomerManagement() {

    this.CustomerRegistration = async (req, res) => {
        try {
            const { CustomerName, CustomerEmail, CustomerMobile, CustomerPassword } = req.body;
            const CustomerRegister = new CustomerModel({
                CustomerId: uuidv4(),
                CustomerName,
                CustomerEmail,
                CustomerMobile,
                CustomerPassword: await bcrypt.hash(CustomerPassword, 10)
            });
            let register = await (CustomerRegister.save());

            if (register) {
                res.send(register);
            } else {
                res.send("Failed To Register");
            }
        } catch (error) {
            console.log(error);
        }
    }

    this.CustomerLogin = async (req, res) => {
        try {
            const { CustomerEmail, CustomerPassword } = req.body;
            const findUser = await CustomerModel.findOne({ CustomerEmail: CustomerEmail });

            if (findUser) {
                let userPassword = findUser.CustomerPassword;
                const password = await bcrypt.compare(CustomerPassword, userPassword);

                if (password) {
                    res.send("Login Success");
                } else {
                    res.send("Incorrect Password");
                }
            } else {
                res.send("Login Failed");
            }
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new CustomerManagement();