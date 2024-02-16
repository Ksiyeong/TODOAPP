"use strict";

const { db } = require("../../config/database");

module.exports = {
    existsByName: (name) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT EXISTS (SELECT 1 FROM category WHERE name = ?) AS count';
            db.query(query, [name], (error, data) => {
                if (error) reject(error);
                else resolve(data[0].count); // number
            });
        });
    },
};
