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
}

function postRoutes() {
    UserRoutes.post('/register',UserValidation.userRegister(),GlobalMiddlewares.ractifyError,AuthController.adminSignup)
}

function putRoutes() {
}
function patchRoutes() {
}

module.exports = UserRoutes;