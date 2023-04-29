const express = require('express');
const router = express.Router();
const AdminController = require('../../Controllers/Admin/AdminController');


router.get('/CustomerDetailsDownload', AdminController.CustomerExcel);

router.post('/AddTemplates', AdminController.addTemplates);

router.post('/AddTimezone',AdminController.addTimeZone);

router.get('/list',(req,res)=>{AdminController.timezoneList(req.query,res)});

router.get('/get',AdminController.countryCode);

router.post('/AddCountry',AdminController.addCountry);

router.post('/AddState',AdminController.addState);

module.exports = router;

