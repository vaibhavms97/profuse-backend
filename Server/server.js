require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose');
const {env} = require('../Environments/env');
const Routes = require('../Routes/routes');
const TransactionSheduler = require('../Utilities/TransactionScheduler');

function initilization() {
    setupCors()
    setUpDatabase();
    setupBodyParser();
    setUpRoutes();
    setupError404Handler();
    setupErrorHandler();
}

initilization();

function setupCors(){
    app.use(cors({
        origin:true,
        credentials:true
    }))
}

function setupBodyParser() {
    app.use(express.json({limit: "10mb", extended: true}))
    app.use(express.urlencoded({limit: "10mb", extended: true, parameterLimit: 50000}))
    app.use(express.urlencoded({ extended: true })); //in methods always use colons
    app.use(express.json());
}

function setUpDatabase() {
    mongoose.connect(env().db_root, {dbName: "profuse"})
        .then((r) => {
            console.log("Database connected Successfully");
        }).catch((err) => {
            console.log(err);
        });
}

function setUpRoutes() {
    app.use('/api/v1', Routes);
}

function setupError404Handler() {
    app.use((req, res) => {
        res.status(404).json({
            message: 'NOT FOUND',
            status: 404,
            data:{}
        });
    });
}

TransactionSheduler();

function setupErrorHandler() {
    app.use((err, req, res, next) => {
        res.status(500).json({
            message: err.message || "Something went wrong. Please try again later",
            status: 500,
            data:{}
        });
    });
}
module.exports = app;