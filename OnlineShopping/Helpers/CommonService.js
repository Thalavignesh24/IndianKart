const CustomerModel = require('./../Models/CustomerSchema/CustomerModel');
function CommonQuery() {

    this.checkEmail = async (CustomerEmail) => {
        return await CustomerModel.findOne({ CustomerEmail: CustomerEmail });
    }

    this.checkMobile = async (CustomerMobile) => {
        return await CustomerModel.findOne({ CustomerMobile: CustomerMobile });
    }

    this.getPassword = async (CustomerEmail) => {
        return await CustomerModel.findOne({ CustomerEmail: CustomerEmail }, { CustomerPassword: 1, _id: 0 });
    }

    this.getOTP = async (CustomerEmail) => {
        return await CustomerModel.findOne({ CustomerEmail: CustomerEmail }, { OtpVerification: 1, _id: 0 });
    }

    this.OtpUpdate = async (CustomerEmail,OTP) => {
        return await CustomerModel.updateOne({ CustomerEmail: CustomerEmail },{$set:{ OtpVerification:OTP}});
    }

}

module.exports = new CommonQuery();