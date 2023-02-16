const express=require('express');
const router=express.Router();
const AdminController=require('../../Controllers/Admin/AdminController');

router.get('/ListOfCustomers',AdminController.CustomersList);

module.exports=router;

