const CustomerModel = require('../../Models/CustomerSchema/CustomerModel');

function AdminManagement() {

    try {
        this.CustomersList = async (req, res) => {
            let Customers = await CustomerModel.find({});
            if (!Customers || Customers == "" || Customers == undefined) {
                res.send("No data present");
            } else {
                res.send({
                    "List Of Customers": Customers
                });
            }
        }
    } catch (error) {
        console.log(error.message);
        res.send({
            "Message": error.message
        })
    }

}

module.exports=new AdminManagement();