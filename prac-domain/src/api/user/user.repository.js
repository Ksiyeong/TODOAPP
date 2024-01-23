"use strict";

const { db } = require('../../config/database');

module.exports = {
    findByEmail: (email) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM users WHERE email = ?'; //TODO 필요한 데이터만 리턴하도록 변경할 것
            db.query(query, [email], (error, data) => {
                if (error) reject(`${error}`);
                else resolve(data[0]);
            });
        });
    },

    existsByEmail: (email) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT COUNT(*) count FROM users WHERE email = ?';
            db.query(query, [email], (error, data) => {
                if (error) reject(`${error}`);
                else resolve(data[0].count); // Bigint
            });
        });
    },

    save: (user) => {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO users(email, name, password) VALUES(?, ?, ?);';
            db.query(query, [user.email, user.name, user.password], (error, data) => {
                if (error) reject(`${error}`);
                else resolve({
                    affectedRows: data.affectedRows, // int
                    userId: data.insertId // Bigint
                });
            });
        });
    }
};
