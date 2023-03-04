const express = require('express');
const router = express.Router();
const CustomerController = require('../../Controllers/Customers/CustomerController');
const auth = require('../../Helpers/Utils');

router.get('/CustomerRegister', CustomerController.CustomerRegisterPage);
router.get('/CustomerLogin', CustomerController.CustomerLoginPage);
router.get('/OtpVerification',CustomerController.OtpPage);
router.post('/Register', CustomerController.CustomerRegister);
router.post('/Login', CustomerController.CustomerLogin);
router.post('/OtpVerify',CustomerController.otpVerify);
router.get('/Profile', auth.verifyToken, CustomerController.CustomerProfile);

module.exports = router;