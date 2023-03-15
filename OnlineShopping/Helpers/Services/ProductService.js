const ProductModel = require('../../Models/AdminSchema/ProductModel');

function Products() {

    //Product added
    this.checkName = async (ProductName) => {
        return await ProductModel.findOne({ ProductName: ProductName });
    }

    this.checkImage = async (ProductImage) => {
        return await ProductModel.findOne({ LogoId: ProductImage });
    }

    this.addProducts = async (ProductId, ProductName, ProductQuantity, ProductAmount, ProductDescription, LogoId, ProductImage, status) => {
        return await new ProductModel({ ProductId, ProductName, ProductQuantity, ProductAmount, ProductDescription, LogoId, ProductImage, status });
    }


    //Product Delete
    this.deleteProducts = async (ProductId) => {
        return await ProductModel.findOneAndDelete({ ProductId: ProductId });
    }


    //List of Products
    this.productsList = async () => {
        return await ProductModel.find({}, { _id: 0, LogoId: 0, createdAt: 0, updatedAt: 0, __v: 0 });
    }


    //List of Active products
    this.activeProducts = async () => {
        return await ProductModel.find({ status: 'active' }, { _id: 0, LogoId: 0, createdAt: 0, updatedAt: 0, __v: 0 });
    }


    //status change
    this.changeStatus = async (ProductId) => {
        return await ProductModel.findOne({ ProductId: ProductId }, { _id: 0, status: 1 });
    }

    this.statusUpdate = async (ProductId, Status) => {
        return await ProductModel.updateOne({ ProductId: ProductId }, { $set: { status: Status } });
    }


    //product updation
    this.checkNameEdit = async (ProductId, ProductName) => {
        return await ProductModel.findOne({ ProductName: { $regex: ProductName, '$options': 'i' }, ProductId: { $ne: ProductId } });
    }

    this.checkImageEdit = async (ProductId, ProductImage) => {
        return await ProductModel.findOne({ LogoId: ProductImage, ProductId: { $ne: ProductId } });
    }

    this.productData = async (ProductId) => {
        return await ProductModel.findOne({ ProductId: ProductId }, { _id: 0, LogoId: 0, createdAt: 0, updatedAt: 0, __v: 0 });
    }

    this.updateProduct = async (ProductId, ProductName, ProductQuantity, ProductAmount, ProductDescription, LogoId, ProductImage) => {
        return await ProductModel.updateMany({ ProductId: ProductId },
            {
                ProductName,
                ProductQuantity,
                ProductAmount,
                ProductDescription,
                LogoId,
                ProductImage
            });
    }

}

module.exports = new Products();