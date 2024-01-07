"use strict";

const mariadb = require("mariadb/callback");

const db = mariadb.createConnection({
    host: "localhost",
    port: "3307",
    user: "root",
    database: "prac_login"
});

module.exports = db;