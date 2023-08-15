const express = require("express");
const UserRoutes = express.Router();
const AuthController = require('../../Controllers/Web/AuthController')
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
    UserRoutes.get('/get-user-profile',GlobalMiddlewares.authenticate,UserValidation.checkUserStatus(),GlobalMiddlewares.ractifyError,AuthController.getUserProfile)
}

function postRoutes() {
    UserRoutes.post('/login',UserValidation.userLogin(),UserValidation.checkUserStatus(),GlobalMiddlewares.ractifyError,AuthController.userLogin)
    UserRoutes.post('/register',UserValidation.userRegister(),GlobalMiddlewares.ractifyError,AuthController.userSignup)
}

function putRoutes() {
}
function patchRoutes() {
    UserRoutes.patch('/update-user-profile',GlobalMiddlewares.authenticate,GlobalMiddlewares.ractifyError,AuthController.updateUserProfile)
}

module.exports = UserRoutes;