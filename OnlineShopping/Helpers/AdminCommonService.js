const { model } = require('mongoose');
const ProductModel = require('../Models/AdminSchema/ProductModel');

function Products() {
    //Product added
    this.checkName = async (ProductName) => {
        return await ProductModel.findOne({ ProductName: ProductName });
    }

    this.checkImage = async (ProductImage) => {
        return await ProductModel.findOne({ LogoId: ProductImage });
    }

    this.addProducts = async (ProductId, ProductName, ProductQuantity, ProductAmount, LogoId, ProductImage) => {
        return await new ProductModel({ ProductId, ProductName, ProductQuantity, ProductAmount, LogoId, ProductImage });
    }

    //Product Delete

    this.deleteProducts = async (ProductId) => {
        return await ProductModel.findOneAndDelete({ ProductId: ProductId });
    }
}

module.exports = new Products();