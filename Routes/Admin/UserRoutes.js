const express = require("express");
const AdminRoutes = express.Router();
const UserController = require('../../Controllers/Admin/UserController')
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
    AdminRoutes.get('/get-users-list',GlobalMiddlewares.authenticate,GlobalMiddlewares.ractifyError,UserController.getUsersList)
}

function postRoutes() {
}

function putRoutes() {
}
function patchRoutes() {
    AdminRoutes.patch('/change-user-status',GlobalMiddlewares.authenticate,GlobalMiddlewares.ractifyError,UserController.changeUserStatus)
}
function deleteRoutes() {
    AdminRoutes.delete('/delete-user',GlobalMiddlewares.authenticate,GlobalMiddlewares.ractifyError,UserController.deleteUser)
}

module.exports = AdminRoutes;