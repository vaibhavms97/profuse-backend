const express = require("express");
const AccountRoutes = express.Router();
const AccountController = require('../../Controllers/Web/AccountController')
const InvestController = require('../../Controllers/Web/InvestController')
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
    AccountRoutes.get('/get-transactions',GlobalMiddlewares.authenticate,UserValidation.checkUserStatus(),GlobalMiddlewares.ractifyError,InvestController.getTransactionList)
}

function postRoutes() {
    AccountRoutes.post('/deposit-fund',GlobalMiddlewares.authenticate,UserValidation.checkUserStatus(),GlobalMiddlewares.ractifyError,AccountController.depostFunds)
    AccountRoutes.post('/withdraw-fund',GlobalMiddlewares.authenticate,UserValidation.checkUserStatus(),GlobalMiddlewares.ractifyError,AccountController.withdrawFunds)
    AccountRoutes.post('/invest-amount',GlobalMiddlewares.authenticate,UserValidation.checkUserStatus(),GlobalMiddlewares.ractifyError,InvestController.amountInvest)
}

function putRoutes() {
}
function patchRoutes() {
    // AccountRoutes.patch('/update-user-profile',GlobalMiddlewares.authenticate,GlobalMiddlewares.ractifyError,AuthController.updateUserProfile)
}

module.exports = AccountRoutes;