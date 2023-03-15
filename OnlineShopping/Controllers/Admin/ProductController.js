const ProductQuery = require('../../Helpers/Services/ProductService');
const cloudinary = require('cloudinary').v2;
const Utlis = require('../../Helpers/Utils');


function ProductManagement() {

    this.addProducts = async (req, res) => {

        try {
            let { ProductName, ProductQuantity, ProductAmount, ProductDescription } = req.body;
            let image = req.files?.ProductImage;

            if (Utlis.empty(image)) return res.send({ "errorMessage": "Please upload the Product image" });

            if (await ProductQuery.checkName(ProductName)) return res.send({ "errorMessage": "Product Name already given" });

            if (await ProductQuery.checkImage(image.md5)) return res.send({ "errorMessage": "ProductImage already Added" });

            let ProductImage = await cloudinary.uploader.upload(image.tempFilePath);

            let NewProducts = await ProductQuery.addProducts(Utlis.uuid(), ProductName, ProductQuantity, ProductAmount, ProductDescription, ProductImage.etag, ProductImage.secure_url, 'active');

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
            let productDelete = await ProductQuery.deleteProducts(ProductId);

            if (Utlis.empty(productDelete)) return res.send({ errorMessage: "No Data found" });
            res.send({ Message: "Product Deleted SuccessFully" });
        } catch (e) {
            console.log(e);
            return res.send({ "catchMessage": e.message });
        }
    }

    this.listOfProducts = async (req, res) => {

        try {
            let list = await ProductQuery.productsList();
            if (Utlis.empty(list)) return res.send({ errorMessage: "No Data found" });
            return res.send({ "Products List": list });
        } catch (e) {
            return res.send({ "catchMessage": e.message });
        }
    }

    this.activeProducts = async (req, res) => {
        try {
            let activeList = await ProductQuery.activeProducts();

            if (Utlis.empty(activeList)) return res.send({ errorMessage: "No Data found" });
            return res.send({ "Active Products List": activeList });

        } catch (e) {
            return res.send({ "catchMessage": e.message });
        }
    }

    this.statusChange = async (req, res) => {
        try {
            let { ProductId } = req.params;
            let ChangeStatus = await ProductQuery.changeStatus(ProductId);

            if (Utlis.empty(ChangeStatus)) return res.send({ errorMessage: "No Data found" });

            let status = ChangeStatus.status == 'active' ? 'inactive' : 'active';
            let StatusUpdate = await ProductQuery.statusUpdate(ProductId, status);

            if (StatusUpdate) return res.send({ Message: "Status Updated Successfully" });

        } catch (e) {
            return res.send({ "catchMessage": e.message });
        }
    }

    this.productUpdate = async (req, res) => {
        try {
            let { ProductId, ProductName, ProductQuantity, ProductAmount, ProductDescription } = req.body;
            let image = req.files?.ProductImage;
            let product_id = await ProductQuery.productData(ProductId);

            if (Utlis.empty(product_id)) return res.send({ errorMessage: "No Data found" });

            if (await ProductQuery.checkNameEdit(ProductId, ProductName)) return res.send({ "errorMessage": "Product Name already given" });

            if (Utlis.empty(image)) {
                let updateStatus = await ProductQuery.updateProduct(ProductId, ProductName, ProductQuantity, ProductAmount, ProductDescription);
                return res.send({ Message: updateStatus });
            }
            if (await ProductQuery.checkImageEdit(ProductId, image.md5)) return res.send({ "errorMessage": "ProductImage already Added" });
            
            let ProductImage = await cloudinary.uploader.upload(image.tempFilePath);
            let ProductUpdateStatus = await ProductQuery.updateProduct(ProductId, ProductName, ProductQuantity, ProductAmount, ProductDescription, ProductImage.etag, ProductImage.secure_url);
            return res.send({ Message: ProductUpdateStatus });

        } catch (e) {
            console.log(e);
            return res.send({ "catchMessage": e.message });
        }
    }

}

module.exports = new ProductManagement();