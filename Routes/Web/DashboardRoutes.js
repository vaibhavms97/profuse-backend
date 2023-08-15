const express = require("express");
const DashboardRoutes = express.Router();
const DashboardController = require('../../Controllers/Web/DashboardController')
const GlobalMiddlewares = require('../../Middlewares/GlobalMiddlewares')
const UserValidation = require('../../Validations/UserValidations')

function initilization() {
    getRoutes();
    postRoutes();
    putRoutes();
    patchRoutes();
}

initilization();

function getRoutes() {
    DashboardRoutes.get('/get-dashboard',GlobalMiddlewares.authenticate,UserValidation.checkUserStatus(),GlobalMiddlewares.ractifyError,DashboardController.getDashboardData)
}

function postRoutes() {
    // DashboardRoutes.post('/deposit-fund',GlobalMiddlewares.authenticate,UserValidation.checkUserStatus(),GlobalMiddlewares.ractifyError,DashboardController.depostFunds)
    // DashboardRoutes.post('/withdraw-fund',GlobalMiddlewares.authenticate,UserValidation.checkUserStatus(),GlobalMiddlewares.ractifyError,DashboardController.withdrawFunds)
}

function putRoutes() {
}
function patchRoutes() {
    // DashboardRoutes.patch('/update-user-profile',GlobalMiddlewares.authenticate,GlobalMiddlewares.ractifyError,AuthController.updateUserProfile)
}

module.exports = DashboardRoutes;