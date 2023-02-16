const CustomerModel = require('../../Models/CustomerSchema/CustomerModel');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const Utils = require('../../Helpers/Utils');
const cloudinary = require('cloudinary').v2;
const jwt = require('jsonwebtoken');
const excel = require('exceljs');


function CustomerManagement() {
    this.CustomerRegisterPage = (req, res) => {
        res.render('CustomerInterface/CustomerRegister');
    }

    this.CustomerLoginPage = (req, res) => {
        res.render('CustomerInterface/CustomerLogin');
    }

    this.CustomerRegister = async (req, res) => {

        try {
            const { CustomerName, CustomerEmail, CustomerMobile, CustomerPassword } = req.body;
            const CustomerLogo = req?.files?.CustomerLogo;

            const checkEmail = await CustomerModel.findOne({ CustomerEmail: CustomerEmail });
            if (checkEmail) {
                res.send({
                    "Message": "Email Is Already Exists"
                });
            }

            const checkMobile=await CustomerModel.findOne({CustomerMobile:CustomerMobile});
            if(checkMobile){
                res.send({
                    "Message": "Phone Is Already Exists"
                });
            }

            let image = await cloudinary.uploader.upload(CustomerLogo.tempFilePath);

            if (!image) {
                res.send("Failed To Load");
            } else {
                const NewCustomer = await new CustomerModel({
                    CustomerId: uuidv4(),
                    CustomerName: CustomerName,
                    CustomerEmail: CustomerEmail,
                    CustomerMobile: CustomerMobile,
                    CustomerPassword: await bcrypt.hash(CustomerPassword, 10),
                    CustomerLogo: image.secure_url
                });
                const data = await NewCustomer.save({});

                if (!data) {
                    res.send("Failed To Register");
                } else {
                    res.redirect('http://localhost:3000/IndianKart/CustomerLogin');
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    this.CustomerLogin = async (req, res) => {

        try {
            const { CustomerEmail, CustomerPassword } = req.body;
            let checkEmail = await CustomerModel.findOne({ CustomerEmail: CustomerEmail });

            if (!checkEmail) {
                res.send("Incorrect Email");
            } else {
                let password = checkEmail.CustomerPassword;
                let checkPassword = await bcrypt.compare(CustomerPassword, password);

                if (!checkPassword) {
                    res.send("Incorrect Password");
                } else {
                    const userToken = await jwt.sign({ CustomerEmail: CustomerEmail }, "SecretKey", { expiresIn: "50s" });
                    console.log(userToken);
                    res.send({
                        "token": userToken
                    });
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    this.CustomerProfile = async (req, res) => {
        res.render('CustomerProfile')
    }

    this.CustomerExcel = async (req, res) => {
        try {
            const workbook = new excel.Workbook();
            const worksheet = workbook.addWorksheet("customers");
            worksheet.columns = [
                { header: "S.No", key: "sno" },
                { header: "CustomerName", key: "CustomerName" },
                { header: "CustomerEmail", key: "CustomerEmail" },
                { header: "MobileNumber", key: "CustomerMobile" },
                { header: "CustomerPassword", key: "CustomerPassword" }
            ];
            let count = 1;
            const ct = await (CustomerModel.find());
            console.log(ct);
            ct.forEach((ct) => {
                ct.sno = count;
                worksheet.addRow(ct);
                count++;
            });
            worksheet.getRow(1).eachCell((cell) => {
                cell.font = { bold: true }
            });
            res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

            res.setHeader("Content-Disposition", `attachment;filename=CustomerDetails.xlsx`);

            return workbook.xlsx.write(res)
                .then(function () {
                    res.end()
                });
        } catch (exception) {
            console.log(exception.message);
        }

    }
}

module.exports = new CustomerManagement();