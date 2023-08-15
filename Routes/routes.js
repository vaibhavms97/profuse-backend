const express = require("express");
const routes = express.Router();
const AuthRouter =  require('./Web/AuthRoutes')
const AccountRouter =  require('./Web/AccountRoutes')
const DashboardRouter =  require('./Web/DashboardRoutes')
const AdminAuthRouter =  require('./Admin/AuthRoutes')
const AdminUserRouter =  require('./Admin/UserRoutes')
const AdminProductRouter =  require('./Admin/ProductRoutes')
const AdminCategoryRouter =  require('./Admin/CategoryRoutes')

function initilization() {
    app();
    admin();
    web();
}

initilization();

function app() {
    // routes.use('/app/user',RegistrationRouter)
    // routes.use('/app/contact',ContactRoutes)
    // routes.use('/app/project',ProjectRouter)
}

function admin() {
    routes.use('/admin/auth',AdminAuthRouter)
    routes.use('/admin/user',AdminUserRouter)
    routes.use('/admin/product',AdminProductRouter)
    routes.use('/admin/category',AdminCategoryRouter)
}

function web(){
    routes.use('/web/auth',AuthRouter);
    routes.use('/web/account',AccountRouter);
    routes.use('/web/dashboard',DashboardRouter);
}

module.exports = routes;