const express = require("express");
const ProductRoutes = express.Router();
const ProductController = require('../../Controllers/Admin/ProductController')
const GlobalMiddlewares = require('../../Middlewares/GlobalMiddlewares');
const { upload } = require("../../Middlewares/UploadImages");

function initilization() {
    getRoutes();
    postRoutes();
    putRoutes();
    patchRoutes();
    deleteRoutes();
}


initilization();

function getRoutes() {
    ProductRoutes.get('/get-products-list',GlobalMiddlewares.authenticate,GlobalMiddlewares.ractifyError,ProductController.getProductList)
}

function postRoutes() {
    ProductRoutes.post('/create-product',GlobalMiddlewares.authenticate,GlobalMiddlewares.ractifyError, ProductController.addProduct)
}

function putRoutes() {
}
function patchRoutes() {
    ProductRoutes.patch('/edit-product',GlobalMiddlewares.authenticate,GlobalMiddlewares.ractifyError,ProductController.editProduct)
}
function deleteRoutes() {
    ProductRoutes.delete('/delete-product',GlobalMiddlewares.authenticate,GlobalMiddlewares.ractifyError,ProductController.deleteProduct)
    ProductRoutes.delete('/delete-products',GlobalMiddlewares.authenticate,GlobalMiddlewares.ractifyError,ProductController.deleteProducts)
}

module.exports = ProductRoutes;