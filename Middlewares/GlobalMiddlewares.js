const { validationResult } = require('express-validator'); // it collect response from express-validators
const jwt = require('jsonwebtoken');
const { env } = require('../Environments/env');

exports.ractifyError = (req, res, next) => {

    const error = validationResult(req);
    if (!error.isEmpty()) {
        req.errorStatus = 422; // 422 Unprocessable Entity
        next(new Error(error.array()[0].message)); // to global error method
    } else {
        next(); // to next middleware
    }
}

exports.authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader ? authHeader.slice(7, authHeader.length) : null;
    console.log("authHeader",token);
    try {
        jwt.verify(token, env().jwt_secret, ((err, decoded) => {
            if (err) {
                next(err)
            } else if (!decoded) {
                req.errorStatus = 401;
                next(new Error('User Not Authorised'))
            } else {
                req.userData = decoded;
                next();
            }
        }))
    } catch (e) {
        req.errorStatus = 401;
        next(e);
    }
}
