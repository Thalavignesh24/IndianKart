const express=require('express');
const router=express.Router();
const CustomerController=require('../../Controller/Customers/CustomerController');

router.post('/CustomerRegister',CustomerController.CustomerRegistration);

module.exports=router;