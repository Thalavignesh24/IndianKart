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

    this.checkImage = async (logoId) => {
        return await CustomerModel.findOne({ LogoId: logoId });
    }

    this.loadModel = async (
        CustomerId,
        CustomerName,
        CustomerEmail,
        CustomerMobile,
        CustomerPassword,
        CustomerLogo,
        LogoId,
        OtpVerification,
        VerifiedStatus,
        DeviceDetails,
        GadgetsDetails
    ) => {
        return await new CustomerModel(
            {
                CustomerId,
                CustomerName,
                CustomerEmail,
                CustomerMobile,
                CustomerPassword,
                CustomerLogo,
                LogoId,
                OtpVerification,
                VerifiedStatus,
                DeviceDetails,
                GadgetsDetails
            });
    }


    //otp verification or account verification

    this.otpVerify = async (otp) => {
        return await CustomerModel.findOne({ OtpVerification: otp });
    }

    this.updateStatus = async (otp, status) => {
        return await CustomerModel.updateOne({ OtpVerification: otp }, { $set: { VerifiedStatus: status } });
    }


    //Customer Login

    this.getPassword = async (CustomerEmail) => {
        return await CustomerModel.findOne({ CustomerEmail: CustomerEmail }, { CustomerPassword: 1, CustomerName: 1, VerifiedStatus: 1, _id: 0 });
    }

    this.getOTP = async (CustomerEmail) => {
        return await CustomerModel.findOne({ CustomerEmail: CustomerEmail }, { OtpVerification: 1, _id: 0 });
    }

    this.OtpUpdate = async (CustomerEmail, OTP) => {
        return await CustomerModel.updateOne({ CustomerEmail: CustomerEmail }, { $set: { OtpVerification: OTP } });
    }

    this.checkStatus = async (CustomerEmail, status) => {
        return await CustomerModel.findOne({ CustomerEmail: CustomerEmail, VerifiedStatus: status });
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