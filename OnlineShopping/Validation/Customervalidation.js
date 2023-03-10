//const {check,validationResult}=require('express-validator');
const { validator, handleRequest } = require('./CommonValidation');

function Validator() {
    this.customerValidator = [
        validator.checkName('CustomerName', 'Name'),
        validator.checkEmail('CustomerEmail', 'Email'),
        validator.checkMobile('CustomerMobile', 'Mobile number'),
        validator.checkPassword('CustomerPassword', 'Password'),
        handleRequest
    ];
    
}



module.exports = new Validator();
