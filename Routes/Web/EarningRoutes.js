const express = require("express");
const EarningRoutes = express.Router();
const EarningController = require('../../Controllers/Web/EarningController')
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
    EarningRoutes.get('/get-user-earnings',GlobalMiddlewares.authenticate,GlobalMiddlewares.ractifyError,EarningController.getUserEarnings)
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