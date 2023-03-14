const express = require('express');
const router = express.Router();
const AdminController = require('../../Controllers/Admin/AdminController');
const validator = require('../../Validation/AdminValidation');

router.get('/CustomerDetailsDownload', AdminController.CustomerExcel);

router.post('/AddTemplates', AdminController.addTemplates);

router.post('/AddProducts', validator.productValidatio, AdminController.addProducts);

router.delete('/DeleteProducts/:ProductId', AdminController.deleteProducts);

module.exports = router;

