const express=require('express');
const router=express.Router();
const CustomerController=require('../../Controllers/Customers/CustomerController');

router.get('/CustomerRegister',CustomerController.CustomerRegisterPage);
router.post('/Register',CustomerController.CustomerRegister);

module.exports=router;