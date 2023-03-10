const express = require('express');
const router = express.Router();
const CustomerController = require('../../Controllers/Customers/CustomerController');
const auth = require('../../Helpers/Utils');
const Validation = require("../../Validation/Customervalidation");

router.get('/CustomerRegister', CustomerController.CustomerRegisterPage);
router.get('/CustomerLogin', CustomerController.CustomerLoginPage);
router.post('/Register', Validation.customerValidator, (req, res) => {
    return CustomerController.CustomerRegister(req, res);
});
router.post('/Login', CustomerController.CustomerLogin);
router.post('/OtpVerify', CustomerController.otpVerify);
router.get('/CustomerDetails/:CustomerId', auth.verifyToken, CustomerController.CustomerViewDetails);
router.put('/CustomerEdit', auth.verifyToken,Validation.customerValidator,CustomerController.CustomerEdit);
//router.get('/Profile', auth.verifyToken, CustomerController.CustomerProfile);

module.exports = router;