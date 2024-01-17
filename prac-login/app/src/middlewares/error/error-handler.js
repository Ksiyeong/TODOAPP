"use strict";

const CustomError = require('./CustomError');
const logger = require('../../config/winston-logger');

const errorHandler = (err, req, res, next) => {
    if (err instanceof CustomError) {
        console.log(err.message);
        logger.debug(`${req.method} ${req.path} ${err.status} ${err.code} Response "error : ${err.name}, message : ${err.message}"`);
        res.status(err.status).json(err.toJSON());
    } else {
        logger.error(`${req.method} ${req.path} 500 Response "${err}, stack : ${err.stack}"`);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = errorHandler;
