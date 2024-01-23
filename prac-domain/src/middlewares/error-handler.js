"use strict";

const CustomError = require('../utils/CustomError');

const errorHandler = (err, req, res, next) => {
    req.error = err; // 에러로그를 남기기 위해 req.error에 발생한 에러를 담아줌
    if (err instanceof CustomError) {
        res.status(err.status).json(err.toJSON());
    } else {
        res.status(500).json({
            name: 'INTERNAL_SERVER_ERROR',
            status: 500,
            code: '500',
            message: '서버 관리자에게 문의하세요.'
        });
    }
    next();
}

module.exports = errorHandler;