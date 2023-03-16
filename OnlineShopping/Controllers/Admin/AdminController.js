const CustomerModel = require('../../Models/CustomerSchema/CustomerModel');
const TemplateModel = require('../../Models/TemplateSchema/TemplateModel');
const excel = require('exceljs');
const Utlis = require('../../Helpers/Utils');


function AdminManagement() {

    this.CustomerExcel = async (req, res) => {
        try {
            const workbook = new excel.Workbook();
            const worksheet = workbook.addWorksheet("customers");
            const path = '/Users/apple/Desktop/IndianKart/OnlineShopping/ExcelSheets';
            worksheet.columns = [
                { header: "S.No", key: "sno" },
                { header: "CustomerName", key: "CustomerName" },
                { header: "CustomerEmail", key: "CustomerEmail" },
                { header: "MobileNumber", key: "CustomerMobile" }
            ];
            let count = 1;
            const ct = await (CustomerModel.find());
            ct.forEach((ct) => {
                ct.sno = count;
                worksheet.addRow(ct);
                count++;
            });
            worksheet.getRow(1).eachCell((cell) => {
                cell.font = { bold: true }
            });

            const data = await workbook.xlsx.writeFile(`${path}/users.xlsx`)
                .then(() => {
                    res.send({
                        status: "success",
                        message: "file successfully downloaded",
                        path: `${path}/users.xlsx`,
                    });
                });
        } catch (exception) {
            console.log(exception.message);
        }

    }

    this.addTemplates = async (req, res) => {
        try {
            const { FileName, EmailSubject, EmailType } = req.body;
            const Template = new TemplateModel({
                FileName, EmailSubject, EmailType
            });
            const TemplatesFile = await Template.save();
            if (!TemplatesFile)
                return res.send("Failed To Add Templates");
            else
                return res.send("Template Added SuccessFully");

        } catch (error) {
            console.log(error.message);
        }
    }

}

module.exports = new AdminManagement();