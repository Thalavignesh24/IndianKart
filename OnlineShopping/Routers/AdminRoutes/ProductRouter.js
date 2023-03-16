const express = require('express');
const router = express.Router();
const ProductController = require('../../Controllers/Admin/ProductController');
const validator = require('../../Validation/AdminValidation');

router.post('/AddProducts', validator.productValidation, ProductController.addProducts);

router.delete('/DeleteProducts/:ProductId', ProductController.deleteProducts);

router.get('/ListOfProducts', ProductController.listOfProducts);

router.get('/ActiveProducts', ProductController.activeProducts);

router.get('/StatusChange/:ProductId', ProductController.statusChange);

router.put('/ProductUpdate', validator.productUpdateValidation, ProductController.productUpdate);

module.exports = router;

