"use strict";

const fs = require("fs");
const appRoot = require("app-root-path");

const accessLogStream = fs.createWriteStream(
    `${appRoot}/log/morgan-log.log`,
    { flags: 'a' }
);

module.exports = accessLogStream;