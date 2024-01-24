"use strict";

const log = require('../config/log');
const CustomError = require('../utils/CustomError');

const logger = (req, res) => {
    if (req.error) {
        const err = req.error;
        if (err instanceof CustomError) { // 400 ~ 499번대 응답
            log.debug(`${req.method} ${req.path} ${err.status} ${err.code} ${err}`);

        } else { // 500번 이상 응답
            log.error(`${req.method} ${req.path} 500`, { error: err, stack: err.stack });
        }

    } else { // 400번 미만 응답 (정상 응답)
        log.debug(`${req.method} ${req.path} ${res.statusCode}`);
    }
}

module.exports = logger;
