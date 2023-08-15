const express = require("express");
const ProductRoutes = express.Router();
const ProductController = require('../../Controllers/Admin/ProductController')
const GlobalMiddlewares = require('../../Middlewares/GlobalMiddlewares')

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
    ProductRoutes.post('/create-product',GlobalMiddlewares.authenticate,GlobalMiddlewares.ractifyError,ProductController.addProduct)
}

function putRoutes() {
}
function patchRoutes() {
}
function deleteRoutes() {
    ProductRoutes.delete('/delete-product',GlobalMiddlewares.authenticate,GlobalMiddlewares.ractifyError,ProductController.deleteProduct)
}

module.exports = ProductRoutes;