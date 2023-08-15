const express = require("express");
const CategoryRoutes = express.Router();
const CategoryController = require('../../Controllers/Admin/CategoryController')
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
    CategoryRoutes.get('/get-categories-list',GlobalMiddlewares.authenticate,GlobalMiddlewares.ractifyError,CategoryController.getCategoriesList)
}

function postRoutes() {
    CategoryRoutes.post('/create-category',GlobalMiddlewares.authenticate,GlobalMiddlewares.ractifyError,CategoryController.addCategory)
}

function putRoutes() {
}
function patchRoutes() {
}
function deleteRoutes() {
}

module.exports = CategoryRoutes;