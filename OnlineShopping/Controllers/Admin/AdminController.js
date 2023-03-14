const CustomerModel = require('../../Models/CustomerSchema/CustomerModel');
const TemplateModel = require('../../Models/TemplateSchema/TemplateModel');
const cloudinary = require('cloudinary').v2;
const AdminQuery = require('../../Helpers/AdminCommonService');
const excel = require('exceljs');
const Utlis = require('../../Helpers/Utils');
const { changeStatus } = require('../../Helpers/AdminCommonService');
const Utils = require('../../Helpers/Utils');


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

    this.addProducts = async (req, res) => {

        try {
            let { ProductName, ProductQuantity, ProductAmount, ProductDescription } = req.body;
            let image = req.files?.ProductImage;

            if (Utlis.empty(image)) return res.send({ "errorMessage": "Please upload the Product image" });

            if (await AdminQuery.checkName(ProductName)) return res.send({ "errorMessage": "Product Name already given" });

            if (await AdminQuery.checkImage(image.md5)) return res.send({ "errorMessage": "ProductImage already Added" });

            let ProductImage = await cloudinary.uploader.upload(image.tempFilePath);

            let NewProducts = await AdminQuery.addProducts(Utlis.uuid(), ProductName, ProductQuantity, ProductAmount, ProductDescription, ProductImage.etag, ProductImage.secure_url, 'active');

            let productdata = NewProducts.save();

            if (productdata) return res.send({ "Message": "Product added Successfully" });
            return res.send({ "Message": "Failed Yo Add products" });

        } catch (e) {
            return res.send({ "catchMessage": e.message });
        }
    }

    this.deleteProducts = async (req, res) => {

        try {
            let { ProductId } = req.params;
            let productDelete = await AdminQuery.deleteProducts(ProductId);

            if (Utlis.empty(productDelete)) return res.send({ errorMessage: "No Data found" });
            res.send({ Message: "Product Deleted SuccessFully" });
        } catch (e) {
            console.log(e);
            return res.send({ "catchMessage": e.message });
        }
    }

    this.listOfProducts = async (req, res) => {

        try {
            let list = await AdminQuery.productsList();
            if (Utlis.empty(list)) return res.send({ errorMessage: "No Data found" });
            return res.send({ "Products List": list });
        } catch (e) {
            return res.send({ "catchMessage": e.message });
        }
    }

    this.activeProducts = async (req, res) => {
        try {
            let activeList = await AdminQuery.activeProducts();

            if (Utlis.empty(activeList)) return res.send({ errorMessage: "No Data found" });
            return res.send({ "Active Products List": activeList });

        } catch (e) {
            return res.send({ "catchMessage": e.message });
        }
    }

    this.statusChange = async (req, res) => {
        try {
            let { ProductId } = req.params;
            let ChangeStatus = await AdminQuery.changeStatus(ProductId);

            if (Utils.empty(ChangeStatus)) return res.send({ errorMessage: "No Data found" });

            let status = ChangeStatus.status == 'active' ? 'inactive' : 'active';
            let StatusUpdate = await AdminQuery.statusUpdate(ProductId, status);

            if (StatusUpdate) return res.send({ Message: "Status Updated Successfully" });

        } catch (e) {
            return res.send({ "catchMessage": e.message });
        }
    }

    this.productUpdate = async (req, res) => {
        try {
            let { ProductId, ProductName, ProductQuantity, ProductAmount, ProductDescription } = req.body;
            let image = req.files?.ProductImage;
            let product_id = await AdminQuery.productData(ProductId);

            if (Utils.empty(product_id)) return res.send({ errorMessage: "No Data found" });

            if (Utils.empty(image)) {
                let updateStatus = await AdminQuery.updateProduct(ProductId, ProductName, ProductQuantity, ProductAmount, ProductDescription);
                return res.send({ Message: updateStatus });
            }
            let ProductImage = await cloudinary.uploader.upload(image.tempFilePath);
            let ProductUpdateStatus = await AdminQuery.updateProduct(ProductId, ProductName, ProductQuantity, ProductAmount, ProductDescription, ProductImage.etag, ProductImage.secure_url);
            return res.send({ Message: ProductUpdateStatus });

        } catch (e) {
            return res.send({ "catchMessage": e.message });
        }
    }
}

module.exports = new AdminManagement();