const { validator, handleRequest } = require('./CommonValidation');

function validation() {
    this.productValidatio = [
        validator.checkName('ProductName', 'Product name'),
        validator.checkQty('ProductQuantity', 'Product quantity'),
        validator.checkAmt('ProductAmount', 'Product amount'),
        handleRequest
    ]
}

module.exports = new validation();