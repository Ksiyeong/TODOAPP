"use strict";

const { db } = require("../../config/database");

module.exports = {
    save: (userId, title, content) => {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO post (user_id, title, content) VALUES(?, ?, ?);';
            db.query(query, [userId, title, content], (error, data) => {
                if (error) reject(error);
                else resolve({ //OkPacket { affectedRows: 1, insertId: 4n, warningStatus: 0 }
                    affectedRows: data.affectedRows, // int
                    postId: data.insertId // Bigint
                });
            });
        });
    },

};
