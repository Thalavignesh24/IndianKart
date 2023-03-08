const CustomerModel = require('./../Models/CustomerSchema/CustomerModel');
const Utils = require('./Utils');
function CommonQuery() {

    //Customer Register

    this.checkEmail = async (CustomerEmail) => {
        return await CustomerModel.findOne({ CustomerEmail: CustomerEmail });
    }

    this.checkMobile = async (CustomerMobile) => {
        return await CustomerModel.findOne({ CustomerMobile: CustomerMobile });
    }

    this.loadModel = async (
        CustomerId,
        CustomerName,
        CustomerEmail,
        CustomerMobile,
        CustomerPassword,
        CustomerLogo,
        OtpVerification
    ) => {
        return await new CustomerModel(
            {
                CustomerId,
                CustomerName,
                CustomerEmail,
                CustomerMobile,
                CustomerPassword,
                CustomerLogo,
                OtpVerification
            });
    }

    //Customer Login

    this.getPassword = async (CustomerEmail) => {
        return await CustomerModel.findOne({ CustomerEmail: CustomerEmail }, { CustomerPassword: 1, _id: 0 });
    }

    this.getOTP = async (CustomerEmail) => {
        return await CustomerModel.findOne({ CustomerEmail: CustomerEmail }, { OtpVerification: 1, _id: 0 });
    }

    this.OtpUpdate = async (CustomerEmail, OTP) => {
        return await CustomerModel.updateOne({ CustomerEmail: CustomerEmail }, { $set: { OtpVerification: OTP } });
    }

    //Customer Details

    this.viewData = async (CustomerId) => {
        return await CustomerModel.findOne({ CustomerId: CustomerId },
            {
                _id: 0,
                createdAt: 0, updatedAt: 0, OtpVerification: 0, __v: 0
            });
    }

    //Customer Update

    this.editId = async (custId, CustomerName, CustomerEmail, CustomerMobile, CustomerPassword, CustomerLogo) => {
        return await CustomerModel.updateMany({ CustomerId: custId }, {
            $set: {
                CustomerName, CustomerEmail, CustomerMobile, CustomerPassword, CustomerLogo
            }
        })
    }

}

module.exports = new CommonQuery();