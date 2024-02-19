"use strict";

const { db } = require("../../config/database");

module.exports = {
    existsByName: (name) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT EXISTS (SELECT 1 FROM category WHERE name = ?) AS count;';
            db.query(query, [name], (error, data) => {
                if (error) reject(error);
                else resolve(data[0].count); // number
            });
        });
    },

    save: (name) => {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO category(name) VALUES(?);';
            db.query(query, [name], (error, data) => {
                if (error) reject(error);
                else resolve({
                    affectedRows: data.affectedRows, // int
                    categoryId: data.insertId // Bigint
                });
            });
        });
    },

    // category 단건 조회
    findById: (categoryId) => {
        return new Promise((resolve, reject) => {
            const query = `
            SELECT * FROM category
            WHERE category_id = ?
            LIMIT 1;
            `;
            db.query(query, [categoryId], (error, data) => {
                if (error) reject(error);
                else resolve(data[0]);
            });
        });
    },
};
