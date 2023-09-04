const express = require("express");
const EarningRoutes = express.Router();
const EarningController = require('../../Controllers/Admin/EarningController')
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
    EarningRoutes.get('/get-admin-earnings',GlobalMiddlewares.authenticate,GlobalMiddlewares.ractifyError,EarningController.getAdminEarnings)
}

function postRoutes() {
}

function putRoutes() {
}
function patchRoutes() {
}
function deleteRoutes() {
}

module.exports = EarningRoutes;