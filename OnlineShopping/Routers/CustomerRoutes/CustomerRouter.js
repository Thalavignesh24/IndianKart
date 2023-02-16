const express = require('express');
const router = express.Router();
const CustomerController = require('../../Controllers/Customers/CustomerController');
const auth = require('../../Helpers/Utils');

router.get('/CustomerRegister', CustomerController.CustomerRegisterPage);
router.get('/CustomerLogin', CustomerController.CustomerLoginPage);
router.post('/Register', CustomerController.CustomerRegister);
router.post('/Login', CustomerController.CustomerLogin);
router.get('/Profile', auth.verifyToken, CustomerController.CustomerProfile);

module.exports = router;