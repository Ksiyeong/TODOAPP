"use strict";

const { validationResult } = require("express-validator");
const CustomError = require("../utils/CustomError");

const validationHandler = (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new CustomError('Bad Request', 400, 'VR400', errors.array().map(err => `(${err.path}: ${err.msg})`));
        }
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = validationHandler;