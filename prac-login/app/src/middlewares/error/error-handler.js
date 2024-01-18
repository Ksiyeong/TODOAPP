"use strict";

const CustomError = require('./CustomError');

const errorHandler = (err, req, res, next) => {
    req.error = err;
    if (err instanceof CustomError) {
        res.status(err.status).json(err.toJSON());
    } else {
        res.status(500).json({ message: "Internal Server Error" });
    }
    next();
}

module.exports = errorHandler;
