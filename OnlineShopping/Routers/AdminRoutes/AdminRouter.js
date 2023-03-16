const express = require('express');
const router = express.Router();
const AdminController = require('../../Controllers/Admin/AdminController');


router.get('/CustomerDetailsDownload', AdminController.CustomerExcel);

router.post('/AddTemplates', AdminController.addTemplates);

module.exports = router;

