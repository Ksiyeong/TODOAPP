"use strict";

const { db } = require("../../config/database");

module.exports = {
    countByName: (name) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT COUNT(*) count FROM category WHERE name = ?';
            db.query(query, [name], (error, data) => {
                if (error) reject(error);
                else resolve(data[0].count); // Bigint
            });
        });
    },
};
