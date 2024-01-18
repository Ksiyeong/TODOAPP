"use strict";

const winstonLog = require('../../config/winston-log');
const CustomError = require('../error/CustomError');

const logger = (req, res) => {
    if (req.error) {
        const err = req.error;
        if (err instanceof CustomError) {
            winstonLog.debug(`${req.method} ${req.path} ${err.status} ${err.code} Response "error : ${err.name}, message : ${err.message}"`);
        } else {
            winstonLog.error(`${req.method} ${req.path} 500 Response "${err}, stack : ${err.stack}"`);
        }
    } else {
        winstonLog.debug(`${req.method} ${req.path} ${res.statusCode}`);
    }
};

module.exports = logger;
