const express=require('express');
const router=express.Router();
const CustomerController=require('../../Controller/Customers/CustomerController');

router.post('/CustomerRegister',CustomerController.CustomerRegistration);
router.post('/CustomerLogin',CustomerController.CustomerLogin);

module.exports=router;