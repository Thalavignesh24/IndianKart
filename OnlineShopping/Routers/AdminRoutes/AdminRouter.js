const express = require('express');
const router = express.Router();
const AdminController = require('../../Controllers/Admin/AdminController');
const validator = require('../../Validation/AdminValidation');

router.get('/CustomerDetailsDownload', AdminController.CustomerExcel);

router.post('/AddTemplates', AdminController.addTemplates);

router.post('/AddProducts', validator.productValidation, AdminController.addProducts);

router.delete('/DeleteProducts/:ProductId', AdminController.deleteProducts);

router.get('/ListOfProducts', AdminController.listOfProducts);

router.get('/ActiveProducts', AdminController.activeProducts);

router.get('/StatusChange/:ProductId', AdminController.statusChange);

router.put('/ProductUpdate', validator.productUpdateValidation, AdminController.productUpdate);

module.exports = router;

