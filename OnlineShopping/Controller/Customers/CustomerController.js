const CustomerModel = require("../../Models/CustomerSchema/CustomerModel");
const { v4: uuidv4 } = require('uuid');

function CustomerManagement() {

    this.CustomerRegistration = async (req, res) => {
        try {
            const { CustomerName, CustomerEmail, CustomerMobile, CustomerPassword } = req.body;
            const CustomerRegister = new CustomerModel({
                CustomerId: uuidv4(),
                CustomerName,
                CustomerEmail,
                CustomerMobile,
                CustomerPassword
            });
            let register = await(CustomerRegister.save());
            if(register){
                res.send(register);
            }else{
                res.send("Failed To Register");
            }
               

        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new CustomerManagement();