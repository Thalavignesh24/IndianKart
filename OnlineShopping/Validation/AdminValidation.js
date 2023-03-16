const { validator, handleRequest } = require('./CommonValidation');

function validation() {
    this.productValidation = [
        validator.checkName('ProductName', 'Product name'),
        validator.checkQty('ProductQuantity', 'Product quantity'),
        validator.checkAmt('ProductAmount', 'Product amount'),
        validator.checkDescription('ProductDescription', 'Product description'),
        handleRequest
    ]

    this.productUpdateValidation = [
        validator.checkId('ProductId', 'product id'),
        validator.checkName('ProductName', 'Product name'),
        validator.checkQty('ProductQuantity', 'Product quantity'),
        validator.checkAmt('ProductAmount', 'Product amount'),
        validator.checkDescription('ProductDescription', 'Product description'),
        handleRequest
    ]
}

module.exports = new validation();