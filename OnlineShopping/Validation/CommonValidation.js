const { check, validationResult } = require('express-validator');

const handleRequest = (req, res, next) => {
    const error = validationResult(req).array();
    if (error[0] != undefined) {
        return res.send({
            "errorMessage": error[0].msg
        });
    }
    next();
}

function validation() {

    //Customer Register

    this.checkName = (field, messager) => {
        return check(field).trim().notEmpty().withMessage("Please enter your " + messager);
    }

    this.checkEmail = (field, messager) => {
        return check(field).trim().notEmpty().withMessage("Please enter your " + messager).isEmail().withMessage('Invalid email type');
    }

    this.checkMobile = (field, messager) => {
        return check(field).trim().notEmpty().withMessage("Please enter your " + messager).isNumeric().withMessage('Mobile number must be number').isLength({ max: 10, min: 10 }).withMessage("Invalid mobile number");
    }

    this.checkPassword = (field, messager) => {
        return check(field).trim().notEmpty().withMessage("Please enter your " + messager).isLength({ min: 8 }).withMessage("Password must be minimum eight characters");
    }

    //Product Register

    this.checkQty = (field, messager) => {
        return check(field).trim().notEmpty().withMessage("Please enter your " + messager).isNumeric().withMessage('Please enter valid quantity');
    }

    this.checkAmt = (field, messager) => {
        return check(field).trim().notEmpty().withMessage("Please enter your " + messager).isDecimal().withMessage('Please enter valid amount');
    }


}

let validator = new validation();
module.exports = { validator, handleRequest }
